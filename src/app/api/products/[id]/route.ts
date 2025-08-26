
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { Product } from '@/lib/types';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';


const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

async function readData(): Promise<Product[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeData(data: Product[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = doc(db, "products", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ id: docSnap.id, ...docSnap.data() } as Product);
    } else {
      return new NextResponse('Product not found', { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching product from Firestore:", error);
    return new NextResponse('Error fetching product data', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
    try {
        const updatedProductData: Omit<Product, 'id'> = await request.json();
        const docRef = doc(db, "products", params.id);
        await updateDoc(docRef, updatedProductData);

        // Also update the local JSON file for consistency during transition
        let products = await readData();
        const productIndex = products.findIndex(p => p.id === params.id);
        if (productIndex > -1) {
            products[productIndex] = { ...products[productIndex], ...updatedProductData };
            await writeData(products);
        }
        
        return NextResponse.json({ id: params.id, ...updatedProductData });
    } catch (error) {
        console.error(`Could not update product ${params.id} in Firestore`, error);
        return new NextResponse('Error updating product', { status: 500 });
    }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id:string } }
) {
    try {
        const docRef = doc(db, "products", params.id);
        await deleteDoc(docRef);

        // Also delete from the local JSON file
        let products = await readData();
        const filteredProducts = products.filter(p => p.id !== params.id);
        await writeData(filteredProducts);
        
        return new NextResponse(null, { status: 204 }); // No Content
    } catch (error) {
        console.error(`Could not delete product ${params.id} from Firestore`, error);
        return new NextResponse('Error deleting product', { status: 500 });
    }
}

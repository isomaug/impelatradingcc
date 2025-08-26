
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { Product } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';

const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

async function writeData(data: Product[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() } as Product);
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products from Firestore: ", error);
        return new NextResponse('Error fetching products', { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newProductData: Omit<Product, 'id'> = await request.json();
        
        // Add to Firestore and get the new document reference
        const docRef = await addDoc(collection(db, "products"), newProductData);
        
        const newProduct: Product = {
            id: docRef.id,
            ...newProductData,
        };

        // Also update the local JSON file for consistency during transition
        const products = (await getDocs(collection(db, "products"))).docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
        await writeData(products);

        // Update the document in Firestore to include its own ID.
        await setDoc(doc(db, "products", docRef.id), newProduct);

        return new NextResponse(JSON.stringify(newProduct), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error creating product: ", error);
        return new NextResponse('Error creating product', { status: 500 });
    }
}

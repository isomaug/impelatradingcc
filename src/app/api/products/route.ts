
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import type { Product } from '@/lib/types';

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products: ", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProductData: Omit<Product, 'id'> = await request.json();
    const docRef = await addDoc(collection(db, "products"), newProductData);
    return new NextResponse(JSON.stringify({ id: docRef.id, ...newProductData }), { 
      status: 201, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("Error creating product: ", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

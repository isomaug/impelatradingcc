
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { Product } from '@/lib/types';

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
  const products = await readData();
  const product = products.find(p => p.id === params.id);
  if (product) {
    return NextResponse.json(product);
  }
  return new NextResponse('Product not found', { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updatedProductData: Omit<Product, 'id'> = await request.json();
  let products = await readData();
  const productIndex = products.findIndex(p => p.id === params.id);

  if (productIndex > -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProductData };
    await writeData(products);
    return NextResponse.json(products[productIndex]);
  }
  return new NextResponse('Product not found', { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  let products = await readData();
  const filteredProducts = products.filter(p => p.id !== params.id);

  if (products.length === filteredProducts.length) {
    return new NextResponse('Product not found', { status: 404 });
  }

  await writeData(filteredProducts);
  return new NextResponse(null, { status: 204 }); // No Content
}

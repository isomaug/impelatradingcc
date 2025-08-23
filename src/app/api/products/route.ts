
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

export async function GET() {
  const products = await readData();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const newProductData: Omit<Product, 'id'> = await request.json();
  const products = await readData();
  const newProduct: Product = {
    id: (products.length > 0 ? Math.max(...products.map(p => parseInt(p.id))) + 1 : 1).toString(),
    ...newProductData,
  };
  products.push(newProduct);
  await writeData(products);
  return new NextResponse(JSON.stringify(newProduct), { status: 201, headers: { 'Content-Type': 'application/json' } });
}

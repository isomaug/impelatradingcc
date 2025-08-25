
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { FooterContent } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'data', 'footer.json');

async function readData(): Promise<FooterContent> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Could not read footer data", error);
    throw new Error("Failed to read footer data");
  }
}

async function writeData(data: FooterContent): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data);
  } catch (error) {
      return new NextResponse('Error fetching footer content', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const updatedData: FooterContent = await request.json();
    await writeData(updatedData);
    return NextResponse.json({ message: "Footer content updated successfully" });
  } catch (error) {
    return new NextResponse('Error updating footer content', { status: 500 });
  }
}

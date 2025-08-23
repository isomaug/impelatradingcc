
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { HomePageContent } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'data', 'homepage.json');

async function readData(): Promise<HomePageContent> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Could not read homepage data", error);
    throw new Error("Failed to read homepage data");
  }
}

async function writeData(data: HomePageContent): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data);
  } catch (error) {
      return new NextResponse('Error fetching homepage content', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const updatedData: HomePageContent = await request.json();
    await writeData(updatedData);
    return NextResponse.json({ message: "Homepage content updated successfully" });
  } catch (error) {
    return new NextResponse('Error updating homepage content', { status: 500 });
  }
}

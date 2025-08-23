
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { SiteSettings } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'data', 'site-settings.json');

async function readData(): Promise<SiteSettings> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Could not read site settings data", error);
    // Return a default structure if the file doesn't exist or is empty
    return { logoUrl: "" };
  }
}

async function writeData(data: SiteSettings): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data);
  } catch (error) {
      return new NextResponse('Error fetching site settings', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const updatedData: SiteSettings = await request.json();
    await writeData(updatedData);
    return NextResponse.json({ message: "Site settings updated successfully" });
  } catch (error) {
    return new NextResponse('Error updating site settings', { status: 500 });
  }
}

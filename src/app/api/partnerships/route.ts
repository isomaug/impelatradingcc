
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { Partner } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'data', 'partners.json');

async function readData(): Promise<Partner[]> {
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

async function writeData(data: Partner[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const partners = await readData();
  return NextResponse.json(partners);
}

export async function POST(request: Request) {
  const newPartnerData: Omit<Partner, 'id'> = await request.json();
  const partners = await readData();
  const newPartner: Partner = {
    id: (partners.length > 0 ? Math.max(...partners.map(p => parseInt(p.id))) + 1 : 1).toString(),
    ...newPartnerData,
  };
  partners.push(newPartner);
  await writeData(partners);
  return new NextResponse(JSON.stringify(newPartner), { status: 201, headers: { 'Content-Type': 'application/json' } });
}

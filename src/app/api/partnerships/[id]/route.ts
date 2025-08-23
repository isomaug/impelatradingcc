
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const partners = await readData();
  const partner = partners.find(p => p.id === params.id);
  if (partner) {
    return NextResponse.json(partner);
  }
  return new NextResponse('Partner not found', { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updatedPartnerData: Omit<Partner, 'id'> = await request.json();
  let partners = await readData();
  const partnerIndex = partners.findIndex(p => p.id === params.id);

  if (partnerIndex > -1) {
    partners[partnerIndex] = { ...partners[partnerIndex], ...updatedPartnerData };
    await writeData(partners);
    return NextResponse.json(partners[partnerIndex]);
  }
  return new NextResponse('Partner not found', { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  let partners = await readData();
  const filteredPartners = partners.filter(p => p.id !== params.id);

  if (partners.length === filteredPartners.length) {
    return new NextResponse('Partner not found', { status: 404 });
  }

  await writeData(filteredPartners);
  return new NextResponse(null, { status: 204 }); // No Content
}

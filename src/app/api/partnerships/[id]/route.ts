
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { Partner } from '@/lib/types';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

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
  try {
    const docRef = doc(db, "partners", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ id: docSnap.id, ...docSnap.data() } as Partner);
    } else {
      return new NextResponse('Partner not found', { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching partner from Firestore:", error);
    return new NextResponse('Error fetching partner data', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedPartnerData: Omit<Partner, 'id'> = await request.json();
    const docRef = doc(db, "partners", params.id);
    await updateDoc(docRef, updatedPartnerData);
    
    // Also update the local JSON file for consistency
    let partners = await readData();
    const partnerIndex = partners.findIndex(p => p.id === params.id);
    if (partnerIndex > -1) {
        partners[partnerIndex] = { id: params.id, ...updatedPartnerData };
        await writeData(partners);
    }
    
    return NextResponse.json({ id: params.id, ...updatedPartnerData });
  } catch (error) {
    console.error(`Could not update partner ${params.id} in Firestore`, error);
    return new NextResponse('Error updating partner', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = doc(db, "partners", params.id);
    await deleteDoc(docRef);
    
    // Also delete from the local JSON file
    let partners = await readData();
    const filteredPartners = partners.filter(p => p.id !== params.id);
    await writeData(filteredPartners);

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(`Could not delete partner ${params.id} from Firestore`, error);
    return new NextResponse('Error deleting partner', { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { Partner } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

const dataFilePath = path.join(process.cwd(), 'data', 'partners.json');

async function writeData(data: Partner[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "partners"));
    const partners: Partner[] = [];
    querySnapshot.forEach((doc) => {
      partners.push({ id: doc.id, ...doc.data() } as Partner);
    });
    return NextResponse.json(partners);
  } catch (error) {
    console.error("Error fetching partners from Firestore:", error);
    return new NextResponse('Error fetching partners', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newPartnerData: Omit<Partner, 'id'> = await request.json();
    const partners = (await getDocs(collection(db, "partners"))).docs.map(doc => ({ id: doc.id, ...doc.data() } as Partner));
    
    const newId = (partners.length > 0 ? Math.max(...partners.map(p => parseInt(p.id))) + 1 : 1).toString();
    
    const newPartner: Partner = {
      id: newId,
      ...newPartnerData,
    };
    
    await setDoc(doc(db, "partners", newId), newPartner);
    
    // Also update the local JSON file for consistency
    const updatedPartners = [...partners, newPartner];
    await writeData(updatedPartners);

    return new NextResponse(JSON.stringify(newPartner), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch(e) {
    console.error('Could not add partner', e);
    return new NextResponse('Error creating partner', { status: 500 });
  }
}

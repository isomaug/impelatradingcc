
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { TeamMember } from '@/lib/types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = doc(db, "team", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ id: docSnap.id, ...docSnap.data() } as TeamMember);
    } else {
      return new NextResponse('Team member not found', { status: 404 });
    }
  } catch (error) {
    console.error(`Error fetching team member ${params.id}: `, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedMemberData: Omit<TeamMember, 'id'> = await request.json();
    const docRef = doc(db, "team", params.id);
    await updateDoc(docRef, updatedMemberData);
    const updatedDoc = await getDoc(docRef);
    return NextResponse.json({ id: updatedDoc.id, ...updatedDoc.data() });
  } catch (error) {
    console.error(`Error updating team member ${params.id}: `, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = doc(db, "team", params.id);
    await deleteDoc(docRef);
    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(`Error deleting team member ${params.id}: `, error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

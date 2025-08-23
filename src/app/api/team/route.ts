
import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import type { TeamMember } from '@/lib/types';

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "team"));
    const teamMembers = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as TeamMember[];
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members: ", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newMemberData: Omit<TeamMember, 'id'> = await request.json();
    const docRef = await addDoc(collection(db, "team"), newMemberData);
    return new NextResponse(JSON.stringify({ id: docRef.id, ...newMemberData }), { 
      status: 201, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("Error creating team member: ", error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

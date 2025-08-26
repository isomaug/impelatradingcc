
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { TeamMember } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';

const dataFilePath = path.join(process.cwd(), 'data', 'team.json');

async function writeData(data: TeamMember[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}


export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "team"));
    const teamMembers: TeamMember[] = [];
    querySnapshot.forEach((doc) => {
        teamMembers.push({ id: doc.id, ...doc.data() } as TeamMember);
    });
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members from Firestore:", error);
    return new NextResponse('Error fetching team members', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newMemberData: Omit<TeamMember, 'id'> = await request.json();
    const teamMembers = (await getDocs(collection(db, "team"))).docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
    
    const newId = (teamMembers.length > 0 ? Math.max(...teamMembers.map(p => parseInt(p.id))) + 1 : 1).toString();
    
    const newMember: TeamMember = {
      id: newId,
      ...newMemberData,
    };
    
    await setDoc(doc(db, "team", newId), newMember);
    
    // Also update the local JSON file for consistency
    const updatedTeamMembers = [...teamMembers, newMember];
    await writeData(updatedTeamMembers);

    return new NextResponse(JSON.stringify(newMember), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch(e) {
      console.error('Could not add team member', e);
      return new NextResponse('Error creating team member', { status: 500 });
  }
}

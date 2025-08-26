
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { TeamMember } from '@/lib/types';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';


const dataFilePath = path.join(process.cwd(), 'data', 'team.json');

async function readData(): Promise<TeamMember[]> {
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

async function writeData(data: TeamMember[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

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
    console.error("Error fetching team member from Firestore:", error);
    return new NextResponse('Error fetching team member data', { status: 500 });
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

        // Also update the local JSON file for consistency
        let members = await readData();
        const memberIndex = members.findIndex(p => p.id === params.id);
        if (memberIndex > -1) {
            members[memberIndex] = { id: params.id, ...updatedMemberData };
            await writeData(members);
        }

        return NextResponse.json({ id: params.id, ...updatedMemberData });
    } catch (error) {
        console.error(`Could not update team member ${params.id} in Firestore`, error);
        return new NextResponse('Error updating team member', { status: 500 });
    }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
    try {
        const docRef = doc(db, "team", params.id);
        await deleteDoc(docRef);

        // Also delete from the local JSON file
        let members = await readData();
        const filteredMembers = members.filter(p => p.id !== params.id);
        await writeData(filteredMembers);
        
        return new NextResponse(null, { status: 204 }); // No Content
    } catch (error) {
        console.error(`Could not delete team member ${params.id} from Firestore`, error);
        return new NextResponse('Error deleting team member', { status: 500 });
    }
}

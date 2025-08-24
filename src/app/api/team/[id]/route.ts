
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
  const members = await readData();
  const member = members.find(p => p.id === params.id);
  if (member) {
    return NextResponse.json(member);
  }
  return new NextResponse('Team member not found', { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updatedMemberData: Omit<TeamMember, 'id'> = await request.json();
  let members = await readData();
  const memberIndex = members.findIndex(p => p.id === params.id);

  if (memberIndex > -1) {
    try {
        const docRef = doc(db, "team", params.id);
        await updateDoc(docRef, updatedMemberData);
    } catch(e) {
        console.error(`Could not update team member ${params.id} in firestore`, e);
    }
    members[memberIndex] = { ...members[memberIndex], ...updatedMemberData };
    await writeData(members);
    return NextResponse.json(members[memberIndex]);
  }
  return new NextResponse('Team member not found', { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  let members = await readData();
  const filteredMembers = members.filter(p => p.id !== params.id);

  if (members.length === filteredMembers.length) {
    return new NextResponse('Team member not found', { status: 404 });
  }

  try {
      const docRef = doc(db, "team", params.id);
      await deleteDoc(docRef);
  } catch(e) {
      console.error(`Could not delete team member ${params.id} from firestore`, e);
  }

  await writeData(filteredMembers);
  return new NextResponse(null, { status: 204 }); // No Content
}


import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { TeamMember } from '@/lib/types';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

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

export async function GET() {
  const teamMembers = await readData();
  return NextResponse.json(teamMembers);
}

export async function POST(request: Request) {
  const newMemberData: Omit<TeamMember, 'id'> = await request.json();
  const teamMembers = await readData();
  
  const newId = (teamMembers.length > 0 ? Math.max(...teamMembers.map(p => parseInt(p.id))) + 1 : 1).toString();

  const newMember: TeamMember = {
    id: newId,
    ...newMemberData,
  };

  try {
      // Use setDoc with a specific ID to ensure consistency
      await setDoc(doc(db, "team", newId), newMemberData);
  } catch(e) {
      console.error('Could not add team member to firestore', e);
  }

  teamMembers.push(newMember);
  await writeData(teamMembers);
  return new NextResponse(JSON.stringify(newMember), { status: 201, headers: { 'Content-Type': 'application/json' } });
}


import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { TeamMember } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'data', 'team.json');

async function readData(): Promise<TeamMember[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist, return an empty array
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
  const teamMembers = await readData();
  const member = teamMembers.find(m => m.id === params.id);
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
  let teamMembers = await readData();
  const memberIndex = teamMembers.findIndex(m => m.id === params.id);

  if (memberIndex > -1) {
    teamMembers[memberIndex] = { ...teamMembers[memberIndex], ...updatedMemberData };
    await writeData(teamMembers);
    return NextResponse.json(teamMembers[memberIndex]);
  }
  return new NextResponse('Team member not found', { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  let teamMembers = await readData();
  const filteredMembers = teamMembers.filter(m => m.id !== params.id);

  if (teamMembers.length === filteredMembers.length) {
    return new NextResponse('Team member not found', { status: 404 });
  }

  await writeData(filteredMembers);
  return new NextResponse(null, { status: 204 }); // No Content
}

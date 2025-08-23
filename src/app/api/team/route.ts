
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
  const newMember: TeamMember = {
    id: (teamMembers.length > 0 ? Math.max(...teamMembers.map(m => parseInt(m.id))) + 1 : 1).toString(),
    ...newMemberData,
  };
  teamMembers.push(newMember);
  await writeData(teamMembers);
  return new NextResponse(JSON.stringify(newMember), { status: 201, headers: { 'Content-Type': 'application/json' } });
}

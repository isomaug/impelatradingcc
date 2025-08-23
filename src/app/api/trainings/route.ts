
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { Training } from '@/lib/types';

const dataFilePath = path.join(process.cwd(), 'data', 'trainings.json');

async function readData(): Promise<Training[]> {
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

async function writeData(data: Training[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const trainings = await readData();
  return NextResponse.json(trainings);
}

export async function POST(request: Request) {
  const newTrainingData: Omit<Training, 'id'> = await request.json();
  const trainings = await readData();
  const newTraining: Training = {
    id: (trainings.length > 0 ? Math.max(...trainings.map(t => parseInt(t.id))) + 1 : 1).toString(),
    ...newTrainingData,
  };
  trainings.push(newTraining);
  await writeData(trainings);
  return new NextResponse(JSON.stringify(newTraining), { status: 201, headers: { 'Content-Type': 'application/json' } });
}

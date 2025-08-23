
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const trainings = await readData();
  const training = trainings.find(p => p.id === params.id);
  if (training) {
    return NextResponse.json(training);
  }
  return new NextResponse('Training not found', { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const updatedTrainingData: Omit<Training, 'id'> = await request.json();
  let trainings = await readData();
  const trainingIndex = trainings.findIndex(p => p.id === params.id);

  if (trainingIndex > -1) {
    trainings[trainingIndex] = { ...trainings[trainingIndex], ...updatedTrainingData };
    await writeData(trainings);
    return NextResponse.json(trainings[trainingIndex]);
  }
  return new NextResponse('Training not found', { status: 404 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  let trainings = await readData();
  const filteredTrainings = trainings.filter(p => p.id !== params.id);

  if (trainings.length === filteredTrainings.length) {
    return new NextResponse('Training not found', { status: 404 });
  }

  await writeData(filteredTrainings);
  return new NextResponse(null, { status: 204 }); // No Content
}

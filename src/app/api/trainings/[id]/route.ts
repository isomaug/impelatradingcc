
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { Training } from '@/lib/types';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';


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
  try {
    const docRef = doc(db, "trainings", params.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json({ id: docSnap.id, ...docSnap.data() } as Training);
    } else {
      return new NextResponse('Training not found', { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching training from Firestore:", error);
    return new NextResponse('Error fetching training data', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedTrainingData: Omit<Training, 'id'> = await request.json();
    const docRef = doc(db, "trainings", params.id);
    await updateDoc(docRef, updatedTrainingData);
    
    // Also update the local JSON file for consistency
    let trainings = await readData();
    const trainingIndex = trainings.findIndex(p => p.id === params.id);
    if (trainingIndex > -1) {
        trainings[trainingIndex] = { id: params.id, ...updatedTrainingData };
        await writeData(trainings);
    }
    
    return NextResponse.json({ id: params.id, ...updatedTrainingData });
  } catch (error) {
    console.error(`Could not update training ${params.id} in Firestore`, error);
    return new NextResponse('Error updating training', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const docRef = doc(db, "trainings", params.id);
    await deleteDoc(docRef);

    // Also delete from the local JSON file
    let trainings = await readData();
    const filteredTrainings = trainings.filter(p => p.id !== params.id);
    await writeData(filteredTrainings);

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(`Could not delete training ${params.id} from Firestore`, error);
    return new NextResponse('Error deleting training', { status: 500 });
  }
}

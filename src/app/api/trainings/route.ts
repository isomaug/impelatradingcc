
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import type { Training } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';


const dataFilePath = path.join(process.cwd(), 'data', 'trainings.json');

async function writeData(data: Training[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "trainings"));
    const trainings: Training[] = [];
    querySnapshot.forEach((doc) => {
      trainings.push({ id: doc.id, ...doc.data() } as Training);
    });
    return NextResponse.json(trainings);
  } catch (error) {
    console.error("Error fetching trainings from Firestore:", error);
    return new NextResponse('Error fetching trainings', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newTrainingData: Omit<Training, 'id'> = await request.json();
    const trainings = (await getDocs(collection(db, "trainings"))).docs.map(doc => ({ id: doc.id, ...doc.data() } as Training));
    
    const newId = (trainings.length > 0 ? Math.max(...trainings.map(t => parseInt(t.id))) + 1 : 1).toString();
    
    const newTraining: Training = {
      id: newId,
      ...newTrainingData,
    };
    
    await setDoc(doc(db, "trainings", newId), newTraining);
    
    // Also update the local JSON file for consistency
    const updatedTrainings = [...trainings, newTraining];
    await writeData(updatedTrainings);
    
    return new NextResponse(JSON.stringify(newTraining), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch(e) {
    console.error('Could not add training', e);
    return new NextResponse('Error creating training', { status: 500 });
  }
}

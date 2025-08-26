
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Training } from "@/lib/types";
import { unstable_noStore as noStore } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

async function getTrainings(): Promise<Training[]> {
  noStore();
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'trainings.json');
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
     console.error("Error reading trainings data:", error);
    return [];
  }
}

export default async function TrainingsPage() {
  const trainings = await getTrainings();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Artisan Training Programs
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We offer comprehensive training programs designed to equip artisans with the skills and knowledge for professional success.
        </p>
      </div>

      <div className="space-y-16">
        {trainings.map((program, index) => (
          <Card key={index} className="overflow-hidden grid md:grid-cols-2 items-center">
            <div className="order-2 md:order-1 p-8">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="font-headline text-2xl">{program.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-6">{program.description}</p>
                <ul className="space-y-3">
                  {program.modules.map((mod, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
             <div className="order-1 md:order-2 h-full">
               <Image
                src={program.image}
                alt={program.title}
                width={600}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint={program.imageHint}
              />
            </div>
          </Card>
        ))}
      </div>

       <div className="bg-primary/10 p-8 md:p-12 rounded-lg text-center mt-20">
        <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">Interested in our Programs?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Contact us to learn more about our training schedules, enrollment process, and partnership opportunities for new programs.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>

    </div>
  );
}

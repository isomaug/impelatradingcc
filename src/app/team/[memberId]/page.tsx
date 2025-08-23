
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { TeamMember, TeamCV } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Linkedin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

async function getMember(id: string): Promise<TeamMember | undefined> {
  // In a real app, you'd fetch this from your API
  // For this prototype, we read from the local JSON file.
  const fs = require('fs/promises');
  const path = require('path');
  const dataFilePath = path.join(process.cwd(), 'data', 'team.json');
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    const team: TeamMember[] = JSON.parse(fileContent);
    return team.find((m) => m.id === id);
  } catch (error) {
    console.error("Could not read team data", error);
    return undefined;
  }
}

export default async function TeamMemberPage({ params }: TeamCV) {
  const member = await getMember(params.memberId);

  if (!member) {
    notFound();
  }

  return (
    <div className="bg-background/70">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                 <Button variant="ghost" asChild>
                    <Link href="/team" className="text-muted-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Team
                    </Link>
                </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <Image
                src={member.image}
                alt={`Portrait of ${member.name}`}
                width={500}
                height={500}
                className="rounded-lg shadow-2xl w-full object-cover aspect-square"
                data-ai-hint={member.imageHint}
              />
            </div>
            <div className="md:col-span-2">
              <h1 className="text-4xl md:text-5xl font-headline font-bold">{member.name}</h1>
              <p className="text-2xl font-semibold text-primary mt-2">{member.title}</p>
              <Link href={member.linkedin} passHref target="_blank" className="mt-4 inline-block">
                <Button variant="outline">
                  <Linkedin className="mr-2 h-5 w-5" />
                  View LinkedIn Profile
                </Button>
              </Link>
              <div className="prose prose-lg max-w-none mt-8 text-foreground/80">
                <p>{member.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

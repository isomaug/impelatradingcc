
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { TeamMember, TeamCV } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Linkedin, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

async function getTeamMembers(): Promise<TeamMember[]> {
  noStore();
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'team.json');
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Could not read team data", error);
    return [];
  }
}

async function getMember(id: string): Promise<TeamMember | undefined> {
  noStore();
  // In a real app, this would fetch from a database or CMS
  const allMembers: TeamMember[] = await getTeamMembers();
  return allMembers.find((m) => m.id === id);
}

export default async function TeamMemberPage({ params }: TeamCV) {
  const member = await getMember(params.memberId);

  if (!member) {
    notFound();
  }

  const bioParagraphs = member.bio.split('\n').filter(p => p.trim() !== '');

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
              <h1 className="text-3xl md:text-4xl font-headline font-bold">{member.name}</h1>
              <p className="text-xl text-primary mt-1">{member.title}</p>
              <Link href={member.linkedin} passHref target="_blank" className="mt-4 inline-block">
                <Button variant="outline">
                  <Linkedin className="mr-2 h-5 w-5" />
                  View LinkedIn Profile
                </Button>
              </Link>
              <div className="prose prose-lg max-w-none mt-6 text-foreground/80">
                 {bioParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

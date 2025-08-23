
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/lib/types";
import { unstable_noStore as noStore } from 'next/cache';

async function getTeamMembers() {
  noStore();
  // In a real app, you'd fetch this from your database.
  // We'll use the API route we created.
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/team`, { cache: 'no-store' });

    if (!response.ok) {
        console.error("Failed to fetch team members:", response.status, response.statusText);
        const text = await response.text();
        console.error("Response body:", text);
        return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export default async function TeamPage() {
  const teamMembers: TeamMember[] = await getTeamMembers();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Meet Our Team
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We are a dedicated group of professionals, artisans, and community leaders passionate about making a difference through craftsmanship.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <Card key={member.id} className="text-center flex flex-col">
            <CardHeader className="p-0">
               <Image
                src={member.image}
                alt={`Portrait of ${member.name}`}
                width={400}
                height={400}
                className="w-full h-auto object-cover rounded-t-lg"
                data-ai-hint={member.imageHint}
              />
            </CardHeader>
            <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="font-headline text-xl mb-1">{member.name}</CardTitle>
                <p className="text-primary font-semibold mb-3">{member.title}</p>
                <CardDescription className="text-sm flex-grow">{member.bio}</CardDescription>
                <Link href={member.linkedin} passHref target="_blank" className="mt-4 self-center">
                   <Button variant="ghost" size="icon">
                     <Linkedin className="h-5 w-5" />
                     <span className="sr-only">LinkedIn Profile</span>
                   </Button>
                </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

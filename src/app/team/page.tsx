
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Linkedin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { TeamMember } from "@/lib/types";

async function getTeamMembers(): Promise<TeamMember[]> {
    const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:9002';
  try {
    const response = await fetch(`${baseUrl}/api/team`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error("Failed to fetch team");
    }
    return await response.json();
  } catch (error) {
     console.error("Error reading team data:", error);
    return [];
  }
}

export default async function TeamPage() {
  const teamMembers: TeamMember[] = await getTeamMembers();
  const [leader, ...otherMembers] = teamMembers;

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

      {leader && (
        <section className="mb-20">
            <Card className="grid md:grid-cols-2 overflow-hidden bg-card/60 backdrop-blur-md border-white/10 shadow-2xl">
                <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                     <CardHeader className="p-0">
                        <CardTitle className="font-headline text-2xl">{leader.name}</CardTitle>
                        <p className="text-primary text-lg font-semibold mt-1">{leader.title}</p>
                     </CardHeader>
                     <CardContent className="p-0 mt-4">
                        <CardDescription className="text-base line-clamp-4">
                            {leader.bio}
                        </CardDescription>
                         <div className="flex items-center gap-4 mt-6">
                             <Button asChild>
                                <Link href={`/team/${leader.id}`}>View Full Bio <ArrowRight className="ml-2"/></Link>
                             </Button>
                             <Link href={leader.linkedin} passHref target="_blank">
                                <Button variant="ghost" size="icon">
                                    <Linkedin className="h-6 w-6" />
                                    <span className="sr-only">LinkedIn Profile</span>
                                </Button>
                             </Link>
                         </div>
                     </CardContent>
                </div>
                <div className="order-1 md:order-2">
                    <Image
                        src={leader.image}
                        alt={`Portrait of ${leader.name}`}
                        width={600}
                        height={600}
                        className="w-full h-full object-cover object-top"
                        data-ai-hint={leader.imageHint}
                    />
                </div>
            </Card>
        </section>
      )}

      {otherMembers.length > 0 && (
         <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherMembers.map((member) => (
              <Card key={member.id} className="text-center flex flex-col bg-card/60 backdrop-blur-sm border-white/10 shadow-xl overflow-hidden h-full">
                <CardHeader className="p-0">
                   <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    width={400}
                    height={400}
                    className="w-full h-56 object-cover"
                    data-ai-hint={member.imageHint}
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                    <CardTitle className="font-headline text-xl mb-1">{member.name}</CardTitle>
                    <p className="text-primary font-semibold text-base mb-3">{member.title}</p>
                    <CardDescription className="text-sm flex-grow line-clamp-3">{member.bio}</CardDescription>
                    <div className="mt-4 flex justify-center items-center gap-2">
                        <Button asChild variant="outline" size="sm">
                            <Link href={`/team/${member.id}`}>View Bio</Link>
                        </Button>
                        <Link href={member.linkedin} passHref target="_blank" className="self-center">
                           <Button variant="ghost" size="icon">
                             <Linkedin className="h-5 w-5" />
                             <span className="sr-only">LinkedIn Profile</span>
                           </Button>
                        </Link>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
         </section>
      )}
    </div>
  );
}

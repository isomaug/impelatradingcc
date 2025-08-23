
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Nolwazi Khumalo",
    title: "Founder & CEO",
    bio: "Nolwazi is the visionary behind Impela, driven by a passion for social entrepreneurship and sustainable development.",
    image: "https://placehold.co/400x400.png",
    imageHint: "professional african woman",
    linkedin: "#",
  },
  {
    name: "Sipho Mbele",
    title: "Head of Operations",
    bio: "Sipho ensures that our training programs and production lines run smoothly, empowering our artisans every day.",
    image: "https://placehold.co/400x400.png",
    imageHint: "professional african man",
    linkedin: "#",
  },
  {
    name: "Thandiwe Ndlovu",
    title: "Lead Designer",
    bio: "Thandiwe blends traditional techniques with contemporary aesthetics to create our signature product lines.",
    image: "https://placehold.co/400x400.png",
    imageHint: "creative designer working",
    linkedin: "#",
  },
  {
    name: "Bongani Dlamini",
    title: "Partnerships Manager",
    bio: "Bongani builds and maintains our crucial relationships with NGOs and international market partners.",
    image: "https://placehold.co/400x400.png",
    imageHint: "man shaking hands",
    linkedin: "#",
  },
];


export default function TeamPage() {
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
        {teamMembers.map((member, index) => (
          <Card key={index} className="text-center flex flex-col">
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

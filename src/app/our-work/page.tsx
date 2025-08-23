
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { Partner } from "@/lib/types";
import { unstable_noStore as noStore } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

async function getPartners(): Promise<Partner[]> {
  noStore();
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'partners.json');
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading partners data:", error);
    return [];
  }
}

export default async function OurWorkPage() {
  const partners = await getPartners();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">
          Our Work: Partnerships & Global Reach
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Collaboration is at the heart of our impact. We partner with leading organizations and feature our artisans' work on the world stage.
        </p>
      </div>
      
      {/* Partners Section */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-headline font-bold mb-8 text-center">Our Valued Partners</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partners.map(partner => (
                 <Card key={partner.id} className="overflow-hidden">
                    <Image
                        src={partner.image}
                        alt={partner.name}
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover"
                        data-ai-hint={partner.imageHint}
                    />
                    <CardHeader>
                        <CardTitle className="text-xl">{partner.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{partner.description}</p>
                    </CardContent>
                 </Card>
            ))}
        </div>
      </section>

      
      <div className="bg-card/50 p-8 md:p-12 rounded-lg text-center">
        <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">Become a Partner</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          We are always looking for new partners to expand our impact. If your organization shares our values, we would love to hear from you.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
}

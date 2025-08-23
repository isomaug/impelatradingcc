
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Handshake, Landmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PartnershipsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Our Work: Partnerships & Global Reach
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Collaboration is at the heart of our impact. We partner with leading organizations and feature our artisans' work on the world stage.
        </p>
      </div>

      {/* NGO Partnerships Section */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="Team collaborating with NGO partners"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="diverse group meeting"
            />
          </div>
          <div className="text-left">
            <Handshake className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-3xl font-headline font-bold mb-4">NGO Collaborations</h2>
            <p className="text-muted-foreground mb-4">
              We build strong, lasting relationships with non-governmental organizations that share our vision for community empowerment. These partnerships are crucial for creating ethical supply chains, ensuring fair wages, and implementing community development projects.
            </p>
            <p className="text-muted-foreground">
              Our joint initiatives focus on education, healthcare, and environmental sustainability, creating a holistic support system for the communities we serve.
            </p>
          </div>
        </div>
      </section>

      {/* International Markets Section */}
      <section className="mb-20">
         <div className="grid md:grid-cols-2 gap-12 items-center">
           <div className="text-left order-2 md:order-1">
             <Globe className="w-12 h-12 text-primary mb-4" />
             <h2 className="text-3xl font-headline font-bold mb-4">International Markets</h2>
             <p className="text-muted-foreground mb-4">
               Impela Trading CC proudly showcases South African craftsmanship in international markets. By participating in global trade shows and leveraging online platforms, we connect our artisans with a worldwide customer base.
             </p>
             <p className="text-muted-foreground">
               This global exposure not only provides a vital source of income for our artisans but also fosters cross-cultural appreciation and promotes the rich heritage of South African craft.
             </p>
           </div>
           <div className="order-1 md:order-2">
             <Image
              src="https://placehold.co/600x400.png"
              alt="Product displayed at an international trade show"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="market stall product"
            />
          </div>
        </div>
      </section>
      
      <div className="bg-card/50 p-8 md:p-12 rounded-lg text-center">
        <h2 className="text-3xl font-headline font-bold mb-4">Become a Partner</h2>
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

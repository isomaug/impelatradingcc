
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          About Impela Trading CC
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We are a South African company dedicated to creating positive social and economic change through the celebration of traditional craftsmanship.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            Our mission is to empower local artisans by providing them with the skills, resources, and market access needed to thrive. We believe in sustainable practices that honor both our people and our planet. By blending traditional techniques with contemporary design, we create high-quality products that tell a story of heritage and hope.
          </p>
          <h2 className="text-2xl md:text-3xl font-headline font-bold mt-8 mb-4">Our Vision</h2>
          <p className="text-muted-foreground">
            We envision a future where South African craftsmanship is celebrated globally, creating a ripple effect of prosperity and pride in our communities. We strive to be a leading example of a social enterprise that successfully balances purpose and profit.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <Image
            src="https://placehold.co/800x600.png"
            alt="Impela Trading CC Team"
            width={800}
            height={600}
            className="rounded-lg shadow-2xl"
            data-ai-hint="diverse team smiling"
          />
        </div>
      </div>
      
      <div className="bg-card/50 p-8 md:p-12 rounded-lg text-center">
        <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">Join Our Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Whether you are a customer, a potential partner, or an aspiring artisan, there are many ways to get involved with our work.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/shop">Shop Our Products</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/partnerships">Partner With Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

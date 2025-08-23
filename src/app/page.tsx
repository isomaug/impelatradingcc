
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Users, Globe, Handshake, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/types";
import { unstable_noStore as noStore } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

async function getProducts(): Promise<Product[]> {
  noStore();
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading products data:", error);
    // In case of an error (e.g., file not found), return an empty array
    return [];
  }
}


export default async function Home() {
  const products: Product[] = await getProducts();
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-cover bg-center text-white flex items-center justify-center">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="South African landscape"
          fill
          objectFit="cover"
          className="z-0"
          data-ai-hint="south african landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 drop-shadow-lg">Impela Trading CC</h1>
          <p className="text-lg md:text-2xl font-body max-w-3xl mx-auto drop-shadow-md">
            Empowering communities through artisan skills, sustainable partnerships, and global outreach.
          </p>
           <Button asChild size="lg" className="mt-8">
              <Link href="/about">Discover Our Story</Link>
            </Button>
        </div>
      </section>

      {/* About Section */}
       <section className="py-16 md:py-24 bg-background/70">
        <div className="container mx-auto px-4">
           <Card className="overflow-hidden lg:grid lg:grid-cols-2 lg:items-center bg-card shadow-2xl">
              <div className="p-10 md:p-16">
                 <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Rooted in South Africa, Reaching the World</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Impela Trading CC is more than just a brand; we are a movement born from the heart of South Africa. Our mission is to provide high-quality, handcrafted goods while fostering economic empowerment and sustainable practices within our communities.
                </p>
                <Button asChild variant="link" className="p-0 h-auto text-base">
                  <Link href="/about">Learn More About Us <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
               <div className="h-64 sm:h-96 lg:h-full">
                 <Image
                    src="https://placehold.co/800x600.png"
                    alt="South African artisans at work"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    data-ai-hint="african artisans craft"
                  />
               </div>
           </Card>
        </div>
      </section>

      {/* What We Do Section */}
       <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">Our Core Activities</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            We are dedicated to creating lasting impact through a multi-faceted approach that combines skill development, global market access, and strategic partnerships.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Activity Card 1 */}
            <div className="group relative p-8 flex flex-col items-start text-left bg-card/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 hover:border-primary/30">
              <div className="relative z-10 w-full">
                <div className="relative inline-block mb-6">
                    <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full shadow-lg">
                        <Users className="w-10 h-10 text-primary drop-shadow-lg" />
                    </div>
                </div>
                <h3 className="text-2xl font-headline font-semibold mb-2">Artisan Training</h3>
                <p className="text-muted-foreground flex-grow mb-6">We provide comprehensive training programs, empowering local artisans with the skills to create world-class products.</p>
                <Button asChild variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 hover:text-foreground">
                    <Link href="/trainings">Learn About Training</Link>
                </Button>
              </div>
            </div>

            {/* Activity Card 2 */}
            <div className="group relative p-8 flex flex-col items-start text-left bg-card/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 hover:border-primary/30">
              <div className="relative z-10 w-full">
                 <div className="relative inline-block mb-6">
                    <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full shadow-lg">
                        <Globe className="w-10 h-10 text-primary drop-shadow-lg" />
                    </div>
                </div>
                <h3 className="text-2xl font-headline font-semibold mb-2">International Markets</h3>
                <p className="text-muted-foreground flex-grow mb-6">Our work features on the global stage, connecting South African craftsmanship with international audiences.</p>
                <Button asChild variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 hover:text-foreground">
                    <Link href="/partnerships">Explore Our Reach</Link>
                </Button>
              </div>
            </div>

            {/* Activity Card 3 */}
            <div className="group relative p-8 flex flex-col items-start text-left bg-card/50 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 hover:border-primary/30">
              <div className="relative z-10 w-full">
                <div className="relative inline-block mb-6">
                    <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full shadow-lg">
                        <Handshake className="w-10 h-10 text-primary drop-shadow-lg" />
                    </div>
                </div>
                <h3 className="text-2xl font-headline font-semibold mb-2">NGO Partnerships</h3>
                <p className="text-muted-foreground flex-grow mb-6">We collaborate with non-governmental organizations to create sustainable supply chains and community-focused initiatives.</p>
                <Button asChild variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 hover:text-foreground">
                    <Link href="/partnerships">See Our Partners</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">From Our Workshop</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.slice(0, 6).map((product) => (
                <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                   <div className="p-1">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-14 backdrop-blur-sm bg-background/50 hover:bg-background/80" />
            <CarouselNext className="mr-14 backdrop-blur-sm bg-background/50 hover:bg-background/80" />
          </Carousel>
           <div className="text-center mt-12">
             <Button asChild size="lg">
                <Link href="/shop">Explore All Products</Link>
             </Button>
           </div>
        </div>
      </section>
    </div>
  );
}

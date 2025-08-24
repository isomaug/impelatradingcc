
"use client";

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
import type { Product, HomePageContent } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Autoplay from "embla-carousel-autoplay";


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [content, setContent] = useState<HomePageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, contentRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/homepage'),
        ]);
        if (!productsRes.ok || !contentRes.ok) {
          throw new Error('Failed to fetch data');
        }
        const productsData = await productsRes.json();
        const contentData = await contentRes.json();
        setProducts(productsData);
        setContent(contentData);
      } catch (error) {
        console.error("Error fetching page data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading || !content) {
    return (
      <div className="flex flex-col gap-8 md:gap-16">
        <Skeleton className="h-[70vh] w-full" />
        <div className="container mx-auto px-4">
            <Skeleton className="h-64 w-full" />
        </div>
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
      </div>
    );
  }

  const { hero, about, coreActivities } = content;
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full">
         <Carousel
          className="w-full h-full"
          plugins={[Autoplay({ delay: hero.autoplayDelay, stopOnInteraction: true })]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {hero.imageUrls.map((url, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[70vh]">
                  <Image
                    src={url}
                    alt={`${hero.imageAlt} ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    data-ai-hint="south african landscape"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        <div className="absolute inset-0 z-10 text-center px-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-4 text-white drop-shadow-lg">{hero.headline}</h1>
          <p className="text-lg md:text-xl font-body max-w-3xl mx-auto text-white drop-shadow-md">
            {hero.subheadline}
          </p>
           <Button asChild size="lg" className="mt-8">
              <Link href={hero.buttonLink}>{hero.buttonText}</Link>
            </Button>
        </div>
      </section>

      {/* What We Do Section */}
       <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2">{coreActivities.headline}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            {coreActivities.description}
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
                <h3 className="text-xl font-headline font-semibold mb-2">{coreActivities.cards.artisanTraining.title}</h3>
                <p className="text-muted-foreground flex-grow mb-6">{coreActivities.cards.artisanTraining.description}</p>
                <Button asChild variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 hover:text-foreground">
                    <Link href={coreActivities.cards.artisanTraining.linkUrl}>{coreActivities.cards.artisanTraining.linkText}</Link>
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
                <h3 className="text-xl font-headline font-semibold mb-2">{coreActivities.cards.internationalMarkets.title}</h3>
                <p className="text-muted-foreground flex-grow mb-6">{coreActivities.cards.internationalMarkets.description}</p>
                <Button asChild variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 hover:text-foreground">
                    <Link href={coreActivities.cards.internationalMarkets.linkUrl}>{coreActivities.cards.internationalMarkets.linkText}</Link>
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
                <h3 className="text-xl font-headline font-semibold mb-2">{coreActivities.cards.ngoPartnerships.title}</h3>
                <p className="text-muted-foreground flex-grow mb-6">{coreActivities.cards.ngoPartnerships.description}</p>
                <Button asChild variant="outline" className="bg-transparent border-white/20 hover:bg-white/10 hover:text-foreground">
                    <Link href={coreActivities.cards.ngoPartnerships.linkUrl}>{coreActivities.cards.ngoPartnerships.linkText}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
       <section className="py-16 md:py-24 bg-background/70">
        <div className="container mx-auto px-4">
           <Card className="overflow-hidden lg:grid lg:grid-cols-2 lg:items-center bg-card shadow-2xl">
              <div className="p-10 md:p-16">
                 <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">{about.headline}</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {about.description}
                </p>
                <Button asChild variant="link" className="p-0 h-auto text-base">
                  <Link href={about.linkUrl}>{about.linkText} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
               <div className="h-64 sm:h-96 lg:h-full">
                 <Image
                    src={about.imageUrl}
                    alt={about.imageAlt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                    data-ai-hint="african artisans craft"
                  />
               </div>
           </Card>
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
                   <div className="p-1 h-full">
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

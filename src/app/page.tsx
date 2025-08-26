
"use client";

import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Users, Globe, Handshake, ArrowRight, Plane } from "lucide-react";
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
      <div className="flex flex-col gap-8 md:gap-12">
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
  
  const WorldGlobe = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      className="w-full h-full text-amber-400 opacity-20 animate-spin-slow"
      fill="currentColor"
    >
      <path d="M500 0C223.9 0 0 223.9 0 500s223.9 500 500 500 500-223.9 500-500S776.1 0 500 0zM451.9 865.1C223.3 843.4 46.8 667 25.1 438.4l115.3 43.2c16.1 160.7 137.9 282.5 298.6 298.6l12.9 115.3-12.9-30.4zM865.1 548.1c-21.7 228.7-198.2 405.2-426.8 426.8l-12.9-115.3C606 843.5 727.8 721.7 743.9 541.1l121.2 7zM974.9 438.4C953.2 667 776.7 843.4 548.1 865.1l-12.9-115.3c177-16.1 306.3-138.8 322.4-322.4l117.3 11.0z"></path>
      <path d="M523.5 125.1c-59.5-3.3-118 10.9-170.8 40.5-35.3 19.9-66 45.4-92 75.8-21.7 25.3-39 53.6-51.5 84-2.5 5.7-4.8 11.5-6.9 17.5-12.8 35.8-19.1 73.2-18.8 110.8 0.7 54.3 13.9 108.1 38.6 156.9 23.3 46 56.6 85.5 98.4 116.2 38.8 28.5 83.9 46.9 131.7 54.2 48.7 7.5 98.7 3.5 146.4-11.2 47.9-14.7 92.2-40 131.2-74.8 39-34.8 71.3-78.5 95.1-127.8 23.9-49.3 38.3-103.3 42.1-158.9 3.8-55.6-3.8-111.8-22.1-164.7-18.4-52.9-47.6-101.4-85.8-142.3-38.3-40.8-85.2-73.2-137.9-94.8-31.5-12.9-64.8-21.2-98.8-24.8l-3.3-0.4zM321.4 191.6c-20.9 9.3-40.8 20.8-59.3 34.3-43.1 31.4-74.1 75.8-90.8 126.9-12.3 37.5-17.7 76.9-16.4 116.2 1.4 42.1 10.3 83.5 26.2 122.2 12.3 29.8 28.9 57.5 49.3 82.5 35.8 43.1 82.8 73.8 136.2 89.2 32.5 9.6 66.4 13.6 99.8 12.2 35.8-1.4 71-9.2 104-23.3 27.9-11.9 54.3-28.1 78.4-48.1 43.5-36.2 76.5-84.5 95.8-139.7 19.3-55.2 24.3-114.7 14-173.3-9.9-56.7-34.5-109.8-71.3-154.3-29-35.1-65.1-63.1-105.9-82.2-41-19.2-86.4-28.8-132.4-28.2-49 0.7-97.2 11.2-141.6 30.8-14 6.2-27.5 13.4-40.5 21.4l-1-0.2z"></path>
    </svg>
);


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
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 drop-shadow-lg">{hero.headline}</h1>
          <p className="text-lg font-body max-w-3xl mx-auto drop-shadow-md">
            {hero.subheadline}
          </p>
           <Button asChild size="lg" className="mt-8">
              <Link href={hero.buttonLink}>{hero.buttonText}</Link>
            </Button>
        </div>
      </section>

      {/* What We Do Section */}
       <section className="py-8 md:py-12 bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-headline font-bold mb-2">{coreActivities.headline}</h2>
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
       <section className="py-8 md:py-12 bg-background/70">
        <div className="container mx-auto px-4">
           <Card className="overflow-hidden lg:grid lg:grid-cols-2 lg:items-center bg-card shadow-2xl">
              <div className="p-10 md:p-16">
                 <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">{about.headline}</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {about.description}
                </p>
                <Button asChild variant="link" className="p-0 h-auto text-base">
                  <Link href={about.linkUrl}>{about.linkText} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
               <div className="h-80 lg:h-full flex items-center justify-center bg-primary/5 p-4 relative overflow-hidden">
                <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative">
                    <WorldGlobe />
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Plane className="text-foreground/80 text-4xl plane-path" />
                    </div>
                </div>
               </div>
           </Card>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-8 md:py-12 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-headline font-bold text-center mb-12">From Our Workshop</h2>
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

    

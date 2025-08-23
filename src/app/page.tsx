
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe, Handshake, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: "url('https://placehold.co/1600x900.png')" }} data-ai-hint="south african landscape">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">Impela Trading CC</h1>
          <p className="text-lg md:text-2xl font-body max-w-3xl mx-auto">
            Empowering communities through artisan skills, sustainable partnerships, and global outreach.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Rooted in South Africa, Reaching the World</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Impela Trading CC is more than just a brand; we are a movement born from the heart of South Africa. Our mission is to provide high-quality, handcrafted goods while fostering economic empowerment and sustainable practices within our communities.
            </p>
            <Button asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
          <div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="South African artisans at work"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="african artisans craft"
            />
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-12">Our Core Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-headline font-semibold mb-2">Artisan Training</h3>
              <p className="text-muted-foreground">We provide comprehensive training programs, empowering local artisans with the skills to create world-class products.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <Globe className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-headline font-semibold mb-2">International Markets</h3>
              <p className="text-muted-foreground">Our work features on the global stage, connecting South African craftsmanship with international audiences.</p>
            </div>
            <div className="flex flex-col items-center p-6">
              <Handshake className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-headline font-semibold mb-2">NGO Partnerships</h3>
              <p className="text-muted-foreground">We collaborate with non-governmental organizations to create sustainable supply chains and community-focused initiatives.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">From Our Workshop</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {products.slice(0, 6).map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-14" />
            <CarouselNext className="mr-14" />
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

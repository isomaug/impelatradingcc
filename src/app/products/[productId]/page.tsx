"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import ProductRecommender from "@/components/ai/product-recommender";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = products.find((p) => p.id === params.productId);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Image
                      src={src}
                      alt={`${product.name} - view ${index + 1}`}
                      width={800}
                      height={800}
                      className="w-full h-auto object-cover rounded-lg shadow-lg"
                      data-ai-hint="leather product lifestyle"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-14" />
            <CarouselNext className="mr-14" />
          </Carousel>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-headline font-bold">{product.name}</h1>
          <p className="text-3xl font-semibold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-lg text-muted-foreground">{product.description}</p>
          <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
            Add to Cart
          </Button>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger className="text-lg font-medium">Product Details</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Category: {product.category}</li>
                  <li>Material: Premium Full-Grain Leather</li>
                  <li>Hardware: Solid Brass</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger className="text-lg font-medium">Care Instructions</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{product.careInstructions}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="mt-20">
        <ProductRecommender currentProduct={product} />
      </div>
    </div>
  );
}

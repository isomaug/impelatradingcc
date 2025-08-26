

"use client";

import Image from "next/image";
import { notFound, useParams } from "next/navigation";
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
import { useCurrency } from "@/hooks/use-currency";
import { useToast } from "@/hooks/use-toast";
import ProductRecommender from "@/components/ai/product-recommender";
import React, { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPage() {
  const { addToCart } = useCart();
  const { formatCurrency } = useCurrency();
  const { toast } = useToast();
  const params = useParams();
  const productId = params.productId as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/products/${productId}`);
          if (!response.ok) {
            notFound();
            return;
          }
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Failed to fetch product", error);
          notFound();
        } finally {
          setIsLoading(false);
        }
      };
      fetchProduct();
    }
  }, [productId]);


  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <Skeleton className="w-full h-[500px] rounded-lg" />
                <div className="space-y-6">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-12 w-full md:w-40" />
                </div>
            </div>
        </div>
    );
  }

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!product) return;
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
                  <div className="aspect-square relative">
                    <Image
                      src={src}
                      alt={`${product.name} - view ${index + 1}`}
                      fill
                      className="w-full h-full object-cover rounded-lg shadow-lg"
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
            <div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold">{product.name}</h1>
                <p className="text-2xl font-semibold text-primary mt-2">{formatCurrency(product.price)}</p>
            </div>
            <p className="text-muted-foreground">{product.description}</p>
            <Button size="lg" onClick={handleAddToCart}>
                Add to Cart
            </Button>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details">
                    <AccordionTrigger className="text-lg">Product Details</AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li>Category: {product.category}</li>
                            <li>Material: Premium Full-Grain Leather</li>
                            <li>Hardware: Solid Brass</li>
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="care">
                    <AccordionTrigger className="text-lg">Care Instructions</AccordionTrigger>
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

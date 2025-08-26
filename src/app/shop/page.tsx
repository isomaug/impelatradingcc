
import type { Product } from "@/lib/types";
import React, { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ShopPageClient from "./shop-page-client";
import { Skeleton } from "@/components/ui/skeleton";

async function getAllProducts(): Promise<Product[]> {
    const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:9002';
  try {
    const response = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error reading products data:", error);
    return [];
  }
}

const ShopPageSkeleton = () => (
  <aside className="md:col-span-1">
     <Card>
          <CardHeader>
              <CardTitle className="font-headline text-lg">Filter & Search</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div>
                  <p className="text-sm font-medium mb-2">Category</p>
                  <Skeleton className="h-10 w-full" />
              </div>
              <div>
                  <p className="text-sm font-medium mb-2">Search</p>
                   <Skeleton className="h-10 w-full" />
                   <Skeleton className="h-10 w-full mt-4" />
              </div>
          </CardContent>
     </Card>
  </aside>
);

export default async function ShopPage() {
  const allProducts = await getAllProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
          Our Collection
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Handcrafted with passion and precision, our leather goods are designed to last a lifetime. Each purchase supports our artisans and their communities.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Suspense fallback={<ShopPageSkeleton />}>
          <ShopPageClient allProducts={allProducts} />
        </Suspense>
      </div>
    </div>
  );
}

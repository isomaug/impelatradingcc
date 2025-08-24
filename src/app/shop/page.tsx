

import ProductCard from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type { Product } from "@/lib/types";
import { unstable_noStore as noStore } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

async function getProducts(): Promise<Product[]> {
  noStore();
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading products data:", error);
    return [];
  }
}

export default async function ShopPage() {
  const products: Product[] = await getProducts();
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">
          Our Collection
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Handcrafted with passion and precision, our leather goods are designed to last a lifetime. Each purchase supports our artisans and their communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1">
           <Card>
             <CardHeader>
               <CardTitle className="font-headline text-lg">Categories</CardTitle>
             </CardHeader>
             <CardContent>
               <ul className="space-y-2">
                 <li>
                   <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                     All
                   </Link>
                 </li>
                 {categories.map(category => (
                   <li key={category}>
                     <Link href={`/shop?category=${category}`} className="text-muted-foreground hover:text-primary transition-colors">
                       {category}
                     </Link>
                   </li>
                 ))}
               </ul>
             </CardContent>
           </Card>
           <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="font-headline text-lg">Search</CardTitle>
                </CardHeader>
                <CardContent>
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input id="search" placeholder="e.g. Leather Wallet" className="pl-10" />
                    </div>
                    <Button className="w-full mt-4">Search</Button>
                </CardContent>
           </Card>
        </aside>

        {/* Product Grid */}
        <main className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}


"use client";

import ProductCard from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Check, ChevronsUpDown } from "lucide-react";
import type { Product } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface ShopPageClientProps {
  allProducts: Product[];
}

export default function ShopPageClient({ allProducts }: ShopPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const selectedCategory = searchParams.get('category') || "";
  const searchTerm = searchParams.get('search') || "";

  const categories = [...new Set(allProducts.map((p) => p.category))].map(c => ({value: c.toLowerCase(), label: c}));
  
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory ? product.category.toLowerCase() === selectedCategory.toLowerCase() : true;
    const matchesSearch = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  const handleCategorySelect = (currentValue: string) => {
    const newCategory = currentValue === selectedCategory.toLowerCase() ? "" : currentValue;
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    router.push(`/shop?${params.toString()}`);
    setOpen(false);
  }

  return (
    <>
      <aside className="md:col-span-1">
         <Card>
              <CardHeader>
                  <CardTitle className="font-headline text-lg">Filter & Search</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                   <div>
                      <p className="text-sm font-medium mb-2">Category</p>
                       <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between"
                          >
                            {selectedCategory
                              ? categories.find((category) => category.value === selectedCategory)?.label
                              : "All Categories"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                          <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandList>
                              <CommandEmpty>No category found.</CommandEmpty>
                              <CommandGroup>
                                  <CommandItem
                                      key="all"
                                      value=""
                                      onSelect={() => handleCategorySelect("")}
                                  >
                                      <Check className={cn("mr-2 h-4 w-4", selectedCategory === "" ? "opacity-100" : "opacity-0")} />
                                      All Categories
                                  </CommandItem>
                                {categories.map((category) => (
                                  <CommandItem
                                    key={category.value}
                                    value={category.value}
                                    onSelect={handleCategorySelect}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedCategory === category.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    {category.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                  </div>
                   <form action="/shop" method="GET">
                      <p className="text-sm font-medium mb-2">Search</p>
                      <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input id="search" name="search" placeholder="e.g. Leather Wallet" className="pl-10" defaultValue={searchTerm} />
                      </div>
                      {selectedCategory && <input type="hidden" name="category" value={selectedCategory} />}
                      <Button className="w-full mt-4" type="submit">Search Products</Button>
                  </form>
              </CardContent>
         </Card>
      </aside>

      <main className="md:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
         {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No products found.</p>
          </div>
        )}
      </main>
    </>
  );
}

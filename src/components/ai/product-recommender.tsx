"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productRecommendation } from "@/ai/flows/product-recommendation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/lib/types";
import { Loader2, Wand2 } from "lucide-react";
import ProductCard from "../product-card";
import { products } from "@/lib/data";

const FormSchema = z.object({
  interests: z.string().min(10, "Please describe your interests in a bit more detail."),
});

interface ProductRecommenderProps {
  currentProduct: Product;
}

export default function ProductRecommender({ currentProduct }: ProductRecommenderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      interests: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setRecommendations([]);
    try {
      const result = await productRecommendation({
        interests: data.interests,
        browsingHistory: `Currently viewing: ${currentProduct.name}`,
      });
      
      const recommendedProducts = products.filter(p => result.recommendedProducts.includes(p.name) && p.id !== currentProduct.id);
      setRecommendations(recommendedProducts.slice(0, 3)); // Show top 3 matches
      
      if (recommendedProducts.length === 0) {
        toast({
          title: "No specific matches found",
          description: "We couldn't find a perfect match, but have a look at our bestsellers!",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "AI Assistant Error",
        description: "Could not get recommendations at this time. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="bg-card/30">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Wand2 className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl">AI Sales Assistant</CardTitle>
            <CardDescription>
              Tell us what you like, and we'll suggest products you'll love.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Interests</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'I love vintage-style accessories, hiking, and I need something durable for everyday use.'"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Recommendations
            </Button>
          </form>
        </Form>
      </CardContent>
      { (isLoading || recommendations.length > 0) && (
        <CardFooter>
          {isLoading ? (
             <p className="text-muted-foreground flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Finding your perfect match...</p>
          ) : (
            <div className="w-full">
                <h3 className="text-xl font-headline mb-4">Our Recommendations For You</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendations.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}

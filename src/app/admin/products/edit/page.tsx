
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  category: z.string().min(2, "Category must be at least 2 characters."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  careInstructions: z.string().min(10, "Care instructions must be at least 10 characters."),
  images: z.array(z.object({ url: z.string().url("Please enter a valid URL.") })),
});

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const isEditing = Boolean(productId);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(isEditing);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      description: "",
      careInstructions: "",
      images: [{ url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  useEffect(() => {
    if (isEditing) {
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/products/${productId}`);
          if (!response.ok) throw new Error("Failed to fetch product");
          const data = await response.json();
          // Transform the flat `images` array into an array of objects
          const transformedData = {
            ...data,
            images: data.images.map((url: string) => ({ url })),
          };
          form.reset(transformedData);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch product data.",
          });
          router.push("/admin/products");
        } finally {
          setIsFetching(false);
        }
      };
      fetchProduct();
    }
  }, [isEditing, productId, form, router, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Transform the images array back into a flat array of strings
    const submissionData = {
      ...values,
      images: values.images.map(img => img.url),
    };
    
    const url = isEditing ? `/api/products/${productId}` : '/api/products';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) throw new Error(`Failed to ${isEditing ? 'update' : 'create'} product`);
      
      toast({
        title: `Success`,
        description: `Product has been ${isEditing ? 'updated' : 'created'}.`,
      });
      router.push("/admin/products");
      router.refresh(); 
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: `Could not save product.`,
      });
    } finally {
        setIsLoading(false);
    }
  }
  
  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/admin/products">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {isEditing ? `Edit Product` : "Add New Product"}
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/products">Cancel</Link>
            </Button>
            <Button size="sm" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Product
            </Button>
          </div>
        </div>
        <Form {...form}>
          <form className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    Fill in the core information for your product.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Classic Leather Briefcase" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Bags" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="249.99" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A detailed description of the product."
                              {...field}
                              rows={5}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="careInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Care Instructions</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="How to care for the product."
                              {...field}
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Add URLs for your product images. The first image will be the main one.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {fields.map((field, index) => (
                      <FormField
                        control={form.control}
                        key={field.id}
                        name={`images.${index}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                              Image URL
                            </FormLabel>
                            <div className="flex items-center gap-2">
                              <FormControl>
                                <Input placeholder="https://placehold.co/600x600.png" {...field} />
                              </FormControl>
                              {fields.length > 1 && (
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  onClick={() => remove(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ url: "" })}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm" asChild>
                <Link href="/admin/products">Cancel</Link>
                </Button>
                <Button size="sm" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Product
                </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

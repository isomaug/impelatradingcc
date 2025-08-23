
"use client";

import { useForm } from "react-hook-form";
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
import { Loader2, Upload, Library } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import type { SiteSettings, LibraryItem } from "@/lib/types";
import { ImageLibrary } from "@/components/admin/image-library";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";

const formSchema = z.object({
  logoUrl: z.string().url("Please enter a valid URL or upload an image."),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function AdminSettingsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      logoUrl: "",
    },
  });

  const logoUrl = form.watch("logoUrl");
  
  useEffect(() => {
    const fetchLibraryContent = async () => {
        try {
            const [productsRes, teamRes, partnersRes, trainingsRes] = await Promise.all([
                fetch('/api/products'),
                fetch('/api/team'),
                fetch('/api/partnerships'),
                fetch('/api/trainings'),
            ]);
            const products = await productsRes.json();
            const team = await teamRes.json();
            const partners = await partnersRes.json();
            const trainings = await trainingsRes.json();
            setLibraryItems([...products, ...team, ...partners, ...trainings]);
        } catch (error) {
            console.error("Could not fetch library content", error);
        }
    };
    fetchLibraryContent();
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      setIsFetching(true);
      try {
        const response = await fetch('/api/settings');
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        form.reset(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch site settings.",
        });
      } finally {
        setIsFetching(false);
      }
    };
    fetchSettings();
  }, [form, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUrl = loadEvent.target?.result as string;
        form.setValue("logoUrl", dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (url: string) => {
    form.setValue("logoUrl", url);
    const closeButton = document.getElementById('close-image-library');
    if (closeButton) closeButton.click();
  }


  async function onSubmit(values: FormSchemaType) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to update settings");
      
      toast({
        title: "Success",
        description: "Site settings have been updated.",
      });
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save site settings.",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid max-w-4xl flex-1 auto-rows-max gap-8">
          <div className="flex justify-between items-center">
              <div>
                  <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
                  <p className="text-muted-foreground">
                      Manage global settings for your website.
                  </p>
              </div>
              <Button size="lg" type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
              </Button>
          </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>Manage your site logo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo Image</FormLabel>
                   <CardDescription>Recommended dimensions: 200px width, 120px height.</CardDescription>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <div className="flex items-center gap-2 mt-2">
                        <Button type="button" variant="outline" size="sm" asChild>
                          <label htmlFor="logo-file-upload" className="cursor-pointer flex items-center">
                                <Upload className="mr-2 h-4 w-4" /> Upload
                                <input id="logo-file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                          </label>
                      </Button>
                      <Dialog>
                          <DialogTrigger asChild>
                              <Button type="button" variant="outline" size="sm">
                                  <Library className="mr-2 h-4 w-4" /> Select from Library
                              </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                  <DialogTitle>Image Library</DialogTitle>
                                  <DialogDescription>Select an existing image.</DialogDescription>
                              </DialogHeader>
                              <ImageLibrary items={libraryItems} onSelectImage={handleImageSelect} />
                          </DialogContent>
                      </Dialog>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {logoUrl && (
                <div>
                    <p className="text-sm font-medium mb-2">Logo Preview</p>
                     <div className="p-4 bg-secondary rounded-md inline-block">
                         <Image 
                            src={logoUrl}
                            alt="Logo preview"
                            width={200}
                            height={120}
                            className="h-10 w-auto"
                        />
                     </div>
                </div>
            )}
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

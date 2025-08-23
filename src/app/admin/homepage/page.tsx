
"use client";

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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, Library, PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import type { HomePageContent, LibraryItem } from "@/lib/types";
import { ImageLibrary } from "@/components/admin/image-library";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";


const formSchema = z.object({
  hero: z.object({
    headline: z.string().min(5),
    subheadline: z.string().min(10),
    imageUrls: z.array(z.object({ url: z.string().url() })),
    imageAlt: z.string().min(5),
    buttonText: z.string().min(2),
    buttonLink: z.string().startsWith("/"),
    autoplayDelay: z.coerce.number().min(1000),
  }),
  about: z.object({
    headline: z.string().min(5),
    description: z.string().min(10),
    imageUrl: z.string().url(),
    imageAlt: z.string().min(5),
    linkText: z.string().min(2),
    linkUrl: z.string().startsWith("/"),
  }),
  coreActivities: z.object({
    headline: z.string().min(5),
    description: z.string().min(10),
    cards: z.object({
      artisanTraining: z.object({
        title: z.string().min(5),
        description: z.string().min(10),
        linkText: z.string().min(2),
        linkUrl: z.string().startsWith("/"),
      }),
      internationalMarkets: z.object({
        title: z.string().min(5),
        description: z.string().min(10),
        linkText: z.string().min(2),
        linkUrl: z.string().startsWith("/"),
      }),
      ngoPartnerships: z.object({
        title: z.string().min(5),
        description: z.string().min(10),
        linkText: z.string().min(2),
        linkUrl: z.string().startsWith("/"),
      }),
    }),
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;
type ImageFieldName = "about.imageUrl";

export default function AdminHomepagePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [activeImageField, setActiveImageField] = useState<ImageFieldName | null>(null);
  const [activeHeroImageIndex, setActiveHeroImageIndex] = useState<number>(0);


  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { fields: heroImageFields, append: appendHeroImage, remove: removeHeroImage, update: updateHeroImage } = useFieldArray({
    control: form.control,
    name: "hero.imageUrls",
  });
  
  useEffect(() => {
    const fetchLibraryContent = async () => {
        try {
            const [productsRes, teamRes, partnersRes, trainingsRes] = await Promise.all([
                fetch('/api/products'),
                fetch('/api/team'),
                fetch('/api/partnerships'),
                fetch('/api/trainings'),
            ]);
            if (!productsRes.ok || !teamRes.ok || !partnersRes.ok || !trainingsRes.ok) {
                throw new Error("Failed to fetch library content");
            }
            const products = await productsRes.json();
            const team = await teamRes.json();
            const partners = await partnersRes.json();
            const trainings = await trainingsRes.json();
            setLibraryItems([...products, ...team, ...partners, ...trainings]);
        } catch (error) {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Could not fetch image library content.",
            });
        }
    };
    fetchLibraryContent();
  }, [toast]);

  useEffect(() => {
    const fetchContent = async () => {
      setIsFetching(true);
      try {
        const response = await fetch('/api/homepage');
        if (!response.ok) throw new Error("Failed to fetch content");
        const data = await response.json();
        const transformedData = {
          ...data,
          hero: {
            ...data.hero,
            imageUrls: data.hero.imageUrls.map((url: string) => ({ url })),
          },
        };
        form.reset(transformedData);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch homepage content.",
        });
      } finally {
        setIsFetching(false);
      }
    };
    fetchContent();
  }, [form, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: ImageFieldName) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUrl = loadEvent.target?.result as string;
        form.setValue(fieldName, dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUrl = loadEvent.target?.result as string;
        updateHeroImage(index, { url: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (url: string) => {
      if (activeImageField) {
        form.setValue(activeImageField, url);
        setActiveImageField(null);
      } else {
        updateHeroImage(activeHeroImageIndex, { url });
      }
      const closeButton = document.getElementById('close-image-library');
      if (closeButton) closeButton.click();
  }


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const submissionData = {
      ...values,
      hero: {
        ...values.hero,
        imageUrls: values.hero.imageUrls.map(img => img.url).filter(url => url),
      },
    };

    try {
      const response = await fetch('/api/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) throw new Error("Failed to update content");
      
      toast({
        title: "Success",
        description: "Homepage content has been updated.",
      });
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save homepage content.",
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
    <div className="mx-auto grid max-w-4xl flex-1 auto-rows-max gap-8">
        <div className="flex justify-between items-center">
             <div>
                <h1 className="text-3xl font-bold tracking-tight">Homepage Content</h1>
                <p className="text-muted-foreground">
                    Manage the text and images displayed on your homepage.
                </p>
            </div>
            <Button size="lg" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
            </Button>
        </div>
      
      <Form {...form}>
        <form className="space-y-8">
           <Accordion type="multiple" className="w-full space-y-8" defaultValue={['hero-section']}>
            <AccordionItem value="hero-section" className="border-none">
              <Card>
                <AccordionTrigger className="p-6 hover:no-underline">
                  <CardHeader className="p-0 text-left">
                    <CardTitle>Hero Section</CardTitle>
                    <CardDescription>The main section at the top of your homepage.</CardDescription>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="space-y-4 pt-0">
                    <FormField control={form.control} name="hero.headline" render={({ field }) => (<FormItem><FormLabel>Headline</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="hero.subheadline" render={({ field }) => (<FormItem><FormLabel>Sub-headline</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="hero.buttonText" render={({ field }) => (<FormItem><FormLabel>Button Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="hero.buttonLink" render={({ field }) => (<FormItem><FormLabel>Button Link</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                       <FormField control={form.control} name="hero.imageAlt" render={({ field }) => (<FormItem><FormLabel>Image Alt Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                       <FormField control={form.control} name="hero.autoplayDelay" render={({ field }) => (<FormItem><FormLabel>Autoplay Speed (ms)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                     <div className="space-y-4">
                        <FormLabel>Hero Images</FormLabel>
                        <CardDescription>Add one or more images for the carousel.</CardDescription>
                        {heroImageFields.map((field, index) => (
                           <FormField
                              control={form.control}
                              key={field.id}
                              name={`hero.imageUrls.${index}.url`}
                              render={({ field: formField }) => (
                                <FormItem>
                                    <FormLabel className={cn(index !== 0 && "sr-only")}>Image URL {index + 1}</FormLabel>
                                    <div className="flex items-center gap-2">
                                    <Input placeholder="https://..." {...formField} />
                                    {heroImageFields.length > 1 && (
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removeHeroImage(index)}>
                                        <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Button type="button" variant="outline" size="sm" asChild>
                                            <label htmlFor={`hero-file-upload-${index}`} className="cursor-pointer flex items-center">
                                                <Upload className="mr-2 h-4 w-4" /> Upload
                                                <input id={`hero-file-upload-${index}`} type="file" className="sr-only" accept="image/*" onChange={(e) => handleHeroFileChange(e, index)} />
                                            </label>
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button type="button" variant="outline" size="sm" onClick={() => {setActiveHeroImageIndex(index); setActiveImageField(null);}}>
                                                    <Library className="mr-2 h-4 w-4" /> Select from Library
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-4xl">
                                                <ImageLibrary items={libraryItems} onSelectImage={handleImageSelect} />
                                            </DialogContent>
                                        </Dialog>
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
                            onClick={() => appendHeroImage({ url: "" })}
                        >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Image
                        </Button>
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>

            <AccordionItem value="about-section" className="border-none">
              <Card>
                <AccordionTrigger className="p-6 hover:no-underline">
                  <CardHeader className="p-0 text-left">
                    <CardTitle>About Section</CardTitle>
                    <CardDescription>"Rooted in South Africa, Reaching the World" section.</CardDescription>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="space-y-4 pt-0">
                    <FormField control={form.control} name="about.headline" render={({ field }) => (<FormItem><FormLabel>Headline</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="about.description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={4} /></FormControl><FormMessage /></FormItem>)} />
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="about.linkText" render={({ field }) => (<FormItem><FormLabel>Link Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name="about.linkUrl" render={({ field }) => (<FormItem><FormLabel>Link URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="about.imageUrl" render={({ field }) => (
                          <FormItem>
                              <FormLabel>Image URL</FormLabel>
                              <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                              <div className="flex items-center gap-2 mt-2">
                                  <Button type="button" variant="outline" size="sm" asChild>
                                      <label htmlFor="about-file-upload" className="cursor-pointer flex items-center">
                                          <Upload className="mr-2 h-4 w-4" /> Upload
                                          <input id="about-file-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e, "about.imageUrl")} />
                                      </label>
                                  </Button>
                                  <Dialog>
                                      <DialogTrigger asChild>
                                          <Button type="button" variant="outline" size="sm" onClick={() => setActiveImageField("about.imageUrl")}>
                                              <Library className="mr-2 h-4 w-4" /> Select from Library
                                          </Button>
                                      </DialogTrigger>
                                      <DialogContent className="max-w-4xl">
                                        <ImageLibrary items={libraryItems} onSelectImage={handleImageSelect} />
                                      </DialogContent>
                                  </Dialog>
                              </div>
                              <FormMessage />
                          </FormItem>
                      )} />
                      <FormField control={form.control} name="about.imageAlt" render={({ field }) => (<FormItem><FormLabel>Image Alt Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>

            <AccordionItem value="core-activities-section" className="border-none">
              <Card>
                <AccordionTrigger className="p-6 hover:no-underline">
                    <CardHeader className="p-0 text-left">
                        <CardTitle>Core Activities Section</CardTitle>
                        <CardDescription>The section with the three cards (Artisan Training, etc.).</CardDescription>
                    </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                    <CardContent className="space-y-6 pt-0">
                        <FormField control={form.control} name="coreActivities.headline" render={({ field }) => (<FormItem><FormLabel>Section Headline</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="coreActivities.description" render={({ field }) => (<FormItem><FormLabel>Section Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                        
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="space-y-4 p-4 border rounded-lg">
                                <h4 className="font-semibold">Card 1: Artisan Training</h4>
                                <FormField control={form.control} name="coreActivities.cards.artisanTraining.title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="coreActivities.cards.artisanTraining.description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="coreActivities.cards.artisanTraining.linkText" render={({ field }) => (<FormItem><FormLabel>Link Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="coreActivities.cards.artisanTraining.linkUrl" render={({ field }) => (<FormItem><FormLabel>Link URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                            <div className="space-y-4 p-4 border rounded-lg">
                                <h4 className="font-semibold">Card 2: International Markets</h4>
                                <FormField control={form.control} name="coreActivities.cards.internationalMarkets.title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="coreActivities.cards.internationalMarkets.description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="coreActivities.cards.internationalMarkets.linkText" render={({ field }) => (<FormItem><FormLabel>Link Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="coreActivities.cards.internationalMarkets.linkUrl" render={({ field }) => (<FormItem><FormLabel>Link URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                            <div className="space-y-4 p-4 border rounded-lg">
                                <h4 className="font-semibold">Card 3: NGO Partnerships</h4>
                                <FormField control={form.control} name="coreActivities.cards.ngoPartnerships.title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="coreActivities.cards.ngoPartnerships.description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="coreActivities.cards.ngoPartnerships.linkText" render={({ field }) => (<FormItem><FormLabel>Link Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="coreActivities.cards.ngoPartnerships.linkUrl" render={({ field }) => (<FormItem><FormLabel>Link URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                        </div>
                    </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>

           <div className="flex justify-end">
             <Button size="lg" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
            </Button>
           </div>
        </form>
      </Form>
    </div>
  );
}

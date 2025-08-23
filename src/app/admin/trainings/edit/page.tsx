
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
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
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2, Upload, Library } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import type { Training } from "@/lib/types";
import { ImageLibrary } from "@/components/admin/image-library";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  image: z.string().url("Please enter a valid URL or upload a file."),
  imageHint: z.string().min(2, "Image hint must be at least 2 characters."),
  modules: z.string().min(10, "Please list at least one module."),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function EditTrainingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trainingId = searchParams.get("id");
  const isEditing = Boolean(trainingId);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(isEditing);
  const [allTrainings, setAllTrainings] = useState<Training[]>([]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      imageHint: "",
      modules: "",
    },
  });

   useEffect(() => {
    const fetchAllTrainings = async () => {
       try {
          const response = await fetch(`/api/trainings`);
          if (!response.ok) throw new Error("Failed to fetch trainings");
          const data = await response.json();
          setAllTrainings(data);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch training library for images.",
          });
        }
    }
    fetchAllTrainings();

    if (isEditing) {
      const fetchTraining = async () => {
        try {
          const response = await fetch(`/api/trainings/${trainingId}`);
          if (!response.ok) throw new Error("Failed to fetch training");
          const data = await response.json();
          form.reset({
            ...data,
            modules: data.modules.join("\n"),
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch training data.",
          });
          router.push("/admin/trainings");
        } finally {
          setIsFetching(false);
        }
      };
      fetchTraining();
    }
  }, [isEditing, trainingId, form, router, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUrl = loadEvent.target?.result as string;
        form.setValue('image', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (url: string) => {
      form.setValue('image', url);
      const closeButton = document.getElementById('close-image-library');
      if (closeButton) closeButton.click();
  }

  async function onSubmit(values: FormSchemaType) {
    setIsLoading(true);
    const processedValues = {
        ...values,
        modules: values.modules.split('\n').filter(m => m.trim() !== '')
    }

    const url = isEditing ? `/api/trainings/${trainingId}` : '/api/trainings';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedValues),
      });

      if (!response.ok) throw new Error(`Failed to ${isEditing ? 'update' : 'create'} training`);
      
      toast({
        title: `Success`,
        description: `Training has been ${isEditing ? 'updated' : 'created'}.`,
      });
      router.push("/admin/trainings");
      router.refresh(); 
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: `Could not save training.`,
      });
    } finally {
        setIsLoading(false);
    }
  }

  if (isFetching && isEditing) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-2xl flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/admin/trainings">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {isEditing ? `Edit: ${form.getValues('title')}` : "Add New Training Program"}
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/trainings">Cancel</Link>
          </Button>
          <Button size="sm" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Program
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Program Details</CardTitle>
          <CardDescription>
            Fill in the information for the training program.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Leatherworking Fundamentals" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A short description of the training program."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="modules"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modules</FormLabel>
                     <CardDescription>List each module on a new line.</CardDescription>
                    <FormControl>
                      <Textarea
                        placeholder="Tool safety and usage&#10;Hand-stitching techniques&#10;Edge finishing"
                        {...field}
                        rows={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                         <div className="flex items-center gap-2 mt-2">
                            <Button type="button" variant="outline" size="sm" asChild>
                                <label htmlFor="file-upload" className="cursor-pointer flex items-center">
                                     <Upload className="mr-2 h-4 w-4" /> Upload
                                     <input id="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
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
                                        <DialogTitle>Training Image Library</DialogTitle>
                                        <DialogDescription>Select an existing image.</DialogDescription>
                                    </DialogHeader>
                                    <ImageLibrary items={allTrainings} onSelectImage={handleImageSelect} />
                                </DialogContent>
                           </Dialog>
                         </div>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="imageHint"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>AI Image Hint</FormLabel>
                        <FormControl>
                        <Input placeholder="e.g., leatherworking tools" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/trainings">Cancel</Link>
        </Button>
        <Button size="sm" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
           Save Program
        </Button>
      </div>
    </div>
  );
}

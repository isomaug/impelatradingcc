
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2, Upload, Library } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import type { Partner } from "@/lib/types";
import { ImageLibrary } from "@/components/admin/image-library";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  type: z.enum(["NGO", "Corporate", "Government"]),
  description: z.string().min(10, "Description must be at least 10 characters."),
  image: z.string().url("Please enter a valid URL or upload a file."),
  imageHint: z.string().optional(),
});

export default function EditPartnerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const partnerId = searchParams.get("id");
  const isEditing = Boolean(partnerId);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(isEditing);
  const [allPartners, setAllPartners] = useState<Partner[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "NGO",
      description: "",
      image: "",
      imageHint: "partner logo",
    },
  });

  useEffect(() => {
    const fetchAllPartners = async () => {
       try {
          const response = await fetch(`/api/partnerships`);
          if (!response.ok) throw new Error("Failed to fetch partners");
          const data = await response.json();
          setAllPartners(data);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch partner library for images.",
          });
        }
    }
    fetchAllPartners();

    if (isEditing) {
      const fetchPartner = async () => {
        try {
          const response = await fetch(`/api/partnerships/${partnerId}`);
          if (!response.ok) throw new Error("Failed to fetch partner");
          const data = await response.json();
          form.reset(data);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch partner data.",
          });
          router.push("/admin/partnerships");
        } finally {
          setIsFetching(false);
        }
      };
      fetchPartner();
    }
  }, [isEditing, partnerId, form, router, toast]);

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const url = isEditing ? `/api/partnerships/${partnerId}` : '/api/partnerships';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Failed to ${isEditing ? 'update' : 'create'} partner`);
      
      toast({
        title: `Success`,
        description: `Partner has been ${isEditing ? 'updated' : 'created'}.`,
      });
      router.push("/admin/partnerships");
      router.refresh(); 
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: `Could not save partner.`,
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
          <Link href="/admin/partnerships">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {isEditing ? `Edit: ${form.getValues('name')}` : "Add New Partner"}
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/partnerships">Cancel</Link>
          </Button>
          <Button size="sm" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Partner
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Partner Details</CardTitle>
          <CardDescription>
            Fill in the information for the partner organization.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Crafting Futures Foundation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Partner Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a partner type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NGO">NGO</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="Government">Government</SelectItem>
                        </SelectContent>
                      </Select>
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
                        placeholder="A short description of the partner organization."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo / Image URL</FormLabel>
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
                                    <DialogTitle>Partner Image Library</DialogTitle>
                                    <DialogDescription>Select an existing image.</DialogDescription>
                                </DialogHeader>
                                <ImageLibrary items={allPartners} onSelectImage={handleImageSelect} />
                            </DialogContent>
                       </Dialog>
                     </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/partnerships">Cancel</Link>
        </Button>
        <Button size="sm" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
           Save Partner
        </Button>
      </div>
    </div>
  );
}

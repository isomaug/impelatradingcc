
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
import type { TeamMember } from "@/lib/types";
import { ImageLibrary } from "@/components/admin/image-library";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  title: z.string().min(2, "Title must be at least 2 characters."),
  bio: z.string().min(10, "Bio must be at least 10 characters."),
  image: z.string().url("Please enter a valid URL or upload a file."),
  linkedin: z.string().url("Please enter a valid LinkedIn URL."),
  imageHint: z.string().optional(),
});

export default function EditTeamMemberPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const memberId = searchParams.get("id");
  const isEditing = Boolean(memberId);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(isEditing);
  const [allTeamMembers, setAllTeamMembers] = useState<TeamMember[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      bio: "",
      image: "https://placehold.co/400x400.png",
      linkedin: "https://linkedin.com/in/",
      imageHint: "professional headshot",
    },
  });

  useEffect(() => {
    const fetchAllTeamMembers = async () => {
       try {
          const response = await fetch(`/api/team`);
          if (!response.ok) throw new Error("Failed to fetch team members");
          const data = await response.json();
          setAllTeamMembers(data);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch team library for images.",
          });
        }
    }
    fetchAllTeamMembers();

    if (isEditing) {
      const fetchMember = async () => {
        try {
          const response = await fetch(`/api/team/${memberId}`);
          if (!response.ok) throw new Error("Failed to fetch team member");
          const data = await response.json();
          form.reset(data);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not fetch team member data.",
          });
          router.push("/admin/team");
        } finally {
          setIsFetching(false);
        }
      };
      fetchMember();
    }
  }, [isEditing, memberId, form, router, toast]);

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
    const url = isEditing ? `/api/team/${memberId}` : '/api/team';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Failed to ${isEditing ? 'update' : 'create'} team member`);
      
      toast({
        title: `Success`,
        description: `Team member has been ${isEditing ? 'updated' : 'created'}.`,
      });
      router.push("/admin/team");
      router.refresh(); // Refresh server components
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: `Could not save team member.`,
      });
    } finally {
        setIsLoading(false);
    }
  }
  
  if (isFetching) {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
    )
  }

  return (
    <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/admin/team">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {isEditing ? `Edit: ${form.getValues("name")}` : "Add New Team Member"}
        </h1>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/team">Cancel</Link>
          </Button>
          <Button size="sm" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Member
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Member Details</CardTitle>
          <CardDescription>
            Fill in the information for the team member.
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
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Nolwazi Khumalo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title / Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Founder & CEO" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biography</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A short biography for the team member."
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
                                    <DialogTitle>Team Image Library</DialogTitle>
                                    <DialogDescription>Select an existing image.</DialogDescription>
                                </DialogHeader>
                                <ImageLibrary items={allTeamMembers} onSelectImage={handleImageSelect} />
                            </DialogContent>
                       </Dialog>
                     </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/..." {...field} />
                    </FormControl>
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
          <Link href="/admin/team">Cancel</Link>
        </Button>
        <Button size="sm" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
           Save Member
        </Button>
      </div>
    </div>
  );
}

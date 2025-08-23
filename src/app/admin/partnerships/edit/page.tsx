
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { partners } from "@/lib/data";
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
import { ChevronLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  type: z.enum(["NGO", "Corporate", "Government"]),
  description: z.string().min(10, "Description must be at least 10 characters."),
  image: z.string().url("Please enter a valid URL."),
});

export default function EditPartnerPage() {
  const searchParams = useSearchParams();
  const partnerId = searchParams.get("id");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const partner = partners.find((p) => p.id === partnerId);
  const isEditing = Boolean(partner);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: partner?.name || "",
      type: partner?.type || "NGO",
      description: partner?.description || "",
      image: partner?.image || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // In a real app, you'd send this to your backend API
    console.log({ ...values, id: partnerId || "new" });

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: isEditing ? "Partner Updated" : "Partner Added",
        description: `The partner's information has been saved.`,
      });
    }, 1500);
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
          {isEditing ? `Edit: ${partner?.name}` : "Add New Partner"}
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
                      <Input placeholder="https://placehold.co/600x400.png" {...field} />
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

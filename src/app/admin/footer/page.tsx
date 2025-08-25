

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
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";
import type { FooterContent } from "@/lib/types";

const linkSchema = z.object({
  text: z.string().min(1, "Link text cannot be empty."),
  href: z.string().startsWith("/", "Link must be a relative path (e.g., /about)."),
});

const columnSchema = z.object({
  title: z.string().min(1, "Column title cannot be empty."),
  links: z.array(linkSchema),
});

const formSchema = z.object({
  newsletter: z.object({
    headline: z.string().min(5),
    description: z.string().min(10),
  }),
  columns: z.array(columnSchema),
  contact: z.object({
    address: z.string().min(10, "Address is required."),
    phone: z.string().min(10, "Phone number is required."),
    hours: z.string().min(5, "Hours are required."),
  }),
  socials: z.object({
    twitter: z.string().url("Must be a valid URL."),
    facebook: z.string().url("Must be a valid URL."),
    instagram: z.string().url("Must be a valid URL."),
  }),
  legal: z.object({
    copyright: z.string().min(5),
    privacyPolicy: linkSchema,
    termsOfService: linkSchema,
  }),
  disclaimer: z.string().min(10),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function AdminFooterPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  
  const { fields: columnFields } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  useEffect(() => {
    const fetchContent = async () => {
      setIsFetching(true);
      try {
        const response = await fetch('/api/footer');
        if (!response.ok) throw new Error("Failed to fetch content");
        const data: FooterContent = await response.json();
        form.reset(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not fetch footer content.",
        });
      } finally {
        setIsFetching(false);
      }
    };
    fetchContent();
  }, [form, toast]);


  async function onSubmit(values: FormSchemaType) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/footer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to update content");
      
      toast({
        title: "Success",
        description: "Footer content has been updated.",
      });
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save footer content.",
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
          <h1 className="text-3xl font-bold tracking-tight">Footer Content</h1>
          <p className="text-muted-foreground">
            Manage all the text and links displayed in your site footer.
          </p>
        </div>
        <Button size="lg" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </div>
      
      <Form {...form}>
        <form className="space-y-8">
          <Accordion type="multiple" className="w-full space-y-8" defaultValue={['newsletter-section']}>
            
            {/* Newsletter Section */}
            <AccordionItem value="newsletter-section" className="border-none">
              <Card>
                <AccordionTrigger className="p-6 hover:no-underline">
                  <CardHeader className="p-0 text-left">
                    <CardTitle>Newsletter Section</CardTitle>
                    <CardDescription>The subscription box in the footer.</CardDescription>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="space-y-4 pt-0">
                    <FormField control={form.control} name="newsletter.headline" render={({ field }) => (<FormItem><FormLabel>Headline</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="newsletter.description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>

            {/* Link Columns Section */}
            <AccordionItem value="columns-section" className="border-none">
              <Card>
                <AccordionTrigger className="p-6 hover:no-underline">
                  <CardHeader className="p-0 text-left">
                    <CardTitle>Link & Contact Columns</CardTitle>
                    <CardDescription>The columns of links and contact info.</CardDescription>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="space-y-6 pt-0">
                    <div className="grid md:grid-cols-2 gap-6">
                      {columnFields.map((column, colIndex) => (
                        <div key={column.id} className="space-y-4 p-4 border rounded-lg">
                          <FormField control={form.control} name={`columns.${colIndex}.title`} render={({ field }) => (<FormItem><FormLabel>Column Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                          <hr/>
                          <FormLabel>Links</FormLabel>
                          {column.links.map((link, linkIndex) => (
                            <div key={linkIndex} className="grid grid-cols-2 gap-2 items-end">
                              <FormField control={form.control} name={`columns.${colIndex}.links.${linkIndex}.text`} render={({ field }) => (<FormItem><FormLabel className="text-xs">Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                              <FormField control={form.control} name={`columns.${colIndex}.links.${linkIndex}.href`} render={({ field }) => (<FormItem><FormLabel className="text-xs">URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                          ))}
                        </div>
                      ))}
                       <div className="space-y-4 p-4 border rounded-lg">
                            <h4 className="font-semibold">Contact Details</h4>
                            <FormField control={form.control} name="contact.address" render={({ field }) => (<FormItem><FormLabel>Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="contact.phone" render={({ field }) => (<FormItem><FormLabel>Phone</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="contact.hours" render={({ field }) => (<FormItem><FormLabel>Hours</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>

            {/* Socials & Legal Section */}
            <AccordionItem value="socials-legal-section" className="border-none">
              <Card>
                <AccordionTrigger className="p-6 hover:no-underline">
                    <CardHeader className="p-0 text-left">
                        <CardTitle>Social, Legal & Disclaimer</CardTitle>
                        <CardDescription>Manage social media links and bottom-line text.</CardDescription>
                    </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                    <CardContent className="space-y-6 pt-0">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4 p-4 border rounded-lg">
                            <h4 className="font-semibold">Social Media URLs</h4>
                            <FormField control={form.control} name="socials.twitter" render={({ field }) => (<FormItem><FormLabel>Twitter URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="socials.facebook" render={({ field }) => (<FormItem><FormLabel>Facebook URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="socials.instagram" render={({ field }) => (<FormItem><FormLabel>Instagram URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                        <div className="space-y-4 p-4 border rounded-lg">
                            <h4 className="font-semibold">Legal & Copyright</h4>
                            <FormField control={form.control} name="legal.copyright" render={({ field }) => (<FormItem><FormLabel>Copyright Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            <div className="grid grid-cols-2 gap-2 items-end">
                                <FormField control={form.control} name="legal.privacyPolicy.text" render={({ field }) => (<FormItem><FormLabel className="text-xs">Privacy Link Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="legal.privacyPolicy.href" render={({ field }) => (<FormItem><FormLabel className="text-xs">Privacy Link URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                             <div className="grid grid-cols-2 gap-2 items-end">
                                <FormField control={form.control} name="legal.termsOfService.text" render={({ field }) => (<FormItem><FormLabel className="text-xs">Terms Link Text</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="legal.termsOfService.href" render={({ field }) => (<FormItem><FormLabel className="text-xs">Terms Link URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                        </div>
                      </div>
                      <FormField control={form.control} name="disclaimer" render={({ field }) => (<FormItem><FormLabel>Disclaimer Text</FormLabel><CardDescription>The small text at the very bottom of the footer.</CardDescription><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-end">
            <Button size="lg" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

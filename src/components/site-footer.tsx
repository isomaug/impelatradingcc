
"use client";

import Link from "next/link";
import { Twitter, Facebook, Instagram, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { useEffect, useState } from "react";
import type { FooterContent } from "@/lib/types";
import { Skeleton } from "./ui/skeleton";

const FooterSkeleton = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 mb-8 md:mb-0">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Skeleton className="h-10 flex-grow" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <Skeleton className="h-5 w-20 mb-4" />
              <ul className="space-y-2">
                {[...Array(3)].map((_, j) => (
                  <li key={j}><Skeleton className="h-4 w-32" /></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center text-sm">
        <Skeleton className="h-4 w-64 order-2 md:order-1 mt-4 md:mt-0" />
        <div className="flex space-x-4 order-1 md:order-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
       <div className="mt-4 text-center text-xs order-3">
            <Skeleton className="h-4 w-full max-w-lg mx-auto" />
        </div>
    </div>
  </footer>
);

export default function SiteFooter() {
  const [content, setContent] = useState<FooterContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/footer');
        if (!response.ok) throw new Error('Failed to fetch footer content');
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading || !content) {
    return <FooterSkeleton />;
  }

  const { newsletter, columns, socials, legal, disclaimer } = content;

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Newsletter Subscription */}
          <div className="lg:col-span-2 mb-8 md:mb-0">
            <h3 className="font-headline text-lg font-bold mb-4">{newsletter.headline}</h3>
            <p className="text-sm text-muted-foreground mb-4">{newsletter.description}</p>
            <form className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Enter your email" className="bg-background/10 border-border text-foreground placeholder:text-muted-foreground" />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
            </form>
          </div>

          {/* Link Categories */}
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-8">
            {columns.map(col => (
              <div key={col.title}>
                <h3 className="font-headline text-sm font-semibold tracking-wider uppercase mb-4">{col.title}</h3>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link.href}><Link href={link.href} className="text-sm text-muted-foreground hover:text-background transition-colors">{link.text}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-4 order-2 md:order-1 mt-4 md:mt-0">
                <p>&copy; {new Date().getFullYear()} {legal.copyright}</p>
                <Link href={legal.privacyPolicy.href} className="hover:text-background transition-colors">{legal.privacyPolicy.text}</Link>
                <Link href={legal.termsOfService.href} className="hover:text-background transition-colors">{legal.termsOfService.text}</Link>
            </div>
           <div className="flex justify-center md:justify-start space-x-4 order-1 md:order-2">
              <Link href={socials.twitter} className="hover:text-background transition-colors"><Twitter /></Link>
              <Link href={socials.facebook} className="hover:text-background transition-colors"><Facebook /></Link>
              <Link href={socials.instagram} className="hover:text-background transition-colors"><Instagram /></Link>
            </div>
        </div>
        <div className="mt-4 text-center text-xs text-muted-foreground/70 order-3">
            <p>{disclaimer}</p>
        </div>
      </div>
    </footer>
  );
};

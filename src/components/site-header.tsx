
"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, User, Briefcase, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useCurrency, Currency } from "@/hooks/use-currency";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import React, { useEffect, useState } from "react";
import type { SiteSettings } from "@/lib/types";

const SiteHeader = () => {
  const { cartCount } = useCart();
  const { currency, setCurrency } = useCurrency();
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = React.useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setIsClient(true);
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        if (!response.ok) throw new Error('Failed to fetch settings');
        const data = await response.json();
        setSettings(data);
      } catch (error) {
        console.error('Failed to fetch site settings:', error);
      }
    };
    fetchSettings();
  }, []);


  const navLinks = (
    <>
      <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80" asChild>
        <Link href="/">Home</Link>
      </Button>
       <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80" asChild>
        <Link href="/about">About Us</Link>
      </Button>
       <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80" asChild>
        <Link href="/team">Our Team</Link>
      </Button>
       <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80" asChild>
        <Link href="/trainings">Trainings</Link>
      </Button>
       <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80" asChild>
        <Link href="/our-work">Our Work</Link>
      </Button>
      <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80" asChild>
        <Link href="/shop">Shop</Link>
      </Button>
    </>
  );

  const currencySelector = (
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80">
            {currency}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-secondary text-secondary-foreground border-border">
          <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
            <DropdownMenuRadioItem value="ZAR">ZAR (South African Rand)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="USD">USD (US Dollar)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="EUR">EUR (Euro)</DropdownMenuRadioItem>
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem value="KES">KES (Kenyan Shilling)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="UGX">UGX (Ugandan Shilling)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="TZS">TZS (Tanzanian Shilling)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="RWF">RWF (Rwandan Franc)</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="BIF">BIF (Burundian Franc)</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  );

  const userMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/80">
            <User />
            <span className="sr-only">User Menu</span>
          </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-secondary text-secondary-foreground border-border" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link href="/dashboard">My Dashboard</Link></DropdownMenuItem>
        <DropdownMenuItem asChild><Link href="/cart">My Cart</Link></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild><Link href="/login">Login</Link></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
  
  const mobileUserMenu = (
     <div className="border-t border-secondary-foreground/20 mt-4 pt-4">
      <h3 className="px-4 mb-2 text-sm font-semibold text-secondary-foreground/70">My Account</h3>
       <Button variant="ghost" className="w-full justify-start text-secondary-foreground hover:bg-secondary/80" asChild>
         <Link href="/dashboard">My Dashboard</Link>
       </Button>
        <Button variant="ghost" className="w-full justify-start text-secondary-foreground hover:bg-secondary/80" asChild>
         <Link href="/cart">My Cart</Link>
       </Button>
       <Button variant="ghost" className="w-full justify-start text-secondary-foreground hover:bg-secondary/80" asChild>
         <Link href="/login">Login</Link>
       </Button>
     </div>
  );

  return (
    <header className="bg-secondary text-secondary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
            <Image
                src={settings?.logoUrl || 'https://placehold.co/200x120.png'}
                width={200}
                height={120}
                alt="Impela Trading CC Logo"
                className="h-10 w-auto"
                priority
            />
        </Link>
        {isClient && isMobile ? (
          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative p-2">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs text-center leading-4">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-secondary-foreground hover:bg-secondary/80">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-secondary text-secondary-foreground w-64 pt-4 flex flex-col">
                 <SheetHeader className="p-4 border-b border-secondary-foreground/20 text-left">
                    <SheetTitle>
                        Impela Trading
                    </SheetTitle>
                    <SheetDescription className="text-secondary-foreground/80">
                        Menu
                    </SheetDescription>
                 </SheetHeader>
                <nav className="flex flex-col gap-2 p-4">
                  {navLinks}
                </nav>
                <div className="mt-auto">
                    <div className="p-4 border-t border-secondary-foreground/20">
                        {currencySelector}
                    </div>
                    {mobileUserMenu}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-1">
              {navLinks}
            </nav>
            {isClient && currencySelector}
             <Link href="/cart" className="relative p-2 rounded-full hover:bg-secondary/80 transition-colors">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs text-center leading-4">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
            {isClient && userMenu}
          </div>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;

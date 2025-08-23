
"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SiteHeader = () => {
  const { cartCount } = useCart();
  const isMobile = useIsMobile();

  const navLinks = (
    <>
      <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80" asChild>
        <Link href="/">Home</Link>
      </Button>
       <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80" asChild>
        <Link href="/about">About Us</Link>
      </Button>
       <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80" asChild>
        <Link href="/trainings">Trainings</Link>
      </Button>
       <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80" asChild>
        <Link href="/partnerships">Our Work</Link>
      </Button>
      <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80" asChild>
        <Link href="/shop">Shop</Link>
      </Button>
    </>
  );

  return (
    <header className="bg-secondary text-secondary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-headline font-bold">
          Impela Trading CC
        </Link>
        {isMobile ? (
          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative p-2">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs text-center leading-5">
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
              <SheetContent side="left" className="bg-secondary text-secondary-foreground w-64 pt-12">
                <nav className="flex flex-col gap-4">
                  {navLinks}
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                       <Button variant="ghost" className="text-secondary-foreground hover:bg-secondary/80 justify-start">
                         Account
                       </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-secondary text-secondary-foreground border-border">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild><Link href="/login">Login</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>
                      <DropdownMenuItem asChild><Link href="/admin">Admin Panel</Link></DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-2">
              {navLinks}
            </nav>
             <Link href="/cart" className="relative p-2 rounded-full hover:bg-secondary/80 transition-colors">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs text-center leading-5">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
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
                <DropdownMenuItem asChild><Link href="/login">Login</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/admin">Admin Panel</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;

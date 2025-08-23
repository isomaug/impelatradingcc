
"use client";

import Link from "next/link";
import { ShoppingCart, Menu, User, Briefcase } from "lucide-react";
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
        <Link href="/team">Our Team</Link>
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
        <Link href="/" className="text-xl font-headline font-bold flex items-center gap-2">
          <Briefcase />
          <span>Impela Trading CC</span>
        </Link>
        {isMobile ? (
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
              <SheetContent side="left" className="bg-secondary text-secondary-foreground w-64 pt-12 flex flex-col">
                <nav className="flex flex-col gap-2">
                  {navLinks}
                </nav>
                {mobileUserMenu}
              </SheetContent>
            </Sheet>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center gap-1">
              {navLinks}
            </nav>
             <Link href="/cart" className="relative p-2 rounded-full hover:bg-secondary/80 transition-colors">
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs text-center leading-4">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
            {userMenu}
          </div>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;

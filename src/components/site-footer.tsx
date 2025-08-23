import Link from "next/link";
import { Twitter, Facebook, Instagram } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-12 py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="font-headline text-lg font-bold mb-2">Impela Trading CC</h3>
          <p className="text-sm text-secondary-foreground/80">
            Crafting timeless leather goods since 2024.
          </p>
        </div>
        <div>
          <h3 className="font-headline text-lg font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link href="/" className="text-sm hover:underline text-secondary-foreground/80">Home</Link></li>
            <li><Link href="/dashboard" className="text-sm hover:underline text-secondary-foreground/80">Dashboard</Link></li>
            <li><Link href="/admin" className="text-sm hover:underline text-secondary-foreground/80">Admin</Link></li>
            <li><Link href="/cart" className="text-sm hover:underline text-secondary-foreground/80">My Cart</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-headline text-lg font-bold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground"><Twitter /></Link>
            <Link href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground"><Facebook /></Link>
            <Link href="#" className="text-secondary-foreground/80 hover:text-secondary-foreground"><Instagram /></Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto text-center mt-8 pt-4 border-t border-secondary-foreground/20">
        <p className="text-xs text-secondary-foreground/60">
          © {new Date().getFullYear()} Impela Trading CC. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;

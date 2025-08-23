
import Link from "next/link";
import { Twitter, Facebook, Instagram, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SiteFooter = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Newsletter Subscription */}
          <div className="lg:col-span-2 mb-8 md:mb-0">
            <h3 className="font-headline text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest news on our artisans, new products, and special offers.
            </p>
            <form className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Enter your email" className="bg-background/10 border-border text-foreground placeholder:text-muted-foreground" />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
            </form>
          </div>

          {/* Link Categories */}
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-8">
            <div>
              <h3 className="font-headline text-sm font-semibold tracking-wider uppercase mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-background transition-colors">All Products</Link></li>
                <li><Link href="/shop?category=Bags" className="text-sm text-muted-foreground hover:text-background transition-colors">Bags</Link></li>
                <li><Link href="/shop?category=Wallets" className="text-sm text-muted-foreground hover:text-background transition-colors">Wallets</Link></li>
                <li><Link href="/shop?category=Accessories" className="text-sm text-muted-foreground hover:text-background transition-colors">Accessories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-sm font-semibold tracking-wider uppercase mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-background transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-background transition-colors">FAQ</Link></li>
                <li><Link href="/shipping-returns" className="text-sm text-muted-foreground hover:text-background transition-colors">Shipping & Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-headline text-sm font-semibold tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-background transition-colors">About Us</Link></li>
                <li><Link href="/trainings" className="text-sm text-muted-foreground hover:text-background transition-colors">Trainings</Link></li>
                <li><Link href="/partnerships" className="text-sm text-muted-foreground hover:text-background transition-colors">Partnerships</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 text-sm text-muted-foreground order-2 md:order-1 mt-4 md:mt-0">
                <p>&copy; {new Date().getFullYear()} Impela Trading CC. All Rights Reserved.</p>
                <Link href="/privacy-policy" className="hover:text-background transition-colors">Privacy</Link>
                <Link href="/terms-of-service" className="hover:text-background transition-colors">Terms</Link>
            </div>
           <div className="flex justify-center md:justify-start space-x-4 order-1 md:order-2">
              <Link href="#" className="text-muted-foreground hover:text-background transition-colors"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-background transition-colors"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-background transition-colors"><Instagram /></Link>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

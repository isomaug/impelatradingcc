
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/hooks/use-cart";
import { CurrencyProvider } from "@/hooks/use-currency";
import { AdminLayoutContent } from "./admin-layout-content";
import "./globals.css";


export const metadata: Metadata = {
  title: "Impela Trading CC",
  description: "High-quality leather products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <CurrencyProvider>
          <CartProvider>
              <AdminLayoutContent>
                  {children}
              </AdminLayoutContent>
            <Toaster />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}

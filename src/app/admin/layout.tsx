
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookUser,
  Briefcase,
  Handshake,
  LayoutDashboard,
  PanelLeft,
  Settings,
  ShoppingBag,
  Users,
  Users2,
  LogOut,
  BookHeart,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Overview",
    items: [{ href: "/admin", icon: LayoutDashboard, label: "Dashboard" }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/homepage", icon: Home, label: "Homepage" },
      { href: "/admin/team", icon: Users2, label: "Team" },
      { href: "/admin/partnerships", icon: Handshake, label: "Partnerships" },
      { href: "/admin/trainings", icon: BookUser, label: "Trainings" },
      { href: "/admin/our-work", icon: BookHeart, label: "Our Work" },
    ],
  },
  {
    label: "E-Commerce",
    items: [
      { href: "/admin/products", icon: ShoppingBag, label: "Products" },
      { href: "/admin/users", icon: Users, label: "Users" },
    ],
  },
];

const footerNavItems = [
    { href: "/admin/settings", icon: Settings, label: "Settings" },
    { href: "/", icon: LogOut, label: "Exit Admin" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])


  const isActive = (path: string) => {
    if (path === "/admin") return pathname === path;
    if (path === "/admin/homepage") return pathname === path;
    return pathname.startsWith(path) && path !== "/admin";
  };

  const NavContent = () => (
    <>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start gap-1 px-2 py-4">
          {navItems.map((section) => (
            <div key={section.label} className="mb-2">
              <p className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground/80 tracking-wider">
                {section.label}
              </p>
              {section.items.map((item) => (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (isClient && window.innerWidth < 768) {
                          setIsSidebarOpen(false);
                        }
                      }}
                      className={cn(`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted`,
                        isActive(item.href)
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-2">
         <nav className="grid items-start gap-1">
          {footerNavItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                   onClick={() => {
                        if (isClient && window.innerWidth < 768) {
                          setIsSidebarOpen(false);
                        }
                      }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted text-muted-foreground hover:text-foreground`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </div>
    </>
  );

  return (
    <TooltipProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
        {isClient && (
           <aside
            className={cn(`hidden md:flex flex-col border-r bg-card transition-all duration-300`,
              isSidebarOpen ? "w-60" : "w-16 items-center"
            )}
          >
            <div className={cn(`flex h-16 items-center border-b px-4 shrink-0`, isSidebarOpen ? 'justify-between' : 'justify-center')}>
              <Link href="/" className={cn(`flex items-center gap-2 font-semibold`, !isSidebarOpen && 'sr-only')}>
                <Briefcase className="h-6 w-6" />
                <span>Impela</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </div>
            <div className={cn(`flex flex-col w-full flex-1 overflow-hidden`, !isSidebarOpen && '[&_span]:sr-only [&_p]:sr-only')}>
              <NavContent />
            </div>
          </aside>
        )}
        <div className="flex flex-col">
          <header className="flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
             <div className="md:hidden">
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                  >
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-0 w-60">
                  <SheetHeader className="p-4 border-b">
                    <SheetTitle asChild>
                      <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Briefcase className="h-6 w-6" />
                        <span>Impela Trading</span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <NavContent />
                </SheetContent>
              </Sheet>
             </div>

            <div className="flex w-full justify-end">
                 {/* Right-aligned header content can go here */}
            </div>

          </header>
          <main className="flex-1 overflow-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

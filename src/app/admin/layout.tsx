
"use client"

import * as React from "react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarSeparator,
  SidebarProvider
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Wand2,
  Settings,
  UserCircle,
  Briefcase,
  Users2,
  Handshake,
  BookUser,
  PanelLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/40">
        <Sidebar className="border-r" collapsible="icon" variant="floating">
          <SidebarHeader>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                    <Briefcase />
                    <span className="sr-only">Home</span>
                </Link>
              </Button>
          </SidebarHeader>
          <SidebarContent className="p-2 flex-grow">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard" isActive={isActive('/admin')}>
                  <Link href="/admin">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            
            <SidebarSeparator />

            <SidebarGroup>
                <SidebarGroupLabel>Content</SidebarGroupLabel>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Team" isActive={isActive('/admin/team')}>
                            <Users2 />
                            <span>Team</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Partnerships" isActive={isActive('/admin/partnerships')}>
                            <Handshake />
                            <span>Partnerships</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Trainings" isActive={isActive('/admin/trainings')}>
                            <BookUser />
                            <span>Trainings</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
                <SidebarGroupLabel>E-Commerce</SidebarGroupLabel>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Products" isActive={isActive('/admin/products')}>
                            <ShoppingBag />
                            <span>Products</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Users" isActive={isActive('/admin/users')}>
                            <Users />
                            <span>Users</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
            
             <SidebarGroup>
                <SidebarGroupLabel>AI Tools</SidebarGroupLabel>
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Sales Forecaster" isActive={isActive('/admin/forecasting')}>
                            <Wand2 />
                            <span>Forecasting</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>

          </SidebarContent>
          <SidebarFooter className="p-2">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Account" isActive={isActive('/admin/account')}>
                        <UserCircle />
                        <span>Account</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings" isActive={isActive('/admin/settings')}>
                        <Settings />
                        <span>Settings</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 p-4 md:p-8">
            <div className="flex justify-end mb-4">
                 <SidebarTrigger>
                    <PanelLeft />
                </SidebarTrigger>
            </div>
            {children}
        </main>
      </div>
    </SidebarProvider>
  )
}

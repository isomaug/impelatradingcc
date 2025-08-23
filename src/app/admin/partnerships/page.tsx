
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Partner } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPartnershipsPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchPartners = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/partnerships");
      if (!response.ok) throw new Error("Failed to fetch partners");
      const data = await response.json();
      setPartners(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch partners.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partner?")) return;

    try {
      const response = await fetch(`/api/partnerships/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Failed to delete partner");
      toast({
        title: "Success",
        description: "Partner deleted.",
      });
      fetchPartners(); // Refresh list
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not delete partner.",
      });
    }
  };

  return (
    <div className="w-full">
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Partnerships</CardTitle>
            <CardDescription>
              Manage your partner organizations.
            </CardDescription>
          </div>
          <Button asChild>
            <Link href="/admin/partnerships/edit">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Partner
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-[64px] w-[64px] rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-32" />
                  </TableCell>
                   <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-6 w-64" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={partner.name}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={partner.image}
                    width="64"
                    data-ai-hint="partner logo"
                  />
                </TableCell>
                <TableCell className="font-medium">{partner.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                   <Badge variant={partner.type === 'NGO' ? 'secondary' : 'outline'}>{partner.type}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">
                  {partner.description}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/partnerships/edit?id=${partner.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(partner.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
  );
}

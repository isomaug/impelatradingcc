
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
import { MoreHorizontal, PlusCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Training } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminTrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTrainings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/trainings");
      if (!response.ok) throw new Error("Failed to fetch trainings");
      const data = await response.json();
      setTrainings(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch trainings.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this training program?")) return;

    try {
      const response = await fetch(`/api/trainings/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Failed to delete training program");
      toast({
        title: "Success",
        description: "Training program deleted.",
      });
      fetchTrainings(); // Refresh list
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not delete training program.",
      });
    }
  };

  return (
    <div className="w-full">
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Training Programs</CardTitle>
            <CardDescription>
              Manage your artisan training programs.
            </CardDescription>
          </div>
          <Button asChild>
            <Link href="/admin/trainings/edit">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Training
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
              <TableHead>Title</TableHead>
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
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-6 w-64" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
                trainings.map((training) => (
              <TableRow key={training.id}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt={training.title}
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={training.image}
                    width="64"
                    data-ai-hint={training.imageHint}
                  />
                </TableCell>
                <TableCell className="font-medium">{training.title}</TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">
                  {training.description}
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
                        <Link href={`/admin/trainings/edit?id=${training.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(training.id)}>Delete</DropdownMenuItem>
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

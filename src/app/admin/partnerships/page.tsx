
import Link from "next/link";
import Image from "next/image";
import { partners } from "@/lib/data";
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

export default function AdminPartnershipsPage() {
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
            {partners.map((partner) => (
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
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    </div>
  );
}

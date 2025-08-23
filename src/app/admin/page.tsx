import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import SalesForecaster from "@/components/ai/sales-forecaster";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold mb-8">Admin Panel</h1>
      <Tabs defaultValue="products">
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="products">Product Management</TabsTrigger>
          <TabsTrigger value="forecast">AI Sales Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Add, edit, or remove product listings.
                  </CardDescription>
                </div>
                <Button>Add New Product</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast" className="mt-6">
          <SalesForecaster />
        </TabsContent>
      </Tabs>
    </div>
  );
}

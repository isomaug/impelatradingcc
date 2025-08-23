
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

const mockOrders = [
  {
    id: "ORD001",
    date: "2023-10-26",
    status: "Delivered",
    total: 249.99,
  },
  {
    id: "ORD002",
    date: "2023-11-15",
    status: "Shipped",
    total: 79.99,
  },
  {
    id: "ORD003",
    date: "2023-11-20",
    status: "Processing",
    total: 449.98,
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold mb-8">Buyer Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                Review your past orders and their status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "Delivered"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            order.status === "Delivered"
                              ? "bg-green-700 text-white"
                              : ""
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        ${order.total.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground">John Doe</p>
              <p>john.doe@example.com</p>
              <p className="mt-2">123 Leather Lane, Suite 5</p>
              <p>Craftsville, TX 75001</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Saved Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Favorite Category:</strong> Bags
              </p>
              <p>
                <strong>Newsletter:</strong> Subscribed
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

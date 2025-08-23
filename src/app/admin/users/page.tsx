
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminUsersPage() {
  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
          <CardDescription>
            This section is for managing user accounts.
            Functionality to view, edit, or delete users is not yet implemented.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            User management features will be available in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

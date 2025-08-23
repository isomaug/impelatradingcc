
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminOurWorkPage() {
  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Manage 'Our Work' Page</CardTitle>
          <CardDescription>
            This section is for managing the content on the "Our Work" page.
            Currently, this page displays the partners you manage under the 'Partnerships' section.
            In the future, you could add forms here to edit the page's title, introductory text, and call-to-action sections.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            To edit the list of partners, please go to the <a href="/admin/partnerships" className="text-primary underline">Partnerships</a> section.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}


import { Suspense } from 'react';
import EditTeamMemberForm from './edit-team-member-form';
import { Loader2 } from 'lucide-react';

const EditTeamMemberFormSkeleton = () => (
    <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
)

export default function EditTeamMemberPage() {
  return (
    <Suspense fallback={<EditTeamMemberFormSkeleton />}>
      <EditTeamMemberForm />
    </Suspense>
  );
}

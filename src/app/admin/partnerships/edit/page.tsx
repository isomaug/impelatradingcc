
import { Suspense } from 'react';
import EditPartnerForm from './edit-partner-form';
import { Loader2 } from 'lucide-react';

const EditPartnerFormSkeleton = () => (
    <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
)

export default function EditPartnerPage() {
  return (
    <Suspense fallback={<EditPartnerFormSkeleton />}>
      <EditPartnerForm />
    </Suspense>
  );
}

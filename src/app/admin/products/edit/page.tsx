
import { Suspense } from 'react';
import EditProductForm from './edit-product-form';
import { Loader2 } from 'lucide-react';

const EditProductFormSkeleton = () => (
    <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
)

export default function EditProductPage() {
  return (
    <Suspense fallback={<EditProductFormSkeleton />}>
      <EditProductForm />
    </Suspense>
  );
}

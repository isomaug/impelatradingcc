
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group/card bg-card/80 backdrop-blur-sm border border-black/10">
      <CardHeader className="p-0 relative overflow-hidden">
        <Link href={`/products/${product.id}`} className="block">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover/card:scale-110"
            data-ai-hint="leather product"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="font-headline text-lg mb-2">
          <Link href={`/products/${product.id}`} className="hover:text-primary transition-colors duration-300">
            {product.name}
          </Link>
        </CardTitle>
        <p className="font-semibold text-primary text-xl">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

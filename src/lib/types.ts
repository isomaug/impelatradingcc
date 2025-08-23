export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  careInstructions: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

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

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  imageHint: string;
  linkedin: string;
};

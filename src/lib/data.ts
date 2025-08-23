
import type { Product, TeamMember, Partner } from "./types";

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Leather Briefcase",
    price: 249.99,
    category: "Bags",
    description:
      "A timeless briefcase crafted from full-grain leather, perfect for the modern professional. Features multiple compartments and a padded laptop sleeve.",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    careInstructions:
      "Wipe with a damp cloth. Apply leather conditioner every 6 months. Avoid prolonged exposure to direct sunlight.",
  },
  {
    id: "2",
    name: "Hand-stitched Bifold Wallet",
    price: 79.99,
    category: "Wallets",
    description:
      "A minimalist bifold wallet, hand-stitched for durability. Made from premium vegetable-tanned leather that will develop a beautiful patina over time.",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    careInstructions:
      "Condition sparingly. The natural oils from your hands will help develop its character.",
  },
  {
    id: "3",
    name: "The Journeyman's Duffel Bag",
    price: 349.99,
    category: "Bags",
    description:
      "Spacious and rugged, this leather duffel bag is your ideal companion for weekend getaways. Features a detachable shoulder strap and solid brass hardware.",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    careInstructions:
      "Wipe with a damp cloth. Apply leather conditioner every 6 months. Avoid prolonged exposure to direct sunlight.",
  },
  {
    id: "4",
    name: "Artisan Leather Belt",
    price: 99.99,
    category: "Accessories",
    description:
      "A sturdy and stylish belt made from a single piece of thick harness leather. The solid buckle is built to last for decades.",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    careInstructions: "Wipe clean with a dry cloth. Condition if it feels dry.",
  },
  {
    id: "5",
    name: "Leather Journal Cover",
    price: 64.99,
    category: "Accessories",
    description:
      "Protect your thoughts and sketches with this elegant A5 journal cover. Includes an integrated pen loop and card slots.",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    careInstructions:
      "Wipe with a damp cloth. Apply leather conditioner every 6 months.",
  },
  {
    id: "6",
    name: "Slim Card Holder",
    price: 49.99,
    category: "Wallets",
    description:
      "For the true minimalist, this slim card holder carries your essential cards and a few folded bills without the bulk.",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    careInstructions:
      "Condition sparingly. The natural oils from your hands will help develop its character.",
  },
    {
    id: "7",
    name: "Leather Messenger Bag",
    price: 289.99,
    category: "Bags",
    description:
      "A versatile messenger bag that blends classic style with modern functionality. Perfect for your daily commute or as a stylish carry-on.",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    careInstructions:
      "Wipe with a damp cloth. Apply leather conditioner every 6 months.",
  },
  {
    id: "8",
    name: "Woven Leather Bracelet",
    price: 39.99,
    category: "Accessories",
    description:
      "A stylish accessory to complete your look. This bracelet is hand-woven from soft, supple leather for a comfortable fit.",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    careInstructions:
      "Avoid getting wet. Wipe with a dry cloth to clean.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Nolwazi Khumalo",
    title: "Founder & CEO",
    bio: "Nolwazi is the visionary behind Impela, driven by a passion for social entrepreneurship and sustainable development.",
    image: "https://placehold.co/400x400.png",
    imageHint: "professional african woman",
    linkedin: "#",
  },
  {
    id: "2",
    name: "Sipho Mbele",
    title: "Head of Operations",
    bio: "Sipho ensures that our training programs and production lines run smoothly, empowering our artisans every day.",
    image: "https://placehold.co/400x400.png",
    imageHint: "professional african man",
    linkedin: "#",
  },
  {
    id: "3",
    name: "Thandiwe Ndlovu",
    title: "Lead Designer",
    bio: "Thandiwe blends traditional techniques with contemporary aesthetics to create our signature product lines.",
    image: "https://placehold.co/400x400.png",
    imageHint: "creative designer working",
    linkedin: "#",
  },
  {
    id: "4",
    name: "Bongani Dlamini",
    title: "Partnerships Manager",
    bio: "Bongani builds and maintains our crucial relationships with NGOs and international market partners.",
    image: "https://placehold.co/400x400.png",
    imageHint: "man shaking hands",
    linkedin: "#",
  },
];

export const partners: Partner[] = [
    {
        id: "1",
        name: "Crafting Futures Foundation",
        type: "NGO",
        description: "A non-profit dedicated to preserving traditional crafts and providing economic opportunities for artisans in rural areas.",
        image: "https://placehold.co/600x400.png",
        imageHint: "charity foundation logo",
    },
    {
        id: "2",
        name: "Artisan Alliance of SA",
        type: "NGO",
        description: "A coalition of artisan groups working together to access new markets and advocate for fair trade practices.",
        image: "https://placehold.co/600x400.png",
        imageHint: "community alliance logo",
    },
    {
        id: "3",
        name: "Global Goods Inc.",
        type: "Corporate",
        description: "An international distributor specializing in ethically sourced, handmade products from around the world.",
        image: "https://placehold.co/600x400.png",
        imageHint: "global business logo",
    },
];

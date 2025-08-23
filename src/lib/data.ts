
import type { Partner, Training } from "./types";


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

export const trainings: Training[] = [
  {
    id: "1",
    title: "Leatherworking Fundamentals",
    description: "Master the basics of leather crafting, from selecting hides to cutting, stitching, and finishing.",
    modules: ["Tool safety and usage", "Hand-stitching techniques", "Edge finishing and burnishing", "Basic pattern making"],
    image: "https://placehold.co/600x400.png",
    imageHint: "leatherworking tools"
  },
  {
    id: "2",
    title: "Advanced Product Design",
    description: "Develop your design skills to create complex and innovative leather goods like bags and briefcases.",
    modules: ["Advanced construction methods", "Hardware setting", "Lining and reinforcement", "Prototyping and refinement"],
    image: "https://placehold.co/600x400.png",
    imageHint: "design sketchbook blueprint"
  },
  {
    id: "3",
    title: "Entrepreneurship for Artisans",
    description: "Learn the business skills needed to turn your craft into a sustainable enterprise.",
    modules: ["Pricing and costing", "Marketing and branding", "Accessing markets", "Financial literacy"],
    image: "https://placehold.co/600x400.png",
    imageHint: "small business owner"
  },
];

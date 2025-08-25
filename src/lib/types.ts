

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
  id:string;
  name: string;
  title: string;
  bio: string;
  image: string;
  imageHint: string;
  linkedin: string;
};

export type TeamCV = {
    params: { memberId: string };
}

export type Partner = {
  id: string;
  name: string;
  type: 'NGO' | 'Corporate' | 'Government';
  description: string;
  image: string;
  imageHint: string;
};

export type Training = {
  id: string;
  title: string;
  description: string;
  modules: string[];
  image: string;
  imageHint: string;
};

// Generic type for a library item that has at least one image URL.
export type LibraryItem = {
    images?: (string | { url: string })[];
    image?: string;
}

export type HomePageContent = {
    hero: {
        headline: string;
        subheadline: string;
        imageUrls: string[];
        imageAlt: string;
        buttonText: string;
        buttonLink: string;
        autoplayDelay: number;
    };
    about: {
        headline: string;
        description: string;
        imageUrl: string;
        imageAlt: string;
        linkText: string;
        linkUrl: string;
    };
    coreActivities: {
        headline: string;
        description: string;
        cards: {
            artisanTraining: {
                title: string;
                description: string;
                linkText: string;
                linkUrl: string;
            };
            internationalMarkets: {
                title: string;
                description: string;
                linkText: string;
                linkUrl: string;
            };
            ngoPartnerships: {
                title: string;
                description: string;
                linkText: string;
                linkUrl: string;
            };
        };
    };
};

export type SiteSettings = {
    logoUrl: string;
}

export type FooterLink = {
  text: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type ContactDetails = {
    address: string;
    phone: string;
    hours: string;
}

export type FooterContent = {
  newsletter: {
    headline: string;
    description: string;
  };
  columns: FooterColumn[];
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  contact: ContactDetails;
  legal: {
    copyright: string;
    privacyPolicy: FooterLink;
    termsOfService: FooterLink;
  };
  disclaimer: string;
};

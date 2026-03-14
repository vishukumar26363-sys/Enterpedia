import { Product } from "./types";

export const categories = [
  "All",
  "Ebooks",
  "Templates",
  "Graphics",
  "Software",
];

export const products: Product[] = [
  {
    id: "1",
    title: "The 6-Day YouTube Accelerator",
    description:
      "Email course designed to help you provide expert guidance on YouTube ads while upselling your services.",
    price: 10.0,
    category: "Templates",
    imageUrl: "https://picsum.photos/seed/youtube/800/600",
    features: [
      "6-Day Email Course Sequence",
      "YouTube Ads Strategy Guide",
      "Upsell Templates",
      "Commercial License",
    ],
    rating: 4.9,
    reviews: 156,
  },
  {
    id: "2",
    title: "100+ Premium Logo Templates",
    description:
      "High-quality minimalist logo templates for startups and small businesses. Includes source files.",
    price: 10.0,
    category: "Graphics",
    imageUrl: "https://picsum.photos/seed/logos/600/400",
    features: [
      "AI & EPS Formats",
      "Fully Scalable",
      "Private Label Rights",
      "Free Fonts Included",
    ],
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "3",
    title: "Passive Income Blueprint Ebook",
    description:
      "A 50-page guide on building passive income streams. Rebrand it and sell it as your own.",
    price: 10.0,
    category: "Ebooks",
    imageUrl: "https://picsum.photos/seed/ebook/600/400",
    features: [
      "50 Pages of Content",
      "Word & PDF Formats",
      "Unrestricted PLR",
      "Ready-to-sell Sales Page",
    ],
    rating: 4.5,
    reviews: 210,
  },
  {
    id: "4",
    title: "Email Marketing Automation Scripts",
    description:
      "Plug-and-play email sequences for welcome series, abandoned cart, and product launches.",
    price: 10.0,
    category: "Templates",
    imageUrl: "https://picsum.photos/seed/email/600/400",
    features: [
      "50+ Email Templates",
      "High Converting Copy",
      "Master Resell Rights",
      "Niche Agnostic",
    ],
    rating: 5.0,
    reviews: 56,
  },
  {
    id: "5",
    title: "SEO Audit Tool Software",
    description:
      "White-label SEO audit software you can rebrand and sell to local businesses.",
    price: 10.0,
    category: "Software",
    imageUrl: "https://picsum.photos/seed/software/600/400",
    features: [
      "White-label Dashboard",
      "Unlimited Audits",
      "Source Code Included",
      "Resell Rights",
    ],
    rating: 4.7,
    reviews: 42,
  },
  {
    id: "6",
    title: "Minimalist Presentation Deck",
    description:
      "Clean and modern slide deck templates for pitches, webinars, and courses.",
    price: 10.0,
    category: "Templates",
    imageUrl: "https://picsum.photos/seed/presentation/600/400",
    features: [
      "100+ Unique Slides",
      "PowerPoint & Keynote",
      "Private Label Rights",
      "Drag & Drop Ready",
    ],
    rating: 4.6,
    reviews: 112,
  },
  {
    id: "7",
    title: "Digital Marketing Video Course",
    description:
      "A 10-module video course on digital marketing basics. Sell it to your audience.",
    price: 10.0,
    category: "Ebooks", // Putting under Ebooks/Courses for simplicity
    imageUrl: "https://picsum.photos/seed/course/600/400",
    features: [
      "10 HD Video Modules",
      "Transcripts Included",
      "Master Resell Rights",
      "Marketing Materials",
    ],
    rating: 4.9,
    reviews: 78,
  },
  {
    id: "8",
    title: "Abstract Background Bundle",
    description:
      "500+ high-resolution abstract backgrounds for web design, social media, and print.",
    price: 10.0,
    category: "Graphics",
    imageUrl: "https://picsum.photos/seed/abstract/600/400",
    features: [
      "4K Resolution",
      "500+ Images",
      "Commercial Use License",
      "Royalty Free",
    ],
    rating: 4.4,
    reviews: 305,
  },
];

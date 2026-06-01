import {
  FileText,
  Globe,
  Layers,
  Link2,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Static year for SSR-safe footer (update annually). */
export const COPYRIGHT_YEAR = 2026;

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "What's live", href: "#product-status" },
  { label: "Get started", href: "#cta" },
] as const;

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: FileText,
    title: "Resume assets",
    description:
      "Create resume drafts in your workspace. A dedicated resume builder is coming next.",
  },
  {
    icon: Globe,
    title: "Portfolio builder",
    description:
      "Build and publish a public portfolio with projects, bio, skills, and links.",
  },
  {
    icon: Sparkles,
    title: "AI writing help",
    description:
      "Improve project descriptions and professional copy in the portfolio editor.",
  },
  {
    icon: Layers,
    title: "Unified workspace",
    description:
      "Manage resume, portfolio, and website assets under one account—each on its own terms.",
  },
  {
    icon: Link2,
    title: "Public portfolio URL",
    description:
      "Share a clean public page with employers and clients when your portfolio is ready.",
  },
  {
    icon: Zap,
    title: "Simple publishing",
    description:
      "Choose a username and publish your portfolio when you are ready. Unpublish anytime.",
  },
];

export const steps = [
  {
    step: "01",
    title: "Create assets in your workspace",
    description:
      "Start resume, portfolio, or website drafts from one place. Each asset stays separate and under your control.",
  },
  {
    step: "02",
    title: "Build your content",
    description:
      "Use the portfolio builder to add projects, experience, and the details that represent your work.",
  },
  {
    step: "03",
    title: "Improve with AI",
    description:
      "Polish project descriptions with AI—clear, professional, and grounded in what you actually did.",
  },
  {
    step: "04",
    title: "Publish and share",
    description:
      "Publish your portfolio to a public URL and share it when you are ready. More asset types will follow.",
  },
] as const;

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Example portfolio", href: "/portfolio/demo" },
    { label: "Get started", href: "/builder" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
} as const;

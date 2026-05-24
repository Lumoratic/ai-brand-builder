import {
  Brain,
  Globe,
  Layout,
  Palette,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Static year for SSR-safe footer (update annually). */
export const COPYRIGHT_YEAR = 2026;

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#cta" },
] as const;

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: Brain,
    title: "AI Resume Writer",
    description:
      "Turn bullet points into compelling narratives. Our AI tailors tone, keywords, and structure for every role you target.",
  },
  {
    icon: Globe,
    title: "Personal Brand Site",
    description:
      "Launch a stunning portfolio site in minutes—custom domain ready, SEO optimized, and designed to convert visitors into opportunities.",
  },
  {
    icon: Palette,
    title: "Premium Templates",
    description:
      "Choose from curated, designer-crafted layouts inspired by top tech portfolios and executive resumes.",
  },
  {
    icon: Zap,
    title: "One-Click Publish",
    description:
      "Go live instantly. Update your resume and site from a single dashboard—changes sync everywhere automatically.",
  },
  {
    icon: Layout,
    title: "ATS-Optimized",
    description:
      "Every export passes applicant tracking systems. Smart formatting ensures your experience never gets lost in parsing.",
  },
  {
    icon: Sparkles,
    title: "Brand Consistency",
    description:
      "Unified colors, typography, and voice across resume, cover letter, and website—your brand, perfectly aligned.",
  },
];

export const steps = [
  {
    step: "01",
    title: "Upload or paste",
    description:
      "Import your LinkedIn, existing resume, or start from scratch. We parse everything intelligently.",
  },
  {
    step: "02",
    title: "AI crafts your story",
    description:
      "Our engine refines experience, skills, and achievements into recruiter-ready copy and layouts.",
  },
  {
    step: "03",
    title: "Customize & preview",
    description:
      "Pick a template, tweak colors and sections, and preview your resume and live site side by side.",
  },
  {
    step: "04",
    title: "Publish & share",
    description:
      "Download PDF, share a link, or deploy your personal brand site with one click.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "I landed three interviews in two weeks after switching to BrandSpark. The AI resume copy alone was worth it.",
    author: "Sarah Chen",
    role: "Product Designer",
    company: "Stripe",
    avatar: "SC",
  },
  {
    quote:
      "Finally a tool that treats your personal brand as seriously as your work. My portfolio site looks like I hired an agency.",
    author: "Marcus Rivera",
    role: "Engineering Lead",
    company: "Vercel",
    avatar: "MR",
  },
  {
    quote:
      "The ATS optimization actually works. I went from zero callbacks to multiple offers in one hiring cycle.",
    author: "Priya Patel",
    role: "Data Scientist",
    company: "Notion",
    avatar: "PP",
  },
] as const;

export const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Templates", href: "#" },
    { label: "Pricing", href: "#cta" },
    { label: "Changelog", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
} as const;

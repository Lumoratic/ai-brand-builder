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
  { label: "Early access", href: "#testimonials" },
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
    title: "Resume Builder",
    description:
      "Create a professional resume from your profile data—structured, consistent, and ready to share.",
  },
  {
    icon: Globe,
    title: "Portfolio Website",
    description:
      "Launch a public portfolio without managing a separate website. Your work, presented cleanly.",
  },
  {
    icon: Sparkles,
    title: "AI Writing Assistant",
    description:
      "Improve bios, project descriptions, and professional copy without starting from a blank page.",
  },
  {
    icon: Layers,
    title: "One Source of Truth",
    description:
      "Update your information once and keep your resume, portfolio, and profile in sync.",
  },
  {
    icon: Link2,
    title: "Public Profile",
    description:
      "Share a clean public URL with employers and clients—your professional presence, always current.",
  },
  {
    icon: Zap,
    title: "Easy Publishing",
    description:
      "Publish your professional presence in minutes. Choose a username and go live when you're ready.",
  },
];

export const steps = [
  {
    step: "01",
    title: "Create your profile",
    description:
      "Add your name, role, bio, and the basics that define your professional story.",
  },
  {
    step: "02",
    title: "Add experience, projects, and skills",
    description:
      "Build out featured work, capabilities, and the details that belong on a resume and portfolio.",
  },
  {
    step: "03",
    title: "Generate and improve professional content",
    description:
      "Polish project descriptions and copy with AI—clear, professional, and true to what you actually did.",
  },
  {
    step: "04",
    title: "Publish your portfolio and resume",
    description:
      "Share a public portfolio URL and keep everything aligned from one profile.",
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

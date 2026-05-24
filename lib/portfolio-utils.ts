import type { BuilderProfile } from "@/lib/stores/builderStore";
import { parseSkills } from "@/lib/stores/builderStore";

export function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function contactEmail(fullName: string): string {
  const slug = fullName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ".")
    .replace(/[^a-z0-9.]/g, "");
  return slug ? `${slug}@email.com` : "hello@email.com";
}

export function displayValue(value: string, fallback: string): string {
  return value.trim() || fallback;
}

export function getFirstName(fullName: string): string {
  const trimmed = fullName.trim();
  if (!trimmed) return "You";
  return trimmed.split(/\s+/)[0];
}

export type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  thumbnailUrl?: string;
  outcome?: string;
};

export function getFeaturedProjects(profile: BuilderProfile): PortfolioProject[] {
  return profile.projects
    .filter(
      (project) =>
        project.title.trim() ||
        project.description.trim() ||
        project.outcome.trim()
    )
    .map((project) => ({
      id: project.id,
      title: project.title.trim(),
      description: project.description.trim(),
      techStack: parseSkills(project.techStack),
      thumbnailUrl: project.thumbnailUrl.trim() || undefined,
      outcome: project.outcome.trim() || undefined,
    }));
}

export function hasFeaturedProjects(profile: BuilderProfile): boolean {
  return getFeaturedProjects(profile).length > 0;
}

export type PortfolioService = {
  id: string;
  title: string;
  description: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

/** Three editorial capability blocks — always derived from skills + role. */
export function buildServices(profile: BuilderProfile): PortfolioService[] {
  const skills = parseSkills(profile.skills);
  if (skills.length === 0) return [];

  const role = profile.jobTitle.trim();
  const rolePhrase = role ? ` as a ${role.toLowerCase()}` : "";
  const [primary, secondary, tertiary] = skills;

  const secondarySkills = [secondary, tertiary].filter(Boolean).join(" and ");

  return [
    {
      id: "expertise",
      title: primary,
      description: role
        ? `The work I take on most often${rolePhrase} — owning ${primary.toLowerCase()} from early direction through delivery, with enough context to make good calls without constant oversight.`
        : `Where I spend most of my time — ${primary.toLowerCase()} work that needs someone in the details, making decisions that hold up after handoff.`,
    },
    {
      id: "breadth",
      title: secondarySkills || "Cross-functional continuity",
      description: secondarySkills
        ? `${secondarySkills} often come into play when a project crosses disciplines. I stay useful through those shifts — same thread of thinking, fewer gaps between phases.`
        : "Useful when projects cross disciplines — I keep continuity through handoffs instead of treating each phase like a fresh start.",
    },
    {
      id: "collaboration",
      title: "Working together",
      description: role
        ? `Direct, async-friendly, and honest about scope upfront. Short feedback loops over big reveals — especially when you need a ${role.toLowerCase()} to move something forward, not add process.`
        : "Direct communication, async-friendly rhythms, and scope conversations before they become problems. I'd rather flag a constraint early than polish something that misses the point.",
    },
  ];
}

export function buildSocialLinks(profile: BuilderProfile): SocialLink[] {
  const email = contactEmail(profile.fullName);

  return [
    {
      id: "email",
      label: "Email",
      href: `mailto:${email}`,
    },
    {
      id: "contact",
      label: "Contact",
      href: "#contact",
    },
    {
      id: "about",
      label: "About",
      href: "#about",
    },
  ];
}

export function hasPortfolioContent(profile: BuilderProfile): boolean {
  return Boolean(
    profile.fullName.trim() ||
      profile.jobTitle.trim() ||
      profile.headline.trim() ||
      profile.bio.trim() ||
      profile.skills.trim() ||
      profile.avatarUrl.trim() ||
      hasFeaturedProjects(profile)
  );
}

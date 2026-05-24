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
  link?: string;
  techStack: string[];
};

export function getFeaturedProjects(profile: BuilderProfile): PortfolioProject[] {
  return profile.projects
    .filter((project) => project.title.trim() || project.description.trim())
    .map((project) => ({
      id: project.id,
      title: project.title.trim(),
      description: project.description.trim(),
      link: project.link.trim() || undefined,
      techStack: parseSkills(project.techStack),
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

export type PortfolioStat = {
  id: string;
  label: string;
  value: string;
};

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

export function buildServices(profile: BuilderProfile): PortfolioService[] {
  const skills = parseSkills(profile.skills);
  const role = profile.jobTitle.trim();

  return skills.slice(0, 6).map((skill) => ({
    id: skill,
    title: skill,
    description: role
      ? `${skill} delivered with the perspective of a ${role.toLowerCase()}.`
      : `Professional ${skill.toLowerCase()} for teams that value clarity and craft.`,
  }));
}

export function buildStats(profile: BuilderProfile): PortfolioStat[] {
  const skills = parseSkills(profile.skills);
  const hasBio = profile.bio.trim().length > 0;
  const hasRole = profile.jobTitle.trim().length > 0;
  const projectCount = getFeaturedProjects(profile).length;

  return [
    {
      id: "projects",
      label: "Featured projects",
      value: projectCount > 0 ? String(projectCount) : "—",
    },
    {
      id: "skills",
      label: "Core skills",
      value: skills.length > 0 ? String(skills.length) : "—",
    },
    {
      id: "role",
      label: "Current focus",
      value: hasRole ? profile.jobTitle.trim() : "—",
    },
    {
      id: "profile",
      label: "Profile status",
      value: hasBio ? "Complete" : "In progress",
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

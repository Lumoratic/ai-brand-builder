import type { BuilderProfile, FeaturedProject } from "@/lib/stores/builderStore";
import type { ProfileInsert, ProfileLink, ProfileRow } from "@/lib/profile/types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseProject(value: unknown): FeaturedProject | null {
  if (!isRecord(value) || typeof value.id !== "string") return null;

  return {
    id: value.id,
    title: typeof value.title === "string" ? value.title : "",
    description: typeof value.description === "string" ? value.description : "",
    techStack: typeof value.techStack === "string" ? value.techStack : "",
    thumbnailUrl:
      typeof value.thumbnailUrl === "string" ? value.thumbnailUrl : "",
    outcome: typeof value.outcome === "string" ? value.outcome : "",
  };
}

function parseLink(value: unknown): ProfileLink | null {
  if (!isRecord(value) || typeof value.id !== "string") return null;

  return {
    id: value.id,
    label: typeof value.label === "string" ? value.label : "",
    href: typeof value.href === "string" ? value.href : "",
    external: typeof value.external === "boolean" ? value.external : undefined,
  };
}

export function parseProjects(value: unknown): FeaturedProject[] {
  if (!Array.isArray(value)) return [];
  return value.map(parseProject).filter((project): project is FeaturedProject =>
    Boolean(project)
  );
}

export function parseLinks(value: unknown): ProfileLink[] {
  if (!Array.isArray(value)) return [];
  return value.map(parseLink).filter((link): link is ProfileLink => Boolean(link));
}

export function profileToRow(userId: string, profile: BuilderProfile): ProfileInsert {
  return {
    id: userId,
    full_name: profile.fullName,
    role: profile.jobTitle,
    tagline: profile.headline,
    bio: profile.bio,
    skills: profile.skills,
    avatar: profile.avatarUrl,
    links: profile.links,
    projects: profile.projects,
  };
}

export function rowToProfile(row: ProfileRow): BuilderProfile {
  return {
    fullName: row.full_name ?? "",
    jobTitle: row.role ?? "",
    headline: row.tagline ?? "",
    bio: row.bio ?? "",
    skills: row.skills ?? "",
    avatarUrl: row.avatar ?? "",
    links: parseLinks(row.links),
    projects: parseProjects(row.projects),
  };
}

export function isEmptyProfile(profile: BuilderProfile) {
  return (
    !profile.fullName.trim() &&
    !profile.jobTitle.trim() &&
    !profile.headline.trim() &&
    !profile.bio.trim() &&
    !profile.skills.trim() &&
    !profile.avatarUrl.trim() &&
    profile.links.length === 0 &&
    profile.projects.length === 0
  );
}

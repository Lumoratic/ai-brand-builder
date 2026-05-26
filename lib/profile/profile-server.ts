import { rowToProfile } from "@/lib/profile/mappers";
import type { ProfileRow } from "@/lib/profile/types";
import { isValidUsername, sanitizeUsername } from "@/lib/profile/username";
import { createClient } from "@/lib/supabase/server";
import type { BuilderProfile } from "@/lib/stores/builderStore";

const PROFILE_SELECT =
  "id, full_name, role, tagline, bio, skills, avatar, username, is_published, links, projects, created_at, updated_at";

export async function fetchPublishedProfileByUsername(
  username: string
): Promise<BuilderProfile | null> {
  const normalized = sanitizeUsername(username);
  if (!isValidUsername(normalized)) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select(PROFILE_SELECT)
    .eq("username", normalized)
    .eq("is_published", true)
    .maybeSingle();

  if (error || !data) return null;

  return rowToProfile(data as ProfileRow);
}

export function buildPublicPortfolioMetadata(profile: BuilderProfile) {
  const name = profile.fullName.trim() || "Portfolio";
  const role = profile.jobTitle.trim();
  const tagline = profile.headline.trim();

  const title = role ? `${name} — ${role}` : name;
  const description =
    tagline ||
    profile.bio.trim().slice(0, 160) ||
    `${name}'s personal portfolio on BrandSpark.`;

  return { title, description };
}

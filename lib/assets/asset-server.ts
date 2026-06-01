import {
  parsePortfolioAssetData,
  portfolioAssetDataToBuilderProfile,
} from "@/lib/assets/mappers";
import type { AssetRow } from "@/lib/assets/types";
import { isValidSlug, sanitizeSlug } from "@/lib/assets/slug";
import {
  isValidUsername,
  sanitizeUsername,
} from "@/lib/profile/username";
import { createClient } from "@/lib/supabase/server";
import type { BuilderProfile } from "@/lib/stores/builderStore";

const ASSET_SELECT =
  "id, user_id, type, title, slug, data, is_published, created_at, updated_at";

export async function fetchPublishedPortfolioAsset(
  username: string,
  slug: string
): Promise<BuilderProfile | null> {
  const normalizedUsername = sanitizeUsername(username);
  const normalizedSlug = sanitizeSlug(slug);

  if (!isValidUsername(normalizedUsername) || !isValidSlug(normalizedSlug)) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("assets")
    .select(ASSET_SELECT)
    .eq("type", "portfolio")
    .eq("slug", normalizedSlug)
    .eq("is_published", true)
    .maybeSingle();

  if (error || !data) return null;

  const asset = data as AssetRow;
  const parsed = parsePortfolioAssetData(asset.data);

  if (sanitizeUsername(parsed.publicUsername) !== normalizedUsername) {
    return null;
  }

  return portfolioAssetDataToBuilderProfile(parsed, true);
}

export function buildPublicPortfolioAssetMetadata(profile: BuilderProfile) {
  const name = profile.fullName.trim() || "Portfolio";
  const role = profile.jobTitle.trim();
  const tagline = profile.headline.trim();

  const title = role ? `${name} — ${role}` : name;
  const description =
    tagline ||
    profile.bio.trim().slice(0, 160) ||
    `${name}'s portfolio on Pflio.`;

  return { title, description };
}

import { createClient } from "@/lib/supabase/client";
import { createEmptyPortfolioAssetData } from "@/lib/assets/mappers";
import { createEmptyResumeAssetData } from "@/lib/assets/resume-data";
import type { AssetInsert, AssetRow, AssetType, AssetUpdate } from "@/lib/assets/types";
import { DEFAULT_ASSET_TITLES } from "@/lib/assets/types";
import { isValidSlug, sanitizeSlug } from "@/lib/assets/slug";

const ASSET_SELECT =
  "id, user_id, type, title, slug, data, is_published, created_at, updated_at";

export async function getUserAssets(userId: string): Promise<AssetRow[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("assets")
    .select(ASSET_SELECT)
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AssetRow[];
}

export async function createAsset(
  userId: string,
  type: AssetType,
  title?: string
): Promise<AssetRow> {
  const supabase = createClient();

  const row: AssetInsert = {
    user_id: userId,
    type,
    title: title?.trim() || DEFAULT_ASSET_TITLES[type],
    data:
      type === "portfolio"
        ? createEmptyPortfolioAssetData()
        : type === "resume"
          ? createEmptyResumeAssetData()
          : {},
  };

  const { data, error } = await supabase
    .from("assets")
    .insert(row)
    .select(ASSET_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AssetRow;
}

export async function getAssetById(id: string): Promise<AssetRow | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("assets")
    .select(ASSET_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data as AssetRow | null;
}

export async function updateAsset(
  id: string,
  updates: AssetUpdate
): Promise<AssetRow> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("assets")
    .update(updates)
    .eq("id", id)
    .select(ASSET_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AssetRow;
}

export async function deleteAsset(id: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("assets").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function isAssetSlugAvailable(
  userId: string,
  slug: string,
  excludeAssetId?: string
): Promise<boolean> {
  const normalized = sanitizeSlug(slug);
  if (!normalized || !isValidSlug(normalized)) return false;

  const supabase = createClient();

  let query = supabase
    .from("assets")
    .select("id")
    .eq("user_id", userId)
    .eq("slug", normalized);

  if (excludeAssetId) {
    query = query.neq("id", excludeAssetId);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return !data;
}

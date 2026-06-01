import type { Json } from "@/lib/database.types";

export const ASSET_TYPES = ["resume", "portfolio", "website"] as const;

export type AssetType = (typeof ASSET_TYPES)[number];

export type AssetRow = {
  id: string;
  user_id: string;
  type: AssetType;
  title: string;
  slug: string | null;
  data: Json;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type AssetInsert = {
  user_id: string;
  type: AssetType;
  title: string;
  slug?: string | null;
  data?: Json;
  is_published?: boolean;
};

export type AssetUpdate = {
  title?: string;
  slug?: string | null;
  data?: Json;
  is_published?: boolean;
};

export const DEFAULT_ASSET_TITLES: Record<AssetType, string> = {
  resume: "Untitled Resume",
  portfolio: "Untitled Portfolio",
  website: "Untitled Website",
};

export const ASSET_TYPE_LABELS: Record<AssetType, string> = {
  resume: "Resume",
  portfolio: "Portfolio",
  website: "Website",
};

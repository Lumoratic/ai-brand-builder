import type { BuilderProfile } from "@/lib/stores/builderStore";

export const PORTFOLIO_ASSET_DATA_VERSION = 1 as const;

/** Portfolio editor payload stored in assets.data (jsonb). */
export type PortfolioAssetDataV1 = {
  version: typeof PORTFOLIO_ASSET_DATA_VERSION;
  /** Account public handle used in /u/[username]/portfolio/[slug]. */
  publicUsername: string;
  profile: Omit<BuilderProfile, "username" | "isPublished">;
};

export type PortfolioEditorState = {
  profile: BuilderProfile;
  portfolioSlug: string;
};

import type { Json } from "@/lib/database.types";
import { parseLinks, parseProjects } from "@/lib/profile/mappers";
import type { AssetRow } from "@/lib/assets/types";
import {
  PORTFOLIO_ASSET_DATA_VERSION,
  type PortfolioAssetDataV1,
  type PortfolioEditorState,
} from "@/lib/assets/portfolio-data";
import { sanitizeSlug } from "@/lib/assets/slug";
import { sanitizeUsername } from "@/lib/profile/username";
import type { BuilderProfile } from "@/lib/stores/builderStore";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function emptyPortfolioProfile(): Omit<BuilderProfile, "username" | "isPublished"> {
  return {
    fullName: "",
    jobTitle: "",
    headline: "",
    bio: "",
    skills: "",
    avatarUrl: "",
    links: [],
    projects: [],
  };
}

export function createEmptyPortfolioAssetData(): PortfolioAssetDataV1 {
  return {
    version: PORTFOLIO_ASSET_DATA_VERSION,
    publicUsername: "",
    profile: emptyPortfolioProfile(),
  };
}

function parsePortfolioProfile(value: unknown): PortfolioAssetDataV1["profile"] {
  if (!isRecord(value)) return emptyPortfolioProfile();

  return {
    fullName: typeof value.fullName === "string" ? value.fullName : "",
    jobTitle: typeof value.jobTitle === "string" ? value.jobTitle : "",
    headline: typeof value.headline === "string" ? value.headline : "",
    bio: typeof value.bio === "string" ? value.bio : "",
    skills: typeof value.skills === "string" ? value.skills : "",
    avatarUrl: typeof value.avatarUrl === "string" ? value.avatarUrl : "",
    links: parseLinks(value.links),
    projects: parseProjects(value.projects),
  };
}

export function parsePortfolioAssetData(value: Json | unknown): PortfolioAssetDataV1 {
  if (!isRecord(value)) return createEmptyPortfolioAssetData();

  if (value.version !== PORTFOLIO_ASSET_DATA_VERSION) {
    return createEmptyPortfolioAssetData();
  }

  return {
    version: PORTFOLIO_ASSET_DATA_VERSION,
    publicUsername:
      typeof value.publicUsername === "string" ? value.publicUsername : "",
    profile: parsePortfolioProfile(value.profile),
  };
}

export function assetRowToPortfolioEditorState(asset: AssetRow): PortfolioEditorState {
  const data = parsePortfolioAssetData(asset.data);

  return {
    profile: {
      ...data.profile,
      username: data.publicUsername,
      isPublished: asset.is_published ?? false,
    },
    portfolioSlug: asset.slug ?? "",
  };
}

export function portfolioEditorStateToAssetPayload(
  state: PortfolioEditorState
): {
  data: PortfolioAssetDataV1;
  slug: string | null;
  is_published: boolean;
  title: string;
} {
  const publicUsername = sanitizeUsername(state.profile.username);
  const slug = sanitizeSlug(state.portfolioSlug);
  const hasValidUsername = Boolean(publicUsername);
  const hasValidSlug = Boolean(slug);

  return {
    data: {
      version: PORTFOLIO_ASSET_DATA_VERSION,
      publicUsername,
      profile: {
        fullName: state.profile.fullName,
        jobTitle: state.profile.jobTitle,
        headline: state.profile.headline,
        bio: state.profile.bio,
        skills: state.profile.skills,
        avatarUrl: state.profile.avatarUrl,
        links: state.profile.links,
        projects: state.profile.projects,
      },
    },
    slug: hasValidSlug ? slug : null,
    is_published:
      state.profile.isPublished && hasValidUsername && hasValidSlug,
    title: state.profile.fullName.trim() || "Untitled Portfolio",
  };
}

export function portfolioAssetDataToBuilderProfile(
  data: PortfolioAssetDataV1,
  isPublished: boolean
): BuilderProfile {
  return {
    ...data.profile,
    username: data.publicUsername,
    isPublished,
  };
}

import {
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  getPublicSiteOrigin,
  isValidUsername,
  sanitizeUsername,
} from "@/lib/profile/username";

export type SlugAvailabilityStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "invalid"
  | "required";

export function sanitizeSlug(input: string): string {
  return sanitizeUsername(input);
}

export function isValidSlug(slug: string): boolean {
  return isValidUsername(slug);
}

export function getSlugError(slug: string): string | null {
  const normalized = sanitizeSlug(slug);

  if (!normalized) {
    return "Portfolio slug is required to publish.";
  }
  if (normalized.length < USERNAME_MIN_LENGTH) {
    return `Slug must be at least ${USERNAME_MIN_LENGTH} characters.`;
  }
  if (normalized.length > USERNAME_MAX_LENGTH) {
    return `Slug must be ${USERNAME_MAX_LENGTH} characters or fewer.`;
  }
  if (!isValidSlug(normalized)) {
    return "Use lowercase letters, numbers, and hyphens only.";
  }

  return null;
}

export function getSlugAvailabilityLabel(
  status: SlugAvailabilityStatus
): string | null {
  switch (status) {
    case "checking":
      return "Checking…";
    case "available":
      return "Available";
    case "taken":
      return "Already taken";
    case "invalid":
      return "Invalid slug";
    case "required":
      return "Required for publishing";
    default:
      return null;
  }
}

export function canPublishWithSlugStatus(
  status: SlugAvailabilityStatus,
  slug: string
): boolean {
  const normalized = sanitizeSlug(slug);
  if (!normalized || !isValidSlug(normalized)) return false;
  if (status === "checking" || status === "taken") return false;
  if (status === "available" || status === "idle") return true;
  return false;
}

export function getPublicPortfolioAssetPath(
  username: string,
  slug: string
): string {
  const normalizedUsername = sanitizeUsername(username);
  const normalizedSlug = sanitizeSlug(slug);

  if (!normalizedUsername || !normalizedSlug) {
    return "/u/your-username/portfolio/your-slug";
  }

  return `/u/${normalizedUsername}/portfolio/${normalizedSlug}`;
}

export function getPublicPortfolioAssetUrl(
  username: string,
  slug: string
): string {
  return `${getPublicSiteOrigin()}${getPublicPortfolioAssetPath(username, slug)}`;
}

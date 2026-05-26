export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 30;
const USERNAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$/;

export type UsernameAvailabilityStatus =
  | "idle"
  | "checking"
  | "available"
  | "taken"
  | "invalid"
  | "required";

export function sanitizeUsername(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, USERNAME_MAX_LENGTH);
}

export function isValidUsername(username: string): boolean {
  const normalized = sanitizeUsername(username);
  if (!normalized) return false;
  if (normalized.length < USERNAME_MIN_LENGTH) return false;
  if (normalized.length > USERNAME_MAX_LENGTH) return false;
  return USERNAME_PATTERN.test(normalized);
}

export function getUsernameError(username: string): string | null {
  const normalized = sanitizeUsername(username);

  if (!normalized) {
    return "Username is required to publish.";
  }
  if (normalized.length < USERNAME_MIN_LENGTH) {
    return `Username must be at least ${USERNAME_MIN_LENGTH} characters.`;
  }
  if (normalized.length > USERNAME_MAX_LENGTH) {
    return `Username must be ${USERNAME_MAX_LENGTH} characters or fewer.`;
  }
  if (!USERNAME_PATTERN.test(normalized)) {
    return "Use lowercase letters, numbers, and hyphens only.";
  }

  return null;
}

export function getUsernameAvailabilityLabel(
  status: UsernameAvailabilityStatus
): string | null {
  switch (status) {
    case "checking":
      return "Checking…";
    case "available":
      return "Available";
    case "taken":
      return "Already taken";
    case "invalid":
      return "Invalid username";
    case "required":
      return "Required for publishing";
    default:
      return null;
  }
}

export function canPublishWithUsernameStatus(
  status: UsernameAvailabilityStatus,
  username: string
): boolean {
  const normalized = sanitizeUsername(username);
  if (!normalized || !isValidUsername(normalized)) return false;
  if (status === "checking" || status === "taken") return false;
  if (status === "available" || status === "idle") return true;
  return false;
}

export function getPublicSiteOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  return "https://pflio.com";
}

export function getPublicPortfolioPath(username: string): string {
  const normalized = sanitizeUsername(username);
  return normalized ? `/u/${normalized}` : "/u/your-username";
}

export function getPublicPortfolioUrl(username: string): string {
  return `${getPublicSiteOrigin()}${getPublicPortfolioPath(username)}`;
}

export function isUsernameConflictError(message: string): boolean {
  const lower = message.toLowerCase();
  return (
    lower.includes("duplicate key") ||
    lower.includes("profiles_username_key") ||
    lower.includes("unique constraint")
  );
}

export function formatUsernameConflictError(): string {
  return "That username is already taken. Try another one.";
}

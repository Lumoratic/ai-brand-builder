const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 30;
const USERNAME_PATTERN = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$/;

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
    return "Use lowercase letters, numbers, and single hyphens only.";
  }

  return null;
}

export function getPublicPortfolioPath(username: string): string {
  const normalized = sanitizeUsername(username);
  return normalized ? `/u/${normalized}` : "/u/your-username";
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

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

const hits = new Map<string, number[]>();

/** In-memory rate limit placeholder — replace with Redis in production. */
export function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const timestamps = (hits.get(userId) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(userId, timestamps);
    return false;
  }

  timestamps.push(now);
  hits.set(userId, timestamps);
  return true;
}

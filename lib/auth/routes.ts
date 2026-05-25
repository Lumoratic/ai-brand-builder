export const AUTH_ROUTES = {
  login: "/login",
  callback: "/auth/callback",
} as const;

export const PROTECTED_ROUTE_PREFIXES = ["/builder"] as const;

export function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function buildLoginUrl(redirectTo?: string) {
  if (!redirectTo) return AUTH_ROUTES.login;
  return `${AUTH_ROUTES.login}?redirect=${encodeURIComponent(redirectTo)}`;
}

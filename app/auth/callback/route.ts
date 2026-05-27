import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function getRequestOrigin(request: Request): string {
  const { origin } = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return origin;
}

function getSafeRedirectPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/builder";
  }
  return value;
}

function getRedirectTarget(request: Request): string {
  const { searchParams } = new URL(request.url);
  const queryRedirect = searchParams.get("redirect");

  if (queryRedirect) {
    return getSafeRedirectPath(queryRedirect);
  }

  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(/(?:^|;\s*)auth_redirect=([^;]+)/);
  if (!match) return "/builder";

  try {
    return getSafeRedirectPath(decodeURIComponent(match[1]));
  } catch {
    return "/builder";
  }
}

function clearAuthRedirectCookie(response: NextResponse) {
  response.cookies.set("auth_redirect", "", {
    path: "/",
    maxAge: 0,
  });
}

export async function GET(request: Request) {
  const origin = getRequestOrigin(request);
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const redirectTo = getRedirectTarget(request);

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const response = NextResponse.redirect(`${origin}${redirectTo}`);
      clearAuthRedirectCookie(response);
      return response;
    }
  }

  const response = NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
  clearAuthRedirectCookie(response);
  return response;
}

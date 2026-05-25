import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in — BrandSpark",
  description: "Sign in or create an account to build your portfolio.",
};

type LoginPageProps = {
  searchParams: Promise<{
    redirect?: string;
    error?: string;
    mode?: string;
  }>;
};

function getSafeRedirect(redirect?: string) {
  if (!redirect || !redirect.startsWith("/") || redirect.startsWith("//")) {
    return "/builder";
  }
  return redirect;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const redirectTo = getSafeRedirect(params.redirect);
  const initialMode = params.mode === "signup" ? "signup" : "login";
  const callbackError =
    params.error === "auth_callback_failed"
      ? "Authentication failed. Please try again."
      : null;

  return (
    <div className="relative flex min-h-screen flex-col bg-[oklch(0.07_0.012_280)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.35_0.15_280/0.35),transparent)]"
      />

      <header className="relative z-10 px-4 py-6 sm:px-6">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <Sparkles className="size-4 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight text-white">
            BrandSpark
          </span>
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-16 sm:px-6">
        <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[oklch(0.09_0.014_280)]/90 p-8 backdrop-blur-xl">
          {callbackError ? (
            <p
              role="alert"
              className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              {callbackError}
            </p>
          ) : null}
          <AuthForm redirectTo={redirectTo} initialMode={initialMode} />
        </div>
      </main>
    </div>
  );
}

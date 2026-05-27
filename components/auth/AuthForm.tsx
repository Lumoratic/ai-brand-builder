"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthDivider, AuthError, AuthInput } from "@/components/auth/auth-ui";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "signup";

type AuthFormProps = {
  redirectTo?: string;
  initialMode?: AuthMode;
  className?: string;
};

function getAuthErrorMessage(error: { message: string }) {
  const message = error.message.toLowerCase();

  if (message.includes("invalid login credentials")) {
    return "Invalid email or password.";
  }
  if (message.includes("user already registered")) {
    return "An account with this email already exists.";
  }
  if (message.includes("password")) {
    return "Password must be at least 6 characters.";
  }

  return error.message;
}

export function AuthForm({
  redirectTo = "/builder",
  initialMode = "login",
  className,
}: AuthFormProps) {
  const supabase = useMemo(
    () => (hasSupabaseEnv() ? createClient() : null),
    []
  );

  if (!supabase) {
    return (
      <div className={cn("space-y-3 text-center text-sm text-zinc-400", className)}>
        <p>Authentication is not configured yet.</p>
        <p>
          Add your Supabase credentials to{" "}
          <code className="text-zinc-300">.env.local</code> — see{" "}
          <code className="text-zinc-300">.env.example</code>.
        </p>
      </div>
    );
  }

  return (
    <AuthFormInner
      supabase={supabase}
      redirectTo={redirectTo}
      initialMode={initialMode}
      className={className}
    />
  );
}

type AuthFormInnerProps = AuthFormProps & {
  supabase: SupabaseClient;
};

function AuthFormInner({
  supabase,
  redirectTo = "/builder",
  initialMode = "login",
  className,
}: AuthFormInnerProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const isBusy = isSubmitting || isGoogleLoading;

  async function handleEmailAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setInfo(null);
    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
          },
        });

        if (signUpError) throw signUpError;

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setInfo("Check your email to confirm your account, then sign in.");
          return;
        }

        window.location.href = redirectTo;
        return;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      window.location.href = redirectTo;
    } catch (err) {
      setError(getAuthErrorMessage(err as { message: string }));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleAuth() {
    setError(null);
    setInfo(null);
    setIsGoogleLoading(true);

    try {
      if (redirectTo !== "/builder") {
        const secure =
          window.location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `auth_redirect=${encodeURIComponent(redirectTo)}; path=/; max-age=600; SameSite=Lax${secure}`;
      }

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (oauthError) throw oauthError;
    } catch (err) {
      setError(getAuthErrorMessage(err as { message: string }));
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-sm text-zinc-500">
          {mode === "login"
            ? "Sign in to continue building your portfolio."
            : "Start building your personal brand site."}
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={isBusy}
        onClick={handleGoogleAuth}
        className="h-10 w-full border-white/[0.08] bg-white/[0.03] text-zinc-200 hover:bg-white/[0.06] hover:text-white"
      >
        {isGoogleLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        Continue with Google
      </Button>

      <AuthDivider />

      <form onSubmit={handleEmailAuth} className="space-y-4">
        <AuthInput
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          disabled={isBusy}
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="••••••••"
          disabled={isBusy}
        />

        <AuthError message={error} />

        {info ? (
          <p className="rounded-lg border border-violet-500/20 bg-violet-500/10 px-3 py-2 text-sm text-violet-200">
            {info}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isBusy}
          className="h-10 w-full bg-white text-zinc-900 hover:bg-zinc-100"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {mode === "login" ? "Signing in…" : "Creating account…"}
            </>
          ) : mode === "login" ? (
            "Sign in"
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-zinc-500">
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          disabled={isBusy}
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError(null);
            setInfo(null);
          }}
          className="text-zinc-300 underline-offset-4 transition-colors hover:text-white hover:underline disabled:opacity-50"
        >
          {mode === "login" ? "Sign up" : "Sign in"}
        </button>
      </p>

      <p className="text-center text-xs text-zinc-600">
        <Link href="/" className="transition-colors hover:text-zinc-400">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

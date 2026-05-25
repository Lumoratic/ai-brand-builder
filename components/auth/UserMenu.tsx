"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { buildLoginUrl, isProtectedRoute } from "@/lib/auth/routes";
import { cn } from "@/lib/utils";

type UserMenuProps = {
  className?: string;
  redirectTo?: string;
  showBuilderLink?: boolean;
};

function getDisplayName(email?: string | null) {
  if (!email) return "Account";
  return email.split("@")[0];
}

export function UserMenu({
  className,
  redirectTo = "/builder",
  showBuilderLink = true,
}: UserMenuProps) {
  const { user, isLoading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    if (isProtectedRoute(pathname)) {
      router.replace("/");
      router.refresh();
    }
  }

  if (isLoading) {
    return (
      <div
        className={cn("flex items-center gap-2 text-zinc-500", className)}
        aria-hidden
      >
        <Loader2 className="size-4 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <Button
          asChild
          variant="ghost"
          className="text-zinc-300 hover:text-white"
        >
          <Link href={buildLoginUrl(redirectTo)}>Log in</Link>
        </Button>
        {showBuilderLink ? (
          <Button
            asChild
            className="bg-white text-zinc-900 hover:bg-zinc-100"
          >
            <Link href={buildLoginUrl(redirectTo)}>Start free</Link>
          </Button>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="hidden max-w-[140px] truncate text-sm text-zinc-400 sm:inline">
        {getDisplayName(user.email)}
      </span>
      {showBuilderLink ? (
        <Button
          asChild
          variant="outline"
          className="border-white/[0.08] bg-white/[0.03] text-zinc-200 hover:bg-white/[0.06] hover:text-white"
        >
          <Link href="/builder">Builder</Link>
        </Button>
      ) : null}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => handleSignOut()}
        className="text-zinc-400 hover:text-white"
        aria-label="Sign out"
      >
        <LogOut className="size-4" />
        <span className="hidden sm:inline">Sign out</span>
      </Button>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, Globe, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  builderFocusRing,
  builderHelperClassName,
  builderInputClassName,
  builderLabelClassName,
  builderSectionClassName,
} from "@/components/builder/builder-styles";
import { useUsernameAvailability } from "@/hooks/useUsernameAvailability";
import {
  canPublishWithUsernameStatus,
  getPublicPortfolioUrl,
  getUsernameAvailabilityLabel,
  getUsernameError,
  sanitizeUsername,
} from "@/lib/profile/username";
import {
  useBuilderProfile,
  useProfileSyncStatus,
  useSetField,
} from "@/lib/stores/builderStore";
import { cn } from "@/lib/utils";

function UsernameStatus({
  status,
  validationError,
}: {
  status: ReturnType<typeof useUsernameAvailability>;
  validationError: string | null;
}) {
  const label = getUsernameAvailabilityLabel(status);

  if (!label && !validationError) return null;

  const isError = status === "taken" || status === "invalid";
  const isSuccess = status === "available";
  const isPending = status === "checking";

  return (
    <p
      className={cn(
        "flex items-center gap-1.5 text-xs",
        isError && "text-red-400/90",
        isSuccess && "text-emerald-400/80",
        isPending && "text-zinc-500",
        status === "required" && "text-zinc-500"
      )}
      aria-live="polite"
    >
      {isPending ? <Loader2 className="size-3 animate-spin" aria-hidden /> : null}
      {isSuccess ? <Check className="size-3" aria-hidden /> : null}
      <span>
        {status === "invalid" && validationError
          ? validationError
          : label}
      </span>
    </p>
  );
}

export function PublishSettings() {
  const { user } = useAuth();
  const profile = useBuilderProfile();
  const setField = useSetField();
  const syncStatus = useProfileSyncStatus();
  const availabilityStatus = useUsernameAvailability(profile.username, user?.id);
  const [copied, setCopied] = useState(false);

  const normalizedUsername = sanitizeUsername(profile.username);
  const validationError = profile.username ? getUsernameError(profile.username) : null;
  const publicUrl = getPublicPortfolioUrl(profile.username);
  const canPublish = canPublishWithUsernameStatus(
    availabilityStatus,
    profile.username
  );
  const canOpenPublicUrl =
    profile.isPublished &&
    Boolean(normalizedUsername) &&
    !validationError &&
    availabilityStatus !== "taken" &&
    availabilityStatus !== "checking";
  const canCopyUrl = Boolean(normalizedUsername) && !validationError;

  function handleUsernameChange(value: string) {
    setField("username", sanitizeUsername(value));
    setCopied(false);
  }

  function handlePublishToggle() {
    const next = !profile.isPublished;
    if (next && !canPublish) return;
    setField("isPublished", next);
  }

  async function handleCopyUrl() {
    if (!canCopyUrl) return;

    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleOpenUrl() {
    if (!canOpenPublicUrl) return;
    window.open(publicUrl, "_blank", "noopener,noreferrer");
  }

  function getPublishHint(): string | null {
    if (profile.isPublished) {
      return "Your portfolio is live at the public URL.";
    }
    if (!normalizedUsername) {
      return "Choose a username to publish.";
    }
    if (validationError || availabilityStatus === "invalid") {
      return validationError ?? "Fix the username before publishing.";
    }
    if (availabilityStatus === "checking") {
      return "Checking username availability…";
    }
    if (availabilityStatus === "taken") {
      return "This username is already taken. Try another one.";
    }
    return "Only you can preview until you publish.";
  }

  return (
    <section
      className={builderSectionClassName}
      aria-labelledby="publish-heading"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="publish-heading" className={builderLabelClassName}>
            Publish
          </h2>
          <p className={cn("mt-2", builderHelperClassName)}>
            Choose a username and publish your portfolio to a public URL.
          </p>
        </div>
        {syncStatus === "saving" ? (
          <Loader2 className="size-4 shrink-0 animate-spin text-zinc-500" aria-hidden />
        ) : null}
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="username" className={builderLabelClassName}>
            Username
          </label>
          <input
            id="username"
            type="text"
            value={profile.username}
            onChange={(event) => handleUsernameChange(event.target.value)}
            placeholder="alex-morgan"
            className={builderInputClassName}
            autoComplete="off"
            spellCheck={false}
            aria-invalid={Boolean(validationError) || availabilityStatus === "taken"}
            aria-describedby="username-help username-status username-preview"
          />
          <p id="username-help" className={builderHelperClassName}>
            Lowercase letters, numbers, and hyphens · 3–30 characters
          </p>
          <div id="username-status">
            <UsernameStatus
              status={availabilityStatus}
              validationError={validationError}
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            <Globe className="size-3.5" aria-hidden />
            Public URL
          </div>
          {canCopyUrl ? (
            <Link
              id="username-preview"
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-2 block break-all font-mono text-sm text-zinc-300 transition-colors hover:text-white",
                !canOpenPublicUrl && "pointer-events-none text-zinc-500"
              )}
            >
              {publicUrl}
            </Link>
          ) : (
            <p
              id="username-preview"
              className="mt-2 break-all font-mono text-sm text-zinc-500"
            >
              {publicUrl}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!canCopyUrl}
              onClick={handleCopyUrl}
              className={cn(
                "h-8 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white",
                builderFocusRing
              )}
            >
              {copied ? (
                <Check className="size-3.5" aria-hidden />
              ) : (
                <Copy className="size-3.5" aria-hidden />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!canOpenPublicUrl}
              onClick={handleOpenUrl}
              className={cn(
                "h-8 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white",
                builderFocusRing
              )}
            >
              <ExternalLink className="size-3.5" aria-hidden />
              Open
            </Button>
          </div>
        </div>

        <div className="space-y-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-white">
              {profile.isPublished ? "Published" : "Unpublished"}
            </p>
            <p className={cn("mt-1", builderHelperClassName)}>{getPublishHint()}</p>
          </div>
          <Button
            type="button"
            variant={profile.isPublished ? "outline" : "default"}
            disabled={!profile.isPublished && !canPublish}
            onClick={handlePublishToggle}
            className={cn(
              "h-10 w-full rounded-xl",
              builderFocusRing,
              profile.isPublished
                ? "border-red-500/20 bg-red-500/5 text-red-300 hover:bg-red-500/10 hover:text-red-200"
                : "bg-white text-zinc-900 hover:bg-zinc-100",
              "disabled:cursor-not-allowed disabled:opacity-40"
            )}
          >
            {profile.isPublished ? "Unpublish" : "Publish portfolio"}
          </Button>
        </div>
      </div>
    </section>
  );
}

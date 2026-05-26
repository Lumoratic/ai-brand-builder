"use client";

import { Globe, Loader2 } from "lucide-react";
import {
  builderFocusRing,
  builderHelperClassName,
  builderInputClassName,
  builderLabelClassName,
  builderSectionClassName,
} from "@/components/builder/builder-styles";
import {
  getPublicPortfolioPath,
  getUsernameError,
  sanitizeUsername,
} from "@/lib/profile/username";
import {
  useBuilderProfile,
  useProfileSyncStatus,
  useSetField,
} from "@/lib/stores/builderStore";
import { cn } from "@/lib/utils";

export function PublishSettings() {
  const profile = useBuilderProfile();
  const setField = useSetField();
  const syncStatus = useProfileSyncStatus();
  const usernameError = profile.username ? getUsernameError(profile.username) : null;
  const publicPath = getPublicPortfolioPath(profile.username);
  const canPublish = !usernameError && Boolean(sanitizeUsername(profile.username));

  function handleUsernameChange(value: string) {
    setField("username", sanitizeUsername(value));
  }

  function handlePublishToggle() {
    const next = !profile.isPublished;
    if (next && !canPublish) return;
    setField("isPublished", next);
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
            aria-invalid={Boolean(usernameError)}
            aria-describedby="username-help username-preview"
          />
          <p id="username-help" className={builderHelperClassName}>
            Lowercase letters, numbers, and hyphens · 3–30 characters
          </p>
          {usernameError ? (
            <p role="alert" className="text-xs text-red-400/90">
              {usernameError}
            </p>
          ) : null}
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
            <Globe className="size-3.5" aria-hidden />
            Public URL
          </div>
          <p
            id="username-preview"
            className="mt-2 break-all font-mono text-sm text-zinc-300"
          >
            {publicPath}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
          <div>
            <p className="text-sm font-medium text-white">
              {profile.isPublished ? "Published" : "Unpublished"}
            </p>
            <p className={cn("mt-1", builderHelperClassName)}>
              {profile.isPublished
                ? "Your portfolio is live at the public URL."
                : "Only you can preview until you publish."}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={profile.isPublished}
            aria-label={profile.isPublished ? "Unpublish portfolio" : "Publish portfolio"}
            disabled={!profile.isPublished && !canPublish}
            onClick={handlePublishToggle}
            className={cn(
              "relative h-7 w-12 shrink-0 rounded-full border transition-colors duration-200",
              profile.isPublished
                ? "border-violet-500/40 bg-violet-500/80"
                : "border-white/10 bg-white/[0.06]",
              "disabled:cursor-not-allowed disabled:opacity-40",
              builderFocusRing
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-0.5 size-6 rounded-full bg-white shadow-sm transition-transform duration-200",
                profile.isPublished ? "translate-x-5" : "translate-x-0.5"
              )}
            />
          </button>
        </div>
      </div>
    </section>
  );
}

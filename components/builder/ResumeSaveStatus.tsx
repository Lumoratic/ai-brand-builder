"use client";

import { Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  useResumeSyncError,
  useResumeSyncStatus,
} from "@/lib/stores/resumeStore";
import { cn } from "@/lib/utils";

const statusCopy: Record<string, string> = {
  loading: "Loading resume…",
  saving: "Saving…",
  saved: "Saved to cloud",
  error: "Save failed",
  idle: "Cloud sync",
};

export function ResumeSaveStatus() {
  const { user } = useAuth();
  const syncStatus = useResumeSyncStatus();
  const syncError = useResumeSyncError();

  if (!user) {
    return (
      <p className="hidden text-xs text-zinc-500 sm:block">Sign in to save</p>
    );
  }

  const isPending = syncStatus === "loading" || syncStatus === "saving";

  return (
    <p
      className={cn(
        "hidden items-center gap-1.5 text-xs sm:flex",
        syncStatus === "error" ? "text-red-400/90" : "text-zinc-500"
      )}
      title={syncStatus === "error" ? syncError ?? undefined : undefined}
    >
      {isPending ? <Loader2 className="size-3 animate-spin" aria-hidden /> : null}
      <span>{statusCopy[syncStatus] ?? statusCopy.idle}</span>
    </p>
  );
}

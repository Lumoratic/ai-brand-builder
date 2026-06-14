"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { ResumeBuilderWorkspace } from "@/components/builder/ResumeBuilderWorkspace";
import { ResumeHeader } from "@/components/builder/ResumeHeader";
import { Button } from "@/components/ui/button";
import {
  useResumeIsHydrated,
  useResumeSyncError,
  useResumeSyncStatus,
} from "@/lib/stores/resumeStore";

export function ResumeAssetShell() {
  const syncStatus = useResumeSyncStatus();
  const syncError = useResumeSyncError();
  const isHydrated = useResumeIsHydrated();

  const isLoading = !isHydrated || syncStatus === "loading";
  const hasError = syncStatus === "error" && Boolean(syncError);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[oklch(0.07_0.012_280)] text-foreground">
        <ResumeHeader />
        <div className="flex flex-1 items-center justify-center gap-2 text-sm text-zinc-500">
          <Loader2 className="size-4 animate-spin" aria-hidden />
          Loading resume asset…
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex min-h-screen flex-col bg-[oklch(0.07_0.012_280)] text-foreground">
        <ResumeHeader />
        <div className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="text-sm font-medium text-zinc-200">
            Could not open this resume asset
          </p>
          <p className="mt-2 text-sm text-zinc-500">{syncError}</p>
          <Button asChild className="mt-6">
            <Link href="/workspace">Back to workspace</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[oklch(0.07_0.012_280)] text-foreground">
      <ResumeHeader />
      <main className="flex flex-1 flex-col overflow-hidden">
        <ResumeBuilderWorkspace />
      </main>
    </div>
  );
}

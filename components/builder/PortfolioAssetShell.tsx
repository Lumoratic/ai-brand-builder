"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { BuilderHeader } from "@/components/builder/BuilderHeader";
import { BuilderWorkspace } from "@/components/builder/BuilderWorkspace";
import { Button } from "@/components/ui/button";
import {
  useBuilderEditorMode,
  useProfileIsHydrated,
  useProfileSyncError,
  useProfileSyncStatus,
} from "@/lib/stores/builderStore";

type PortfolioAssetShellProps = {
  assetId: string;
};

export function PortfolioAssetShell({ assetId }: PortfolioAssetShellProps) {
  const syncStatus = useProfileSyncStatus();
  const syncError = useProfileSyncError();
  const isHydrated = useProfileIsHydrated();
  const editorMode = useBuilderEditorMode();

  const isLoading =
    !isHydrated || syncStatus === "loading" || editorMode !== "asset";
  const hasError = syncStatus === "error" && Boolean(syncError);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-[oklch(0.07_0.012_280)] text-foreground">
        <BuilderHeader />
        <div className="flex flex-1 items-center justify-center gap-2 text-sm text-zinc-500">
          <Loader2 className="size-4 animate-spin" aria-hidden />
          Loading portfolio asset…
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex min-h-screen flex-col bg-[oklch(0.07_0.012_280)] text-foreground">
        <BuilderHeader />
        <div className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="text-sm font-medium text-zinc-200">
            Could not open this portfolio asset
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
      <BuilderHeader />
      <BuilderWorkspace variant="asset" />
    </div>
  );
}

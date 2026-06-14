"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AssetRow, AssetType } from "@/lib/assets/types";
import { ASSET_TYPE_LABELS } from "@/lib/assets/types";
import { cn } from "@/lib/utils";

type AssetCardProps = {
  asset: AssetRow;
  onDelete: (asset: AssetRow) => void;
  className?: string;
};

function formatUpdatedAt(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getAssetEditorPath(asset: AssetRow): string | null {
  if (!asset.id) return null;

  const editorPaths: Partial<Record<AssetType, string>> = {
    portfolio: `/builder/portfolio/${asset.id}`,
    resume: `/builder/resume/${asset.id}`,
  };

  return editorPaths[asset.type] ?? null;
}

export function AssetCard({ asset, onDelete, className }: AssetCardProps) {
  const router = useRouter();
  const href = getAssetEditorPath(asset);

  function openEditor() {
    if (!href) return;
    router.push(href);
  }

  function handleDeleteClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    onDelete(asset);
  }

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium text-zinc-100">
            {asset.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            Updated {formatUpdatedAt(asset.updated_at)}
          </p>
        </div>
        <div className="flex shrink-0 items-start gap-2">
          <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-400">
            {ASSET_TYPE_LABELS[asset.type]}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={`Delete ${asset.title}`}
            onClick={handleDeleteClick}
            className="text-zinc-500 hover:bg-red-500/10 hover:text-red-300"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
      <p className="mt-3 text-xs text-zinc-500">
        {asset.is_published ? (
          <span className="text-emerald-400/90">Published</span>
        ) : (
          <span>Draft</span>
        )}
      </p>
    </>
  );

  if (!href) {
    return (
      <article
        className={cn(
          "rounded-xl border border-white/[0.08] bg-white/[0.03] p-4",
          className
        )}
      >
        {content}
      </article>
    );
  }

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={openEditor}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openEditor();
        }
      }}
      className={cn(
        "block cursor-pointer rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:border-white/[0.14] hover:bg-white/[0.05]",
        className
      )}
    >
      {content}
    </article>
  );
}

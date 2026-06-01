"use client";

import { useRouter } from "next/navigation";
import type { AssetRow } from "@/lib/assets/types";
import { ASSET_TYPE_LABELS } from "@/lib/assets/types";
import { cn } from "@/lib/utils";

type AssetCardProps = {
  asset: AssetRow;
  className?: string;
};

function formatUpdatedAt(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getPortfolioEditorPath(asset: AssetRow): string | null {
  if (asset.type?.toLowerCase() !== "portfolio" || !asset.id) {
    return null;
  }
  return `/builder/portfolio/${asset.id}`;
}

export function AssetCard({ asset, className }: AssetCardProps) {
  const router = useRouter();
  const href = getPortfolioEditorPath(asset);

  function openPortfolioEditor() {
    if (!href) return;
    router.push(href);
  }
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-medium text-zinc-100">
            {asset.title}
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            Updated {formatUpdatedAt(asset.updated_at)}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-zinc-400">
          {ASSET_TYPE_LABELS[asset.type]}
        </span>
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
      onClick={openPortfolioEditor}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPortfolioEditor();
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

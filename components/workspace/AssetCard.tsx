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

export function AssetCard({ asset, className }: AssetCardProps) {
  return (
    <article
      className={cn(
        "rounded-xl border border-white/[0.08] bg-white/[0.03] p-4",
        className
      )}
    >
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
    </article>
  );
}

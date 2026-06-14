"use client";

import { useId } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ASSET_TYPE_LABELS, type AssetRow } from "@/lib/assets/types";
import { cn } from "@/lib/utils";

type DeleteAssetModalProps = {
  asset: AssetRow | null;
  isDeleting: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteAssetModal({
  asset,
  isDeleting,
  error,
  onClose,
  onConfirm,
}: DeleteAssetModalProps) {
  const titleId = useId();

  if (!asset) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close dialog"
        onClick={isDeleting ? undefined : onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[oklch(0.1_0.014_280)] p-6 shadow-2xl"
      >
        <h2 id={titleId} className="text-lg font-semibold text-zinc-100">
          Delete asset?
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Delete{" "}
          <span className="font-medium text-zinc-200">&ldquo;{asset.title}&rdquo;</span>{" "}
          ({ASSET_TYPE_LABELS[asset.type]})? This cannot be undone.
        </p>

        {error ? <p className="mt-4 text-sm text-red-300">{error}</p> : null}

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isDeleting}
            onClick={onClose}
            className="border-white/10 bg-transparent text-zinc-300 hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className={cn(
              "gap-2 bg-red-500/90 text-white hover:bg-red-500",
              isDeleting && "opacity-80"
            )}
          >
            {isDeleting ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Deleting…
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

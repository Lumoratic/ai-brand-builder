"use client";

import { useEffect, useId, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  builderInputClassName,
  builderLabelClassName,
} from "@/components/builder/builder-styles";
import {
  ASSET_TYPE_LABELS,
  DEFAULT_ASSET_TITLES,
  type AssetType,
} from "@/lib/assets/types";
import { cn } from "@/lib/utils";

type CreateAssetModalProps = {
  type: AssetType | null;
  isSubmitting: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: (title: string) => void;
};

export function CreateAssetModal({
  type,
  isSubmitting,
  error,
  onClose,
  onConfirm,
}: CreateAssetModalProps) {
  const titleId = useId();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!type) {
      setTitle("");
      return;
    }
    setTitle(DEFAULT_ASSET_TITLES[type]);
  }, [type]);

  if (!type) return null;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed || isSubmitting) return;
    onConfirm(trimmed);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close dialog"
        onClick={isSubmitting ? undefined : onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md rounded-xl border border-white/[0.08] bg-[oklch(0.1_0.014_280)] p-6 shadow-2xl"
      >
        <h2 id={titleId} className="text-lg font-semibold text-zinc-100">
          Create {ASSET_TYPE_LABELS[type]}
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Choose a name for this asset. Nothing is saved until you confirm.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="asset-title" className={builderLabelClassName}>
              Title
            </label>
            <input
              id="asset-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              disabled={isSubmitting}
              autoFocus
              className={builderInputClassName}
              placeholder={DEFAULT_ASSET_TITLES[type]}
            />
          </div>

          {error ? (
            <p className="text-sm text-red-300">{error}</p>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={onClose}
              className="border-white/10 bg-transparent text-zinc-300 hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !title.trim()}
              className={cn(
                "gap-2 bg-white text-zinc-900 hover:bg-zinc-100",
                isSubmitting && "opacity-80"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Creating…
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

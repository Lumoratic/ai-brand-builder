"use client";

import { useId } from "react";
import { Button } from "@/components/ui/button";
import { builderFocusRing, builderInputClassName } from "@/components/builder/builder-styles";
import { cn } from "@/lib/utils";

type ImproveTextPreviewDialogProps = {
  open: boolean;
  title: string;
  originalText: string;
  suggestedText: string;
  onAccept: () => void;
  onDiscard: () => void;
};

export function ImproveTextPreviewDialog({
  open,
  title,
  originalText,
  suggestedText,
  onAccept,
  onDiscard,
}: ImproveTextPreviewDialogProps) {
  const titleId = useId();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close dialog"
        onClick={onDiscard}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[min(90vh,720px)] w-full max-w-2xl flex-col rounded-xl border border-white/[0.08] bg-[oklch(0.1_0.014_280)] p-6 shadow-2xl"
      >
        <h2 id={titleId} className="text-lg font-semibold text-zinc-100">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Review the suggested text before accepting. Your original will stay
          unchanged unless you accept.
        </p>

        <div className="mt-5 grid min-h-0 flex-1 gap-4 overflow-y-auto sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              Original
            </p>
            <textarea
              readOnly
              value={originalText}
              rows={10}
              className={cn(
                builderInputClassName,
                "min-h-[180px] resize-none leading-relaxed opacity-90"
              )}
            />
          </div>
          <div className="space-y-2">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
              Suggested
            </p>
            <textarea
              readOnly
              value={suggestedText}
              rows={10}
              className={cn(
                builderInputClassName,
                "min-h-[180px] resize-none leading-relaxed"
              )}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onDiscard}
            className="border-white/10 bg-transparent text-zinc-300 hover:bg-white/5"
          >
            Discard
          </Button>
          <Button
            type="button"
            onClick={onAccept}
            className={cn("bg-white text-zinc-900 hover:bg-zinc-100", builderFocusRing)}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}

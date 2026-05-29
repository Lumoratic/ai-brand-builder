"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { builderFocusRing } from "@/components/builder/builder-styles";
import { improveProjectDescription } from "@/lib/ai/improve-project-client";
import { cn } from "@/lib/utils";

type ImproveDescriptionButtonProps = {
  description: string;
  onImprove: (value: string) => void;
  disabled?: boolean;
};

export function ImproveDescriptionButton({
  description,
  onImprove,
  disabled = false,
}: ImproveDescriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canImprove = description.trim().length > 0 && !disabled && !isLoading;

  async function handleImprove() {
    if (!canImprove) return;

    setIsLoading(true);
    setError(null);

    try {
      const improved = await improveProjectDescription(description);
      onImprove(improved);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to improve description."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!canImprove}
        onClick={handleImprove}
        className={cn(
          "h-7 gap-1.5 border-white/10 bg-transparent px-2.5 text-[11px] text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
          builderFocusRing
        )}
      >
        {isLoading ? (
          <Loader2 className="size-3 animate-spin" aria-hidden />
        ) : (
          <Sparkles className="size-3" aria-hidden />
        )}
        {isLoading ? "Improving…" : "Improve with AI"}
      </Button>
      {error ? (
        <p role="alert" className="text-[11px] text-red-400/90">
          {error}
        </p>
      ) : null}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { ImproveTextPreviewDialog } from "@/components/builder/ImproveTextPreviewDialog";
import { Button } from "@/components/ui/button";
import { builderFocusRing } from "@/components/builder/builder-styles";
import type { ImproveResumeExperienceContext } from "@/lib/ai/improve-resume-experience-prompt";
import {
  improveResumeExperienceDescription,
  improveResumeSummary,
} from "@/lib/ai/improve-resume-client";
import { cn } from "@/lib/utils";

type ImproveResumeTextButtonProps = {
  field: "summary" | "experience-description";
  text: string;
  context?: ImproveResumeExperienceContext;
  onAccept: (value: string) => void;
  disabled?: boolean;
};

export function ImproveResumeTextButton({
  field,
  text,
  context,
  onAccept,
  disabled = false,
}: ImproveResumeTextButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [originalText, setOriginalText] = useState("");
  const [suggestedText, setSuggestedText] = useState("");

  const canImprove = text.trim().length > 0 && !disabled && !isLoading;

  async function handleImprove() {
    if (!canImprove) return;

    setIsLoading(true);
    setError(null);

    try {
      const improved =
        field === "summary"
          ? await improveResumeSummary(text)
          : await improveResumeExperienceDescription(text, context);

      setOriginalText(text);
      setSuggestedText(improved);
      setPreviewOpen(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to improve resume text."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleAccept() {
    onAccept(suggestedText);
    setPreviewOpen(false);
    setSuggestedText("");
    setOriginalText("");
  }

  function handleDiscard() {
    setPreviewOpen(false);
    setSuggestedText("");
    setOriginalText("");
  }

  const dialogTitle =
    field === "summary"
      ? "Review improved summary"
      : "Review improved experience description";

  return (
    <>
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

      <ImproveTextPreviewDialog
        open={previewOpen}
        title={dialogTitle}
        originalText={originalText}
        suggestedText={suggestedText}
        onAccept={handleAccept}
        onDiscard={handleDiscard}
      />
    </>
  );
}

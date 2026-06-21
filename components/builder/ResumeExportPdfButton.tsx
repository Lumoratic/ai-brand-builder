"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildResumePdfFilename,
  exportResumePdf,
} from "@/lib/resume/export-resume-pdf";
import { resumeHasExportableContent } from "@/lib/resume/resume-display-utils";
import {
  useResumeAssetTitle,
  useResumeData,
  useResumeSyncStatus,
} from "@/lib/stores/resumeStore";

export function ResumeExportPdfButton() {
  const data = useResumeData();
  const assetTitle = useResumeAssetTitle();
  const syncStatus = useResumeSyncStatus();
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canExport =
    resumeHasExportableContent(data) &&
    syncStatus !== "loading" &&
    !isExporting;

  async function handleExport() {
    if (!canExport) return;

    setIsExporting(true);
    setError(null);

    try {
      await exportResumePdf(data, {
        filename: buildResumePdfFilename(
          assetTitle,
          data.personal.fullName
        ),
      });
    } catch (exportError) {
      console.error("PDF export failed:", exportError);
      setError(
        exportError instanceof Error
          ? exportError.message
          : "Could not export PDF"
      );
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleExport}
        disabled={!canExport}
        className="border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06] hover:text-zinc-100"
      >
        {isExporting ? (
          <Loader2 className="animate-spin" aria-hidden />
        ) : (
          <Download aria-hidden />
        )}
        {isExporting ? "Exporting…" : "Export PDF"}
      </Button>
      {error ? (
        <p className="max-w-[220px] text-right text-[11px] text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

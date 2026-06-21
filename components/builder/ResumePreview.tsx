"use client";

import { ResumeExportPdfButton } from "@/components/builder/ResumeExportPdfButton";
import { ResumePreviewContent } from "@/components/resume/ResumePreviewContent";
import { useResumeData } from "@/lib/stores/resumeStore";

export function ResumePreview() {
  const data = useResumeData();

  return (
    <div className="flex h-full flex-col bg-[oklch(0.06_0.01_280)]">
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          Live preview
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2" aria-live="polite" aria-atomic="true">
            <span className="size-1.5 rounded-full bg-emerald-500/80" aria-hidden />
            <span className="text-[11px] text-zinc-500">Synced</span>
          </div>
          <ResumeExportPdfButton />
        </div>
      </div>

      <div className="flex flex-1 justify-center overflow-y-auto px-3 py-4 sm:px-5 sm:py-6 lg:px-6 lg:py-8">
        <div className="w-full max-w-[210mm] min-w-0">
          <ResumePreviewContent data={data} />
        </div>
      </div>
    </div>
  );
}

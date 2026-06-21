"use client";

import type { ResumeAssetData } from "@/lib/assets/resume-data";

export type ExportResumePdfOptions = {
  filename?: string;
};

function sanitizeFilename(value: string): string {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "resume";
}

export function buildResumePdfFilename(
  assetTitle: string,
  fullName: string
): string {
  const base = sanitizeFilename(fullName || assetTitle);
  return `${base}-resume.pdf`;
}

function triggerBrowserDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = "noopener";
  anchor.click();
  URL.revokeObjectURL(url);
}

/**
 * Generates a text-based PDF from ResumeAssetData using @react-pdf/renderer.
 */
export async function exportResumePdf(
  data: ResumeAssetData,
  options: ExportResumePdfOptions = {}
): Promise<void> {
  const [{ pdf }, { ResumePdfDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/components/resume/ResumePdfDocument"),
  ]);

  const blob = await pdf(<ResumePdfDocument data={data} />).toBlob();
  triggerBrowserDownload(blob, options.filename ?? "resume.pdf");
}

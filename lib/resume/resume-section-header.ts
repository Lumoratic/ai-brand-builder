import type { ResumeModernSectionId } from "@/lib/resume/resume-modern-icons";
import {
  RESUME_MODERN_ACCENT,
  RESUME_MODERN_SECTION_ICON_PREVIEW_PX,
} from "@/lib/resume/resume-modern-icons";

/** Shared section header tokens — keep Preview and PDF in sync. */
export const RESUME_SECTION_HEADER_ICON_COLOR = RESUME_MODERN_ACCENT;
export const RESUME_SECTION_HEADER_ICON_SIZE_PX =
  RESUME_MODERN_SECTION_ICON_PREVIEW_PX;
export const RESUME_SECTION_HEADER_ICON_SIZE_PT = 14;
export const RESUME_SECTION_HEADER_GAP_PT = 8;
export const RESUME_SECTION_HEADER_PREVIEW_GAP_CLASS = "gap-2.5";

/** Tailwind needs a static literal; size must match RESUME_SECTION_HEADER_ICON_SIZE_PX. */
export const RESUME_SECTION_HEADER_PREVIEW_ICON_BASE =
  "block h-[18px] w-[18px] shrink-0";

export const RESUME_SECTION_TITLES = {
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  languages: "Languages",
  certifications: "Certifications",
  links: "Links",
} as const satisfies Record<ResumeModernSectionId, string>;

/** PDF section icons currently enabled (matches stable export behavior). */
export const RESUME_SECTION_PDF_ICON_IDS: ReadonlySet<ResumeModernSectionId> =
  new Set([
    "summary",
    "experience",
    "education",
    "skills",
    "languages",
    "links",
  ]);

export function resumeSectionShowsPdfIcon(
  sectionId: ResumeModernSectionId
): boolean {
  return RESUME_SECTION_PDF_ICON_IDS.has(sectionId);
}

import type { ResumePreviewTemplateClasses } from "@/lib/resume/templates/preview-types";
import {
  RESUME_SECTION_HEADER_PREVIEW_GAP_CLASS,
  RESUME_SECTION_HEADER_PREVIEW_ICON_BASE,
} from "@/lib/resume/resume-section-header";

/** Accent — name, section headings/icons, and links only */
const accentText = "text-blue-600";
const accentLink =
  "text-blue-600 underline-offset-2 hover:text-blue-800 hover:underline";
const accentIcon = "text-blue-600";

/** Neutral structure and body tones */
const neutralDivider = "text-zinc-300";
const neutralHeaderRule = "border-b border-zinc-200";
const neutralSectionRule = "border-b border-zinc-200";
const neutralEntryRule = "border-b border-zinc-100";
const neutralDot = "bg-zinc-900";
const bodyTone = "text-zinc-700";
const metaTone = "text-zinc-500";
const subtitleTone = "text-zinc-600";
const contactIconTone = "text-zinc-600";

const sectionIconSize = RESUME_SECTION_HEADER_PREVIEW_ICON_BASE;

const skillChipBase =
  "rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-zinc-600";

const modernShared = {
  layout: "modern" as const,
  skillsList: "flex flex-wrap gap-1.5",
  linksList: "space-y-1.5",
  contactDivider: neutralDivider,
  contactItem: "inline-flex items-center gap-2",
  contactIcon: `${sectionIconSize} shrink-0 ${contactIconTone}`,
  contactLink: accentLink,
  linkMuted: "text-zinc-400",
  linkUrl: `break-all ${accentLink}`,
  sectionTitleRow: `flex items-center ${RESUME_SECTION_HEADER_PREVIEW_GAP_CLASS} ${neutralSectionRule} pb-2`,
  sectionIcon: `${sectionIconSize} ${accentIcon}`,
  entryTitleRow: "flex items-start gap-2.5",
  entryDot: `mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full ${neutralDot}`,
};

export const modernProfessionalDensityPreviewClasses: ResumePreviewTemplateClasses = {
  ...modernShared,
  root: "w-full min-w-0 bg-white px-10 py-12 text-zinc-900 shadow-sm sm:px-12 sm:py-14",
  empty: "text-center text-sm text-zinc-400",
  header: `${neutralHeaderRule} pb-8`,
  name: `text-[2.5rem] font-bold leading-[1.05] tracking-tight ${accentText} sm:text-[2.75rem]`,
  professionalTitle: `mt-2 text-lg font-normal ${subtitleTone}`,
  contact:
    "mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-600",
  section: "mt-9 first:mt-0",
  sectionTitle: `text-[13px] font-bold uppercase tracking-[0.08em] ${accentText}`,
  sectionBody: "mt-4 space-y-0",
  bodyText: `whitespace-pre-wrap text-[15px] leading-7 ${bodyTone}`,
  entryBlock: `${neutralEntryRule} pb-10 mb-10 last:mb-0 last:border-b-0 last:pb-0`,
  entryTitle: "min-w-0 flex-1 text-base font-bold leading-snug text-zinc-900",
  entrySubtitle: `mt-1.5 text-sm font-normal ${subtitleTone}`,
  entrySubtitleFallback: "text-base font-bold text-zinc-900",
  metaLine: `mt-2 text-xs font-normal ${metaTone}`,
  description: `mt-3 whitespace-pre-wrap text-[15px] leading-7 ${bodyTone}`,
  skillChip: `${skillChipBase} text-sm`,
  list: `space-y-2 text-[15px] leading-7 ${bodyTone}`,
  linkLine: "block py-1.5 text-sm leading-relaxed text-zinc-700",
  linkLabel: "font-medium text-zinc-900",
  certTitle: "min-w-0 flex-1 text-base font-bold text-zinc-900",
  certMeta: `mt-2 text-xs ${metaTone}`,
};

export const modernCompactDensityPreviewClasses: ResumePreviewTemplateClasses = {
  ...modernShared,
  root: "w-full min-w-0 bg-white px-7 py-8 text-zinc-900 shadow-sm sm:px-8 sm:py-9",
  empty: "text-center text-xs text-zinc-400",
  header: `${neutralHeaderRule} pb-5`,
  name: `text-[2rem] font-bold leading-[1.05] tracking-tight ${accentText} sm:text-[2.25rem]`,
  professionalTitle: `mt-1.5 text-base font-normal ${subtitleTone}`,
  contact:
    "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-zinc-600",
  section: "mt-6 first:mt-0",
  sectionTitle: `text-xs font-bold uppercase tracking-[0.07em] ${accentText}`,
  sectionBody: "mt-3 space-y-0",
  bodyText: `whitespace-pre-wrap text-sm leading-6 ${bodyTone}`,
  entryBlock: `${neutralEntryRule} pb-7 mb-7 last:mb-0 last:border-b-0 last:pb-0`,
  entryTitle: "min-w-0 flex-1 text-sm font-bold leading-snug text-zinc-900",
  entrySubtitle: `mt-1 text-xs font-normal ${subtitleTone}`,
  entrySubtitleFallback: "text-sm font-bold text-zinc-900",
  metaLine: `mt-1.5 text-[10px] font-normal ${metaTone}`,
  description: `mt-2 whitespace-pre-wrap text-sm leading-6 ${bodyTone}`,
  skillChip: `${skillChipBase} text-xs`,
  list: `space-y-1 text-sm leading-6 ${bodyTone}`,
  linkLine: "block py-1 text-xs leading-relaxed text-zinc-700",
  linkLabel: "font-medium text-zinc-900",
  certTitle: "min-w-0 flex-1 text-sm font-bold text-zinc-900",
  certMeta: `mt-1.5 text-[10px] ${metaTone}`,
};

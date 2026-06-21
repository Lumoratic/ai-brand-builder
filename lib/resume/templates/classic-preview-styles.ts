import type { ResumePreviewTemplateClasses } from "@/lib/resume/templates/preview-types";

const classicShared = {
  layout: "classic" as const,
  skillsList: "flex flex-wrap gap-1.5 sm:gap-2",
  linksList: "space-y-1.5 sm:space-y-2",
};

export const classicProfessionalDensityPreviewClasses: ResumePreviewTemplateClasses = {
  ...classicShared,
  root: "w-full min-w-0 bg-white px-7 py-9 text-zinc-900 shadow-sm sm:px-9 sm:py-11 lg:px-10 lg:py-12",
  empty: "text-center text-sm text-zinc-400",
  header: "border-b border-zinc-200 pb-6",
  name: "text-[1.75rem] font-semibold leading-tight tracking-tight text-zinc-900 sm:text-[2rem]",
  professionalTitle: "mt-1.5 text-base text-zinc-600",
  contact:
    "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-zinc-600",
  contactDivider: "text-zinc-300",
  contactItem: "",
  contactIcon: "",
  contactLink:
    "text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline",
  section: "mt-7 first:mt-0",
  sectionTitleRow: "",
  sectionIcon: "",
  sectionTitle:
    "border-b border-zinc-300 pb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-700",
  sectionBody: "mt-3.5 space-y-5",
  bodyText: "whitespace-pre-wrap text-sm leading-relaxed text-zinc-700",
  entryBlock: "",
  entryTitleRow: "",
  entryDot: "",
  entryTitle: "text-[15px] font-semibold leading-snug text-zinc-900",
  entrySubtitle: "text-sm font-medium text-zinc-700 mt-0.5",
  entrySubtitleFallback: "text-[15px] font-semibold text-zinc-900",
  metaLine: "mt-1 text-xs leading-relaxed text-zinc-500",
  description: "mt-2.5 whitespace-pre-wrap text-sm leading-relaxed text-zinc-700",
  skillChip:
    "rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-sm text-zinc-700",
  list: "space-y-1 text-sm text-zinc-700",
  linkLine: "text-sm leading-relaxed text-zinc-700",
  linkLabel: "font-medium text-zinc-800",
  linkMuted: "text-zinc-400",
  linkUrl:
    "break-all text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline",
  certTitle: "text-[15px] font-semibold text-zinc-900",
  certMeta: "mt-0.5 text-xs text-zinc-500",
};

export const classicCompactDensityPreviewClasses: ResumePreviewTemplateClasses = {
  ...classicShared,
  root: "w-full min-w-0 bg-white px-5 py-6 text-zinc-900 shadow-sm sm:px-6 sm:py-7 lg:px-7 lg:py-8",
  empty: "text-center text-xs text-zinc-400",
  header: "border-b border-zinc-200 pb-4",
  name: "text-xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-[1.35rem]",
  professionalTitle: "mt-1 text-sm text-zinc-600",
  contact:
    "mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-600",
  contactDivider: "text-zinc-300",
  contactItem: "",
  contactIcon: "",
  contactLink:
    "text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline",
  section: "mt-4 first:mt-0",
  sectionTitleRow: "",
  sectionIcon: "",
  sectionTitle:
    "border-b border-zinc-300 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-700",
  sectionBody: "mt-2.5 space-y-3",
  bodyText: "whitespace-pre-wrap text-xs leading-relaxed text-zinc-700",
  entryBlock: "",
  entryTitleRow: "",
  entryDot: "",
  entryTitle: "text-sm font-semibold leading-snug text-zinc-900",
  entrySubtitle: "text-xs font-medium text-zinc-700 mt-0.5",
  entrySubtitleFallback: "text-sm font-semibold text-zinc-900",
  metaLine: "mt-0.5 text-[11px] leading-relaxed text-zinc-500",
  description: "mt-1.5 whitespace-pre-wrap text-xs leading-relaxed text-zinc-700",
  skillChip:
    "rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-700",
  list: "space-y-0.5 text-xs text-zinc-700",
  linkLine: "text-xs leading-relaxed text-zinc-700",
  linkLabel: "font-medium text-zinc-800",
  linkMuted: "text-zinc-400",
  linkUrl:
    "break-all text-zinc-600 underline-offset-2 hover:text-zinc-900 hover:underline",
  certTitle: "text-sm font-semibold text-zinc-900",
  certMeta: "mt-0.5 text-[11px] text-zinc-500",
};

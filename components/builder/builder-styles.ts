import { cn } from "@/lib/utils";

export const builderInputClassName = cn(
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3",
  "text-sm text-white placeholder:text-zinc-500",
  "outline-none transition-[border-color,box-shadow,background-color] duration-200",
  "focus-visible:border-violet-500/40 focus-visible:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-violet-500/25"
);

export const builderHelperClassName = "text-xs leading-relaxed text-zinc-500";

export const builderSectionClassName =
  "space-y-5 rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 sm:p-6";

export const builderFocusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.07_0.012_280)]";

export const builderLabelClassName =
  "block text-xs font-medium uppercase tracking-wider text-zinc-400";

import { cn } from "@/lib/utils";

export const builderInputClassName = cn(
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3",
  "text-sm text-white placeholder:text-zinc-500",
  "outline-none transition-[border-color,box-shadow,background-color] duration-200",
  "focus:border-violet-500/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-500/20"
);

export const builderLabelClassName =
  "block text-xs font-medium uppercase tracking-wider text-zinc-400";

"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  FileText,
  Globe,
  Sparkles,
} from "lucide-react";
import { GlassCard } from "@/components/shared/glass-card";
import { useMounted } from "@/hooks/use-mounted";
import { easeOut, floatAnimation, motionInitial } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function DashboardMockup() {
  const mounted = useMounted();

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Floating glass cards */}
      <motion.div
        animate={mounted ? floatAnimation(0, 8) : false}
        className="absolute -left-2 top-8 z-20 hidden sm:block md:-left-8 lg:-left-12"
      >
        <GlassCard className="px-4 py-3 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/20">
              <CheckCircle2 className="size-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-white">ATS Score</p>
              <p className="text-lg font-semibold text-emerald-400">98%</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        animate={mounted ? floatAnimation(0.5, 8) : false}
        className="absolute -right-2 top-16 z-20 hidden sm:block md:-right-6 lg:-right-10"
      >
        <GlassCard className="px-4 py-3 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-violet-500/20">
              <Sparkles className="size-4 text-violet-400" />
            </div>
            <div>
              <p className="text-xs font-medium text-white">AI Enhanced</p>
              <p className="text-sm text-zinc-400">12 sections</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        animate={mounted ? floatAnimation(1, 8) : false}
        className="absolute -right-4 bottom-12 z-20 hidden md:block lg:-right-8"
      >
        <GlassCard className="px-4 py-3 shadow-2xl">
          <div className="flex items-center gap-2">
            <Globe className="size-4 text-sky-400" />
            <span className="text-xs font-medium text-sky-400">Live</span>
            <span className="text-xs text-zinc-500">brandspark.io/you</span>
          </div>
        </GlassCard>
      </motion.div>

      {/* Main dashboard */}
      <motion.div
        initial={motionInitial(mounted, { opacity: 0, y: 40 })}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
        className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-[oklch(0.12_0.02_280)] shadow-2xl glow-purple"
      >
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-red-500/80" />
            <span className="size-3 rounded-full bg-amber-500/80" />
            <span className="size-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="mx-auto flex h-7 w-48 items-center justify-center rounded-md bg-white/[0.04] text-[10px] text-zinc-500">
            app.brandspark.io/editor
          </div>
        </div>

        <div className="flex min-h-[280px] sm:min-h-[320px]">
          {/* Sidebar */}
          <aside className="hidden w-44 shrink-0 border-r border-white/[0.06] p-3 sm:block">
            <p className="mb-3 px-2 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
              Workspace
            </p>
            {[
              { icon: FileText, label: "Resume", active: true },
              { icon: Globe, label: "Website", active: false },
              { icon: BarChart3, label: "Analytics", active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={cn(
                  "mb-1 flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs",
                  item.active
                    ? "bg-violet-500/15 text-violet-300"
                    : "text-zinc-500"
                )}
              >
                <item.icon className="size-3.5" />
                {item.label}
              </div>
            ))}
          </aside>

          {/* Editor preview */}
          <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2 w-24 rounded-full bg-white/20" />
                <div className="mt-2 h-2 w-16 rounded-full bg-white/10" />
              </div>
              <div className="flex gap-2">
                <div className="h-7 w-16 rounded-md bg-violet-500/30" />
                <div className="h-7 w-16 rounded-md bg-white/10" />
              </div>
            </div>

            <div className="flex flex-1 gap-3">
              <div className="flex-1 space-y-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="h-2 w-full rounded-full bg-white/15" />
                <div className="h-2 w-5/6 rounded-full bg-white/10" />
                <div className="h-2 w-4/6 rounded-full bg-white/10" />
                <div className="mt-4 h-2 w-3/4 rounded-full bg-violet-400/30" />
                <div className="h-2 w-full rounded-full bg-white/8" />
                <div className="h-2 w-11/12 rounded-full bg-white/8" />
                <div className="h-2 w-2/3 rounded-full bg-white/8" />
              </div>
              <div className="hidden w-28 shrink-0 rounded-xl border border-dashed border-violet-500/30 bg-violet-500/5 p-2 sm:block">
                <p className="text-[9px] font-medium text-violet-400">Preview</p>
                <div className="mt-2 space-y-1.5">
                  <div className="h-1.5 w-full rounded bg-white/20" />
                  <div className="h-1.5 w-4/5 rounded bg-white/10" />
                  <div className="h-1.5 w-full rounded bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div
        aria-hidden
        className="absolute -inset-x-20 -bottom-20 h-40 bg-gradient-to-t from-[oklch(0.08_0.01_280)] to-transparent"
      />
    </div>
  );
}

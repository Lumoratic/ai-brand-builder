"use client";

import { FormPanel } from "@/components/builder/FormPanel";
import { PreviewPanel } from "@/components/builder/PreviewPanel";

export function BuilderLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[oklch(0.07_0.012_280)] text-foreground">
      <header className="shrink-0 border-b border-white/[0.06] bg-[oklch(0.09_0.014_280)]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-violet-500 shadow-[0_0_12px_oklch(0.55_0.25_280)]" />
            <span className="text-sm font-medium tracking-tight text-white">
              BrandSpark
            </span>
            <span className="hidden text-zinc-600 sm:inline">/</span>
            <span className="hidden text-sm text-zinc-400 sm:inline">
              Portfolio builder
            </span>
          </div>
          <p className="text-xs text-zinc-500">Live preview · autosave local</p>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col lg:flex-row">
        <aside className="w-full shrink-0 border-b border-white/[0.06] lg:w-[min(420px,38%)] lg:border-b-0 lg:border-r" aria-label="Portfolio form">
          <FormPanel />
        </aside>
        <main className="min-h-[480px] flex-1 lg:min-h-0" aria-label="Live portfolio preview">
          <PreviewPanel />
        </main>
      </div>
    </div>
  );
}

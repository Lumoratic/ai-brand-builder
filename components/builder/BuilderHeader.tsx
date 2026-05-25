export function BuilderHeader() {
  return (
    <header className="shrink-0 border-b border-white/[0.06] bg-[oklch(0.09_0.014_280)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div
            className="size-2 rounded-full bg-violet-500 shadow-[0_0_12px_oklch(0.55_0.25_280)]"
            aria-hidden
          />
          <span className="text-sm font-medium tracking-tight text-white">
            BrandSpark
          </span>
          <span className="hidden text-zinc-600 sm:inline" aria-hidden>
            /
          </span>
          <span className="hidden text-sm text-zinc-400 sm:inline">
            Portfolio builder
          </span>
        </div>
        <p className="text-xs text-zinc-500">Live preview · autosave local</p>
      </div>
    </header>
  );
}

import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { WorkspaceAuthActions } from "@/components/workspace/WorkspaceAuthActions";

export function WorkspaceHeader() {
  return (
    <header className="shrink-0 border-b border-white/[0.06] bg-[oklch(0.09_0.014_280)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <BrandLogo size="sm" />
          <span className="hidden text-zinc-600 sm:inline" aria-hidden>
            /
          </span>
          <span className="hidden text-sm text-zinc-400 sm:inline">Workspace</span>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/builder"
            className="hidden text-sm text-zinc-500 transition-colors hover:text-zinc-300 sm:inline"
          >
            Portfolio builder
          </Link>
          <WorkspaceAuthActions />
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { BuilderAuthActions } from "@/components/builder/BuilderAuthActions";
import { ResumeSaveStatus } from "@/components/builder/ResumeSaveStatus";
import { BrandLogo } from "@/components/shared/brand-logo";

export function ResumeHeader() {
  return (
    <header className="shrink-0 border-b border-white/[0.06] bg-[oklch(0.09_0.014_280)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="size-2 rounded-full bg-violet-500 shadow-[0_0_12px_oklch(0.55_0.25_280)]"
            aria-hidden
          />
          <BrandLogo size="sm" />
          <span className="hidden text-zinc-600 sm:inline" aria-hidden>
            /
          </span>
          <span className="hidden text-sm text-zinc-400 sm:inline">
            Resume builder
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/workspace"
            className="hidden text-sm text-zinc-500 transition-colors hover:text-zinc-300 sm:inline"
          >
            Workspace
          </Link>
          <ResumeSaveStatus />
          <BuilderAuthActions />
        </div>
      </div>
    </header>
  );
}

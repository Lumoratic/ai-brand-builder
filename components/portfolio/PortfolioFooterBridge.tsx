"use client";

import Link from "next/link";
import {
  portfolioContainerWide,
  portfolioFocusRing,
} from "@/components/portfolio/portfolio-layout";
import { getFirstName } from "@/lib/portfolio-utils";
import { useBuilderProfile } from "@/lib/stores/builderStore";
import { cn } from "@/lib/utils";

export function PortfolioFooterBridge() {
  const profile = useBuilderProfile();
  const firstName = getFirstName(profile.fullName);

  return (
    <footer className="relative" role="contentinfo">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-transparent to-[oklch(0.07_0.012_280)] sm:-top-20 sm:h-20"
      />
      <div
        className={cn(
          portfolioContainerWide,
          "relative flex flex-col items-center justify-between gap-5 pb-16 pt-8 sm:flex-row sm:pb-20 sm:pt-10"
        )}
      >
        <p className="text-sm tracking-wide text-zinc-400">
          <span className="text-zinc-300">© {firstName}</span>
          <span className="text-zinc-600" aria-hidden>
            {" "}
            ·{" "}
          </span>
          <span>Personal portfolio</span>
        </p>
        <Link
          href="/builder"
          className={cn(
            "text-sm tracking-wide text-zinc-400 transition-[color,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-zinc-200",
            portfolioFocusRing,
            "rounded-sm"
          )}
        >
          Built with BrandSpark
        </Link>
      </div>
    </footer>
  );
}

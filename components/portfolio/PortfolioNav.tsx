"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useMotion } from "@/hooks/use-motion";
import { portfolioContainerWide, portfolioFocusRing } from "@/components/portfolio/portfolio-layout";
import { getFirstName } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Capabilities" },
  { href: "#contact", label: "Contact" },
] as const;

type PortfolioNavProps = {
  fullName: string;
};

export function PortfolioNav({ fullName }: PortfolioNavProps) {
  const { fadeUp } = useMotion();
  const displayName = getFirstName(fullName);

  return (
    <motion.header
      {...fadeUp()}
      className="sticky top-0 z-50 bg-[oklch(0.07_0.012_280)]/80 backdrop-blur-xl"
    >
      <div
        className={cn(
          portfolioContainerWide,
          "flex h-[4.25rem] items-center justify-between gap-6"
        )}
      >
        <div className="flex min-w-0 items-center gap-5">
          <Link
            href="/builder"
            className={cn(
              "flex shrink-0 items-center gap-2 text-xs text-zinc-500 transition-[color,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-zinc-300",
              portfolioFocusRing,
              "rounded-sm"
            )}
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            <span className="hidden sm:inline">Edit</span>
          </Link>
          <span className="truncate text-sm font-medium tracking-tight text-zinc-300">
            {displayName}
          </span>
        </div>

        <nav
          className="hidden items-center gap-10 md:flex"
          aria-label="Portfolio sections"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-[13px] text-zinc-400 transition-[color,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-white",
                portfolioFocusRing,
                "rounded-sm"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className={cn(
            "shrink-0 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-zinc-900 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
            portfolioFocusRing
          )}
        >
          Work with me
        </a>
      </div>
    </motion.header>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { getFadeUp } from "@/lib/motion";
import { getFirstName } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
] as const;

type PortfolioNavProps = {
  fullName: string;
};

export function PortfolioNav({ fullName }: PortfolioNavProps) {
  const mounted = useMounted();
  const displayName = getFirstName(fullName);

  return (
    <motion.header
      {...getFadeUp(mounted, 0)}
      className="sticky top-0 z-50 border-b border-white/[0.06] bg-[oklch(0.07_0.012_280)]/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Link
            href="/builder"
            className="flex shrink-0 items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-zinc-300 sm:text-sm"
          >
            <ArrowLeft className="size-3.5" />
            <span className="hidden sm:inline">Builder</span>
          </Link>
          <span className="hidden text-zinc-700 sm:inline">|</span>
          <span className="truncate text-sm font-medium text-white">
            {displayName}
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-zinc-500 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className={cn(
            "shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5",
            "text-xs font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
          )}
        >
          Hire me
        </a>
      </div>
    </motion.header>
  );
}

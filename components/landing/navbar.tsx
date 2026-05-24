"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/landing-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="mt-4 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-[oklch(0.1_0.015_280)]/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Sparkles className="size-4 text-white" />
            </div>
            <span className="text-base font-semibold tracking-tight text-white">
              BrandSpark
            </span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-zinc-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" className="text-zinc-300 hover:text-white">
              Log in
            </Button>
            <Button asChild className="bg-white text-zinc-900 hover:bg-zinc-100">
              <Link href="/builder">Start free</Link>
            </Button>
          </div>

          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-lg border border-white/10 text-zinc-300 md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        <AnimatePresence mode="wait">
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-[oklch(0.1_0.015_280)]/95 p-4 backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm text-zinc-300",
                        "transition-colors hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4">
                <Button variant="ghost" className="w-full justify-center">
                  Log in
                </Button>
                <Button asChild className="w-full justify-center bg-white text-zinc-900">
                  <Link href="/builder" onClick={() => setMobileOpen(false)}>
                    Start free
                  </Link>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

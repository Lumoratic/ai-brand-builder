"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { getFadeUp } from "@/lib/motion";
import {
  buildSocialLinks,
  contactEmail,
  displayValue,
  getInitials,
} from "@/lib/portfolio-utils";
import type { BuilderProfile } from "@/lib/stores/builderStore";
import { cn } from "@/lib/utils";

type PortfolioHeroProps = {
  profile: BuilderProfile;
};

export function PortfolioHero({ profile }: PortfolioHeroProps) {
  const mounted = useMounted();
  const name = displayValue(profile.fullName, "Your Name");
  const title = displayValue(profile.jobTitle, "Your Role");
  const bio = profile.bio.trim();
  const email = contactEmail(profile.fullName);
  const initials = getInitials(profile.fullName);
  const socialLinks = buildSocialLinks(profile);
  const hasName = Boolean(profile.fullName.trim());

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.45_0.2_280/0.18),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-bg opacity-30 mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            <motion.div
              {...getFadeUp(mounted, 0.05)}
              className="mb-8 flex items-center gap-5"
            >
              <div
                className={cn(
                  "relative flex size-20 shrink-0 items-center justify-center rounded-2xl border text-xl font-semibold tracking-tight sm:size-24 sm:text-2xl",
                  hasName
                    ? "border-violet-500/30 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 text-white shadow-[0_0_40px_-10px_oklch(0.55_0.25_280/0.5)]"
                    : "border-white/[0.08] bg-white/[0.03] text-zinc-600"
                )}
              >
                {initials}
                {hasName ? (
                  <span className="absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-[oklch(0.07_0.012_280)] bg-emerald-500" />
                ) : null}
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/90">
                  Available for work
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Freelance &amp; full-time
                </p>
              </div>
            </motion.div>

            <motion.p
              {...getFadeUp(mounted, 0.1)}
              className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-400/80"
            >
              Personal portfolio
            </motion.p>

            <motion.h1
              {...getFadeUp(mounted, 0.15)}
              className={cn(
                "mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]",
                hasName ? "text-white" : "text-zinc-600"
              )}
            >
              {name}
            </motion.h1>

            <motion.p
              {...getFadeUp(mounted, 0.2)}
              className={cn(
                "mt-4 text-lg sm:text-xl",
                profile.jobTitle.trim() ? "text-zinc-400" : "text-zinc-600"
              )}
            >
              {title}
            </motion.p>

            {bio ? (
              <motion.p
                {...getFadeUp(mounted, 0.25)}
                className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
              >
                {bio.length > 180 ? `${bio.slice(0, 180).trim()}…` : bio}
              </motion.p>
            ) : null}

            <motion.div
              {...getFadeUp(mounted, 0.3)}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Button
                asChild
                className="h-11 rounded-full bg-white px-6 text-zinc-900 hover:bg-zinc-100"
              >
                <a href="#contact">
                  Start a conversation
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-white/12 bg-transparent text-white hover:bg-white/5"
              >
                <a href="#work">View selected work</a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            {...getFadeUp(mounted, 0.35)}
            className="lg:pb-2"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
              Connect
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5",
                    "text-sm text-zinc-400 transition-all duration-200",
                    "hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  {link.id === "email" ? (
                    <Mail className="size-3.5 text-violet-400" />
                  ) : null}
                  {link.label}
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-zinc-600">{email}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

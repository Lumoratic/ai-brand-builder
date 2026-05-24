"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioContainerWide } from "@/components/portfolio/portfolio-layout";
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
  const headline = profile.headline.trim();
  const bio = profile.bio.trim();
  const email = contactEmail(profile.fullName);
  const initials = getInitials(profile.fullName);
  const socialLinks = buildSocialLinks(profile);
  const hasName = Boolean(profile.fullName.trim());

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-30%,oklch(0.42_0.18_280/0.22),transparent_65%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,oklch(0.07_0.012_280)_100%)]"
      />

      <div
        className={cn(
          portfolioContainerWide,
          "relative flex min-h-[88vh] flex-col justify-center py-20 lg:py-28"
        )}
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div className="max-w-3xl">
            <motion.div {...getFadeUp(mounted, 0.05)} className="mb-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-400/90">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Open to new projects
              </span>
            </motion.div>

            <motion.h1
              {...getFadeUp(mounted, 0.1)}
              className={cn(
                "text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]",
                hasName ? "text-white" : "text-zinc-700"
              )}
            >
              {name}
            </motion.h1>

            <motion.p
              {...getFadeUp(mounted, 0.15)}
              className={cn(
                "mt-5 text-xl font-medium tracking-tight sm:text-2xl lg:text-[1.75rem] lg:leading-tight",
                profile.jobTitle.trim() ? "text-zinc-300" : "text-zinc-700"
              )}
            >
              {title}
            </motion.p>

            {headline ? (
              <motion.p
                {...getFadeUp(mounted, 0.2)}
                className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl lg:text-2xl lg:leading-snug"
              >
                {headline}
              </motion.p>
            ) : null}

            {bio ? (
              <motion.p
                {...getFadeUp(mounted, 0.25)}
                className="mt-8 max-w-xl text-base leading-[1.75] text-zinc-400 sm:text-lg"
              >
                {bio.length > 220 ? `${bio.slice(0, 220).trim()}…` : bio}
              </motion.p>
            ) : null}

            <motion.div
              {...getFadeUp(mounted, 0.3)}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <Button
                asChild
                className="h-12 rounded-full bg-white px-7 text-[15px] font-medium text-zinc-900 hover:bg-zinc-100"
              >
                <a href="#contact">
                  Discuss a project
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-white/10 bg-transparent px-7 text-[15px] text-zinc-300 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              >
                <a href="#work">See my work</a>
              </Button>
            </motion.div>

            <motion.div
              {...getFadeUp(mounted, 0.35)}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 pt-8"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-200"
                >
                  {link.id === "email" ? (
                    <Mail className="size-3.5 text-zinc-500" />
                  ) : null}
                  {link.label}
                </a>
              ))}
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <span className="text-sm text-zinc-500">{email}</span>
            </motion.div>
          </div>

          <motion.div
            {...getFadeUp(mounted, 0.15)}
            className="flex justify-center lg:justify-end"
          >
            <div
              className={cn(
                "relative size-40 overflow-hidden rounded-[1.75rem] border sm:size-48 lg:size-56 lg:rounded-[2rem]",
                profile.avatarUrl || hasName
                  ? "border-white/10 shadow-[0_0_0_1px_oklch(1_0_0/0.04),0_32px_64px_-16px_oklch(0_0_0/0.6)]"
                  : "border-white/[0.08] bg-white/[0.02]"
              )}
            >
              {profile.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
                  alt={hasName ? `${name} profile photo` : "Profile photo"}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 text-4xl font-semibold tracking-tight text-zinc-600 lg:text-5xl">
                  {initials}
                </div>
              )}
              {hasName ? (
                <span className="absolute bottom-4 right-4 size-3 rounded-full border-2 border-[oklch(0.07_0.012_280)] bg-emerald-400" />
              ) : null}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

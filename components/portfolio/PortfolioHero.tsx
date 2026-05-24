"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMotion } from "@/hooks/use-motion";
import { portfolioContainerWide, portfolioBtnOutline, portfolioBtnPrimary, portfolioFocusRing } from "@/components/portfolio/portfolio-layout";
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

function HeroAvatar({
  avatarUrl,
  name,
  initials,
  hasName,
}: {
  avatarUrl: string;
  name: string;
  initials: string;
  hasName: boolean;
}) {
  return (
    <div className="relative mx-auto lg:mx-0">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2.25rem] bg-[radial-gradient(circle,oklch(0.42_0.18_280/0.18),transparent_68%)] sm:-inset-5 sm:rounded-[2.5rem]"
      />
      <div
        className={cn(
          "relative size-32 overflow-hidden rounded-[1.5rem] sm:size-40 sm:rounded-[1.75rem] lg:size-48 lg:rounded-[2rem]",
          "ring-1 ring-white/[0.14]",
          "shadow-[0_0_0_1px_oklch(1_0_0/0.06),0_24px_48px_-12px_oklch(0_0_0/0.75)]"
        )}
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={hasName ? `${name} profile photo` : "Profile photo"}
            fill
            unoptimized
            className="object-cover"
            priority
          />
        ) : (
          <div className="relative flex size-full items-center justify-center overflow-hidden bg-[linear-gradient(145deg,oklch(0.34_0.16_280)_0%,oklch(0.24_0.12_295)_42%,oklch(0.15_0.06_280)_100%)]">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0/0.12),transparent_55%)]"
            />
            <span className="relative text-3xl font-semibold tracking-tight text-white/95 sm:text-4xl lg:text-[2.75rem]">
              {initials}
            </span>
          </div>
        )}
        {hasName ? (
          <span className="absolute bottom-3.5 right-3.5 size-2.5 rounded-full border-2 border-[oklch(0.1_0.012_280)] bg-emerald-400 shadow-[0_0_8px_oklch(0.72_0.17_160/0.5)] sm:bottom-4 sm:right-4 sm:size-3" />
        ) : null}
      </div>
    </div>
  );
}

export function PortfolioHero({ profile }: PortfolioHeroProps) {
  const { fadeUp } = useMotion();
  const name = displayValue(profile.fullName, "Your Name");
  const title = displayValue(profile.jobTitle, "Your Role");
  const headline = profile.headline.trim();
  const bio = profile.bio.trim();
  const email = contactEmail(profile.fullName);
  const initials = getInitials(profile.fullName);
  const socialLinks = buildSocialLinks(profile);
  const hasName = Boolean(profile.fullName.trim());

  return (
    <section className="noise-fine relative overflow-hidden">
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
          "relative pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-16 lg:pb-24"
        )}
      >
        <div className="grid items-start gap-10 sm:gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div className="max-w-3xl">
            <motion.div {...fadeUp(0.05)} className="mb-6 sm:mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-400/90">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                Open to new projects
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)}
              className={cn(
                "text-[clamp(2.5rem,7.5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]",
                hasName ? "text-white" : "text-zinc-700"
              )}
            >
              {name}
            </motion.h1>

            <motion.p
              {...fadeUp(0.15)}
              className={cn(
                "mt-4 text-xl font-medium tracking-tight sm:mt-5 sm:text-2xl lg:text-[1.75rem] lg:leading-tight",
                profile.jobTitle.trim() ? "text-zinc-300" : "text-zinc-700"
              )}
            >
              {title}
            </motion.p>

            {headline ? (
              <motion.p
                {...fadeUp(0.2)}
                className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:mt-6 sm:text-xl lg:text-2xl lg:leading-snug"
              >
                {headline}
              </motion.p>
            ) : null}

            {bio ? (
              <motion.p
                {...fadeUp(0.25)}
                className="mt-5 max-w-xl text-base leading-[1.75] text-zinc-300 sm:mt-6 sm:text-lg"
              >
                {bio.length > 220 ? `${bio.slice(0, 220).trim()}…` : bio}
              </motion.p>
            ) : null}

            <motion.div
              {...fadeUp(0.3)}
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
            >
              <Button
                asChild
                className={cn(
                  "h-11 rounded-full bg-white px-6 text-[15px] font-medium text-zinc-900 hover:bg-zinc-100 sm:h-12 sm:px-7",
                  portfolioBtnPrimary,
                  portfolioFocusRing
                )}
              >
                <a href="#contact">
                  Discuss a project
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className={cn(
                  "h-11 rounded-full border-white/10 bg-transparent px-6 text-[15px] text-zinc-300 hover:border-white/20 hover:bg-white/[0.04] hover:text-white sm:h-12 sm:px-7",
                  portfolioBtnOutline,
                  portfolioFocusRing
                )}
              >
                <a href="#work">See my work</a>
              </Button>
            </motion.div>

            <motion.div
              {...fadeUp(0.35)}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 sm:mt-8 sm:gap-x-6 sm:pt-4"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center gap-2 text-sm text-zinc-400 transition-[color,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-zinc-200",
                    portfolioFocusRing,
                    "rounded-sm"
                  )}
                >
                  {link.id === "email" ? (
                    <Mail className="size-3.5 text-zinc-500" />
                  ) : null}
                  {link.label}
                </a>
              ))}
              <span className="hidden text-zinc-600 sm:inline">·</span>
              <span className="text-sm text-zinc-400">{email}</span>
            </motion.div>
          </div>

          <motion.div
            {...fadeUp(0.15)}
            className="flex justify-center lg:justify-end"
          >
            <HeroAvatar
              avatarUrl={profile.avatarUrl}
              name={name}
              initials={initials}
              hasName={hasName}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

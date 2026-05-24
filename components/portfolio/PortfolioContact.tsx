"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMotion } from "@/hooks/use-motion";
import {
  portfolioBtnOutline,
  portfolioBtnPrimary,
  portfolioContainer,
  portfolioContainerWide,
  portfolioFocusRing,
  portfolioSectionLabel,
  portfolioSectionY,
} from "@/components/portfolio/portfolio-layout";
import { contactEmail, getFirstName } from "@/lib/portfolio-utils";
import type { BuilderProfile } from "@/lib/stores/builderStore";
import { cn } from "@/lib/utils";

type PortfolioContactProps = {
  profile: BuilderProfile;
};

export function PortfolioContact({ profile }: PortfolioContactProps) {
  const { sectionReveal } = useMotion();
  const firstName = getFirstName(profile.fullName);
  const email = contactEmail(profile.fullName);
  const hasName = Boolean(profile.fullName.trim());

  return (
    <section
      id="contact"
      className={cn("noise-fine relative overflow-hidden pb-8 sm:pb-12", portfolioSectionY)}
      aria-labelledby="contact-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,oklch(0.4_0.18_280/0.1),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[oklch(0.07_0.012_280)] sm:h-40"
      />

      <motion.div {...sectionReveal()} className={portfolioContainer}>
        <div className="mx-auto max-w-4xl text-center lg:max-w-none lg:text-left">
          <p className={portfolioSectionLabel}>Start a project</p>
          <h2
            id="contact-heading"
            className="mt-4 text-balance text-2xl font-semibold tracking-[-0.035em] text-white sm:mt-5 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.06]"
          >
            {hasName
              ? `Let’s create something meaningful, ${firstName}.`
              : "Let’s create something meaningful together."}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.8] text-zinc-300 sm:mt-5 sm:text-base lg:mx-0 lg:text-lg">
            I partner with teams and founders who value clarity, craft, and
            work that earns trust. Tell me about your project — I reply within
            two business days.
          </p>

          <div className="mt-10 flex flex-col items-center gap-6 sm:mt-12 lg:flex-row lg:items-center lg:justify-between">
            <a
              href={`mailto:${email}?subject=Project%20inquiry`}
              className={cn(
                "inline-flex items-center gap-4 text-left transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-90 active:scale-[0.99] motion-reduce:active:scale-100",
                portfolioFocusRing,
                "rounded-xl"
              )}
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white/[0.04] ring-1 ring-white/[0.06]">
                <Mail className="size-5 text-zinc-300" aria-hidden />
              </span>
              <span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                  Email
                </span>
                <span className="mt-1 block text-base tracking-tight text-zinc-200">
                  {email}
                </span>
              </span>
            </a>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                asChild
                className={cn(
                  "h-12 rounded-full bg-white px-8 text-[15px] font-medium text-zinc-900 hover:bg-zinc-100",
                  portfolioBtnPrimary,
                  portfolioFocusRing
                )}
              >
                <a href={`mailto:${email}?subject=Project%20inquiry`}>
                  Start the conversation
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className={cn(
                  "h-12 rounded-full border-white/[0.08] bg-transparent px-8 text-[15px] text-zinc-300 hover:border-white/15 hover:text-white",
                  portfolioBtnOutline,
                  portfolioFocusRing
                )}
              >
                <Link href="/builder">Edit portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

type PortfolioFooterProps = {
  fullName: string;
};

export function PortfolioFooter({ fullName }: PortfolioFooterProps) {
  const firstName = getFirstName(fullName);

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

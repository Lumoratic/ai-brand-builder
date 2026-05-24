"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  portfolioContainer,
  portfolioContainerWide,
  portfolioSectionY,
} from "@/components/portfolio/portfolio-layout";
import { useMounted } from "@/hooks/use-mounted";
import { getFadeInView } from "@/lib/motion";
import { contactEmail, getFirstName } from "@/lib/portfolio-utils";
import type { BuilderProfile } from "@/lib/stores/builderStore";
import { cn } from "@/lib/utils";

type PortfolioContactProps = {
  profile: BuilderProfile;
};

export function PortfolioContact({ profile }: PortfolioContactProps) {
  const mounted = useMounted();
  const firstName = getFirstName(profile.fullName);
  const email = contactEmail(profile.fullName);
  const hasName = Boolean(profile.fullName.trim());

  return (
    <section
      id="contact"
      className={cn(
        "relative overflow-hidden",
        portfolioSectionY
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,oklch(0.4_0.18_280/0.12),transparent_70%)]"
      />

      <motion.div
        {...getFadeInView(mounted)}
        viewport={{ once: true, margin: "-80px" }}
        className={portfolioContainer}
      >
        <div className="mx-auto max-w-4xl text-center lg:max-w-none lg:text-left">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400">
            Start a project
          </p>
          <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl lg:leading-[1.08]">
            {hasName
              ? `Let’s create something meaningful, ${firstName}.`
              : "Let’s create something meaningful together."}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 lg:mx-0 lg:text-lg">
            I partner with teams and founders who value clarity, craft, and
            work that earns trust. Tell me about your project — I reply within
            two business days.
          </p>

          <div className="mt-12 flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between">
            <a
              href={`mailto:${email}?subject=Project%20inquiry`}
              className="inline-flex items-center gap-4 text-left transition-opacity hover:opacity-80"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-white/[0.03]">
                <Mail className="size-5 text-zinc-300" />
              </span>
              <span>
                <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                  Email
                </span>
                <span className="mt-1 block text-base text-zinc-300">{email}</span>
              </span>
            </a>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full bg-white px-8 text-[15px] font-medium text-zinc-900 hover:bg-zinc-100"
              >
                <a href={`mailto:${email}?subject=Project%20inquiry`}>
                  Start the conversation
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 rounded-full border-white/[0.08] bg-transparent px-8 text-[15px] text-zinc-300 hover:border-white/15 hover:text-white"
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
    <footer>
      <div
        className={cn(
          portfolioContainerWide,
          "flex flex-col items-center justify-between gap-4 py-12 sm:flex-row"
        )}
      >
        <p className="text-sm text-zinc-500">
          © {firstName} · Personal portfolio
        </p>
        <Link
          href="/builder"
          className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          Built with BrandSpark
        </Link>
      </div>
    </footer>
  );
}

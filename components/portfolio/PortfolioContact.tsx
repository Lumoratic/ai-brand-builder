"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { getFadeInView } from "@/lib/motion";
import { contactEmail, displayValue, getFirstName } from "@/lib/portfolio-utils";
import type { BuilderProfile } from "@/lib/stores/builderStore";

type PortfolioContactProps = {
  profile: BuilderProfile;
};

export function PortfolioContact({ profile }: PortfolioContactProps) {
  const mounted = useMounted();
  const name = displayValue(profile.fullName, "there");
  const firstName = getFirstName(profile.fullName);
  const email = contactEmail(profile.fullName);
  const hasName = Boolean(profile.fullName.trim());

  return (
    <section id="contact" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        {...getFadeInView(mounted)}
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-violet-950/50 via-[oklch(0.11_0.02_280)] to-[oklch(0.08_0.012_280)] p-8 sm:p-12 lg:p-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-violet-600/20 blur-[80px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-fuchsia-600/10 blur-[80px]"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-400/80">
              Let&apos;s work together
            </p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Have a project in mind, {hasName ? firstName : "friend"}?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
              I&apos;m open to thoughtful collaborations, freelance engagements,
              and full-time roles that value craft and clarity.
            </p>
            <a
              href={`mailto:${email}?subject=Project%20inquiry`}
              className="mt-8 inline-flex items-center gap-3 text-sm text-zinc-300 transition-colors hover:text-white"
            >
              <span className="flex size-10 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04]">
                <Mail className="size-4 text-violet-400" />
              </span>
              {email}
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button
              asChild
              className="h-12 rounded-full bg-white px-8 text-zinc-900 hover:bg-zinc-100"
            >
              <a href={`mailto:${email}?subject=Hello%20${encodeURIComponent(name)}`}>
                Send an email
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/15 bg-transparent text-white hover:bg-white/5"
            >
              <Link href="/builder">Edit portfolio</Link>
            </Button>
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
    <footer className="border-t border-white/[0.06] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="text-xs text-zinc-600">
          © {firstName} · Personal portfolio
        </p>
        <Link
          href="/builder"
          className="text-xs text-zinc-500 transition-colors hover:text-zinc-300"
        >
          Built with BrandSpark
        </Link>
      </div>
    </footer>
  );
}

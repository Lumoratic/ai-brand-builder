"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/shared/gradient-text";
import { GridBackground } from "@/components/shared/grid-background";
import { SectionContainer } from "@/components/shared/section-container";
import { DashboardMockup } from "@/components/landing/dashboard-mockup";
import { useMounted } from "@/hooks/use-mounted";
import { getFadeUp } from "@/lib/motion";

export function Hero() {
  const mounted = useMounted();

  return (
    <SectionContainer className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pb-32">
      <GridBackground />
      <div aria-hidden className="radial-glow pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]"
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          {...getFadeUp(mounted, 0)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-zinc-300 backdrop-blur-sm"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-violet-500" />
          </span>
          One profile · Resume · Portfolio · Website
        </motion.div>

        <motion.h1
          {...getFadeUp(mounted, 0.1)}
          className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Build your{" "}
          <GradientText as="span" className="inline">
            professional presence
          </GradientText>{" "}
          in one place
        </motion.h1>

        <motion.p
          {...getFadeUp(mounted, 0.2)}
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl"
        >
          Create a resume, portfolio website, and professional profile from a
          single source of truth. Update once and publish everywhere.
        </motion.p>

        <motion.div
          {...getFadeUp(mounted, 0.3)}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="h-12 gap-2 rounded-full bg-white px-8 text-base font-medium text-zinc-900 hover:bg-zinc-100"
          >
            <Link href="/builder">
              Start building free
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 gap-2 rounded-full border-white/15 bg-white/[0.03] px-8 text-base text-white hover:bg-white/10"
          >
            <Link href="/portfolio/demo">
              <ExternalLink className="size-4" />
              View example portfolio
            </Link>
          </Button>
        </motion.div>

        <motion.p
          {...getFadeUp(mounted, 0.4)}
          className="mt-6 text-sm text-zinc-500"
        >
          Free to start · No credit card required
        </motion.p>

        <motion.div {...getFadeUp(mounted, 0.5)} className="mt-16 w-full sm:mt-20">
          <DashboardMockup />
        </motion.div>
      </div>
    </SectionContainer>
  );
}

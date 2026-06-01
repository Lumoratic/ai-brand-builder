"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/shared/gradient-text";
import { SectionContainer } from "@/components/shared/section-container";
import { useMounted } from "@/hooks/use-mounted";
import { getFadeInView } from "@/lib/motion";

export function CTA() {
  const mounted = useMounted();

  return (
    <SectionContainer id="cta" className="py-24 sm:py-32">
      <motion.div
        {...getFadeInView(mounted)}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/80 via-[oklch(0.14_0.04_280)] to-fuchsia-950/50 p-8 sm:p-12 lg:p-16"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-violet-500/30 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-fuchsia-500/20 blur-[100px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 grid-bg opacity-50"
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to build your{" "}
            <GradientText as="span">professional presence</GradientText>?
          </h2>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            Create assets in your workspace, build your portfolio, and publish a
            public URL when you are ready.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
              className="h-12 rounded-full border-white/20 bg-transparent px-8 text-base text-white hover:bg-white/10"
            >
              <Link href="/portfolio/demo">View example portfolio</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-zinc-500">
            Free to start · Publish when you&apos;re ready
          </p>
        </div>
      </motion.div>
    </SectionContainer>
  );
}

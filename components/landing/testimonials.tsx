"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GradientText } from "@/components/shared/gradient-text";
import { GlassCard } from "@/components/shared/glass-card";
import { SectionContainer } from "@/components/shared/section-container";
import { useMounted } from "@/hooks/use-mounted";
import { easeOut, motionInitial } from "@/lib/motion";

export function Testimonials() {
  const mounted = useMounted();

  return (
    <SectionContainer id="product-status" className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
          What&apos;s live
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Available{" "}
          <GradientText as="span">today</GradientText>
        </h2>
        <p className="mt-4 text-base text-zinc-400 sm:text-lg">
          Pflio is being built in stages. Here is what you can use now—and what
          is still on the way.
        </p>
      </div>

      <motion.div
        initial={motionInitial(mounted, { opacity: 0, y: 24 })}
        whileInView={mounted ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="mx-auto mt-16 max-w-xl"
      >
        <GlassCard className="p-8 text-left sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Live now
          </p>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-zinc-300 sm:text-lg">
            <li>Workspace for resume, portfolio, and website assets</li>
            <li>Portfolio builder with public publishing</li>
            <li>AI help for project descriptions</li>
          </ul>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Coming next
          </p>
          <ul className="mt-4 space-y-2 text-base leading-relaxed text-zinc-400 sm:text-lg">
            <li>Resume builder</li>
            <li>Personal website builder</li>
          </ul>
          <Link
            href="/workspace"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition-colors hover:text-violet-200"
          >
            Open your workspace
            <ArrowRight className="size-4" />
          </Link>
        </GlassCard>
      </motion.div>
    </SectionContainer>
  );
}

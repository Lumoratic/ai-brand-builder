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
    <SectionContainer id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
          Early access
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Stories from{" "}
          <GradientText as="span">real users</GradientText>
        </h2>
        <p className="mt-4 text-base text-zinc-400 sm:text-lg">
          Pflio is in early access. Testimonials and case studies from people
          using the product will appear here soon.
        </p>
      </div>

      <motion.div
        initial={motionInitial(mounted, { opacity: 0, y: 24 })}
        whileInView={mounted ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="mx-auto mt-16 max-w-xl"
      >
        <GlassCard className="p-8 text-center sm:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Coming soon
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
            We&apos;re focused on building a product worth recommending—honest
            feedback from early users will live here once it&apos;s ready.
          </p>
          <Link
            href="/builder"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-violet-300 transition-colors hover:text-violet-200"
          >
            Be among the first to build
            <ArrowRight className="size-4" />
          </Link>
        </GlassCard>
      </motion.div>
    </SectionContainer>
  );
}

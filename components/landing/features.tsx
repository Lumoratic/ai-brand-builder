"use client";

import { motion } from "framer-motion";
import { GradientText } from "@/components/shared/gradient-text";
import { GlassCard } from "@/components/shared/glass-card";
import { SectionContainer } from "@/components/shared/section-container";
import { useMounted } from "@/hooks/use-mounted";
import { features } from "@/lib/landing-data";
import {
  getInViewVariants,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Features() {
  const mounted = useMounted();
  const inView = getInViewVariants(mounted);

  return (
    <SectionContainer id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
          Features
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Everything from{" "}
          <GradientText as="span">one profile</GradientText>
        </h2>
        <p className="mt-4 text-base text-zinc-400 sm:text-lg">
          Resume, portfolio, and public profile—kept in sync from a single
          source of truth.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        {...inView}
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => (
          <motion.div key={feature.title} variants={staggerItem}>
            <GlassCard
              className={cn(
                "group h-full p-6 transition-colors duration-300",
                "hover:border-violet-500/30 hover:bg-white/[0.05]"
              )}
            >
              <div
                className={cn(
                  "mb-4 flex size-11 items-center justify-center rounded-xl",
                  "bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20",
                  "ring-1 ring-white/10 transition-transform duration-300",
                  "group-hover:scale-105"
                )}
              >
                <feature.icon className="size-5 text-violet-300" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {feature.description}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}

"use client";

import { motion } from "framer-motion";
import { GradientText } from "@/components/shared/gradient-text";
import { SectionContainer } from "@/components/shared/section-container";
import { useMounted } from "@/hooks/use-mounted";
import { steps } from "@/lib/landing-data";
import { easeOut, motionInitial } from "@/lib/motion";

export function HowItWorks() {
  const mounted = useMounted();

  return (
    <SectionContainer
      id="how-it-works"
      className="relative py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-transparent"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
          How it works
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          From profile to{" "}
          <GradientText as="span">published presence</GradientText>
        </h2>
        <p className="mt-4 text-base text-zinc-400 sm:text-lg">
          Build once, refine your copy, and share a portfolio when you&apos;re
          ready.
        </p>
      </div>

      <div className="relative mt-16">
        <div
          aria-hidden
          className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-violet-500/50 via-violet-500/20 to-transparent lg:left-1/2 lg:block lg:-translate-x-px"
        />

        <div className="space-y-8 lg:space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={motionInitial(mounted, {
                opacity: 0,
                x: index % 2 === 0 ? -24 : 24,
              })}
              whileInView={
                mounted
                  ? { opacity: 1, x: 0 }
                  : undefined
              }
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: easeOut }}
              className={`relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-16 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex-1 ${
                  index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                }`}
              >
                <span className="font-mono text-sm font-medium text-violet-400">
                  {step.step}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-white sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {step.description}
                </p>
              </div>

              <div className="relative flex shrink-0 items-center justify-center lg:w-16">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 font-mono text-lg font-semibold text-violet-300 ring-4 ring-[oklch(0.08_0.01_280)]">
                  {step.step}
                </div>
              </div>

              <div className="hidden flex-1 lg:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

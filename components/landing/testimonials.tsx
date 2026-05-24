"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { GradientText } from "@/components/shared/gradient-text";
import { GlassCard } from "@/components/shared/glass-card";
import { SectionContainer } from "@/components/shared/section-container";
import { useMounted } from "@/hooks/use-mounted";
import { testimonials } from "@/lib/landing-data";
import { easeOut, motionInitial } from "@/lib/motion";

export function Testimonials() {
  const mounted = useMounted();

  return (
    <SectionContainer id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-violet-400">
          Testimonials
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Loved by{" "}
          <GradientText as="span">professionals</GradientText>
        </h2>
        <p className="mt-4 text-base text-zinc-400 sm:text-lg">
          Join thousands who transformed their careers with BrandSpark.
        </p>
      </div>

      <motion.div
        initial={motionInitial(mounted, { opacity: 0 })}
        whileInView={mounted ? { opacity: 1 } : undefined}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="mt-16 grid gap-6 md:grid-cols-3"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.author}
            initial={motionInitial(mounted, { opacity: 0, y: 24 })}
            whileInView={mounted ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: easeOut }}
          >
            <GlassCard className="flex h-full flex-col p-6 transition-colors hover:border-white/15 hover:bg-white/[0.05]">
              <Quote className="size-8 text-violet-500/40" />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300 sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-xs font-semibold text-white">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.author}</p>
                  <p className="text-xs text-zinc-500">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}

"use client";

import { motion } from "framer-motion";
import { portfolioContainer } from "@/components/portfolio/portfolio-layout";
import { useMounted } from "@/hooks/use-mounted";
import { getInViewVariants, staggerContainer, staggerItem } from "@/lib/motion";
import type { PortfolioStat } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";

type PortfolioStatsProps = {
  stats: PortfolioStat[];
};

export function PortfolioStats({ stats }: PortfolioStatsProps) {
  const mounted = useMounted();
  const inView = getInViewVariants(mounted);

  return (
    <section className="border-b border-white/[0.05] bg-white/[0.015]">
      <motion.div
        variants={staggerContainer}
        {...inView}
        viewport={{ once: true, margin: "-40px" }}
        className={cn(
          portfolioContainer,
          "grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-12"
        )}
      >
        {stats.map((stat) => (
          <motion.div key={stat.id} variants={staggerItem}>
            <p
              className={cn(
                "text-2xl font-semibold tracking-[-0.02em] lg:text-3xl",
                stat.value === "—" ? "text-zinc-800" : "text-zinc-200"
              )}
            >
              {stat.value}
            </p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-600">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
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
    <section className="border-y border-white/[0.06] bg-white/[0.02] px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        variants={staggerContainer}
        {...inView}
        viewport={{ once: true, margin: "-40px" }}
        className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            variants={staggerItem}
            className="text-center sm:text-left"
          >
            <p
              className={cn(
                "text-2xl font-semibold tracking-tight sm:text-3xl",
                stat.value === "—" ? "text-zinc-700" : "text-white"
              )}
            >
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

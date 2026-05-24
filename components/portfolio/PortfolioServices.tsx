"use client";

import { motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";
import { getInViewVariants, staggerContainer, staggerItem } from "@/lib/motion";
import type { PortfolioService } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";

type PortfolioServicesProps = {
  services: PortfolioService[];
  hasSkills: boolean;
};

export function PortfolioServices({ services, hasSkills }: PortfolioServicesProps) {
  const mounted = useMounted();
  const inView = getInViewVariants(mounted);

  return (
    <PortfolioSection
      id="services"
      label="Services"
      title="Ways we can work together"
      alt
    >
      {hasSkills ? (
        <motion.ul
          variants={staggerContainer}
          {...inView}
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <motion.li
              key={service.id}
              variants={staggerItem}
              className={cn(
                "rounded-2xl border border-white/[0.06] bg-transparent p-7",
                "transition-colors duration-300 hover:border-white/10 hover:bg-white/[0.02]"
              )}
            >
              <h3 className="text-lg font-semibold tracking-tight text-white">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                {service.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] px-8 py-16 text-center">
          <p className="text-sm text-zinc-500">
            Services appear from the skills you add in the builder.
          </p>
        </div>
      )}
    </PortfolioSection>
  );
}

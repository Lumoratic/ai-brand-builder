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
      title="How I can help"
      description="Each service maps directly to a skill in your profile."
    >
      {hasSkills ? (
        <motion.ul
          variants={staggerContainer}
          {...inView}
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {services.map((service) => (
            <motion.li
              key={service.id}
              variants={staggerItem}
              className={cn(
                "rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6",
                "transition-colors duration-300 hover:border-white/12 hover:bg-white/[0.04]"
              )}
            >
              <h3 className="text-base font-semibold text-white">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                {service.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] px-6 py-14 text-center">
          <p className="text-sm text-zinc-500">
            Your services will appear once you add skills in the builder.
          </p>
        </div>
      )}
    </PortfolioSection>
  );
}

"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/hooks/use-motion";
import type { PortfolioService } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";
import { PortfolioEmptyState } from "@/components/portfolio/PortfolioEmptyState";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { portfolioPanelHover, portfolioPanelSurface } from "@/components/portfolio/portfolio-layout";

type PortfolioServicesProps = {
  services: PortfolioService[];
  hasSkills: boolean;
};

function CapabilityBlock({
  service,
  featured,
}: {
  service: PortfolioService;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        portfolioPanelSurface,
        portfolioPanelHover,
        "relative",
        featured ? "p-7 sm:p-9 lg:p-10" : "p-6 sm:p-8"
      )}
    >
      <div className="relative z-[2]">
      <h3
        className={cn(
          "font-semibold tracking-[-0.03em] text-white",
          featured
            ? "text-xl leading-tight sm:text-2xl lg:text-[1.75rem]"
            : "text-lg leading-snug sm:text-xl"
        )}
      >
        {service.title}
      </h3>
      <p
        className={cn(
          "mt-4 leading-[1.8] text-zinc-300 sm:mt-5",
          featured ? "text-[15px] sm:text-base lg:text-[17px]" : "text-sm sm:text-[15px]"
        )}
      >
        {service.description}
      </p>
      </div>
    </article>
  );
}

export function PortfolioServices({ services, hasSkills }: PortfolioServicesProps) {
  const { inView, staggerContainer, staggerItem } = useMotion();
  const [primary, ...rest] = services;

  return (
    <PortfolioSection
      id="services"
      label="Capabilities"
      title="Where I'm most useful"
      description="Not a service menu — the kinds of problems I do my best work on."
      alt
    >
      {hasSkills && primary ? (
        <motion.div
          variants={staggerContainer}
          {...inView}
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-5 sm:space-y-6 lg:space-y-8"
        >
          <motion.div variants={staggerItem}>
            <CapabilityBlock service={primary} featured />
          </motion.div>

          {rest.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              className="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8"
            >
              {rest.map((service) => (
                <motion.div key={service.id} variants={staggerItem}>
                  <CapabilityBlock service={service} />
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </motion.div>
      ) : (
        <PortfolioEmptyState
          title="Your skills shape this section"
          description="Add a few core skills in the builder — they'll become capability descriptions that read like how you'd actually talk about your work."
        />
      )}
    </PortfolioSection>
  );
}

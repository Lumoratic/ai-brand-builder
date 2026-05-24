"use client";

import { motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";
import { getInViewVariants, staggerContainer, staggerItem } from "@/lib/motion";
import type { PortfolioService } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";
import { PortfolioEmptyState } from "@/components/portfolio/PortfolioEmptyState";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { portfolioPanelSurface } from "@/components/portfolio/portfolio-layout";

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
        "transition-[border-color,box-shadow] duration-500 hover:border-white/[0.08] hover:shadow-[inset_0_1px_0_0_oklch(1_0_0/0.06),0_20px_40px_-22px_oklch(0_0_0/0.85)]",
        featured ? "p-7 sm:p-9 lg:p-10" : "p-6 sm:p-8"
      )}
    >
      <h3
        className={cn(
          "font-semibold tracking-[-0.025em] text-white",
          featured
            ? "text-xl leading-tight sm:text-2xl lg:text-3xl"
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
    </article>
  );
}

export function PortfolioServices({ services, hasSkills }: PortfolioServicesProps) {
  const mounted = useMounted();
  const inView = getInViewVariants(mounted);
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

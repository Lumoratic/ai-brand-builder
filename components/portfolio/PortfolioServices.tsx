"use client";

import { motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";
import { getInViewVariants, staggerContainer, staggerItem } from "@/lib/motion";
import type { PortfolioService } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";
import { PortfolioEmptyState } from "@/components/portfolio/PortfolioEmptyState";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";

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
        featured ? "max-w-3xl" : "max-w-xl",
        featured && "lg:max-w-none lg:pr-16"
      )}
    >
      <h3
        className={cn(
          "font-semibold tracking-[-0.025em] text-white",
          featured
            ? "text-2xl leading-tight sm:text-3xl"
            : "text-xl leading-snug sm:text-2xl"
        )}
      >
        {service.title}
      </h3>
      <p
        className={cn(
          "mt-5 leading-[1.8] text-zinc-300",
          featured ? "text-base sm:text-[17px]" : "text-sm sm:text-base"
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
          className="space-y-16 lg:space-y-20"
        >
          <motion.div variants={staggerItem}>
            <CapabilityBlock service={primary} featured />
          </motion.div>

          {rest.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              className="grid gap-14 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-0"
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

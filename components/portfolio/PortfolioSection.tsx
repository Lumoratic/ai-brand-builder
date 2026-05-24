"use client";

import { motion } from "framer-motion";
import { useMotion } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";
import {
  portfolioContainer,
  portfolioSectionLabel,
  portfolioSectionY,
} from "@/components/portfolio/portfolio-layout";

type PortfolioSectionProps = {
  id?: string;
  label: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  alt?: boolean;
  featured?: boolean;
};

export function PortfolioSection({
  id,
  label,
  title,
  description,
  children,
  className,
  alt = false,
  featured = false,
}: PortfolioSectionProps) {
  const { sectionReveal } = useMotion();

  return (
    <section
      id={id}
      className={cn(
        "relative",
        portfolioSectionY,
        featured && "bg-[oklch(0.062_0.012_280)]",
        alt && !featured && "bg-white/[0.008]",
        className
      )}
    >
      {featured ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
        />
      ) : null}
      {alt && !featured ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
        />
      ) : null}

      <div className={portfolioContainer}>
        <motion.div
          {...sectionReveal()}
          className={cn("max-w-3xl", featured && "max-w-4xl")}
        >
          <p className={portfolioSectionLabel}>{label}</p>
          <h2
            className={cn(
              "mt-4 font-semibold tracking-[-0.035em] text-white sm:mt-[1.125rem]",
              featured
                ? "text-2xl sm:text-4xl lg:text-[2.75rem] lg:leading-[1.06]"
                : "text-2xl sm:text-[1.875rem] lg:text-4xl lg:leading-[1.08]"
            )}
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.8] text-zinc-300 sm:mt-5 sm:text-base lg:text-[17px]">
              {description}
            </p>
          ) : null}
        </motion.div>
        <div
          className={cn(
            "mt-10 sm:mt-11 lg:mt-12",
            featured && "mt-10 sm:mt-12 lg:mt-14"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

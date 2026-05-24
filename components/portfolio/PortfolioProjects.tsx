"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { getInViewVariants, staggerContainer, staggerItem } from "@/lib/motion";
import type { PortfolioProject } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";

type PortfolioProjectsProps = {
  projects: PortfolioProject[];
  hasSkills: boolean;
};

export function PortfolioProjects({ projects, hasSkills }: PortfolioProjectsProps) {
  const mounted = useMounted();
  const inView = getInViewVariants(mounted);

  return (
    <PortfolioSection
      id="work"
      label="Selected work"
      title="Featured focus areas"
      description="Drawn from the skills and experience in your profile — no filler case studies."
      alt
    >
      {hasSkills ? (
        <motion.div
          variants={staggerContainer}
          {...inView}
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              variants={staggerItem}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[oklch(0.09_0.014_280)] p-6",
                "transition-colors duration-300 hover:border-violet-500/25 hover:bg-white/[0.03]",
                index === 0 && "sm:col-span-2 lg:col-span-1"
              )}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-violet-400/80">
                {project.category}
              </p>
              <h3 className="relative mt-3 text-lg font-semibold tracking-tight text-white">
                {project.title}
              </h3>
              <p className="relative mt-3 flex-1 text-sm leading-relaxed text-zinc-500">
                {project.description}
              </p>
              <div className="relative mt-6 flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors group-hover:text-zinc-300">
                <span>Explore approach</span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] px-6 py-14 text-center">
          <p className="text-sm text-zinc-500">
            Add skills in the builder to showcase your focus areas here.
          </p>
        </div>
      )}
    </PortfolioSection>
  );
}

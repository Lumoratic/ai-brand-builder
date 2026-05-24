"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { getInViewVariants, staggerContainer, staggerItem } from "@/lib/motion";
import type { PortfolioProject } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";

type PortfolioProjectsProps = {
  projects: PortfolioProject[];
  hasProjects: boolean;
};

export function PortfolioProjects({
  projects,
  hasProjects,
}: PortfolioProjectsProps) {
  const mounted = useMounted();
  const inView = getInViewVariants(mounted);

  return (
    <PortfolioSection
      id="work"
      label="Selected work"
      title="Featured projects"
      description="Real work from your builder — titles, context, links, and stack."
      alt
    >
      {hasProjects ? (
        <motion.div
          variants={staggerContainer}
          {...inView}
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 lg:grid-cols-2"
        >
          {projects.map((project, index) => {
            const CardWrapper = project.link ? "a" : "article";
            const cardProps = project.link
              ? {
                  href: project.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <motion.div key={project.id} variants={staggerItem}>
                <CardWrapper
                  {...cardProps}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[oklch(0.09_0.014_280)] p-6 sm:p-7",
                    "transition-all duration-300 hover:border-violet-500/25 hover:bg-white/[0.03]",
                    index === 0 && "lg:col-span-2 lg:flex-row lg:gap-8",
                    project.link && "cursor-pointer"
                  )}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <div className={cn("relative flex-1", index === 0 && "lg:py-2")}>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-violet-400/80">
                      Project {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {project.title}
                    </h3>
                    {project.description ? (
                      <p className="mt-4 text-sm leading-relaxed text-zinc-500 sm:text-base">
                        {project.description}
                      </p>
                    ) : null}
                    {project.techStack.length > 0 ? (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-400"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  {project.link ? (
                    <div
                      className={cn(
                        "relative mt-6 flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors group-hover:text-violet-300",
                        index === 0 && "lg:mt-0 lg:self-end"
                      )}
                    >
                      <span>View project</span>
                      <ExternalLink className="size-3.5" />
                    </div>
                  ) : (
                    <div className="relative mt-6 flex items-center gap-1.5 text-xs font-medium text-zinc-600">
                      <span>Case study</span>
                      <ArrowUpRight className="size-3.5" />
                    </div>
                  )}
                </CardWrapper>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] px-6 py-16 text-center">
          <p className="text-sm text-zinc-500">No featured projects yet</p>
          <p className="mt-2 text-xs text-zinc-600">
            Add projects in the builder to showcase your best work here.
          </p>
        </div>
      )}
    </PortfolioSection>
  );
}

"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { getInViewVariants, staggerContainer, staggerItem } from "@/lib/motion";
import type { PortfolioProject } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";

type PortfolioProjectsProps = {
  projects: PortfolioProject[];
  hasProjects: boolean;
};

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: PortfolioProject;
  index: number;
  featured?: boolean;
}) {
  const content = (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative flex flex-1 flex-col">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-600">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3
          className={cn(
            "mt-4 font-semibold tracking-[-0.02em] text-white",
            featured
              ? "text-2xl sm:text-3xl lg:text-4xl lg:leading-tight"
              : "text-xl sm:text-2xl"
          )}
        >
          {project.title}
        </h3>
        {project.description ? (
          <p
            className={cn(
              "mt-5 leading-relaxed text-zinc-500",
              featured ? "max-w-2xl text-base sm:text-lg" : "text-sm sm:text-base"
            )}
          >
            {project.description}
          </p>
        ) : null}
        {project.techStack.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-zinc-400"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="relative mt-10 flex items-center justify-between border-t border-white/[0.06] pt-6">
        <span className="text-sm text-zinc-600 transition-colors group-hover:text-zinc-400">
          {project.link ? "View live project" : "Selected work"}
        </span>
        {project.link ? (
          <ExternalLink className="size-4 text-zinc-600 transition-all duration-300 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-white" />
        ) : null}
      </div>
    </>
  );

  const className = cn(
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[oklch(0.08_0.012_280)]",
    "transition-all duration-500 hover:border-white/[0.14] hover:bg-[oklch(0.09_0.014_280)] hover:shadow-[0_24px_48px_-24px_oklch(0_0_0/0.8)]",
    featured ? "p-8 sm:p-10 lg:p-12" : "p-7 sm:p-8",
    project.link && "cursor-pointer"
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  }

  return <article className={className}>{content}</article>;
}

export function PortfolioProjects({
  projects,
  hasProjects,
}: PortfolioProjectsProps) {
  const mounted = useMounted();
  const inView = getInViewVariants(mounted);
  const [featured, ...rest] = projects;

  return (
    <PortfolioSection
      id="work"
      label="Selected work"
      title="Projects that define my craft"
      description="A curated look at the work I’m most proud of — built from your real project entries."
      featured
    >
      {hasProjects && featured ? (
        <motion.div
          variants={staggerContainer}
          {...inView}
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6"
        >
          <motion.div variants={staggerItem}>
            <ProjectCard project={featured} index={0} featured />
          </motion.div>
          {rest.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              className="grid gap-6 sm:grid-cols-2"
            >
              {rest.map((project, index) => (
                <motion.div key={project.id} variants={staggerItem}>
                  <ProjectCard project={project} index={index + 1} />
                </motion.div>
              ))}
            </motion.div>
          ) : null}
        </motion.div>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] px-8 py-20 text-center">
          <p className="text-base text-zinc-500">Your featured projects will live here</p>
          <p className="mt-2 text-sm text-zinc-600">
            Add projects in the builder to showcase selected work.
          </p>
        </div>
      )}
    </PortfolioSection>
  );
}

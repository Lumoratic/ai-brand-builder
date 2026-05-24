"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { getInViewVariants, staggerContainer, staggerItem } from "@/lib/motion";
import type { PortfolioProject } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";
import { PortfolioEmptyState } from "@/components/portfolio/PortfolioEmptyState";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";

type PortfolioProjectsProps = {
  projects: PortfolioProject[];
  hasProjects: boolean;
};

function ProjectThumbnail({
  project,
  index,
  featured,
}: {
  project: PortfolioProject;
  index: number;
  featured?: boolean;
}) {
  if (project.thumbnailUrl) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-[oklch(0.06_0.01_280)]",
          featured
            ? "aspect-[16/10] w-full lg:aspect-auto lg:min-h-full lg:w-[44%]"
            : "aspect-[16/10] w-full"
        )}
      >
        <Image
          src={project.thumbnailUrl}
          alt=""
          fill
          unoptimized
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.012_280)/0.4] to-transparent opacity-60"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden border-white/[0.04] bg-[oklch(0.06_0.01_280)]",
        featured
          ? "aspect-[16/10] w-full lg:aspect-auto lg:min-h-[280px] lg:w-[44%]"
          : "aspect-[16/10] w-full"
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,oklch(0.35_0.12_280/0.12),transparent_60%)]"
      />
      <div className="absolute inset-0 flex items-end p-6 sm:p-8">
        <span className="text-5xl font-semibold tracking-tighter text-white/[0.04] sm:text-6xl">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  featured,
}: {
  project: PortfolioProject;
  index: number;
  featured?: boolean;
}) {
  const inner = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[oklch(0.075_0.012_280)]",
        "transition-[border-color,box-shadow] duration-500",
        "hover:border-white/[0.12] hover:shadow-[0_20px_50px_-30px_oklch(0_0_0/0.9)]",
        featured ? "lg:flex-row lg:items-stretch" : "flex-col"
      )}
    >
      <ProjectThumbnail project={project} index={index} featured={featured} />

      <div
        className={cn(
          "flex flex-1 flex-col",
          featured ? "p-8 sm:p-10 lg:p-12" : "p-7 sm:p-8"
        )}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-600">
          Case study · {String(index + 1).padStart(2, "0")}
        </p>

        <h3
          className={cn(
            "mt-4 font-semibold tracking-[-0.025em] text-white",
            featured
              ? "text-2xl leading-tight sm:text-3xl lg:text-[2rem]"
              : "text-xl leading-snug sm:text-2xl"
          )}
        >
          {project.title}
        </h3>

        {project.description ? (
          <p
            className={cn(
              "mt-5 leading-[1.75] text-zinc-500",
              featured ? "max-w-xl text-base sm:text-[17px]" : "text-sm sm:text-base"
            )}
          >
            {project.description}
          </p>
        ) : null}

        {project.outcome ? (
          <p className="mt-6 border-l border-white/10 pl-4 text-sm leading-relaxed text-zinc-400">
            {project.outcome}
          </p>
        ) : null}

        {project.techStack.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] tracking-wide text-zinc-500"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex items-center justify-between border-t border-white/[0.05] pt-6">
          <span className="text-[13px] text-zinc-600 transition-colors duration-300 group-hover:text-zinc-400">
            {project.link ? "View project" : "Selected work"}
          </span>
          <ArrowUpRight className="size-4 text-zinc-700 transition-all duration-300 group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-zinc-400" />
        </div>
      </div>
    </div>
  );

  if (project.link) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {inner}
      </a>
    );
  }

  return inner;
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
      title="Case studies & client work"
      description="A curated selection — the kind of work I'd share when someone asks what I've actually built."
      featured
    >
      {hasProjects && featured ? (
        <motion.div
          variants={staggerContainer}
          {...inView}
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-8"
        >
          <motion.div variants={staggerItem}>
            <ProjectCard project={featured} index={0} featured />
          </motion.div>
          {rest.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              className="grid gap-8 lg:grid-cols-2"
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
        <PortfolioEmptyState
          title="Your best work belongs here"
          description="Add a project in the builder — include what you did, what changed, and optionally a screenshot. This section reads best with real context, not filler."
        />
      )}
    </PortfolioSection>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMotion } from "@/hooks/use-motion";
import type { PortfolioProject } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";
import { PortfolioEmptyState } from "@/components/portfolio/PortfolioEmptyState";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import {
  portfolioCardHover,
  portfolioCardSurface,
} from "@/components/portfolio/portfolio-layout";

type PortfolioProjectsProps = {
  projects: PortfolioProject[];
  hasProjects: boolean;
};

function CinematicThumbnail({
  src,
  featured,
}: {
  src: string;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-full shrink-0 overflow-hidden bg-[oklch(0.06_0.01_280)]",
        featured
          ? "aspect-[16/10] sm:aspect-[2/1] lg:aspect-[21/9]"
          : "aspect-[16/10] sm:aspect-[5/3]"
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        unoptimized
        sizes={featured ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 40vw"}
        className="object-cover object-center brightness-[0.92] saturate-[0.9] transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.018] group-hover:brightness-[0.96] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div
        aria-hidden
        className="absolute inset-0 shadow-[inset_0_0_100px_oklch(0_0_0/0.35)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(1_0_0/0.06),transparent_50%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[oklch(0.075_0.012_280)] via-[oklch(0.075_0.012_280)/0.65] to-[oklch(0.075_0.012_280)/0.08]"
      />
    </div>
  );
}

function PlaceholderThumbnail({
  index,
  featured,
}: {
  index: number;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-[linear-gradient(160deg,oklch(0.08_0.014_280)_0%,oklch(0.06_0.01_280)_100%)]",
        featured
          ? "aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-auto lg:min-h-[240px] lg:w-[42%] lg:aspect-[4/5]"
          : "aspect-[16/10] w-full sm:aspect-[5/3]"
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_15%,oklch(0.38_0.14_280/0.14),transparent_58%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_90%,oklch(0.28_0.1_300/0.08),transparent_50%)]"
      />
      <div className="absolute inset-0 flex items-end p-5 sm:p-7">
        <span className="text-4xl font-semibold tracking-tighter text-white/[0.06] sm:text-5xl lg:text-6xl">
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
  const hasThumbnail = Boolean(project.thumbnailUrl);

  return (
    <article
      className={cn(
        "group relative flex h-full overflow-hidden",
        portfolioCardSurface,
        portfolioCardHover,
        hasThumbnail
          ? "flex-col"
          : featured
            ? "flex-col lg:flex-row lg:items-stretch"
            : "flex-col"
      )}
    >
      {hasThumbnail ? (
        <CinematicThumbnail src={project.thumbnailUrl!} featured={featured} />
      ) : (
        <PlaceholderThumbnail index={index} featured={featured} />
      )}

      <div
        className={cn(
          "relative z-[2] flex flex-1 flex-col",
          featured ? "p-6 sm:p-8 lg:p-11" : "p-5 sm:p-7",
          hasThumbnail && "bg-[linear-gradient(to_bottom,oklch(0.075_0.012_280)_0%,oklch(0.068_0.012_280)_100%)]"
        )}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
          Case study · {String(index + 1).padStart(2, "0")}
        </p>

        <h3
          className={cn(
            "mt-3 font-semibold tracking-[-0.025em] text-white sm:mt-4",
            featured
              ? "text-xl leading-tight sm:text-2xl lg:text-[2rem]"
              : "text-lg leading-snug sm:text-xl"
          )}
        >
          {project.title}
        </h3>

        {project.description ? (
          <p
            className={cn(
              "mt-4 leading-[1.75] text-zinc-300 sm:mt-5",
              featured ? "max-w-xl text-[15px] sm:text-base lg:text-[17px]" : "text-sm sm:text-[15px]"
            )}
          >
            {project.description}
          </p>
        ) : null}

        {project.outcome ? (
          <p className="mt-5 border-l border-white/[0.08] pl-4 text-sm leading-relaxed text-zinc-200 sm:mt-6">
            {project.outcome}
          </p>
        ) : null}

        {project.techStack.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2 sm:mt-7">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md bg-white/[0.05] px-2.5 py-1 text-[11px] tracking-wide text-zinc-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

export function PortfolioProjects({
  projects,
  hasProjects,
}: PortfolioProjectsProps) {
  const { inView, staggerContainer, staggerItem } = useMotion();
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
          className="space-y-6 sm:space-y-8"
        >
          <motion.div variants={staggerItem}>
            <ProjectCard project={featured} index={0} featured />
          </motion.div>
          {rest.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              className="grid gap-6 sm:gap-8 lg:grid-cols-2"
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

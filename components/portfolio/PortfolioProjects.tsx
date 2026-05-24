"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
        featured ? "aspect-[2/1] sm:aspect-[21/9]" : "aspect-[16/10]"
      )}
    >
      <Image
        src={src}
        alt=""
        fill
        unoptimized
        className="object-cover brightness-[0.9] saturate-[0.88] transition-[transform,filter] duration-700 group-hover:scale-[1.015] group-hover:brightness-[0.95]"
      />
      <div
        aria-hidden
        className="absolute inset-0 shadow-[inset_0_0_120px_oklch(0_0_0/0.4)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(1_0_0/0.05),transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[oklch(0.075_0.012_280)] via-[oklch(0.075_0.012_280)/0.55] to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-white/[0.06]"
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
        "relative shrink-0 overflow-hidden bg-[oklch(0.06_0.01_280)]",
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
  const hasThumbnail = Boolean(project.thumbnailUrl);

  return (
    <article
      className={cn(
        "group relative flex h-full overflow-hidden rounded-2xl border border-white/[0.05] bg-[oklch(0.075_0.012_280)]",
        "transition-[border-color,box-shadow] duration-500",
        "hover:border-white/[0.08] hover:shadow-[0_20px_50px_-30px_oklch(0_0_0/0.9)]",
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
          "flex flex-1 flex-col",
          featured ? "p-8 sm:p-10 lg:p-12" : "p-7 sm:p-8",
          hasThumbnail && featured && "pt-7 sm:pt-8 lg:pt-9"
        )}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
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
              "mt-5 leading-[1.75] text-zinc-300",
              featured ? "max-w-xl text-base sm:text-[17px]" : "text-sm sm:text-base"
            )}
          >
            {project.description}
          </p>
        ) : null}

        {project.outcome ? (
          <p className="mt-6 border-l border-white/[0.06] pl-4 text-sm leading-relaxed text-zinc-200">
            {project.outcome}
          </p>
        ) : null}

        {project.techStack.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md bg-white/[0.04] px-2.5 py-1 text-[11px] tracking-wide text-zinc-300"
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

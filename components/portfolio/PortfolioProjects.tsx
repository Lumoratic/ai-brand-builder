"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMotion } from "@/hooks/use-motion";
import { shouldUnoptimizeImageSrc } from "@/lib/read-image-file";
import {
  getFeaturedProjects,
  hasFeaturedProjects,
  type PortfolioProject,
} from "@/lib/portfolio-utils";
import { useBuilderProfile } from "@/lib/stores/builderStore";
import { cn } from "@/lib/utils";
import { PortfolioEmptyState } from "@/components/portfolio/PortfolioEmptyState";
import {
  MotionStagger,
  MotionStaggerItem,
} from "@/components/portfolio/motion/MotionStagger";
import {
  portfolioCardHover,
  portfolioCardSurface,
} from "@/components/portfolio/portfolio-layout";

function ProjectImage({
  src,
  alt,
  featured,
  priority,
}: {
  src: string;
  alt: string;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[oklch(0.06_0.01_280)]",
        featured
          ? "aspect-[16/10] sm:aspect-[2/1] lg:aspect-[21/9]"
          : "aspect-[16/10] sm:aspect-[5/3]"
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized={shouldUnoptimizeImageSrc(src)}
        sizes={
          featured
            ? "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1080px"
            : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 540px"
        }
        className="object-cover object-center brightness-[0.94] saturate-[0.92] transition-[transform,filter] duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] group-hover:brightness-[0.98] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
      <div
        aria-hidden
        className="absolute inset-0 shadow-[inset_0_0_80px_oklch(0_0_0/0.28)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,oklch(1_0_0/0.05),transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[oklch(0.07_0.012_280)/0.55] via-transparent to-transparent"
      />
    </div>
  );
}

function PlaceholderVisual({
  index,
  featured,
}: {
  index: number;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden bg-[linear-gradient(155deg,oklch(0.09_0.014_280)_0%,oklch(0.065_0.011_280)_100%)]",
        featured
          ? "aspect-[16/10] w-full sm:aspect-[2/1] lg:aspect-[21/9]"
          : "aspect-[16/10] w-full sm:aspect-[5/3]"
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,oklch(0.4_0.16_280/0.12),transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.07_0.012_280),transparent_45%)]"
      />
      <div className="absolute inset-0 flex items-end justify-between p-5 sm:p-7">
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-600">
          Preview
        </span>
        <span className="text-4xl font-semibold tracking-tighter text-white/[0.05] sm:text-5xl">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function TechTags({ items, compact }: { items: string[]; compact?: boolean }) {
  if (items.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap gap-2", compact ? "mt-5" : "mt-6 sm:mt-7")}>
      {items.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-400"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function ProjectContent({
  project,
  index,
  featured,
}: {
  project: PortfolioProject;
  index: number;
  featured?: boolean;
}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
          Case study · {String(index + 1).padStart(2, "0")}
        </p>
        {featured ? (
          <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-400">
            Featured
          </span>
        ) : null}
      </div>

      <h3
        className={cn(
          "mt-3 font-semibold tracking-[-0.03em] text-white",
          featured
            ? "text-2xl leading-[1.12] sm:mt-4 sm:text-3xl lg:text-[2.125rem]"
            : "text-lg leading-snug sm:text-xl"
        )}
      >
        {project.title}
      </h3>

      {project.description ? (
        <p
          className={cn(
            "mt-4 leading-[1.8] text-zinc-400",
            featured
              ? "max-w-2xl text-[15px] sm:mt-5 sm:text-base lg:text-[17px] lg:leading-[1.75]"
              : "text-sm sm:text-[15px]"
          )}
        >
          {project.description}
        </p>
      ) : null}

      {project.outcome ? (
        <blockquote className="mt-5 border-l-2 border-white/[0.1] pl-4 sm:mt-6 sm:pl-5">
          <p
            className={cn(
              "leading-[1.7] text-zinc-200",
              featured ? "text-[15px] sm:text-base" : "text-sm"
            )}
          >
            {project.outcome}
          </p>
        </blockquote>
      ) : null}

      <TechTags items={project.techStack} compact={!featured} />
    </>
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
  const imageAlt = project.title
    ? `${project.title} project preview`
    : "Project preview";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden",
        portfolioCardSurface,
        portfolioCardHover
      )}
    >
      <div
        className={cn(
          "relative",
          featured ? "p-2 sm:p-3" : "p-2 sm:p-2.5"
        )}
      >
        <div
          className={cn(
            "overflow-hidden rounded-[1rem] ring-1 ring-white/[0.06]",
            featured && "rounded-[1.125rem] sm:rounded-[1.25rem]"
          )}
        >
          {hasThumbnail ? (
            <ProjectImage
              src={project.thumbnailUrl!}
              alt={imageAlt}
              featured={featured}
              priority={featured}
            />
          ) : (
            <PlaceholderVisual index={index} featured={featured} />
          )}
        </div>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col",
          featured ? "px-6 pb-8 pt-2 sm:px-8 sm:pb-10 lg:px-10 lg:pb-11" : "px-5 pb-6 pt-1 sm:px-6 sm:pb-7"
        )}
      >
        <ProjectContent project={project} index={index} featured={featured} />
      </div>
    </article>
  );
}

export function PortfolioProjects() {
  const profile = useBuilderProfile();
  const projects = getFeaturedProjects(profile);
  const hasProjects = hasFeaturedProjects(profile);
  const { staggerContainer, staggerItem } = useMotion();
  const [featured, ...rest] = projects;

  if (!hasProjects || !featured) {
    return (
      <PortfolioEmptyState
        eyebrow="Selected work"
        title="Case studies will appear here"
        description="Add a project in the builder with context on your role, the outcome, and a screenshot. Strong portfolios lead with one featured story, then supporting work."
      />
    );
  }

  return (
    <MotionStagger viewportMargin="-80px" className="space-y-8 sm:space-y-10 lg:space-y-12">
      <MotionStaggerItem>
        <ProjectCard project={featured} index={0} featured />
      </MotionStaggerItem>

      {rest.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10"
        >
          {rest.map((project, index) => (
            <motion.div key={project.id} variants={staggerItem} className="h-full">
              <ProjectCard project={project} index={index + 1} />
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </MotionStagger>
  );
}

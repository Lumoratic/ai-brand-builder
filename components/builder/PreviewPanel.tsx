"use client";

import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { useBuilderProfile } from "@/lib/stores/builderStore";
import { buildServices, getFeaturedProjects, getInitials } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";

const placeholders = {
  fullName: "Your Name",
  jobTitle: "Your Role",
  headline: "Your headline or tagline",
  bio: "Your bio will appear here.",
};

function displayValue(value: string, fallback: string) {
  return value.trim() || fallback;
}

function contactEmail(fullName: string): string {
  const slug = fullName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ".")
    .replace(/[^a-z0-9.]/g, "");
  return slug ? `${slug}@email.com` : "hello@email.com";
}

export function PreviewPanel() {
  const profile = useBuilderProfile();
  const projects = getFeaturedProjects(profile);
  const capabilities = buildServices(profile);
  const name = displayValue(profile.fullName, placeholders.fullName);
  const title = displayValue(profile.jobTitle, placeholders.jobTitle);
  const headline = displayValue(profile.headline, placeholders.headline);
  const bio = displayValue(profile.bio, placeholders.bio);
  const initials = getInitials(profile.fullName);
  const isPlaceholder = {
    name: !profile.fullName.trim(),
    title: !profile.jobTitle.trim(),
    headline: !profile.headline.trim(),
    bio: !profile.bio.trim(),
    avatar: !profile.avatarUrl,
  };

  return (
    <div className="flex h-full flex-col bg-[oklch(0.06_0.01_280)]">
      <div className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-5 py-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          Live preview
        </p>
        <div className="flex items-center gap-2" aria-live="polite" aria-atomic="true">
          <span className="size-1.5 rounded-full bg-emerald-500/80" aria-hidden />
          <span className="text-[11px] text-zinc-500">Synced</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero — full bleed */}
        <section className="relative border-b border-white/[0.05] px-6 py-10 sm:px-8 sm:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.42_0.18_280/0.15),transparent_70%)]"
          />
          <div className="relative grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/5 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-emerald-400/90">
                Open to projects
              </span>
              <h2
                className={cn(
                  "mt-5 text-3xl font-semibold leading-[0.95] tracking-[-0.03em] sm:text-4xl",
                  isPlaceholder.name ? "text-zinc-700" : "text-white"
                )}
              >
                {name}
              </h2>
              <p
                className={cn(
                  "mt-3 text-base font-medium sm:text-lg",
                  isPlaceholder.title ? "text-zinc-700" : "text-zinc-300"
                )}
              >
                {title}
              </p>
              <p
                className={cn(
                  "mt-4 text-sm leading-relaxed sm:text-base",
                  isPlaceholder.headline ? "text-zinc-600" : "text-zinc-400"
                )}
              >
                {headline}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-900">
                  Discuss a project
                  <ArrowUpRight className="size-3" />
                </span>
                <span className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-zinc-500">
                  See my work
                </span>
              </div>
            </div>
            <div
              className={cn(
                "relative mx-auto size-24 shrink-0 overflow-hidden rounded-2xl border sm:mx-0 sm:size-28",
                isPlaceholder.avatar && isPlaceholder.name
                  ? "border-white/[0.08] bg-[linear-gradient(145deg,oklch(0.32_0.14_280)_0%,oklch(0.22_0.1_300)_100%)]"
                  : "border-white/10 shadow-lg"
              )}
            >
              {profile.avatarUrl ? (
                <Image
                  src={profile.avatarUrl}
                  alt=""
                  fill
                  unoptimized
                  sizes="112px"
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-lg font-semibold text-white/90">
                  {initials}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Projects — emphasized */}
        <section className="border-b border-white/[0.05] bg-[oklch(0.065_0.012_280)] px-6 py-10 sm:px-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
            Selected work
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
            Case studies
          </h3>
          {projects.length > 0 ? (
            <ul className="mt-6 space-y-5">
              {projects.map((project, i) => (
                <li
                  key={project.id}
                  className={cn(
                    "overflow-hidden rounded-xl border border-white/[0.07] bg-[oklch(0.075_0.012_280)]",
                    i === 0 && "border-white/[0.09]"
                  )}
                >
                  {project.thumbnailUrl ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={project.thumbnailUrl}
                        alt=""
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover brightness-[0.9] saturate-[0.88]"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-[oklch(0.075_0.012_280)] via-[oklch(0.075_0.012_280)/0.4] to-transparent"
                      />
                    </div>
                  ) : null}
                  <div className={cn("p-5", i === 0 && "sm:p-6")}>
                    <p className="text-[9px] uppercase tracking-wider text-zinc-600">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p
                      className={cn(
                        "mt-2 font-semibold tracking-tight text-white",
                        i === 0 ? "text-lg" : "text-base"
                      )}
                    >
                      {project.title}
                    </p>
                    {project.description ? (
                      <p className="mt-2 text-sm leading-[1.7] text-zinc-300">
                        {project.description}
                      </p>
                    ) : null}
                    {project.outcome ? (
                      <p className="mt-3 border-l border-white/[0.06] pl-3 text-xs text-zinc-300">
                        {project.outcome}
                      </p>
                    ) : null}
                    {project.techStack.length > 0 ? (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md border border-white/[0.06] px-2 py-0.5 text-[10px] text-zinc-600"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-zinc-500">
              Your case studies will appear here once you add them.
            </p>
          )}
        </section>

        {/* About */}
        <section className="border-b border-white/[0.05] px-6 py-10 sm:px-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
            About
          </p>
          <p
            className={cn(
              "mt-4 max-w-prose text-sm leading-[1.75] sm:text-base",
              isPlaceholder.bio ? "text-zinc-700" : "text-zinc-400"
            )}
          >
            {bio}
          </p>
        </section>

        {/* Capabilities */}
        <section className="border-b border-white/[0.04] px-6 py-10 sm:px-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            Capabilities
          </p>
          {capabilities.length > 0 ? (
            <ul className="mt-5 space-y-5">
              {capabilities.map((cap) => (
                <li key={cap.id}>
                  <p className="text-sm font-semibold tracking-tight text-white">
                    {cap.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-300 line-clamp-3">
                    {cap.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-zinc-500">
              Add skills to generate capability descriptions.
            </p>
          )}
        </section>

        {/* Contact CTA */}
        <section className="px-6 py-12 sm:px-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-600">
            Contact
          </p>
          <h3 className="mt-3 text-lg font-semibold tracking-tight text-white">
            Start the conversation
          </h3>
          <div className="mt-5 flex items-center gap-3 text-sm text-zinc-400">
            <Mail className="size-4 shrink-0 text-zinc-500" aria-hidden />
            {contactEmail(profile.fullName)}
          </div>
          <div className="mt-6 inline-flex rounded-full bg-white px-4 py-2 text-xs font-medium text-zinc-900">
            Discuss a project
          </div>
        </section>
      </div>
    </div>
  );
}

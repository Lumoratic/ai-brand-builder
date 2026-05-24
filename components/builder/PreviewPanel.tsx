"use client";

import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { parseSkills, useBuilderProfile } from "@/lib/stores/builderStore";
import { getFeaturedProjects, getInitials } from "@/lib/portfolio-utils";
import { cn } from "@/lib/utils";

const placeholders = {
  fullName: "Your Name",
  jobTitle: "Your Role",
  headline: "Your headline or tagline",
  bio: "Your bio will appear here. Share what you do, what you care about, and what makes your work distinctive.",
  skill: "Add skills",
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
  const skills = parseSkills(profile.skills);
  const projects = getFeaturedProjects(profile);
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
    skills: skills.length === 0,
    avatar: !profile.avatarUrl,
  };

  return (
    <div className="flex h-full flex-col bg-[oklch(0.05_0.01_280)]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 sm:px-6">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          Live preview
        </p>
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500/80" />
          <span className="text-xs text-zinc-500">Synced</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div
          className={cn(
            "mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/[0.08]",
            "bg-[oklch(0.1_0.015_280)] shadow-2xl shadow-black/40",
            "transition-shadow duration-300"
          )}
        >
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-zinc-700" />
              <span className="size-2.5 rounded-full bg-zinc-700" />
              <span className="size-2.5 rounded-full bg-zinc-700" />
            </div>
            <span className="mx-auto truncate text-[10px] text-zinc-600">
              {name.toLowerCase().replace(/\s+/g, "") || "portfolio"}.brandspark.io
            </span>
          </div>

          <div className="transition-opacity duration-300">
            <nav className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4 sm:px-8">
              <span
                className={cn(
                  "text-sm font-semibold tracking-tight transition-colors duration-300",
                  isPlaceholder.name ? "text-zinc-600" : "text-white"
                )}
              >
                {name.split(" ")[0]}
              </span>
              <div className="hidden gap-6 text-xs text-zinc-500 sm:flex">
                <span>About</span>
                <span>Work</span>
                <span>Contact</span>
              </div>
            </nav>

            <section className="relative overflow-hidden px-6 py-12 sm:px-8 sm:py-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-600/15 via-transparent to-fuchsia-600/10"
              />
              <div className="relative space-y-4 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border text-sm font-semibold",
                      isPlaceholder.avatar && isPlaceholder.name
                        ? "border-white/[0.08] bg-white/[0.03] text-zinc-600"
                        : "border-violet-500/25 bg-violet-500/10 text-white"
                    )}
                  >
                    {profile.avatarUrl ? (
                      <Image
                        src={profile.avatarUrl}
                        alt=""
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-400/90">
                    Portfolio
                  </p>
                </div>
                <p
                  className={cn(
                    "text-base font-medium leading-snug transition-colors duration-300 sm:text-lg",
                    isPlaceholder.headline ? "text-zinc-600" : "text-violet-200/90"
                  )}
                >
                  {headline}
                </p>
                <h2
                  className={cn(
                    "text-3xl font-semibold leading-[1.1] tracking-tight transition-colors duration-300 sm:text-4xl",
                    isPlaceholder.name ? "text-zinc-600" : "text-white"
                  )}
                >
                  {name}
                </h2>
                <p
                  className={cn(
                    "text-lg transition-colors duration-300 sm:text-xl",
                    isPlaceholder.title ? "text-zinc-600" : "text-zinc-400"
                  )}
                >
                  {title}
                </p>
              </div>
            </section>

            <section className="border-t border-white/[0.06] px-6 py-10 sm:px-8">
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                About
              </h3>
              <p
                className={cn(
                  "mt-4 max-w-lg text-sm leading-relaxed transition-colors duration-300 sm:text-base",
                  isPlaceholder.bio ? "text-zinc-600" : "text-zinc-300"
                )}
              >
                {bio}
              </p>
            </section>

            <section className="border-t border-white/[0.06] px-6 py-10 sm:px-8">
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Featured projects
              </h3>
              {projects.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {projects.map((project) => (
                    <li
                      key={project.id}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors duration-300"
                    >
                      <p className="font-medium text-white">{project.title}</p>
                      {project.description ? (
                        <p className="mt-1 text-sm text-zinc-500">
                          {project.description}
                        </p>
                      ) : null}
                      {project.techStack.length > 0 ? (
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {project.techStack.map((tech) => (
                            <li
                              key={tech}
                              className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] text-zinc-500"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-zinc-600">
                  Add projects in the form to preview them here.
                </p>
              )}
            </section>

            <section className="border-t border-white/[0.06] px-6 py-10 sm:px-8">
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Skills
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {(skills.length > 0 ? skills : [placeholders.skill]).map(
                  (skill) => (
                    <li
                      key={skill}
                      className={cn(
                        "rounded-xl border px-3.5 py-2 text-sm transition-all duration-300",
                        isPlaceholder.skills
                          ? "border-white/[0.06] bg-white/[0.02] text-zinc-600"
                          : "border-violet-500/20 bg-violet-500/10 text-violet-200"
                      )}
                    >
                      {skill}
                    </li>
                  )
                )}
              </ul>
            </section>

            <section className="border-t border-white/[0.06] bg-white/[0.02] px-6 py-10 sm:px-8">
              <h3 className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                Contact
              </h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-zinc-400 transition-colors duration-300">
                  <Mail className="size-4 shrink-0 text-violet-400/80" />
                  <span
                    className={cn(
                      !profile.fullName.trim() && "text-zinc-600"
                    )}
                  >
                    {contactEmail(profile.fullName)}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-500">
                  <MapPin className="size-4 shrink-0 text-violet-400/80" />
                  <span>Available for opportunities</span>
                </div>
                <button
                  type="button"
                  className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition-transform duration-200 hover:bg-zinc-100 active:scale-[0.99] sm:w-auto sm:px-6"
                >
                  Get in touch
                </button>
              </div>
            </section>

            <footer className="border-t border-white/[0.06] px-6 py-4 text-center text-[10px] text-zinc-600 sm:px-8">
              Built with BrandSpark
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

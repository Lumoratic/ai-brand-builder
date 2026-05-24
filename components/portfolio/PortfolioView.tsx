"use client";

import Link from "next/link";
import { ArrowLeft, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { parseSkills, useBuilderProfile } from "@/lib/stores/builderStore";
import { cn } from "@/lib/utils";

function contactEmail(fullName: string): string {
  const slug = fullName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ".")
    .replace(/[^a-z0-9.]/g, "");
  return slug ? `${slug}@email.com` : "hello@email.com";
}

function display(value: string, fallback: string) {
  return value.trim() || fallback;
}

export function PortfolioView() {
  const profile = useBuilderProfile();
  const skills = parseSkills(profile.skills);

  const name = display(profile.fullName, "Your Name");
  const title = display(profile.jobTitle, "Your Role");
  const bio = display(
    profile.bio,
    "Add your bio in the builder to tell visitors about your work and what you're looking for."
  );
  const firstName = name.split(" ")[0];

  return (
    <div className="min-h-screen bg-[oklch(0.07_0.012_280)] text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[oklch(0.07_0.012_280)]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/builder"
            className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to builder
          </Link>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <Sparkles className="size-3.5 text-violet-400" />
            BrandSpark
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-600/10 via-transparent to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[600px] -translate-x-1/2 rounded-full bg-violet-600/15 blur-[100px]"
          />
          <div className="relative mx-auto max-w-5xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/90">
              Portfolio
            </p>
            <h1
              className={cn(
                "mt-6 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl",
                profile.fullName.trim() ? "text-white" : "text-zinc-600"
              )}
            >
              {name}
            </h1>
            <p
              className={cn(
                "mt-5 max-w-xl text-lg sm:text-xl",
                profile.jobTitle.trim() ? "text-zinc-400" : "text-zinc-600"
              )}
            >
              {title}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                asChild
                className="rounded-full bg-white px-6 text-zinc-900 hover:bg-zinc-100"
              >
                <a href="#contact">Get in touch</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-transparent text-white hover:bg-white/5"
              >
                <a href="#about">Learn more</a>
              </Button>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="border-t border-white/[0.06] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              About
            </h2>
            <p
              className={cn(
                "mt-6 max-w-2xl text-base leading-relaxed sm:text-lg sm:leading-relaxed",
                profile.bio.trim() ? "text-zinc-300" : "text-zinc-600"
              )}
            >
              {bio}
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="border-t border-white/[0.06] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Skills
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {(skills.length > 0 ? skills : ["Add skills in the builder"]).map(
                (skill) => (
                  <li
                    key={skill}
                    className={cn(
                      "rounded-xl border px-4 py-2.5 text-sm transition-colors",
                      skills.length > 0
                        ? "border-violet-500/25 bg-violet-500/10 text-violet-200"
                        : "border-white/[0.06] bg-white/[0.02] text-zinc-600"
                    )}
                  >
                    {skill}
                  </li>
                )
              )}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="border-t border-white/[0.06] bg-white/[0.02] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Contact
            </h2>
            <p className="mt-4 max-w-md text-sm text-zinc-400">
              Interested in working together? Reach out — I&apos;d love to hear
              from you.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <a
                href={`mailto:${contactEmail(profile.fullName)}`}
                className="inline-flex items-center gap-3 text-sm text-zinc-300 transition-colors hover:text-white"
              >
                <span className="flex size-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                  <Mail className="size-4 text-violet-400" />
                </span>
                {contactEmail(profile.fullName)}
              </a>
            </div>
            <Button
              asChild
              className="mt-8 rounded-full bg-white px-6 text-zinc-900 hover:bg-zinc-100"
            >
              <a href={`mailto:${contactEmail(profile.fullName)}`}>
                Send a message
              </a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] px-4 py-8 text-center text-xs text-zinc-600 sm:px-6 lg:px-8">
        © {firstName} · Built with{" "}
        <Link href="/builder" className="text-zinc-500 hover:text-zinc-300">
          BrandSpark
        </Link>
      </footer>
    </div>
  );
}

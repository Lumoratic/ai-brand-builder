"use client";

import { motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";
import { getFadeInView } from "@/lib/motion";
import { displayValue } from "@/lib/portfolio-utils";
import type { BuilderProfile } from "@/lib/stores/builderStore";
import { cn } from "@/lib/utils";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";

type PortfolioAboutProps = {
  profile: BuilderProfile;
};

export function PortfolioAbout({ profile }: PortfolioAboutProps) {
  const mounted = useMounted();
  const bio = displayValue(
    profile.bio,
    "Share your story in the builder — how you work, what you care about, and the kind of clients you do your best work for."
  );
  const hasBio = Boolean(profile.bio.trim());

  return (
    <PortfolioSection
      id="about"
      label="About"
      title="How I approach the work"
    >
      <motion.div
        {...getFadeInView(mounted)}
        className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-20"
      >
        <p
          className={cn(
            "max-w-2xl text-lg leading-[1.85] lg:text-xl lg:leading-[1.8]",
            hasBio ? "text-zinc-200" : "text-zinc-400"
          )}
        >
          {bio}
        </p>
        <aside className="space-y-8 pt-8 lg:pl-10 lg:pt-2">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
              Location
            </p>
            <p className="mt-3 text-sm text-zinc-200">Remote · Worldwide</p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
              Collaboration
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Direct, async-friendly, and focused on outcomes clients can feel.
            </p>
          </div>
        </aside>
      </motion.div>
    </PortfolioSection>
  );
}

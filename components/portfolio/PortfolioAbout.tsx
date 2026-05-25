"use client";

import { MotionFadeInView } from "@/components/portfolio/motion/MotionFadeInView";
import { portfolioSectionLabel } from "@/components/portfolio/portfolio-layout";
import { displayValue } from "@/lib/portfolio-utils";
import { useBuilderProfile } from "@/lib/stores/builderStore";
import { cn } from "@/lib/utils";

export function PortfolioAbout() {
  const profile = useBuilderProfile();
  const bio = displayValue(
    profile.bio,
    "Share your story in the builder — how you work, what you care about, and the kind of clients you do your best work for."
  );
  const hasBio = Boolean(profile.bio.trim());

  return (
    <MotionFadeInView className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-20">
      <p
        className={cn(
          "max-w-2xl text-lg leading-[1.85] lg:text-xl lg:leading-[1.8]",
          hasBio ? "text-zinc-200" : "text-zinc-300"
        )}
      >
        {bio}
      </p>
      <aside className="space-y-7 pt-6 sm:space-y-8 sm:pt-8 lg:pl-10 lg:pt-2">
        <div>
          <p className={portfolioSectionLabel}>Location</p>
          <p className="mt-2.5 text-sm tracking-tight text-zinc-200 sm:mt-3">
            Remote · Worldwide
          </p>
        </div>
        <div>
          <p className={portfolioSectionLabel}>Collaboration</p>
          <p className="mt-2.5 text-sm leading-[1.75] text-zinc-300 sm:mt-3">
            Direct, async-friendly, and focused on outcomes clients can feel.
          </p>
        </div>
      </aside>
    </MotionFadeInView>
  );
}

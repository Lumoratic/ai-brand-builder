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
    "Your story goes here. Return to the builder to add a short bio that explains your craft, your approach, and the kind of work you want next."
  );
  const hasBio = Boolean(profile.bio.trim());

  return (
    <PortfolioSection
      id="about"
      label="About"
      title="The work behind the work"
      description="A clear point of view matters more than a long résumé."
    >
      <motion.div
        {...getFadeInView(mounted)}
        className="grid gap-10 lg:grid-cols-[1fr_280px]"
      >
        <p
          className={cn(
            "max-w-2xl text-base leading-[1.8] sm:text-lg",
            hasBio ? "text-zinc-300" : "text-zinc-600"
          )}
        >
          {bio}
        </p>
        <div className="space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
              Based in
            </p>
            <p className="mt-2 text-sm text-zinc-400">Remote · Worldwide</p>
          </div>
          <div className="border-t border-white/[0.06] pt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-600">
              Working style
            </p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Direct communication, thoughtful delivery, and work that holds up
              under scrutiny.
            </p>
          </div>
        </div>
      </motion.div>
    </PortfolioSection>
  );
}

"use client";

import { parseSkills, useBuilderProfile } from "@/lib/stores/builderStore";
import {
  buildServices,
  getFeaturedProjects,
  hasFeaturedProjects,
} from "@/lib/portfolio-utils";
import { PortfolioAbout } from "@/components/portfolio/PortfolioAbout";
import { PortfolioAtmosphere } from "@/components/portfolio/PortfolioAtmosphere";
import { PortfolioContact, PortfolioFooter } from "@/components/portfolio/PortfolioContact";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioNav } from "@/components/portfolio/PortfolioNav";
import { PortfolioProjects } from "@/components/portfolio/PortfolioProjects";
import { PortfolioServices } from "@/components/portfolio/PortfolioServices";
import { portfolioFocusRing } from "@/components/portfolio/portfolio-layout";
import { cn } from "@/lib/utils";

export function PortfolioView() {
  const profile = useBuilderProfile();
  const skills = parseSkills(profile.skills);
  const hasSkills = skills.length > 0;
  const hasProjects = hasFeaturedProjects(profile);
  const projects = getFeaturedProjects(profile);
  const services = buildServices(profile);

  return (
    <PortfolioAtmosphere>
      <a
        href="#main-content"
        className={cn(
          "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-900",
          portfolioFocusRing
        )}
      >
        Skip to content
      </a>
      <PortfolioNav fullName={profile.fullName} />
      <main id="main-content">
        <PortfolioHero profile={profile} />
        <PortfolioProjects projects={projects} hasProjects={hasProjects} />
        <PortfolioAbout profile={profile} />
        <PortfolioServices services={services} hasSkills={hasSkills} />
        <PortfolioContact profile={profile} />
      </main>
      <PortfolioFooter fullName={profile.fullName} />
    </PortfolioAtmosphere>
  );
}

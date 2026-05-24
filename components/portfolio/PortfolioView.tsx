"use client";

import { parseSkills, useBuilderProfile } from "@/lib/stores/builderStore";
import {
  buildProjects,
  buildServices,
  buildStats,
} from "@/lib/portfolio-utils";
import { PortfolioAbout } from "@/components/portfolio/PortfolioAbout";
import { PortfolioContact, PortfolioFooter } from "@/components/portfolio/PortfolioContact";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioNav } from "@/components/portfolio/PortfolioNav";
import { PortfolioProjects } from "@/components/portfolio/PortfolioProjects";
import { PortfolioServices } from "@/components/portfolio/PortfolioServices";
import { PortfolioStats } from "@/components/portfolio/PortfolioStats";

export function PortfolioView() {
  const profile = useBuilderProfile();
  const skills = parseSkills(profile.skills);
  const hasSkills = skills.length > 0;

  const projects = buildProjects(profile);
  const services = buildServices(profile);
  const stats = buildStats(profile);

  return (
    <div className="min-h-screen bg-[oklch(0.07_0.012_280)] text-foreground">
      <PortfolioNav fullName={profile.fullName} />
      <main>
        <PortfolioHero profile={profile} />
        <PortfolioStats stats={stats} />
        <PortfolioAbout profile={profile} />
        <PortfolioProjects projects={projects} hasSkills={hasSkills} />
        <PortfolioServices services={services} hasSkills={hasSkills} />
        <PortfolioContact profile={profile} />
      </main>
      <PortfolioFooter fullName={profile.fullName} />
    </div>
  );
}

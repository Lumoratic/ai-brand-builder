import { PortfolioAtmosphere } from "@/components/portfolio/PortfolioAtmosphere";
import { PortfolioAbout } from "@/components/portfolio/PortfolioAbout";
import { PortfolioContact } from "@/components/portfolio/PortfolioContact";
import { PortfolioFooterBridge } from "@/components/portfolio/PortfolioFooterBridge";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { PortfolioNav } from "@/components/portfolio/PortfolioNav";
import { PortfolioProjects } from "@/components/portfolio/PortfolioProjects";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { PortfolioServices } from "@/components/portfolio/PortfolioServices";
import { PortfolioSkipLink } from "@/components/portfolio/PortfolioSkipLink";

export function PortfolioPageContent() {
  return (
    <PortfolioAtmosphere>
      <PortfolioSkipLink />
      <PortfolioNav />
      <main id="main-content">
        <PortfolioHero />
        <PortfolioSection
          id="work"
          label="Selected work"
          title="Case studies & client work"
          description="A curated selection — the kind of work I'd share when someone asks what I've actually built."
          featured
        >
          <PortfolioProjects />
        </PortfolioSection>
        <PortfolioSection
          id="about"
          label="About"
          title="How I approach the work"
        >
          <PortfolioAbout />
        </PortfolioSection>
        <PortfolioSection
          id="services"
          label="Capabilities"
          title="Where I'm most useful"
          description="Not a service menu — the kinds of problems I do my best work on."
          alt
        >
          <PortfolioServices />
        </PortfolioSection>
        <PortfolioContact />
      </main>
      <PortfolioFooterBridge />
    </PortfolioAtmosphere>
  );
}

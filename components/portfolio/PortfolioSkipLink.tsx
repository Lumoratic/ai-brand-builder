import { portfolioFocusRing } from "@/components/portfolio/portfolio-layout";
import { cn } from "@/lib/utils";

export function PortfolioSkipLink() {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-900",
        portfolioFocusRing
      )}
    >
      Skip to content
    </a>
  );
}

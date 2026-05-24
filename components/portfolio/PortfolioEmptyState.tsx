import { cn } from "@/lib/utils";
import { portfolioPanelSurface } from "@/components/portfolio/portfolio-layout";

type PortfolioEmptyStateProps = {
  title: string;
  description: string;
  className?: string;
};

export function PortfolioEmptyState({
  title,
  description,
  className,
}: PortfolioEmptyStateProps) {
  return (
    <div
      className={cn(
        portfolioPanelSurface,
        "relative px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20",
        className
      )}
    >
      <div className="relative z-[2]">
      <p className="text-base text-zinc-200 sm:text-[17px]">{title}</p>
      <p className="mt-3 max-w-md text-sm leading-[1.8] text-zinc-300 sm:text-[15px]">
        {description}
      </p>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { portfolioPanelSurface } from "@/components/portfolio/portfolio-layout";

type PortfolioEmptyStateProps = {
  title: string;
  description: string;
  className?: string;
  eyebrow?: string;
};

export function PortfolioEmptyState({
  title,
  description,
  className,
  eyebrow,
}: PortfolioEmptyStateProps) {
  return (
    <div
      className={cn(
        portfolioPanelSurface,
        "relative px-6 py-14 sm:px-10 sm:py-16 lg:px-12 lg:py-[4.5rem]",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent sm:inset-x-12"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 top-6 text-6xl font-semibold tracking-tighter text-white/[0.03] sm:right-10 sm:text-7xl"
      >
        —
      </div>
      <div className="relative z-[2] max-w-lg">
        {eyebrow ? (
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
            {eyebrow}
          </p>
        ) : null}
        <p
          className={cn(
            "text-lg font-medium tracking-tight text-zinc-100 sm:text-xl",
            eyebrow && "mt-3"
          )}
        >
          {title}
        </p>
        <p className="mt-3 text-sm leading-[1.85] text-zinc-400 sm:mt-4 sm:text-[15px]">
          {description}
        </p>
      </div>
    </div>
  );
}

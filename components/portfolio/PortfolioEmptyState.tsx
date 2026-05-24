import { cn } from "@/lib/utils";

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
        "rounded-2xl bg-white/[0.015] px-8 py-16 sm:px-12 sm:py-20",
        className
      )}
    >
      <p className="text-base text-zinc-300">{title}</p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
    </div>
  );
}

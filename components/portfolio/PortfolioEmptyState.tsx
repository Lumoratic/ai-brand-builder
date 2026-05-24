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
        "rounded-2xl border border-white/[0.06] bg-white/[0.012] px-8 py-16 sm:px-12 sm:py-20",
        className
      )}
    >
      <p className="text-base text-zinc-400">{title}</p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600">
        {description}
      </p>
    </div>
  );
}

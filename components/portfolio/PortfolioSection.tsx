import { cn } from "@/lib/utils";
import {
  portfolioContainer,
  portfolioSectionY,
} from "@/components/portfolio/portfolio-layout";

type PortfolioSectionProps = {
  id?: string;
  label: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  alt?: boolean;
  featured?: boolean;
};

export function PortfolioSection({
  id,
  label,
  title,
  description,
  children,
  className,
  alt = false,
  featured = false,
}: PortfolioSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        portfolioSectionY,
        featured && "bg-[oklch(0.062_0.012_280)]",
        alt && !featured && "bg-white/[0.008]",
        className
      )}
    >
      <div className={portfolioContainer}>
        <div className={cn("max-w-3xl", featured && "max-w-4xl")}>
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400">
            {label}
          </p>
          <h2
            className={cn(
              "mt-4 font-semibold tracking-[-0.03em] text-white sm:mt-5",
              featured
                ? "text-2xl sm:text-4xl lg:text-5xl lg:leading-[1.08]"
                : "text-2xl sm:text-3xl lg:text-4xl"
            )}
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.75] text-zinc-300 sm:mt-5 sm:text-base lg:text-[17px]">
              {description}
            </p>
          ) : null}
        </div>
        <div
          className={cn(
            "mt-10 sm:mt-12 lg:mt-14",
            featured && "mt-10 sm:mt-14 lg:mt-16"
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

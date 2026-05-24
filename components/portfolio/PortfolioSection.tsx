import { cn } from "@/lib/utils";

type PortfolioSectionProps = {
  id?: string;
  label: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  alt?: boolean;
};

export function PortfolioSection({
  id,
  label,
  title,
  description,
  children,
  className,
  alt = false,
}: PortfolioSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "border-t border-white/[0.06] px-4 py-20 sm:px-6 sm:py-24 lg:px-8",
        alt && "bg-white/[0.015]",
        className
      )}
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-400/80">
          {label}
        </p>
        <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500 sm:text-base">
            {description}
          </p>
        ) : null}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

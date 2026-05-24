import { GradientText } from "@/components/shared/gradient-text";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: React.ReactNode;
  description: string;
  className?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400/90 sm:text-sm">
        {label}
      </p>
      <h2 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-zinc-400/90 sm:text-lg sm:leading-relaxed">
        {description}
      </p>
    </div>
  );
}

import { cn } from "@/lib/utils";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function SectionContainer({
  children,
  className,
  id,
}: SectionContainerProps) {
  return (
    <section id={id} className={cn("relative px-4 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

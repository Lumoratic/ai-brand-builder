import { cn } from "@/lib/utils";

type GridBackgroundProps = {
  className?: string;
};

export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 grid-bg mask-[radial-gradient(ellipse_at_center,black_20%,transparent_75%)]",
        className
      )}
    />
  );
}

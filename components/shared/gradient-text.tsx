import { cn } from "@/lib/utils";

type GradientTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  variant?: "default" | "accent";
};

export function GradientText({
  children,
  className,
  as: Tag = "span",
  variant = "default",
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        variant === "accent" ? "text-gradient-accent" : "text-gradient",
        className
      )}
    >
      {children}
    </Tag>
  );
}

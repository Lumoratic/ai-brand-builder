import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  size?: "sm" | "md";
};

export function BrandLogo({ className, size = "md" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="pflio home"
      className={cn(
        "inline-flex shrink-0 cursor-pointer font-semibold tracking-tight text-white transition-opacity duration-200 hover:opacity-80",
        "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[oklch(0.07_0.012_280)]",
        size === "sm" ? "text-sm" : "text-base",
        className
      )}
    >
      pflio
    </Link>
  );
}

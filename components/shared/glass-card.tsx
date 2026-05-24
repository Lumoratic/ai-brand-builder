"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassCardProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
};

export function GlassCard({
  children,
  className,
  strong = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl",
        strong ? "glass-strong" : "glass",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

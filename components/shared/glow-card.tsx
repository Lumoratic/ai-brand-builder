"use client";

import { motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function GlowCard({ children, className }: GlowCardProps) {
  const mounted = useMounted();

  return (
    <motion.div
      whileHover={mounted ? { y: -4 } : undefined}
      transition={{ duration: 0.35, ease: easeOut }}
      className={cn("group relative", className)}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur-xl transition-opacity duration-500",
          "bg-gradient-to-br from-violet-500/40 via-fuchsia-500/25 to-transparent",
          "group-hover:opacity-100"
        )}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}

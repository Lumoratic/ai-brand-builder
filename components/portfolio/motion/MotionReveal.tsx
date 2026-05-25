"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useMotion } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

type MotionRevealProps = HTMLMotionProps<"div">;

/** Scroll-reveal wrapper for section headers and blocks. */
export function MotionReveal({ children, className, ...props }: MotionRevealProps) {
  const { sectionReveal } = useMotion();

  return (
    <motion.div {...sectionReveal()} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}

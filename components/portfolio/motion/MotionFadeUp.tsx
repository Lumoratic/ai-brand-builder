"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useMotion } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

type MotionFadeUpProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

/** Mount-time fade up — hero and nav entrances. */
export function MotionFadeUp({
  children,
  className,
  delay = 0,
  ...props
}: MotionFadeUpProps) {
  const { fadeUp } = useMotion();

  return (
    <motion.div {...fadeUp(delay)} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}

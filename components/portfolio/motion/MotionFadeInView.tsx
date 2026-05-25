"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useMotion } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

type MotionFadeInViewProps = HTMLMotionProps<"div">;

/** Fade-in when scrolled into view. */
export function MotionFadeInView({
  children,
  className,
  ...props
}: MotionFadeInViewProps) {
  const { fadeInView } = useMotion();

  return (
    <motion.div {...fadeInView()} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}

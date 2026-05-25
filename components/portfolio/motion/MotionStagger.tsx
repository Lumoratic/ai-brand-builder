"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { useMotion } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

type MotionStaggerProps = HTMLMotionProps<"div"> & {
  viewportMargin?: string;
};

export function MotionStagger({
  children,
  className,
  viewportMargin = "-60px",
  ...props
}: MotionStaggerProps) {
  const { inView, staggerContainer } = useMotion();

  return (
    <motion.div
      variants={staggerContainer}
      {...inView}
      viewport={{ once: true, margin: viewportMargin }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type MotionStaggerItemProps = HTMLMotionProps<"div">;

export function MotionStaggerItem({
  children,
  className,
  ...props
}: MotionStaggerItemProps) {
  const { staggerItem } = useMotion();

  return (
    <motion.div variants={staggerItem} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}

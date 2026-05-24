import type { TargetAndTransition, Variant } from "framer-motion";

export const easeOut = [0.22, 1, 0.36, 1] as const;

/** SSR-safe: `false` initial until mounted, then entrance animation runs. */
export function motionInitial(
  mounted: boolean,
  values: TargetAndTransition
): TargetAndTransition | false {
  return mounted ? values : false;
}

export function getFadeUp(mounted: boolean, delay = 0) {
  return {
    initial: motionInitial(mounted, { opacity: 0, y: 24 }),
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: easeOut },
    },
  };
}

export function getFadeInView(mounted: boolean, delay = 0) {
  return {
    initial: motionInitial(mounted, { opacity: 0, y: 32 }),
    whileInView: mounted
      ? {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, delay, ease: easeOut },
        }
      : undefined,
    viewport: { once: true, margin: "-80px" as const },
  };
}

export function getInViewVariants(mounted: boolean) {
  return {
    initial: (mounted ? "hidden" : false) as false | "hidden",
    whileInView: mounted ? ("show" as const) : undefined,
  };
}

export const staggerContainer: Record<string, Variant> = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem: Record<string, Variant> = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const floatAnimation = (delay: number, amplitude = 10) => ({
  y: [0, -amplitude, 0],
  transition: {
    duration: 5 + delay,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay,
  },
});

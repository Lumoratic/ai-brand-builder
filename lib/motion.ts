import type { TargetAndTransition, Variant } from "framer-motion";

export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeReveal = [0.22, 1, 0.36, 1] as const;

/** SSR-safe: `false` initial until mounted, then entrance animation runs. */
export function motionInitial(
  mounted: boolean,
  values: TargetAndTransition
): TargetAndTransition | false {
  return mounted ? values : false;
}

export function getFadeUp(mounted: boolean, delay = 0) {
  return {
    initial: motionInitial(mounted, { opacity: 0, y: 20 }),
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, delay, ease: easeOut },
    },
  };
}

export function getFadeInView(mounted: boolean, delay = 0) {
  return {
    initial: motionInitial(mounted, { opacity: 0, y: 28 }),
    whileInView: mounted
      ? {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, delay, ease: easeOut },
        }
      : undefined,
    viewport: { once: true, margin: "-60px" as const },
  };
}

export function getSectionReveal(mounted: boolean) {
  return {
    initial: motionInitial(mounted, { opacity: 0, y: 22 }),
    whileInView: mounted
      ? {
          opacity: 1,
          y: 0,
          transition: { duration: 0.85, ease: easeReveal },
        }
      : undefined,
    viewport: { once: true, margin: "-50px" as const },
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
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

export const staggerItem: Record<string, Variant> = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
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

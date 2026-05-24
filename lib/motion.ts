import type { TargetAndTransition, Variant } from "framer-motion";

export const easeOut = [0.16, 1, 0.3, 1] as const;
export const easeReveal = [0.22, 1, 0.36, 1] as const;

export type MotionPrefs = {
  enabled: boolean;
  reduced: boolean;
  mobile: boolean;
};

function shouldAnimate(prefs: MotionPrefs): boolean {
  return prefs.enabled && !prefs.reduced;
}

function duration(base: number, prefs: MotionPrefs): number {
  if (prefs.reduced) return 0;
  if (prefs.mobile) return base * 0.65;
  return base;
}

function resolvePrefs(prefsOrMounted: MotionPrefs | boolean): MotionPrefs {
  if (typeof prefsOrMounted === "boolean") {
    return { enabled: prefsOrMounted, reduced: false, mobile: false };
  }
  return prefsOrMounted;
}

/** SSR-safe: `false` initial until mounted, then entrance animation runs. */
export function motionInitial(
  prefsOrMounted: MotionPrefs | boolean,
  values: TargetAndTransition
): TargetAndTransition | false {
  const prefs = resolvePrefs(prefsOrMounted);
  return shouldAnimate(prefs) ? values : false;
}

export function getFadeUp(prefsOrMounted: MotionPrefs | boolean, delay = 0) {
  const prefs = resolvePrefs(prefsOrMounted);
  if (!prefs.enabled) {
    return { initial: false as const };
  }
  if (prefs.reduced) {
    return { initial: false as const, animate: { opacity: 1, y: 0 } };
  }
  return {
    initial: motionInitial(prefs, { opacity: 0, y: prefs.mobile ? 12 : 20 }),
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: duration(0.75, prefs), delay, ease: easeOut },
    },
  };
}

export function getFadeInView(prefsOrMounted: MotionPrefs | boolean, delay = 0) {
  const prefs = resolvePrefs(prefsOrMounted);
  if (!prefs.enabled) {
    return { initial: false as const };
  }
  if (prefs.reduced) {
    return {
      initial: false as const,
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" as const },
    };
  }
  return {
    initial: motionInitial(prefs, { opacity: 0, y: prefs.mobile ? 16 : 28 }),
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: duration(0.8, prefs), delay, ease: easeOut },
    },
    viewport: { once: true, margin: "-60px" as const },
  };
}

export function getSectionReveal(prefsOrMounted: MotionPrefs | boolean) {
  const prefs = resolvePrefs(prefsOrMounted);
  if (!prefs.enabled) {
    return { initial: false as const };
  }
  if (prefs.reduced) {
    return {
      initial: false as const,
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" as const },
    };
  }
  return {
    initial: motionInitial(prefs, { opacity: 0, y: prefs.mobile ? 14 : 22 }),
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: duration(0.85, prefs), ease: easeReveal },
    },
    viewport: { once: true, margin: "-50px" as const },
  };
}

export function getInViewVariants(prefsOrMounted: MotionPrefs | boolean) {
  const prefs = resolvePrefs(prefsOrMounted);
  return {
    initial: (shouldAnimate(prefs) ? "hidden" : false) as false | "hidden",
    whileInView: shouldAnimate(prefs) ? ("show" as const) : undefined,
  };
}

export function getStaggerContainer(prefs: MotionPrefs): Record<string, Variant> {
  if (prefs.reduced || !prefs.enabled) {
    return {
      hidden: { opacity: 1 },
      show: { opacity: 1, transition: { staggerChildren: 0, delayChildren: 0 } },
    };
  }
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefs.mobile ? 0.04 : 0.07,
        delayChildren: prefs.mobile ? 0.06 : 0.12,
      },
    },
  };
}

export function getStaggerItem(prefs: MotionPrefs): Record<string, Variant> {
  if (prefs.reduced || !prefs.enabled) {
    return {
      hidden: { opacity: 1, y: 0 },
      show: { opacity: 1, y: 0 },
    };
  }
  return {
    hidden: { opacity: 0, y: prefs.mobile ? 12 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: duration(0.7, prefs), ease: easeOut },
    },
  };
}

/** Static defaults for legacy landing-page usage. */
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

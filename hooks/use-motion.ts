"use client";

import { useMemo } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { useMounted } from "@/hooks/use-mounted";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  getFadeInView,
  getFadeUp,
  getInViewVariants,
  getSectionReveal,
  getStaggerContainer,
  getStaggerItem,
  type MotionPrefs,
} from "@/lib/motion";

export function useMotion() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const mobile = useMobile();

  const prefs: MotionPrefs = useMemo(
    () => ({ enabled: mounted, reduced, mobile }),
    [mounted, reduced, mobile]
  );

  return useMemo(
    () => ({
      prefs,
      fadeUp: (delay = 0) => getFadeUp(prefs, delay),
      fadeInView: (delay = 0) => getFadeInView(prefs, delay),
      sectionReveal: () => getSectionReveal(prefs),
      inView: () => getInViewVariants(prefs),
      staggerContainer: getStaggerContainer(prefs),
      staggerItem: getStaggerItem(prefs),
    }),
    [prefs]
  );
}

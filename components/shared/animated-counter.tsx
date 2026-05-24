"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  decimals?: number;
};

function formatCounterValue(
  v: number,
  decimals: number,
  prefix: string,
  suffix: string
) {
  const formatted =
    decimals > 0
      ? v.toFixed(decimals)
      : Math.round(v).toLocaleString("en-US");
  return `${prefix}${formatted}${suffix}`;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className,
  decimals = 0,
}: AnimatedCounterProps) {
  const mounted = useMounted();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(() =>
    formatCounterValue(0, decimals, prefix, suffix)
  );

  useEffect(() => {
    if (!mounted || !isInView) return;

    let active = true;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: easeOut,
      onUpdate: (latest) => {
        if (active) {
          setDisplay(formatCounterValue(latest, decimals, prefix, suffix));
        }
      },
    });

    return () => {
      active = false;
      controls.stop();
    };
  }, [mounted, isInView, value, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </span>
  );
}

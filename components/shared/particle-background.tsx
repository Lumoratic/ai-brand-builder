"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useMounted } from "@/hooks/use-mounted";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

/** Deterministic layout — identical on server and client (no Math.random). */
function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => {
    const t = (id + 1) * 0.618033988749895;
    return {
      id,
      x: (t * 97) % 100,
      y: (t * 53) % 100,
      size: 1 + ((id * 7) % 20) / 10,
      duration: 15 + (id % 20),
      delay: (id % 5) * 0.4,
      opacity: 0.08 + ((id % 10) / 10) * 0.35,
    };
  });
}

type ParticleBackgroundProps = {
  count?: number;
  className?: string;
};

export function ParticleBackground({
  count = 28,
  className,
}: ParticleBackgroundProps) {
  const mounted = useMounted();
  const particles = useMemo(() => createParticles(count), [count]);

  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={mounted ? { opacity: 1 } : undefined}
      transition={{ duration: 1.5 }}
      className={className}
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-violet-300"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={
            mounted
              ? {
                  y: [0, -30, 0],
                  x: [0, Math.sin(p.id) * 12, 0],
                  opacity: [p.opacity, p.opacity * 1.8, p.opacity],
                }
              : false
          }
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </motion.div>
  );
}

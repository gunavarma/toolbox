"use client";

import React from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowingCard({
  children,
  className = "",
  glowColor = "rgba(37, 99, 235, 0.1)",
  ...props
}: GlowingCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-border-primary/60 bg-bg-card p-6 shadow-premium transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow ${className}`}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              250px circle at ${mouseX}px ${mouseY}px,
              ${glowColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </div>
  );
}

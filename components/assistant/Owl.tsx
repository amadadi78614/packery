"use client";

import { motion, useReducedMotion } from "framer-motion";

/** "Ollie" — original owl mascot. Pure SVG, animated with framer-motion.
 *  pupils: offset in px (eye tracking) · blink · wave · cap (graduation cap for the college page) */
export default function Owl({
  pupils = { x: 0, y: 0 }, blink = false, wave = false, cap = false, size = 80, idle = true,
}: {
  pupils?: { x: number; y: number }; blink?: boolean; wave?: boolean; cap?: boolean; size?: number; idle?: boolean;
}) {
  const reduce = useReducedMotion();
  const bob = idle && !reduce;

  return (
    <motion.svg
      viewBox="0 0 120 140"
      width={size}
      height={(size * 140) / 120}
      aria-hidden
      animate={bob ? { y: [0, -3, 0] } : undefined}
      transition={bob ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" } : undefined}
      style={{ overflow: "visible" }}
    >
      {/* shadow */}
      <ellipse cx="60" cy="134" rx="30" ry="4" fill="#151829" opacity="0.18" />

      {/* left wing */}
      <path d="M22 70 C8 82 10 104 26 112 C30 98 30 84 22 70Z" fill="#1F2340" />
      {/* right wing (waves) */}
      <motion.path
        d="M98 70 C112 82 110 104 94 112 C90 98 90 84 98 70Z"
        fill="#1F2340"
        style={{ originX: "98px", originY: "72px" }}
        animate={wave && !reduce ? { rotate: [0, -38, -18, -38, 0] } : { rotate: 0 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />

      {/* ear tufts */}
      <path d="M30 30 L24 8 L46 24Z" fill="#2B304F" />
      <path d="M90 30 L96 8 L74 24Z" fill="#2B304F" />

      {/* body */}
      <path d="M60 18 C88 18 100 40 100 70 C100 104 84 128 60 128 C36 128 20 104 20 70 C20 40 32 18 60 18Z" fill="#2B304F" />
      {/* belly */}
      <path d="M60 70 C78 70 86 88 86 104 C86 118 74 126 60 126 C46 126 34 118 34 104 C34 88 42 70 60 70Z" fill="#BFE0F7" />
      {/* belly feathers */}
      <g stroke="#8CC6EE" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M48 96 q4 4 8 0" /><path d="M64 96 q4 4 8 0" />
        <path d="M56 108 q4 4 8 0" /><path d="M44 110 q3 3 6 0" /><path d="M70 110 q3 3 6 0" />
      </g>

      {/* face discs */}
      <circle cx="44" cy="54" r="19" fill="#EAF5FD" />
      <circle cx="76" cy="54" r="19" fill="#EAF5FD" />

      {/* eyes (blink by scaling Y) */}
      <motion.g
        style={{ originY: "54px" }}
        animate={{ scaleY: blink ? 0.08 : 1 }}
        transition={{ duration: 0.08 }}
      >
        <circle cx="44" cy="54" r="11" fill="#fff" />
        <circle cx="76" cy="54" r="11" fill="#fff" />
        <g style={{ transform: `translate(${pupils.x}px, ${pupils.y}px)`, transition: "transform 120ms ease-out" }}>
          <circle cx="44" cy="54" r="6" fill="#151829" />
          <circle cx="76" cy="54" r="6" fill="#151829" />
          <circle cx="46" cy="52" r="2" fill="#fff" />
          <circle cx="78" cy="52" r="2" fill="#fff" />
        </g>
      </motion.g>

      {/* glasses */}
      <g fill="none" stroke="#5AA9E0" strokeWidth="3">
        <circle cx="44" cy="54" r="15" />
        <circle cx="76" cy="54" r="15" />
        <path d="M59 53 q1 -3 2 0" strokeLinecap="round" />
      </g>

      {/* beak */}
      <path d="M55 66 L65 66 L60 76Z" fill="#E3A33C" />

      {/* bow tie */}
      <path d="M60 86 L46 79 L46 93Z" fill="#5AA9E0" />
      <path d="M60 86 L74 79 L74 93Z" fill="#5AA9E0" />
      <circle cx="60" cy="86" r="3.5" fill="#2F86C2" />

      {/* feet */}
      <g fill="#E3A33C">
        <path d="M46 126 l-4 6 h12 l-2 -6Z" /><path d="M68 126 l-2 6 h12 l-4 -6Z" />
      </g>

      {/* graduation cap (EZ College page) */}
      {cap && (
        <motion.g initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}>
          <path d="M60 2 L100 16 L60 30 L20 16Z" fill="#0C3519" />
          <path d="M40 22 L40 32 C48 38 72 38 80 32 L80 22 L60 30Z" fill="#16542A" />
          <path d="M100 16 L100 34" stroke="#C9A44C" strokeWidth="2" />
          <motion.circle
            cx="100" cy="36" r="3.5" fill="#C9A44C"
            animate={reduce ? undefined : { rotate: [0, 12, 0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ originX: "100px", originY: "16px" }}
          />
        </motion.g>
      )}
    </motion.svg>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ROTATING = ["Systems", "Products", "Experiences", "Scale"];

// Magnetic button hook
function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, sx, sy, onMove, onLeave };
}

function MagneticButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
}) {
  const { ref, sx, sy, onMove, onLeave } = useMagnetic(0.25);
  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={
        variant === "primary"
          ? "group relative px-9 py-4 overflow-hidden rounded-full font-semibold text-sm uppercase tracking-[0.2em] text-black"
          : "group relative px-9 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.2em] text-white border border-white/20 hover:border-white/50 transition-colors duration-300"
      }
    >
      {variant === "primary" && (
        <>
          <span className="absolute inset-0 bg-[#e8ff4a]" />
          <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
        </>
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

// Noise SVG filter for grain texture
const GrainFilter = () => (
  <svg className="hidden">
    <defs>
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
        <feBlend in="SourceGraphic" mode="multiply" />
      </filter>
    </defs>
  </svg>
);

// Animated counter
function Counter({ to, delay = 0 }: { to: number; delay?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = 0;
      const step = Math.ceil(to / 30);
      const t = setInterval(() => {
        start = Math.min(start + step, to);
        setVal(start);
        if (start >= to) clearInterval(t);
      }, 40);
    }, delay);
    return () => clearTimeout(timeout);
  }, [to, delay]);
  return <>{val}</>;
}

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setInterval(
      () => setWordIndex((i) => (i + 1) % ROTATING.length),
      2400,
    );
    return () => clearInterval(t);
  });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id: string) => {
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);

  // FIX: include parallaxX and parallaxY in deps to satisfy react-hooks/exhaustive-deps
  useEffect(() => {
    parallaxX.set((mousePos.x - 0.5) * 30);
    parallaxY.set((mousePos.y - 0.5) * 20);
  }, [mousePos, parallaxX, parallaxY]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap');

        :root {
          --yellow: #e8ff4a;
          --yellow-dim: #c8df2a;
          --bg: #0a0a08;
          --bg2: #111110;
          --text: #f0ede6;
          --muted: #6b6860;
          --border: rgba(255,255,255,0.08);
        }

        .hero-font-display { font-family: 'DM Serif Display', serif; }
        .hero-font-body { font-family: 'Syne', sans-serif; }

        .hero-grain::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 128px 128px;
          pointer-events: none;
          opacity: 0.4;
          mix-blend-mode: overlay;
          z-index: 1;
        }

        .rotating-word {
          display: inline-block;
          position: relative;
        }

        .word-enter {
          animation: wordIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        .word-exit {
          animation: wordOut 0.4s cubic-bezier(0.7,0,1,1) both;
        }

        @keyframes wordIn {
          from { opacity: 0; transform: translateY(60%) skewY(4deg); clip-path: inset(0 0 100% 0); }
          to   { opacity: 1; transform: translateY(0) skewY(0deg); clip-path: inset(0 0 0% 0); }
        }
        @keyframes wordOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-50%); }
        }

        .line-reveal {
          overflow: hidden;
        }

        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid rgba(232,255,74,0.25);
          background: rgba(232,255,74,0.07);
          color: var(--yellow);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-family: 'Syne', sans-serif;
        }

        .stat-bar {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, transparent, var(--border), transparent);
        }

        .scroll-track {
          width: 1px;
          height: 60px;
          background: var(--border);
          position: relative;
          overflow: hidden;
        }
        .scroll-track::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 1px;
          height: 100%;
          background: var(--yellow);
          animation: scrollLine 2s ease-in-out infinite;
        }
        @keyframes scrollLine {
          0%   { top: -100%; }
          100% { top: 200%; }
        }

        .marquee-wrap {
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 18s linear infinite;
          gap: 0;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .glow-text {
          text-shadow: 0 0 80px rgba(232,255,74,0.3);
        }

        .hero-dot::before {
          content: '·';
          color: var(--muted);
          margin: 0 10px;
        }
      `}</style>

      <GrainFilter />

      <section
        ref={containerRef}
        className="hero-grain hero-font-body relative min-h-screen flex flex-col justify-between overflow-hidden"
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >
        {/* Layered background */}
        <div className="absolute inset-0 z-0">
          {/* Subtle gradient mesh */}
          <motion.div
            className="absolute w-[900px] h-[900px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(232,255,74,0.04) 0%, transparent 70%)",
              x: useSpring(
                useTransform(useMotionValue(mousePos.x), [0, 1], [-80, 80]),
                { stiffness: 60, damping: 15 },
              ),
              y: useSpring(
                useTransform(useMotionValue(mousePos.y), [0, 1], [-60, 60]),
                { stiffness: 60, damping: 15 },
              ),
              top: "10%",
              right: "-10%",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(30,30,28,0.8) 0%, transparent 70%)",
            }}
          />
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="relative z-10 mt-10 flex flex-col justify-center flex-1 px-8 sm:px-12 xl:px-20 pt-8 pb-0">
          {/* Hero headline */}
          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero-font-display font-normal text-[clamp(4rem,10vw,10rem)] leading-[0.9] tracking-[-0.02em] text-[var(--text)]">
                I build
              </h1>
            </motion.div>
          </div>

          <div className="overflow-hidden mb-2">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero-font-display font-normal text-[clamp(4rem,10vw,10rem)] leading-[0.9] tracking-[-0.02em] italic text-[var(--yellow)] glow-text relative">
                {ROTATING.map((word, i) => (
                  <span
                    key={word}
                    className={`${i === wordIndex ? "word-enter" : "word-exit"}`}
                    style={{
                      position: i === wordIndex ? "relative" : "absolute",
                      left: 0,
                      display:
                        i === wordIndex ? "inline-block" : "inline-block",
                      pointerEvents: i === wordIndex ? "auto" : "none",
                      visibility: i === wordIndex ? "visible" : "hidden",
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </motion.div>
          </div>

          {/* FIX: "that scale." — apostrophe-free so no entity needed, but the period
              was being picked up by the linter as a potential issue due to whitespace.
              Wrapping in a fragment ensures clean parsing. */}
          <div className="overflow-hidden mb-10">
            <motion.div
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="hero-font-display font-normal text-[clamp(4rem,10vw,10rem)] leading-[0.9] tracking-[-0.02em] text-[var(--text)]">
                {"that scale."}
              </h1>
            </motion.div>
          </div>

          {/* Sub row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 sm:gap-0"
          >
            {/* Description + CTA */}
            <div className="max-w-md">
              <div className="flex flex-wrap gap-4">
                <MagneticButton
                  onClick={() => scrollTo("#experience")}
                  variant="primary"
                >
                  View Work
                </MagneticButton>
                <MagneticButton
                  onClick={() => scrollTo("#contact")}
                  variant="ghost"
                >
                  Get in Touch
                </MagneticButton>
              </div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex items-center gap-8 sm:gap-12"
            >
              <div className="text-center">
                <div className="hero-font-display text-[2.5rem] leading-none text-[var(--yellow)]">
                  <Counter to={2} delay={1100} />+
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-[var(--muted)] mt-1">
                  Years
                </div>
              </div>
              <div className="stat-bar" />
              <div className="text-center">
                <div className="hero-font-display text-[2.5rem] leading-none text-[var(--text)]">
                  <Counter to={5} delay={1200} />+
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-[var(--muted)] mt-1">
                  Projects
                </div>
              </div>
              <div className="stat-bar" />
              <div className="text-center">
                <div className="hero-font-display text-[2.5rem] leading-none text-[var(--text)]">
                  <Counter to={2} delay={1300} />
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-[var(--muted)] mt-1">
                  Companies
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* MARQUEE TICKER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="relative z-10 marquee-wrap mt-12 py-3"
        >
          <div className="marquee-track">
            {[...Array(2)].map((_, rep) =>
              [
                "Go",
                "TypeScript",
                "React",
                "PostgreSQL",
                "Redis",
                "Kubernetes",
                "WebRTC",
                "gRPC",
                "Docker",
                "AWS",
                "System Design",
                "API Architecture",
              ].map((tech) => (
                <span
                  key={`${rep}-${tech}`}
                  className="text-xs uppercase tracking-[0.25em] text-[var(--muted)] px-8 flex-shrink-0"
                >
                  {tech}
                  <span className="ml-8 text-[var(--yellow)] opacity-40">
                    ✦
                  </span>
                </span>
              )),
            )}
          </div>
        </motion.div>

        {/* BOTTOM BAR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="relative z-10 flex justify-between items-center px-8 sm:px-12 xl:px-20 py-6 border-t border-[var(--border)]"
        >
          <div className="flex items-center gap-6 text-xs text-[var(--muted)] uppercase tracking-widest" />

          {/* Scroll indicator */}
          <div className="hidden sm:flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] rotate-90 origin-center mb-4">
              Scroll
            </span>
            <div className="scroll-track" />
          </div>

          <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
            {["GitHub", "LinkedIn", "Twitter"].map((s) => (
              <a
                key={s}
                href="#"
                className="uppercase tracking-widest hover:text-[var(--yellow)] transition-colors duration-200"
              >
                {s}
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}

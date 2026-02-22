"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ROTATING = ["Systems", "Products", "Experiences", "Scale"];

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIndex((i) => (i + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-5 sm:px-8 pt-24 pb-20 overflow-hidden">
      {/* Dark base + grid */}
      <div className="absolute inset-0 bg-[var(--bg)]" />
      <div className="absolute inset-0 bg-grid-dark opacity-50" aria-hidden />
      {/* Glow orbs */}
      <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-[var(--accent)]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] rounded-full bg-[var(--accent-secondary)]/15 blur-[100px] pointer-events-none" />
      {/* Top stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] via-[var(--accent-soft)] to-[var(--accent-secondary)]" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-6"
        >
          Software Engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter text-[var(--text)] leading-[0.95] max-w-4xl"
        >
          I build{" "}
          <span className="inline-block relative align-bottom min-w-[2ch]">
            {ROTATING.map((word, i) => (
              <span
                key={word}
                className={`absolute left-0 top-0 transition-opacity duration-500 ${
                  i === wordIndex ? "opacity-100" : "opacity-0"
                } ${i === wordIndex ? "text-[var(--accent)]" : ""}`}
              >
                {word}
              </span>
            ))}
            <span className="invisible" aria-hidden>{ROTATING.reduce((a, b) => (a.length >= b.length ? a : b), "")}</span>
          </span>{" "}
          that scale.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 sm:mt-10 text-lg sm:text-xl text-[var(--text-muted)] max-w-xl"
        >
          Full-stack & backend engineer. Go, TypeScript, React. Currently building video infrastructure at LENS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-10 sm:mt-14 flex flex-wrap gap-4"
        >
          <button
            type="button"
            onClick={() => scrollTo("#experience")}
            className="px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-soft)] text-white font-semibold text-sm uppercase tracking-wider rounded-lg hover:shadow-[var(--glow-accent)] hover:-translate-y-0.5 transition-all duration-200"
          >
            View Work
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#contact")}
            className="px-8 py-4 border border-[var(--border-hover)] text-[var(--text)] font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-white/5 hover:border-[var(--accent)]/50 transition-all duration-200"
          >
            Get in Touch
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 sm:mt-20 flex flex-wrap gap-8 sm:gap-12"
        >
          <span className="flex items-baseline gap-2">
            <span className="font-display font-bold text-2xl text-[var(--accent)]">2+</span>
            <span className="text-sm text-[var(--text-muted)]">years</span>
          </span>
          <span className="flex items-baseline gap-2">
            <span className="font-display font-bold text-2xl text-[var(--accent-secondary)]">15+</span>
            <span className="text-sm text-[var(--text-muted)]">projects</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            Available for work
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-[var(--text-muted)]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-[var(--border-hover)] flex justify-center pt-2"
        >
          <div className="w-1.5 h-2 rounded-full bg-[var(--accent)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

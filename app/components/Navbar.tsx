"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (!href || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--bg)]/90 backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
          <button
            type="button"
            onClick={() => scrollTo("")}
            className="font-display font-bold text-lg sm:text-xl text-[var(--text)] tracking-tight hover:text-[var(--accent)] transition-colors"
          >
            Snehil Sharma
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map(({ label, href }) => (
              <button
                key={href}
                type="button"
                onClick={() => scrollTo(href)}
                className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
              >
                {label}
              </button>
            ))}
            <a
              href={process.env.NEXT_PUBLIC_RESUME_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white bg-gradient-to-r from-[var(--accent)] to-[var(--accent-soft)] px-4 py-2 rounded-lg hover:shadow-[var(--glow-accent-sm)] transition-all"
            >
              Resume
            </a>
          </nav>

          <button
            type="button"
            aria-label="Menu"
            className="md:hidden p-2 text-[var(--text)]"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
            style={{ width: `${scrollProgress}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 30 }}
          />
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-[280px] bg-[var(--bg-alt)] border-l border-[var(--border)] pt-24 px-8 flex flex-col gap-6"
            >
              {LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  type="button"
                  onClick={() => scrollTo(href)}
                  className="text-left text-lg font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                  {label}
                </button>
              ))}
              <a
                href={process.env.NEXT_PUBLIC_RESUME_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-lg font-semibold text-white bg-gradient-to-r from-[var(--accent)] to-[var(--accent-soft)] px-6 py-3 rounded-lg mt-4"
              >
                Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

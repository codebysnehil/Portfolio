"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { RESUME_URL } from "./data";

const LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0);

      const ids = LINKS.map((l) => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(id);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (!href) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 80;
          background: var(--nav-bg);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
        }
        .nav-root--scrolled { top: 0; }
        .nav-progress {
          position: absolute;
          bottom: -1px; left: 0;
          height: 1px;
          background: var(--accent);
          transform-origin: left;
          transition: width 0.1s linear;
          opacity: 1;
        }
        .nav-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .nav-logo {
          display: flex;
          align-items: baseline;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .nav-logo__mark {
          font-family: var(--font-mono), monospace;
          font-size: 14px;
          font-weight: 600;
          color: var(--accent);
        }
        .nav-logo__name {
          font-family: var(--font-body), sans-serif;
          font-size: 15.5px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text);
          white-space: nowrap;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .nav-link {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0;
          text-transform: none;
          color: var(--muted);
          background: none;
          border: none;
          border-radius: var(--radius-xs);
          padding: 8px 12px;
          cursor: pointer;
          transition: color 0.18s, background 0.18s;
        }
        .nav-link:hover { color: var(--text); background: var(--surface-2); }
        .nav-link--active { color: var(--accent); }
        .nav-cta {
          font-family: var(--font-body), sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--ink-contrast);
          background: var(--ink);
          border: none;
          border-radius: var(--radius-sm);
          padding: 9px 18px;
          cursor: pointer;
          transition: background 0.18s, transform 0.18s;
          text-decoration: none;
        }
        .nav-cta:hover { background: var(--ink-hover); transform: translateY(-1px); }
        .nav-burger {
          display: none;
          background: none;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          width: 38px; height: 38px;
          cursor: pointer;
          color: var(--text);
          font-size: 16px;
          align-items: center;
          justify-content: center;
        }
        .nav-mobile {
          position: fixed;
          inset: 0;
          z-index: 79;
          background: var(--overlay-strong);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 32px;
          gap: 8px;
        }
        .nav-mobile__link {
          font-family: var(--font-body), sans-serif;
          font-size: clamp(1.8rem, 7vw, 2.6rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text);
          background: none;
          border: none;
          text-align: left;
          padding: 10px 0;
          cursor: pointer;
          display: flex;
          align-items: baseline;
          gap: 16px;
        }
        .nav-mobile__idx {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          color: var(--accent);
        }
        @media (max-width: 780px) {
          .nav-links, .nav-cta--desktop { display: none; }
          .nav-burger { display: flex; }
        }
      `}</style>

      <header className={`nav-root ${scrolled ? "nav-root--scrolled" : ""}`}>
        <nav className="nav-inner">
          <button className="nav-logo" onClick={() => scrollTo("")}>
            <span className="nav-logo__mark">{"//"}</span>
            <span className="nav-logo__name">Snehil Sharma</span>
          </button>

          <div className="nav-links">
            {LINKS.map((l) => (
              <button
                key={l.href}
                className={`nav-link ${active === l.href.slice(1) ? "nav-link--active" : ""}`}
                onClick={() => scrollTo(l.href)}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ThemeToggle />
            {RESUME_URL && (
              <a
                className="nav-cta nav-cta--desktop"
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                Résumé ↓
              </a>
            )}
            <button
              className="nav-burger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </nav>
        <div className="nav-progress" style={{ width: `${progress}%` }} />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {LINKS.map((l, i) => (
              <button
                key={l.href}
                className="nav-mobile__link"
                onClick={() => scrollTo(l.href)}
              >
                <span className="nav-mobile__idx">0{i + 1}</span>
                {l.label}
              </button>
            ))}
            {RESUME_URL && (
              <a className="nav-mobile__link" href={RESUME_URL} target="_blank" rel="noopener noreferrer" download>
                <span className="nav-mobile__idx">↓</span>
                Résumé
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

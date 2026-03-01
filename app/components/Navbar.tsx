"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

const LINKS = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

function MagneticLink({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const [hov, setHov] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
    setHov(false);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="nav-link"
    >
      <span className="nav-link__text">{label}</span>
      <span className={`nav-link__dot ${hov ? "nav-link__dot--on" : ""}`} />
    </motion.button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(
        total > 0 ? Math.min((window.scrollY / total) * 100, 100) : 0,
      );

      // Active section detection
      const sections = LINKS.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (!href || href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap');

        .navbar { font-family: 'Syne', sans-serif; }

        /* ── LOGO ── */
        .nav-logo {
          display: flex;
          flex-direction: column;
          gap: 1px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          text-align: left;
        }
        .nav-logo__name {
          font-family: 'DM Serif Display', serif;
          font-size: 1.1rem;
          font-weight: 400;
          color: #f0ede6;
          line-height: 1;
          letter-spacing: -0.01em;
          transition: color 0.2s;
        }
        .nav-logo:hover .nav-logo__name { color: #e8ff4a; }
        .nav-logo__tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(107,104,96,0.55);
        }

        /* ── NAV LINKS ── */
        .nav-link {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .nav-link__text {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(107,104,96,0.75);
          transition: color 0.2s;
        }
        .nav-link:hover .nav-link__text { color: #f0ede6; }
        .nav-link--active .nav-link__text { color: #f0ede6; }

        .nav-link__dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #e8ff4a;
          opacity: 0;
          transform: scale(0);
          transition: opacity 0.2s, transform 0.2s;
        }
        .nav-link__dot--on,
        .nav-link--active .nav-link__dot {
          opacity: 1;
          transform: scale(1);
        }

        /* ── RESUME BUTTON ── */
        .nav-resume {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          border-radius: 100px;
          background: #e8ff4a;
          color: #0a0a08;
          font-family: 'Syne', sans-serif;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          border: none;
          cursor: pointer;
        }
        .nav-resume:hover {
          background: #f0ff70;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(232,255,74,0.2);
        }
        .nav-resume__dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: rgba(10,10,8,0.5);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        /* ── SCROLL PROGRESS ── */
        .nav-progress {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(255,255,255,0.05);
          overflow: hidden;
        }
        .nav-progress__fill {
          height: 100%;
          background: linear-gradient(to right, #e8ff4a, #c8df2a);
          transform-origin: left;
          transition: width 0.1s linear;
        }

        /* ── HAMBURGER ── */
        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 8px;
        }
        .nav-hamburger__bar {
          height: 1.5px;
          background: #f0ede6;
          border-radius: 2px;
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          transform-origin: center;
        }

        /* ── MOBILE MENU ── */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 49;
          display: flex;
          align-items: stretch;
        }
        .mobile-menu__bg {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
        }
        .mobile-menu__panel {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: min(340px, 85vw);
          background: #0f0f0d;
          border-left: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .mobile-menu__top {
          padding: 32px 32px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 24px;
        }
        .mobile-menu__label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(107,104,96,0.4);
          margin-bottom: 24px;
        }
        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          width: 100%;
          text-align: left;
        }
        .mobile-nav-link:last-of-type { border-bottom: none; }
        .mobile-nav-link__label {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          font-weight: 400;
          color: rgba(240,237,230,0.6);
          letter-spacing: -0.01em;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover .mobile-nav-link__label { color: #f0ede6; }
        .mobile-nav-link__arrow {
          font-size: 14px;
          color: rgba(107,104,96,0.3);
          transition: all 0.2s;
        }
        .mobile-nav-link:hover .mobile-nav-link__arrow {
          color: #e8ff4a;
          transform: translateX(4px);
        }
        .mobile-menu__bottom {
          padding: 28px 32px 40px;
          margin-top: auto;
        }
        .mobile-menu__resume {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 15px;
          background: #e8ff4a;
          color: #0a0a08;
          border-radius: 100px;
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.2s;
        }
        .mobile-menu__resume:hover { background: #f0ff70; }
        .mobile-menu__footer {
          margin-top: 20px;
          font-size: 10px;
          color: rgba(107,104,96,0.35);
          text-align: center;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>

      <motion.header
        className="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.35s ease, border-color 0.35s ease",
          background: scrolled ? "rgba(10,10,8,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 40px",
            height: "68px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* Logo */}
          <button className="nav-logo" onClick={() => scrollTo("")}>
            <span className="nav-logo__name">Snehil Sharma</span>
            <span className="nav-logo__tag">Software Engineer</span>
          </button>

          {/* Desktop nav */}
          <nav
            className="nav-desktop"
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            {LINKS.map(({ label, href }) => (
              <div
                key={href}
                className={`nav-link ${activeSection === href.replace("#", "") ? "nav-link--active" : ""}`}
              >
                <MagneticLink
                  label={label}
                  href={href}
                  onClick={() => scrollTo(href)}
                />
              </div>
            ))}
          </nav>

          {/* Resume + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href={process.env.NEXT_PUBLIC_RESUME_URL || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume nav-desktop"
              style={{ display: "inline-flex" }}
            >
              <span className="nav-resume__dot" />
              Resume
            </a>

            <button
              className="nav-hamburger"
              aria-label="Menu"
              onClick={() => setMenuOpen((o) => !o)}
              style={{ display: "none" }}
            >
              <motion.span
                className="nav-hamburger__bar"
                animate={
                  menuOpen
                    ? { rotate: 45, y: 6.5, width: "22px" }
                    : { rotate: 0, y: 0, width: "22px" }
                }
                style={{ width: "22px", display: "block" }}
              />
              <motion.span
                className="nav-hamburger__bar"
                animate={
                  menuOpen
                    ? { opacity: 0, x: -6 }
                    : { opacity: 1, x: 0, width: "16px" }
                }
                style={{ width: "16px", display: "block" }}
              />
              <motion.span
                className="nav-hamburger__bar"
                animate={
                  menuOpen
                    ? { rotate: -45, y: -6.5, width: "22px" }
                    : { rotate: 0, y: 0, width: "22px" }
                }
                style={{ width: "22px", display: "block" }}
              />
            </button>
          </div>
        </div>

        {/* Scroll progress */}
        <div className="nav-progress">
          <div
            className="nav-progress__fill"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="mobile-menu__bg"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="mobile-menu__panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top */}
              <div className="mobile-menu__top">
                <div className="mobile-menu__label">Navigation</div>
                {LINKS.map(({ label, href }, i) => (
                  <motion.button
                    key={href}
                    className="mobile-nav-link"
                    onClick={() => scrollTo(href)}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.06 + 0.1,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <span className="mobile-nav-link__label">{label}</span>
                    <span className="mobile-nav-link__arrow">→</span>
                  </motion.button>
                ))}
              </div>

              {/* Bottom */}
              <motion.div
                className="mobile-menu__bottom"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <a
                  href={process.env.NEXT_PUBLIC_RESUME_URL || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-menu__resume"
                  onClick={() => setMenuOpen(false)}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: "rgba(10,10,8,0.4)",
                      animation: "pulse 2s infinite",
                    }}
                  />
                  Download Resume
                </a>
                <div className="mobile-menu__footer">Snehil Sharma · 2026</div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

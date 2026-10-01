"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Globe from "./Globe";
import Terminal from "./Terminal";
import Scramble, { useIntroDone } from "./Scramble";
import { RESUME_URL } from "./data";

export default function HeroSection() {
  const ready = useIntroDone();
  const heroRef = useRef<HTMLElement>(null);

  // On mobile, hero content stacks (text + globe + terminal) and ends up far
  // taller than the viewport. A scroll-fade keyed to "% of section scrolled"
  // then finishes while the globe/terminal haven't even scrolled into view
  // yet, so they're already gone the moment they appear. Scope the effect to
  // wider screens, where the section is roughly viewport-sized and it reads
  // as intended.
  const [exitEffectOn, setExitEffectOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 901px)");
    const sync = () => setExitEffectOn(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const outOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const outY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const outScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const outBlur = useTransform(scrollYProgress, [0, 0.8], [0, 8]);
  const outFilter = useTransform(outBlur, (v) => `blur(${v}px)`);
  const heroMotionStyle = exitEffectOn
    ? { opacity: outOpacity, y: outY, scale: outScale, filter: outFilter }
    : {};
  const go = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  const rise = (d: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.55, delay: d, ease: [0.16, 1, 0.3, 1] as const },
  });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    e.currentTarget.style.setProperty("--spot-o", "1");
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--spot-o", "0");
  };

  return (
    <>
      <style>{`
        .hero { padding: 148px 0 88px; border-bottom: 1px solid var(--border); position: relative; overflow: hidden; }
        .hero-grid {
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 56px; align-items: center;
        }
        /* Grid items default to min-width: auto, so text content can refuse
           to shrink below its own intrinsic width and push the track (and
           everything in it — the globe included) past the viewport edge.
           This is the actual cause of text/the globe spilling off-screen. */
        .hero-grid > * { min-width: 0; }
        .hero-status {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-mono), monospace; font-size: 13px; color: var(--muted);
          margin-bottom: 26px;
        }
        .hero-name {
          font-size: clamp(2.7rem, 6.4vw, 4.9rem);
          font-weight: 600; letter-spacing: -0.04em; line-height: 1.02;
          margin: 0 0 18px; color: var(--text);
          overflow-wrap: break-word; word-break: break-word;
        }
        .hero-tag {
          font-size: clamp(1.15rem, 2.2vw, 1.5rem); line-height: 1.4;
          color: var(--muted); margin: 0 0 26px; max-width: 30ch; letter-spacing: -0.01em;
          overflow-wrap: break-word;
        }
        .hero-lede {
          font-size: 16px; line-height: 1.75; color: var(--muted);
          max-width: 54ch; margin: 0 0 34px;
          overflow-wrap: break-word;
        }
        .hero-lede b { color: var(--text); font-weight: 500; }
        .hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
        .hero-terminal { margin-top: 64px; }
        @media (max-width: 900px) {
          .hero { padding-top: 120px; }
          .hero-grid { grid-template-columns: 1fr; gap: 36px; }
          .hero-terminal { margin-top: 44px; }
        }
        @media (max-width: 420px) {
          .hero-name { font-size: clamp(2.1rem, 12vw, 2.7rem); }
        }
      `}</style>

      <section
        className="hero spotlight"
        ref={heroRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <motion.div className="container" style={heroMotionStyle}>
          <div className="hero-grid">
            <div>
              <motion.div {...rise(0)} className="hero-status">
                <span className="status-dot" />
                Open to full-time roles · Gurugram, India
              </motion.div>

              <h1 className="hero-name">
                <span className="glitch">
                  <Scramble
                    text="Snehil Sharma"
                    active={ready}
                    duration={900}
                  />
                </span>
              </h1>

              <motion.p {...rise(0.12)} className="hero-tag">
                I build backends, and the interfaces that sit on top of them.
              </motion.p>

              <motion.p {...rise(0.2)} className="hero-lede">
                I&apos;m a full-stack engineer working on real-time video
                infrastructure at <b>LenscorpAI</b>, running Go microservices
                behind 15,000+ CCTV cameras across enterprise deployments on
                three continents. Before that, backend performance and tooling
                at <b>Stockarea</b>.
              </motion.p>

              <motion.div {...rise(0.28)} className="hero-actions">
                <button
                  className="btn btn--primary"
                  onClick={() => go("#projects")}
                >
                  View projects
                </button>
                {RESUME_URL && (
                  <a
                    className="btn btn--ghost"
                    href={RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                    </svg>
                    Résumé
                  </a>
                )}
                <button
                  className="btn btn--ghost"
                  onClick={() => go("#contact")}
                >
                  Get in touch
                </button>
                <a
                  className="icon-link"
                  href="https://github.com/codebysnehil"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  aria-label="GitHub"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a
                  className="icon-link"
                  href="https://www.linkedin.com/in/snehil-sharma-in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  className="icon-link"
                  href="mailto:work.snehil01@gmail.com"
                  title="Email"
                  aria-label="Email"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={
                ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }
              }
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Globe />
            </motion.div>
          </div>

          <motion.div {...rise(0.4)} className="hero-terminal">
            <Terminal />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}

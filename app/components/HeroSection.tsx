"use client";

import React from "react";
import { motion } from "framer-motion";

const MARQUEE = [
  "Go",
  "TypeScript",
  "Next.js",
  "Python",
  "Claude API",
  "AI Agents",
  "MCP",
  "RAG Pipelines",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "AWS",
  "Docker",
  "Kubernetes",
  "System Design",
];

const STATS = [
  { value: "2+", label: "Years experience" },
  { value: "6", label: "Shipped projects" },
  { value: "10K+", label: "Concurrent users served" },
  { value: "<100ms", label: "Latency systems" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function HeroSection() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        .hero {
          position: relative;
          padding: 140px 0 0;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
          background:
            radial-gradient(ellipse 900px 520px at 88% -10%, rgba(37,99,235,0.08), transparent),
            radial-gradient(ellipse 600px 400px at 0% 110%, rgba(37,99,235,0.04), transparent),
            var(--bg);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.12fr 0.88fr;
          gap: 56px;
          align-items: center;
        }
        .hero-name {
          font-family: var(--font-body), sans-serif;
          font-size: clamp(2.9rem, 6.4vw, 4.7rem);
          font-weight: 800;
          letter-spacing: -0.045em;
          line-height: 1.0;
          color: var(--text);
          margin: 0 0 14px;
        }
        .hero-name em {
          font-style: normal;
          background: linear-gradient(120deg, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .hero-role {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono), monospace;
          font-size: clamp(0.95rem, 1.6vw, 1.15rem);
          font-weight: 500;
          letter-spacing: -0.005em;
          color: var(--text);
          margin: 0 0 22px;
        }
        .hero-role__badge {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent);
          background: var(--accent-dim);
          border: 1px solid rgba(37,99,235,0.2);
          padding: 3px 10px;
          border-radius: 6px;
        }
        .hero-lede {
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          color: #3a3934;
          line-height: 1.7;
          max-width: 560px;
          margin: 0 0 30px;
          letter-spacing: -0.01em;
        }
        .hero-lede strong { color: var(--text); font-weight: 650; }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* ── Terminal card ── */
        .term {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(17,17,17,0.14);
          box-shadow: 0 24px 64px rgba(17,17,17,0.16), 0 2px 8px rgba(17,17,17,0.06);
          background: #16161a;
          font-family: var(--font-mono), monospace;
          font-size: 12.5px;
          line-height: 1.9;
          transform: rotate(0.6deg);
        }
        .term__bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 11px 14px;
          background: #1f1f24;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .term__dot { width: 11px; height: 11px; border-radius: 50%; }
        .term__title {
          margin-left: 8px;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.05em;
        }
        .term__body { padding: 18px 20px 20px; }
        .term__prompt { color: #60a5fa; }
        .term__cmd { color: #e2e2df; }
        .term__out { color: rgba(226,226,223,0.62); }
        .term__accent { color: #a5f3a5; }
        .term__tree { color: rgba(226,226,223,0.45); }
        .term__cursor {
          display: inline-block;
          width: 8px; height: 15px;
          background: #60a5fa;
          vertical-align: text-bottom;
          margin-left: 4px;
          animation: term-blink 1.1s steps(1) infinite;
        }
        @keyframes term-blink { 50% { opacity: 0; } }

        /* ── Stats ── */
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: var(--surface);
          box-shadow: 0 1px 2px rgba(17,17,17,0.05), 0 4px 16px rgba(17,17,17,0.04);
          margin-top: 64px;
        }
        .hero-stat {
          padding: 22px 24px;
          border-right: 1px solid var(--border);
          transition: background 0.2s;
        }
        .hero-stat:last-child { border-right: none; }
        .hero-stat:hover { background: var(--surface-2); }
        .hero-stat .metric__value { color: var(--accent); }

        /* ── Marquee ── */
        .marquee {
          margin-top: 56px;
          border-top: 1px solid var(--border);
          overflow: hidden;
          padding: 15px 0;
          background: var(--surface);
        }
        .marquee__track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 28s linear infinite;
        }
        .marquee:hover .marquee__track { animation-play-state: paused; }
        .marquee__item {
          font-family: var(--font-mono), monospace;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--faint);
          padding: 0 26px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .marquee__sep { color: var(--accent); opacity: 0.55; margin-left: 52px; }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        @media (max-width: 880px) {
          .hero { padding-top: 120px; }
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .term { transform: none; max-width: 480px; }
        }
        @media (max-width: 720px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr); }
          .hero-stat:nth-child(2n) { border-right: none; }
          .hero-stat:nth-child(-n+2) { border-bottom: 1px solid var(--border); }
        }
      `}</style>

      <section className="hero bg-grid">
        <div className="container" style={{ position: "relative" }}>
          <div className="hero-grid">
            {/* LEFT — pitch */}
            <div>
              <motion.div
                {...fadeUp(0)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginBottom: "26px",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "7px 15px",
                    borderRadius: "100px",
                    border: "1px solid rgba(22,163,74,0.3)",
                    background: "rgba(22,163,74,0.07)",
                  }}
                >
                  <span className="status-dot" />
                  <span
                    className="mono"
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#15803d",
                    }}
                  >
                    Available for work
                  </span>
                </span>
              </motion.div>

              <motion.h1 {...fadeUp(0.05)} className="hero-name">
                Snehil <em>Sharma.</em>
              </motion.h1>

              <motion.div {...fadeUp(0.08)} className="hero-role">
                <span className="hero-role__badge">Software Engineer</span>
                Backend · Full-Stack · Systems at scale
              </motion.div>

              <motion.p {...fadeUp(0.1)} className="hero-lede">
                I build <strong>backend systems</strong> and{" "}
                <strong>full-stack products</strong> that hold up in production
                — real-time video infrastructure at{" "}
                <strong>LENS Corporation</strong> and nationwide logistics APIs.
                With an AI background, I also ship{" "}
                <strong>LLM-powered tools</strong> and agent workflows.
              </motion.p>

              <motion.div {...fadeUp(0.15)} className="hero-actions">
                <button
                  className="btn btn--primary"
                  onClick={() => scrollTo("#projects")}
                >
                  View Projects ↓
                </button>
                <a
                  className="btn btn--ghost"
                  href={process.env.NEXT_PUBLIC_RESUME_URL || "#contact"}
                >
                  Résumé
                </a>
                <div style={{ display: "flex", gap: "8px", marginLeft: "2px" }}>
                  <a
                    className="icon-link"
                    href="https://github.com/codebysnehil"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </a>
                  <a
                    className="icon-link"
                    href="https://www.linkedin.com/in/snehil-sharma-in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    className="icon-link"
                    href="mailto:work.snehil01@gmail.com"
                    title="Email"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* RIGHT — terminal card */}
            <motion.div
              initial={{ opacity: 0, y: 18, rotate: 1.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0.6 }}
              transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="term"
            >
              <div className="term__bar">
                <span className="term__dot" style={{ background: "#ff5f57" }} />
                <span className="term__dot" style={{ background: "#febc2e" }} />
                <span className="term__dot" style={{ background: "#28c840" }} />
                <span className="term__title">snehil@portfolio — zsh</span>
              </div>
              <div className="term__body">
                <div>
                  <span className="term__prompt">$</span>{" "}
                  <span className="term__cmd">whoami</span>
                </div>
                <div className="term__out">
                  Software Engineer — Backend &amp; Full-Stack
                </div>
                <div>
                  <span className="term__prompt">$</span>{" "}
                  <span className="term__cmd">current_role</span>
                </div>
                <div className="term__out">
                  Full-Stack @ LENS Corporation · 2025—now
                </div>
                <div>
                  <span className="term__prompt">$</span>{" "}
                  <span className="term__cmd">ls recent-work/</span>
                </div>
                <div className="term__out">
                  <span className="term__tree">├─</span> realtime-video-infra{" "}
                  <span className="term__tree">(&lt;100ms)</span>
                </div>
                <div className="term__out">
                  <span className="term__tree">├─</span> agentic-workflows{" "}
                  <span className="term__tree">(Claude API · MCP)</span>
                </div>
                <div className="term__out">
                  <span className="term__tree">└─</span> rag-pipelines{" "}
                  <span className="term__tree">(pgvector · 92% acc)</span>
                </div>
                <div>
                  <span className="term__prompt">$</span>{" "}
                  <span className="term__cmd">status</span>
                </div>
                <div>
                  <span className="term__accent">●</span>{" "}
                  <span className="term__out">
                    open to new opportunities
                  </span>
                  <span className="term__cursor" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Proof stats */}
          <motion.div {...fadeUp(0.2)} className="hero-stats">
            {STATS.map((s) => (
              <div key={s.label} className="hero-stat metric">
                <span className="metric__value">{s.value}</span>
                <span className="metric__label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scrolling tech marquee — full bleed */}
        <motion.div {...fadeUp(0.3)} className="marquee">
          <div className="marquee__track">
            {[0, 1].map((rep) =>
              MARQUEE.map((t) => (
                <span key={`${rep}-${t}`} className="marquee__item">
                  {t}
                  <span className="marquee__sep">✦</span>
                </span>
              )),
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
}

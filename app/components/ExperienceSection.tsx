"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  impact: string;
  index: string;
  metrics?: { label: string; value: string }[];
}

const experiences: Experience[] = [
  {
    company: "LENS Corporation",
    role: "Software Engineer — Full-Stack",
    period: "Jan 2025 – Present",
    description:
      "Architecting next-generation video infrastructure at scale. Building real-time streaming systems that power thousands of concurrent streams with enterprise-grade reliability and sub-100ms latency.",
    achievements: [
      "Engineered high-throughput Go backend achieving <100ms latency for live streaming at scale",
      "Architected distributed API layer handling 10K+ concurrent connections with 99.9% uptime",
      "Built cross-platform desktop applications using Electron and TypeScript for seamless UX",
      "Implemented automated CI/CD pipelines, reducing deployment cycles by 70%",
    ],
    technologies: [
      "Go",
      "TypeScript",
      "Electron",
      "Next.js",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Kubernetes",
    ],
    impact: "Real-Time Video Infrastructure",
    index: "01",
    metrics: [
      { label: "Latency", value: "<100ms" },
      { label: "Concurrent", value: "10K+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    company: "Stockarea",
    role: "Software Engineer — Backend",
    period: "2024 – 2025",
    description:
      "Led backend architecture for India &apos;s largest digital warehousing network. Designed and scaled distributed systems powering logistics operations across 100+ facilities, processing millions of transactions daily.",
    achievements: [
      "Architected RESTful APIs powering nationwide logistics network across 100+ warehouses",
      "Optimized PostgreSQL queries and indexing, achieving 60% faster response times",
      "Designed microservices architecture processing 1M+ daily transactions with zero data loss",
      "Built real-time monitoring infrastructure with automated alerting and incident response",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
      "React",
      "Kafka",
    ],
    impact: "Enterprise Logistics Platform",
    index: "02",
    metrics: [
      { label: "Facilities", value: "100+" },
      { label: "Daily Txns", value: "1M+" },
      { label: "Performance", value: "+60%" },
    ],
  },
];

function ExperienceCard({
  exp,
  i,
  isInView,
}: {
  exp: Experience;
  i: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mouseX.set(x);
    mouseY.set(y);
    rotateX.set((y - 0.5) * -8);
    rotateY.set((x - 0.5) * 8);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="exp-card-wrap"
    >
      {/* Large index number */}
      <div className="exp-index">{exp.index}</div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onMouseLeave}
        className={`exp-card ${hovered ? "exp-card--hovered" : ""}`}
      >
        {/* Top bar */}
        <div className="exp-card__topbar">
          <div className="exp-card__company-block">
            <span className="exp-card__company">{exp.company}</span>
            <span className="exp-card__impact">{exp.impact}</span>
          </div>
          <div className="exp-card__period">{exp.period}</div>
        </div>

        {/* Role */}
        <div className="exp-card__role">{exp.role}</div>

        {/* Divider */}
        <div className="exp-card__divider">
          <div className="exp-card__divider-line" />
        </div>

        {/* Body */}
        <p className="exp-card__description">{exp.description}</p>

        {/* Metrics */}
        {exp.metrics && (
          <div className="exp-card__metrics">
            {exp.metrics.map((m) => (
              <div key={m.label} className="exp-metric">
                <span className="exp-metric__value">{m.value}</span>
                <span className="exp-metric__label">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Achievements */}
        <ul className="exp-card__achievements">
          {exp.achievements.map((a, j) => (
            <motion.li
              key={j}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.2 + j * 0.07 + 0.4 }}
              className="exp-achievement"
            >
              <span className="exp-achievement__dot" />
              <span>{a}</span>
            </motion.li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="exp-card__tech">
          {exp.technologies.map((t) => (
            <span key={t} className="exp-tech-tag">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = process.env.NEXT_PUBLIC_RESUME_URL || "#";
    link.download = "Snehil_Resume.pdf";
    link.click();
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap');

        #experience {
          font-family: 'Syne', sans-serif;
          background: #0a0a08;
          color: #f0ede6;
          --yellow: #e8ff4a;
          --muted: #6b6860;
          --border: rgba(255,255,255,0.07);
          --border-bright: rgba(255,255,255,0.14);
          --card-bg: #111110;
          --card-bg-hover: #161614;
        }

        /* Section header */
        .exp-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 80px;
          position: relative;
        }
        .exp-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--yellow);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .exp-eyebrow::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: var(--yellow);
        }
        .exp-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(3rem, 6vw, 6rem);
          line-height: 0.92;
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #f0ede6;
        }
        .exp-title em {
          font-style: italic;
          color: var(--yellow);
        }
        .exp-header-sub {
          font-size: 14px;
          color: var(--muted);
          max-width: 380px;
          line-height: 1.7;
          margin-top: 8px;
        }

        /* Year labels on the right */
        .exp-header-right {
          position: absolute;
          right: 0;
          bottom: 0;
          text-align: right;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--muted);
          line-height: 2;
        }

        /* Cards container */
        .exp-cards {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* Card wrap — houses the big number */
        .exp-card-wrap {
          position: relative;
        }
        .exp-index {
          position: absolute;
          top: -28px;
          left: 0;
          font-family: 'DM Serif Display', serif;
          font-size: clamp(5rem, 10vw, 9rem);
          line-height: 1;
          color: rgba(255,255,255,0.025);
          font-weight: 400;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        /* The card itself */
        .exp-card {
          position: relative;
          z-index: 1;
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 36px 40px;
          transition: background 0.3s ease, border-color 0.3s ease;
          transform-style: preserve-3d;
          will-change: transform;
          overflow: hidden;
        }
        .exp-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(232,255,74,0.04) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .exp-card--hovered {
          background: var(--card-bg-hover);
          border-color: var(--border-bright);
        }
        .exp-card--hovered::before {
          opacity: 1;
        }

        /* Yellow left accent bar */
        .exp-card::after {
          content: '';
          position: absolute;
          left: 0;
          top: 20%;
          bottom: 20%;
          width: 2px;
          background: linear-gradient(to bottom, transparent, var(--yellow), transparent);
          border-radius: 2px;
          opacity: 0.6;
        }

        /* Top bar */
        .exp-card__topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
          gap: 12px;
        }
        .exp-card__company-block {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .exp-card__company {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }
        .exp-card__impact {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--yellow);
          opacity: 0.8;
        }
        .exp-card__period {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 0.1em;
          white-space: nowrap;
          text-align: right;
          border: 1px solid var(--border);
          padding: 4px 10px;
          border-radius: 100px;
          flex-shrink: 0;
        }

        /* Role */
        .exp-card__role {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 400;
          line-height: 1.1;
          color: #f0ede6;
          letter-spacing: -0.01em;
          margin-bottom: 20px;
        }

        /* Divider */
        .exp-card__divider {
          margin-bottom: 20px;
        }
        .exp-card__divider-line {
          height: 1px;
          background: linear-gradient(to right, var(--border-bright), transparent);
        }

        /* Description */
        .exp-card__description {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.8;
          margin-bottom: 24px;
        }

        /* Metrics */
        .exp-card__metrics {
          display: flex;
          gap: 0;
          margin-bottom: 24px;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
        }
        .exp-metric {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 14px 12px;
          border-right: 1px solid var(--border);
          gap: 4px;
          transition: background 0.2s;
        }
        .exp-metric:last-child { border-right: none; }
        .exp-metric:hover { background: rgba(232,255,74,0.05); }
        .exp-metric__value {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          line-height: 1;
          color: var(--yellow);
          font-weight: 400;
        }
        .exp-metric__label {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--muted);
          font-weight: 600;
        }

        /* Achievements */
        .exp-card__achievements {
          list-style: none;
          padding: 0;
          margin: 0 0 24px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .exp-achievement {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 13px;
          color: rgba(240,237,230,0.75);
          line-height: 1.6;
        }
        .exp-achievement__dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--yellow);
          flex-shrink: 0;
          margin-top: 7px;
          opacity: 0.7;
        }

        /* Tech tags */
        .exp-card__tech {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .exp-tech-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          padding: 4px 10px;
          border: 1px solid var(--border);
          border-radius: 100px;
          transition: color 0.2s, border-color 0.2s;
        }
        .exp-tech-tag:hover {
          color: var(--yellow);
          border-color: rgba(232,255,74,0.3);
        }

        /* Download CTA */
        .exp-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 72px;
          padding-top: 40px;
          border-top: 1px solid var(--border);
          gap: 24px;
          flex-wrap: wrap;
        }
        .exp-cta__text {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-style: italic;
          color: rgba(240,237,230,0.5);
          line-height: 1.2;
        }
        .exp-cta__text strong {
          color: #f0ede6;
          font-style: normal;
        }
        .exp-dl-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: var(--yellow);
          color: #0a0a08;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          border-radius: 100px;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          overflow: hidden;
          font-family: 'Syne', sans-serif;
        }
        .exp-dl-btn:hover {
          background: #f0ff70;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(232,255,74,0.25);
        }
        .exp-dl-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .exp-dl-btn__icon {
          width: 16px;
          height: 16px;
          border: 2px solid currentColor;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
        }

        /* Floating side label */
        .exp-side-label {
          position: absolute;
          right: -60px;
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(107,104,96,0.4);
          white-space: nowrap;
          pointer-events: none;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .exp-card { padding: 24px 20px; }
          .exp-card__topbar { flex-direction: column; }
          .exp-cta { flex-direction: column; align-items: flex-start; }
          .exp-side-label { display: none; }
        }
      `}</style>

      <section
        id="experience"
        ref={ref}
        style={{
          position: "relative",
          padding: "120px 0",
          background: "#0a0a08",
          overflow: "hidden",
        }}
      >
        {/* Background grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            pointerEvents: "none",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "-200px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,255,74,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "0 40px",
            position: "relative",
          }}
        >
          {/* Header */}
          <motion.div
            className="exp-header"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="exp-eyebrow">Experience</div>
            <h2 className="exp-title">
              Where I&apos;ve
              <br />
              <em>built things.</em>
            </h2>
            <p className="exp-header-sub">
              Two companies, one shared obsession — writing software that
              actually holds up under pressure.
            </p>

            <div className="exp-header-right" style={{ display: "none" }}>
              <div>2023</div>
              <div>2024</div>
              <div>2025 →</div>
            </div>
          </motion.div>

          {/* Cards */}
          <div className="exp-cards">
            {experiences.map((exp, i) => (
              <ExperienceCard
                key={exp.company}
                exp={exp}
                i={i}
                isInView={isInView}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="exp-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="exp-cta__text">
              Want the <strong>full picture?</strong>
              <br />
              Download my résumé.
            </p>
            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="exp-dl-btn"
            >
              <span className="exp-dl-btn__icon">↓</span>
              {downloading ? "Downloading…" : "Download Résumé"}
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

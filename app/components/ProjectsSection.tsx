"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  role: string;
  description: string;
  longDescription: string;
  technologies: string[];
  metrics: Record<string, string>;
  featured: boolean;
  challenge: string;
  solution: string;
  results: string[];
  link?: string;
  github?: string;
  tag: string; // editorial pull-tag
  size: "hero" | "tall" | "wide" | "small"; // layout role
}

const projects: Project[] = [
  {
    id: 1,
    title: "Enterprise Video Platform",
    category: "Full-Stack",
    year: "2025",
    role: "Full-Stack & Backend Developer",
    description:
      "High-performance video streaming infrastructure with real-time analytics and sub-100ms latency at massive scale.",
    longDescription:
      "Architected a comprehensive video management system handling thousands of concurrent streams with enterprise-grade reliability and automated failover.",
    technologies: [
      "Go",
      "TypeScript",
      "Next.js",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Kubernetes",
    ],
    metrics: {
      "Concurrent Users": "10K+",
      Latency: "<100ms",
      Uptime: "99.9%",
      Processing: "Real-time",
    },
    featured: true,
    challenge:
      "Building scalable streaming infrastructure that handles massive concurrent load while maintaining sub-100ms latency.",
    solution:
      "Microservices in Go, optimized CDN delivery, Redis pub/sub for real-time events, and automated horizontal scaling.",
    results: [
      "Sub-100ms latency",
      "10K+ concurrent users",
      "99.9% uptime SLA",
      "30% cost reduction",
    ],
    tag: "@ Scale",
    size: "hero",
  },
  {
    id: 2,
    title: "Logistics Management System",
    category: "Backend",
    year: "2024",
    role: "Backend Developer",
    description:
      "Nationwide digital warehousing network serving 100+ facilities, processing over a million transactions daily.",
    longDescription:
      "Designed and optimized backend infrastructure for India's largest digital warehousing platform — from API design to deep database tuning.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
      "Kafka",
    ],
    metrics: {
      Warehouses: "100+",
      "Daily Txns": "1M+",
      "Query Speed": "+60%",
      Coverage: "Pan-India",
    },
    featured: true,
    challenge:
      "Scaling to handle millions of daily transactions across geographically distributed warehouses with zero data loss.",
    solution:
      "Microservices decomposition, Kafka event streaming, aggressive query optimization, and Redis for hot paths.",
    results: [
      "60% faster queries",
      "1M+ daily transactions",
      "40% lower DB load",
      "Zero data loss",
    ],
    tag: "Production",
    size: "tall",
  },
  {
    id: 3,
    title: "AI Analytics Dashboard",
    category: "ML & Full-Stack",
    year: "2024",
    role: "Full-Stack Developer",
    description:
      "Real-time data visualization with predictive ML models and automated insights at 94% forecast accuracy.",
    longDescription:
      "Intelligent analytics system that ingests millions of data points and surfaces actionable business intelligence with minimal human intervention.",
    technologies: [
      "Python",
      "TensorFlow",
      "React",
      "Node.js",
      "MongoDB",
      "D3.js",
    ],
    metrics: {
      "Data Points": "10M+",
      Accuracy: "94%",
      Processing: "Real-time",
      Users: "500+",
    },
    featured: false,
    challenge:
      "Processing massive datasets in real-time while delivering accurate predictive models users could trust.",
    solution:
      "TensorFlow pipelines, WebSocket-fed live charts, and a feature store for low-latency predictions.",
    results: [
      "94% prediction accuracy",
      "Real-time ingestion",
      "70% faster analysis",
      "80% automated reports",
    ],
    tag: "ML",
    size: "wide",
  },
  {
    id: 4,
    title: "Airbnb Redesigned",
    category: "Full-Stack",
    year: "2024",
    role: "Full-Stack Developer & UI Engineer",
    description:
      "Luxurious reimagining with modern UI, dynamic listings, Stripe payments and sub-2s global load times.",
    longDescription:
      "Next-gen accommodation platform with immersive design, lightning-fast search, and seamless multi-currency booking.",
    technologies: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Redis",
      "AWS",
      "Tailwind",
    ],
    metrics: {
      Listings: "20K+",
      "Active Users": "15K+",
      "Booking Success": "99.97%",
      "Load Time": "<1.8s",
    },
    featured: true,
    challenge:
      "Creating a high-performance, visually immersive booking experience that scales gracefully under load.",
    solution:
      "Next.js SSR with ISR, Redis caching, PostgreSQL optimization, and Stripe for multi-currency payments.",
    results: [
      "Sub-2s load time",
      "60% lower API latency",
      "99.97% payment success",
      "20K+ listings",
    ],
    link: "https://airbnb-git-redesign-cod3rss2910gmailcoms-projects.vercel.app/",
    github: "https://github.com/codebysnehil/Airbnb/tree/redesign",
    tag: "Live",
    size: "small",
  },
];

// Per-project theme
const THEMES: Record<number, { num: string; accent: string; bg: string }> = {
  1: { num: "01", accent: "#e8ff4a", bg: "rgba(232,255,74,0.03)" },
  2: { num: "02", accent: "#a8f0c8", bg: "rgba(168,240,200,0.03)" },
  3: { num: "03", accent: "#c8d8ff", bg: "rgba(200,216,255,0.03)" },
  4: { num: "04", accent: "#f0c8a8", bg: "rgba(240,200,168,0.03)" },
};

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const th = THEMES[project.id];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(0,0,0,0.86)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        overflowY: "auto",
        fontFamily: "'Syne', sans-serif",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, y: 28, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.93, y: 28, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#111110",
          border: `1px solid ${th.accent}22`,
          borderRadius: "16px",
          maxWidth: "680px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Head */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "#111110",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding:
              "clamp(16px,4vw,28px) clamp(16px,4vw,32px) clamp(14px,3vw,22px)",
            borderRadius: "16px 16px 0 0",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "13px",
                  color: th.accent,
                  opacity: 0.7,
                }}
              >
                {th.num}
              </span>
              <span
                style={{
                  width: "1px",
                  height: "12px",
                  background: "rgba(255,255,255,0.12)",
                }}
              />
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: th.accent,
                }}
              >
                {project.category}
              </span>
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(107,104,96,0.5)",
                  letterSpacing: "0.12em",
                }}
              >
                · {project.year}
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(1.6rem,3vw,2.2rem)",
                fontWeight: 400,
                color: "#f0ede6",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                margin: "0 0 6px",
              }}
            >
              {project.title}
            </h2>
            <p
              style={{
                fontSize: "11px",
                color: "rgba(107,104,96,0.6)",
                margin: 0,
                letterSpacing: "0.05em",
              }}
            >
              {project.role}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              color: "rgba(107,104,96,0.8)",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              transition: "all 0.18s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.25)";
              (e.currentTarget as HTMLElement).style.color = "#f0ede6";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.color =
                "rgba(107,104,96,0.8)";
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: "clamp(16px, 4vw, 32px)" }}>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(107,104,96,0.85)",
              lineHeight: 1.85,
              marginBottom: "28px",
            }}
          >
            {project.longDescription}
          </p>
          {/* Metrics */}
          <div
            className="proj-modal-metrics"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "28px",
            }}
          >
            {Object.entries(project.metrics).map(([k, v], i, arr) => (
              <div
                key={k}
                style={{
                  padding: "16px 12px",
                  textAlign: "center",
                  borderRight:
                    i < arr.length - 1
                      ? "1px solid rgba(255,255,255,0.07)"
                      : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "1.4rem",
                    color: th.accent,
                    fontWeight: 400,
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {v}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(107,104,96,0.5)",
                  }}
                >
                  {k}
                </div>
              </div>
            ))}
          </div>
          {/* Challenge / Solution */}
          <div className="proj-modal-cs">
            {[
              { label: "Challenge", text: project.challenge },
              { label: "Solution", text: project.solution },
            ].map(({ label, text }) => (
              <div
                key={label}
                style={{
                  padding: "18px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 700,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: th.accent,
                    marginBottom: "9px",
                    opacity: 0.75,
                  }}
                >
                  {label}
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(107,104,96,0.8)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
          {/* Results */}
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(107,104,96,0.38)",
                marginBottom: "12px",
              }}
            >
              Key Results
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {project.results.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      width: "5px",
                      height: "5px",
                      borderRadius: "50%",
                      background: th.accent,
                      flexShrink: 0,
                      marginTop: "7px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      color: "rgba(240,237,230,0.72)",
                      lineHeight: 1.6,
                    }}
                  >
                    {r}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Tech */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              marginBottom: project.link || project.github ? "20px" : 0,
            }}
          >
            {project.technologies.map((t) => (
              <span
                key={t}
                style={{
                  padding: "5px 12px",
                  borderRadius: "100px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "rgba(107,104,96,0.7)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          {(project.link || project.github) && (
            <div style={{ display: "flex", gap: "10px" }}>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "11px 22px",
                    borderRadius: "100px",
                    background: th.accent,
                    color: "#0a0a08",
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "10px",
                    fontWeight: 800,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  Live ↗
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "11px 22px",
                    borderRadius: "100px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(240,237,230,0.65)",
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                >
                  Source ↗
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  project,
  delay,
  style,
  className,
}: {
  project: Project;
  delay: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const [hov, setHov] = useState(false);
  const [modal, setModal] = useState(false);
  const th = THEMES[project.id];

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => setModal(true)}
        className={className}
        style={{
          position: "relative",
          background: hov ? "#161614" : "#0f0f0d",
          border: `1px solid ${hov ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)"}`,
          borderRadius: "12px",
          padding: "32px",
          cursor: "pointer",
          overflow: "hidden",
          transition: "background 0.25s, border-color 0.25s",
          display: "flex",
          flexDirection: "column",
          ...style,
        }}
      >
        {/* Accent glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${th.accent}18 0%, transparent 70%)`,
            opacity: hov ? 1 : 0,
            transition: "opacity 0.4s",
            pointerEvents: "none",
          }}
        />

        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "20%",
            bottom: "20%",
            width: "2px",
            background: `linear-gradient(to bottom, transparent, ${th.accent}, transparent)`,
            opacity: hov ? 0.8 : 0,
            transition: "opacity 0.3s",
            borderRadius: "2px",
          }}
        />

        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: "2.2rem",
                fontWeight: 400,
                color: `${th.accent}22`,
                lineHeight: 1,
                transition: "color 0.3s",
                ...(hov ? { color: `${th.accent}55` } : {}),
              }}
            >
              {th.num}
            </span>
            <div>
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: th.accent,
                  opacity: 0.7,
                }}
              >
                {project.category}
              </div>
              <div
                style={{
                  fontSize: "9px",
                  color: "rgba(107,104,96,0.45)",
                  letterSpacing: "0.12em",
                }}
              >
                {project.year}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {project.featured && (
              <span
                style={{
                  padding: "3px 9px",
                  borderRadius: "100px",
                  border: `1px solid ${th.accent}30`,
                  background: `${th.accent}08`,
                  fontSize: "8px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: th.accent,
                  opacity: 0.75,
                }}
              >
                Featured
              </span>
            )}
            <span
              style={{
                padding: "3px 9px",
                borderRadius: "100px",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: "8px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(107,104,96,0.55)",
              }}
            >
              {project.tag}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize:
              project.size === "hero"
                ? "clamp(1.8rem,3vw,2.6rem)"
                : project.size === "tall"
                  ? "clamp(1.5rem,2.5vw,2rem)"
                  : "clamp(1.3rem,2vw,1.7rem)",
            fontWeight: 400,
            color: hov ? "#f0ede6" : "rgba(240,237,230,0.82)",
            letterSpacing: "-0.02em",
            lineHeight: 1.08,
            margin: "0 0 14px",
            transition: "color 0.2s",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "12px",
            color: "rgba(107,104,96,0.75)",
            lineHeight: 1.8,
            margin: "0 0 auto",
            ...(project.size === "hero"
              ? { fontSize: "13px", maxWidth: "420px" }
              : {}),
          }}
        >
          {project.description}
        </p>

        {/* Bottom: metrics strip (hero only) or tech tags */}
        {project.size === "hero" ? (
          <div
            style={{
              marginTop: "28px",
              display: "flex",
              gap: "0",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {Object.entries(project.metrics)
              .slice(0, 3)
              .map(([k, v], i) => (
                <div
                  key={k}
                  style={{
                    flex: 1,
                    padding: "12px 10px",
                    textAlign: "center",
                    borderRight:
                      i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "1.1rem",
                      color: th.accent,
                      lineHeight: 1,
                      marginBottom: "3px",
                    }}
                  >
                    {v}
                  </div>
                  <div
                    style={{
                      fontSize: "8px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(107,104,96,0.45)",
                    }}
                  >
                    {k}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
            }}
          >
            {project.technologies
              .slice(0, project.size === "small" ? 3 : 4)
              .map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "100px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    fontSize: "9px",
                    fontWeight: 600,
                    color: "rgba(107,104,96,0.6)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {t}
                </span>
              ))}
          </div>
        )}

        {/* CTA */}
        <motion.div
          animate={{ opacity: hov ? 1 : 0, x: hov ? 0 : -8 }}
          transition={{ duration: 0.2 }}
          style={{
            marginTop: "20px",
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: th.accent,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          View case study <span>→</span>
        </motion.div>
      </motion.article>

      <AnimatePresence>
        {modal && (
          <ProjectModal project={project} onClose={() => setModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  const [p1, p2, p3, p4] = projects;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;500;600;700;800&display=swap');
        #projects, #projects * { box-sizing: border-box; }
        #projects { font-family: 'Syne', sans-serif; }

        /* ── MAGAZINE GRID ── */
        .mag-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 10px;
        }
        .mag-side {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mag-full {
          grid-column: 1 / -1;
        }

        /* ── MODAL responsive ── */
        .proj-modal-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .proj-modal-cs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        /* ── SECTION PADDING ── */
        .proj-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
        }

        /* Wide bottom card — horizontal on desktop, stacked on mobile */
        .mag-wide-card {
          flex-direction: row !important;
          align-items: flex-start !important;
          gap: 40px !important;
        }
        .mag-wide-card .wide-right {
          flex: 1;
          min-width: 0;
        }

        @media (max-width: 860px) {
          .mag-grid {
            grid-template-columns: 1fr;
          }
          .mag-full {
            grid-column: 1 / -1;
          }
          .mag-side {
            flex-direction: row;
          }
          .mag-side > * { flex: 1; }
          .proj-inner { padding: 0 20px; }
        }

        @media (max-width: 580px) {
          .mag-side {
            flex-direction: column;
          }
          .proj-modal-metrics {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .proj-modal-cs {
            grid-template-columns: 1fr !important;
          }
          .proj-inner { padding: 0 16px; }
          .mag-wide-card {
            flex-direction: column !important;
            gap: 0 !important;
          }
        }
      `}</style>

      <section
        id="projects"
        ref={ref}
        style={{
          position: "relative",
          padding: "80px 0",
          background: "#111110",
          overflow: "hidden",
        }}
      >
        {/* Bg grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-180px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            pointerEvents: "none",
            background:
              "radial-gradient(circle, rgba(232,255,74,0.03) 0%, transparent 70%)",
          }}
        />

        <div className="proj-inner">
          {/* ── HEADER ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "clamp(32px,5vw,52px)",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#e8ff4a",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    width: "32px",
                    height: "1px",
                    background: "#e8ff4a",
                    display: "block",
                  }}
                />
                Selected Work
              </div>
              <h2
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                  lineHeight: 0.92,
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "#f0ede6",
                  margin: 0,
                }}
              >
                Things I&apos;ve
                <br />
                <em style={{ color: "#e8ff4a" }}>shipped.</em>
              </h2>
            </div>
            {/* Rotating editorial kicker */}
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "'DM Serif Display', serif",
                  fontSize: "4rem",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.04)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                {projects.length}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(107,104,96,0.4)",
                  marginTop: "-4px",
                }}
              >
                Projects
              </div>
            </div>
          </motion.div>

          {/* ── MAGAZINE LAYOUT ── */}
          {isInView && (
            <div className="mag-grid">
              {/* HERO — top left, tall */}
              <ProjectCard
                project={p1}
                delay={0.1}
                style={{ minHeight: "420px" }}
              />

              {/* SIDE — top right, stacked two cards */}
              <div className="mag-side">
                <ProjectCard project={p2} delay={0.18} style={{ flex: 1 }} />
                <ProjectCard project={p4} delay={0.26} style={{ flex: 1 }} />
              </div>

              {/* BOTTOM FULL-WIDTH */}
              <div className="mag-full">
                <ProjectCard
                  project={p3}
                  delay={0.32}
                  className="mag-wide-card"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

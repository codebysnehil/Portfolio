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
}

const projects: Project[] = [
  {
    id: 1,
    title: "Agentic Workflow Engine",
    category: "AI Engineering",
    year: "2025",
    role: "AI Engineer & System Architect",
    description:
      "Multi-agent orchestration platform that turns manual business processes into autonomous AI workflows with human-in-the-loop approvals.",
    longDescription:
      "An LLM-powered workflow engine where specialized agents plan, call tools, and hand off tasks — with durable execution, retries, and full audit trails for every agent decision.",
    technologies: ["Claude API", "TypeScript", "MCP", "Node.js", "PostgreSQL", "Redis"],
    metrics: {
      "Manual work": "-80%",
      Integrations: "15+",
      "Task success": "97%",
    },
    featured: true,
    challenge:
      "Making non-deterministic LLM agents reliable enough for real business workflows — with recovery, observability, and guardrails.",
    solution:
      "Structured tool calling via MCP, checkpointed state machines for durable runs, eval-gated prompts, and human approval steps on irreversible actions.",
    results: [
      "80% reduction in manual ops work",
      "15+ tool integrations via MCP",
      "97% end-to-end task success",
      "Full audit trail per agent run",
    ],
  },
  {
    id: 2,
    title: "RAG Knowledge Copilot",
    category: "AI Engineering",
    year: "2025",
    role: "AI & Full-Stack Engineer",
    description:
      "Retrieval-augmented assistant answering from private document corpora with inline citations and streaming responses.",
    longDescription:
      "End-to-end RAG pipeline — ingestion, chunking, embeddings, hybrid search, and re-ranking — surfaced through a streaming chat UI where every answer links back to its sources.",
    technologies: ["Python", "Claude API", "pgvector", "FastAPI", "Next.js"],
    metrics: {
      Documents: "50K+",
      Accuracy: "92%",
      Retrieval: "<200ms",
    },
    featured: true,
    challenge:
      "Grounding LLM answers in large private corpora without hallucination, while keeping retrieval fast enough for chat.",
    solution:
      "Hybrid semantic + keyword search over pgvector, cross-encoder re-ranking, citation-enforced prompting, and automated eval suites against a golden dataset.",
    results: [
      "50K+ documents indexed",
      "92% answer accuracy on evals",
      "Sub-200ms retrieval latency",
      "Every answer cited to source",
    ],
  },
  {
    id: 3,
    title: "Enterprise Video Platform",
    category: "Full-Stack",
    year: "2025",
    role: "Full-Stack & Backend Developer",
    description:
      "High-performance video streaming infrastructure with real-time analytics and sub-100ms latency at massive scale.",
    longDescription:
      "Architected a comprehensive video management system handling thousands of concurrent streams with enterprise-grade reliability and automated failover.",
    technologies: ["Go", "TypeScript", "Next.js", "PostgreSQL", "AWS", "Kubernetes"],
    metrics: {
      Concurrent: "10K+",
      Latency: "<100ms",
      Uptime: "99.9%",
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
  },
  {
    id: 4,
    title: "Logistics Management System",
    category: "Backend",
    year: "2024",
    role: "Backend Developer",
    description:
      "Nationwide digital warehousing network serving 100+ facilities, processing over a million transactions daily.",
    longDescription:
      "Designed and optimized backend infrastructure for India's largest digital warehousing platform — from API design to deep database tuning.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Kafka", "AWS"],
    metrics: {
      Warehouses: "100+",
      "Daily txns": "1M+",
      Queries: "+60%",
    },
    featured: false,
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
  },
  {
    id: 5,
    title: "AI Analytics Dashboard",
    category: "ML & Full-Stack",
    year: "2024",
    role: "Full-Stack Developer",
    description:
      "Real-time data visualization with predictive ML models and automated insights at 94% forecast accuracy.",
    longDescription:
      "Intelligent analytics system that ingests millions of data points and surfaces actionable business intelligence with minimal human intervention.",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB", "D3.js"],
    metrics: {
      "Data points": "10M+",
      Accuracy: "94%",
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
  },
  {
    id: 6,
    title: "Airbnb Redesigned",
    category: "Full-Stack",
    year: "2024",
    role: "Full-Stack Developer & UI Engineer",
    description:
      "Luxurious reimagining with modern UI, dynamic listings, Stripe payments and sub-2s global load times.",
    longDescription:
      "Next-gen accommodation platform with immersive design, lightning-fast search, and seamless multi-currency booking.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "Tailwind"],
    metrics: {
      Listings: "20K+",
      Bookings: "99.97%",
      Load: "<1.8s",
    },
    featured: false,
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
  },
];

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(23,23,23,0.35)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        overflowY: "auto",
      }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 24, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{
          maxWidth: "660px",
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          background: "var(--surface)",
        }}
      >
        {/* Header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            padding: "24px 28px 18px",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            zIndex: 1,
          }}
        >
          <div>
            <div
              className="mono"
              style={{
                fontSize: "11px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "8px",
              }}
            >
              {project.category} · {project.year}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display), sans-serif",
                fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text)",
                margin: "0 0 4px",
                lineHeight: 1.15,
              }}
            >
              {project.title}
            </h2>
            <p style={{ fontSize: "12.5px", color: "var(--faint)", margin: 0 }}>
              {project.role}
            </p>
          </div>
          <button
            onClick={onClose}
            className="icon-link"
            style={{ flexShrink: 0, cursor: "pointer", background: "none" }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "24px 28px 28px" }}>
          <p
            style={{
              fontSize: "14.5px",
              color: "var(--muted)",
              lineHeight: 1.8,
              margin: "0 0 24px",
            }}
          >
            {project.longDescription}
          </p>

          {/* Metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Object.keys(project.metrics).length}, 1fr)`,
              border: "1px solid var(--border)",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "24px",
            }}
          >
            {Object.entries(project.metrics).map(([k, v], i, arr) => (
              <div
                key={k}
                className="metric"
                style={{
                  padding: "16px 14px",
                  alignItems: "center",
                  borderRight:
                    i < arr.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span className="metric__value">{v}</span>
                <span className="metric__label">{k}</span>
              </div>
            ))}
          </div>

          {/* Challenge / Solution */}
          <div
            className="proj-modal-cs"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            {[
              { label: "Challenge", text: project.challenge },
              { label: "Solution", text: project.solution },
            ].map(({ label, text }) => (
              <div
                key={label}
                style={{
                  padding: "18px",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  background: "var(--surface-2)",
                }}
              >
                <div
                  className="mono"
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: "9px",
                  }}
                >
                  {label}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--muted)",
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
            <div className="mono-label" style={{ marginBottom: "12px" }}>
              Key results
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {project.results.map((r) => (
                <div
                  key={r}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    fontSize: "13.5px",
                    color: "rgba(23,23,23,0.8)",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    className="mono"
                    style={{ color: "var(--accent)", fontSize: "12px", marginTop: "2px" }}
                  >
                    →
                  </span>
                  {r}
                </div>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "7px",
              paddingTop: "20px",
              borderTop: "1px solid var(--border)",
              marginBottom: project.link || project.github ? "22px" : 0,
            }}
          >
            {project.technologies.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>

          {(project.link || project.github) && (
            <div style={{ display: "flex", gap: "10px" }}>
              {project.link && (
                <a
                  className="btn btn--primary btn--sm"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live ↗
                </a>
              )}
              {project.github && (
                <a
                  className="btn btn--ghost btn--sm"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
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

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const [modal, setModal] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setModal(true)}
        className="card card--hover proj-card"
      >
        <div className="proj-card__top">
          <span
            className="mono"
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            {project.category}
          </span>
          <span
            className="mono"
            style={{ fontSize: "11px", color: "var(--faint)" }}
          >
            {project.featured ? "★ " : ""}
            {project.year}
          </span>
        </div>

        <h3 className="proj-card__title">{project.title}</h3>
        <p className="proj-card__desc">{project.description}</p>

        <div className="proj-card__metrics">
          {Object.entries(project.metrics).map(([k, v]) => (
            <div key={k} className="metric">
              <span className="metric__value" style={{ fontSize: "1.2rem" }}>
                {v}
              </span>
              <span className="metric__label">{k}</span>
            </div>
          ))}
        </div>

        <div className="proj-card__foot">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.technologies.slice(0, 4).map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          <span className="proj-card__cta mono">Case study →</span>
        </div>
      </motion.article>

      <AnimatePresence>
        {modal && <ProjectModal project={project} onClose={() => setModal(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <>
      <style>{`
        .proj-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .proj-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
        }
        .proj-card__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .proj-card__title {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(1.25rem, 2.2vw, 1.55rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: var(--text);
          margin: 0 0 10px;
        }
        .proj-card__desc {
          font-size: 13.5px;
          color: var(--muted);
          line-height: 1.7;
          margin: 0 0 22px;
          flex: 1;
        }
        .proj-card__metrics {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          padding: 16px 0;
          border-top: 1px solid var(--border);
          margin-bottom: 18px;
        }
        .proj-card__foot {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 12px;
        }
        .proj-card__cta {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--faint);
          white-space: nowrap;
          transition: color 0.18s;
        }
        .proj-card:hover .proj-card__cta { color: var(--accent); }
        @media (max-width: 720px) {
          .proj-grid { grid-template-columns: 1fr; }
          .proj-modal-cs { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section id="projects" ref={ref} className="section">
        <div className="container">
          <motion.div
            className="section-head"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eyebrow">
              <span className="eyebrow__index">02</span> Selected Work
            </div>
            <div className="section-head__row">
              <h2 className="section-title">Things I&apos;ve shipped</h2>
              <p className="section-sub" style={{ maxWidth: "360px" }}>
                {projects.length} projects — from production streaming
                infrastructure to LLM-powered tools. Click any card for the
                full case study.
              </p>
            </div>
          </motion.div>

          {isInView && (
            <div className="proj-grid">
              {projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} delay={0.08 + i * 0.07} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

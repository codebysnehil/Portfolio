"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

interface ProjectMetrics {
  [key: string]: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  metrics: ProjectMetrics;
  featured: boolean;
  year: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  link?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Enterprise Video Platform",
    category: "Full-Stack",
    description: "High-performance video streaming with real-time analytics and CDN integration.",
    longDescription:
      "Architected and developed a comprehensive video management system handling thousands of concurrent streams with sub-100ms latency.",
    image: "/lens.png",
    technologies: ["Go", "TypeScript", "Next.js", "PostgreSQL", "AWS", "Docker"],
    metrics: { "Concurrent Users": "10K+", Latency: "<100ms", Uptime: "99.9%", "Video Processing": "Real-time" },
    featured: true,
    year: "2025",
    role: "Full-Stack & Backend Developer",
    challenge: "Building a scalable streaming infrastructure that could handle massive concurrent load while maintaining low latency.",
    solution: "Implemented microservices architecture with Go for backend services, optimized CDN delivery, and built real-time monitoring systems.",
    results: [
      "Achieved sub-100ms latency for video streaming",
      "Supported 10,000+ concurrent users",
      "Maintained 99.9% uptime SLA",
      "Reduced infrastructure costs by 30%",
    ],
  },
  {
    id: 2,
    title: "Logistics Management System",
    category: "Backend",
    description: "Nationwide digital warehousing and transportation network serving 100+ facilities.",
    longDescription: "Designed and optimized backend infrastructure for India's largest digital warehousing platform.",
    image: "/sa.png",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "React"],
    metrics: { Warehouses: "100+", "Daily Transactions": "1M+", "Query Speed": "+60%", Coverage: "Pan-India" },
    featured: true,
    year: "2024",
    role: "Backend Developer",
    challenge: "Scaling backend systems to handle millions of daily transactions while maintaining data integrity across distributed warehouses.",
    solution: "Refactored database schemas, implemented caching strategies, and built microservices for critical operations.",
    results: [
      "Improved query performance by 60%",
      "Processed 1M+ daily transactions",
      "Reduced database load by 40%",
      "Zero data loss incidents",
    ],
  },
  {
    id: 3,
    title: "AI-Powered Analytics Dashboard",
    category: "ML & Full-Stack",
    description: "Real-time data visualization with predictive analytics and automated insights.",
    longDescription: "Built an intelligent analytics system that processes millions of data points to generate actionable business insights.",
    image: "/project3.png",
    technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB", "D3.js"],
    metrics: { "Data Points": "10M+", Accuracy: "94%", Processing: "Real-time", Users: "500+" },
    featured: false,
    year: "2024",
    role: "Full-Stack Developer",
    challenge: "Processing and visualizing massive datasets in real-time while providing accurate predictive insights.",
    solution: "Developed ML models for prediction, implemented efficient data pipelines, and created interactive visualizations.",
    results: [
      "94% prediction accuracy achieved",
      "Real-time data processing implemented",
      "Reduced analysis time by 70%",
      "Automated 80% of reporting tasks",
    ],
  },
  {
    id: 4,
    title: "Airbnb Redesigned",
    category: "Full-Stack",
    description: "Luxurious reimagining with modern UI, dynamic listings, and secure real-time booking.",
    longDescription:
      "Built a next-generation accommodation platform inspired by Airbnb, featuring elegant design, lightning-fast search, and a seamless booking flow.",
    image: "/project4.png",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "AWS", "Tailwind CSS"],
    metrics: { Listings: "20K+", "Active Users": "15K+", "Booking Success": "99.97%", "Load Time": "<1.8s" },
    featured: true,
    year: "2024",
    role: "Full-Stack Developer & UI Engineer",
    challenge:
      "Designing a high-performance, visually immersive booking platform that mirrors Airbnb's scalability and luxury aesthetic.",
    solution:
      "Leveraged Next.js for SSR and dynamic routing, implemented Redis caching, optimized PostgreSQL, and integrated Stripe for multi-currency payments.",
    results: [
      "Achieved sub-2 second global page load time",
      "Reduced booking API response latency by 60%",
      "Maintained 99.97% payment success rate",
      "Handled 20K+ listings without downtime",
    ],
    link: "https://airbnb-git-redesign-cod3rss2910gmailcoms-projects.vercel.app/",
    github: "https://github.com/codebysnehil/Airbnb/tree/redesign",
  },
];

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      ref={ref}
      className="relative py-24 sm:py-32 px-5 sm:px-8 bg-[var(--bg-alt)]"
    >
      <div className="absolute inset-0 bg-grid-dark-dense pointer-events-none opacity-30" aria-hidden />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 sm:mb-20"
        >
          <p className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
            Projects
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--text)] tracking-tight">
            Selected work
          </h2>
        </motion.div>

        {/* Bento grid: first large, then 3 in a row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => setSelected(project)}
              className={`group relative text-left bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-8 rounded-xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-[var(--accent)]/40 transition-all duration-200 overflow-hidden ${
                i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                    {project.category} · {project.year}
                  </span>
                  {project.featured && (
                    <span className="text-xs font-semibold text-white bg-gradient-to-r from-[var(--accent)] to-[var(--accent-soft)] px-2.5 py-1 rounded-full">Featured</span>
                  )}
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-medium bg-[var(--accent)]/15 text-[var(--accent)] rounded border border-[var(--accent)]/30"
                    >
                      {t}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-xs text-[var(--text-muted)]">+{project.technologies.length - 4}</span>
                  )}
                </div>
                <p className="mt-4 text-sm font-semibold text-[var(--accent)] flex items-center gap-1">
                  View details
                  <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="bg-[var(--bg-card)] border border-[var(--border)] max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
              <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--accent)]/40 p-6 flex items-start justify-between gap-4 rounded-t-xl">
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    {selected.category} · {selected.year}
                  </p>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[var(--text)]">
                    {selected.title}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] mt-1">{selected.role}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="p-2 text-[var(--text-muted)] hover:text-[var(--text)]"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-8">
                <p className="text-[var(--text-muted)] leading-relaxed">{selected.longDescription}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Object.entries(selected.metrics).map(([k, v]) => (
                    <div key={k} className="bg-[var(--accent)]/10 border border-[var(--accent)]/25 rounded-lg p-4">
                      <p className="font-display font-bold text-[var(--accent)]">{v}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-1">{k}</p>
                    </div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[var(--text)] mb-2">Challenge</h4>
                    <p className="text-sm text-[var(--text-muted)]">{selected.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text)] mb-2">Solution</h4>
                    <p className="text-sm text-[var(--text-muted)]">{selected.solution}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--text)] mb-3">Key results</h4>
                  <ul className="space-y-2">
                    {selected.results.map((r, i) => (
                      <li key={i} className="text-sm text-[var(--text-muted)] flex gap-2">
                        <span className="text-[var(--accent)]">—</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selected.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-sm font-medium bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text)] rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-4">
                  {selected.link && (
                    <a
                      href={selected.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-soft)] text-white font-semibold text-sm uppercase tracking-wider rounded-lg hover:shadow-[var(--glow-accent)] transition-all"
                    >
                      View live
                    </a>
                  )}
                  {selected.github && (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-[var(--accent-secondary)] text-[var(--accent-secondary)] font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-[var(--accent-secondary)]/20 transition-colors"
                    >
                      Source code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

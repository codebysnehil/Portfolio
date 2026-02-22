"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Modern web technologies",
    skills: [
      { name: "React & Next.js", level: 98, category: "Framework" },
      { name: "TypeScript", level: 96, category: "Language" },
      { name: "Tailwind CSS", level: 97, category: "Styling" },
      { name: "State Management", level: 94, category: "Architecture" },
    ],
  },
  {
    title: "Backend",
    description: "Server-side & APIs",
    skills: [
      { name: "Node.js", level: 97, category: "Runtime" },
      { name: "Go", level: 93, category: "Language" },
      { name: "PostgreSQL", level: 91, category: "Database" },
      { name: "Redis", level: 89, category: "Cache" },
    ],
  },
  {
    title: "Cloud & DevOps",
    description: "Infrastructure",
    skills: [
      { name: "AWS", level: 92, category: "Platform" },
      { name: "Docker", level: 90, category: "Containerization" },
      { name: "Kubernetes", level: 88, category: "Orchestration" },
      { name: "CI/CD", level: 90, category: "Automation" },
    ],
  },
  {
    title: "Design & Architecture",
    description: "Systems at scale",
    skills: [
      { name: "Microservices", level: 93, category: "Architecture" },
      { name: "API Design", level: 95, category: "Interface" },
      { name: "Performance", level: 91, category: "Efficiency" },
      { name: "Security", level: 89, category: "Security" },
    ],
  },
];

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 sm:py-32 px-5 sm:px-8 bg-[var(--bg)]"
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
            Skills
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--text)] tracking-tight">
            What I work with
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-[var(--bg-card)] rounded-xl border border-[var(--border)] p-6 sm:p-8 shadow-[var(--shadow-card)] border-l-4 border-l-[var(--accent-secondary)] hover:border-[var(--border-hover)] transition-colors"
            >
              <h3 className="font-display font-bold text-xl text-[var(--text)] mb-1">
                {cat.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">{cat.description}</p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.1 + j * 0.04 }}
                    whileHover={{ scale: 1.05 }}
                    className={`inline-block px-4 py-2 bg-[var(--bg-elevated)] border border-[var(--border)] text-sm font-medium text-[var(--text)] rounded-lg hover:bg-[var(--accent)]/15 hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-all duration-200`}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

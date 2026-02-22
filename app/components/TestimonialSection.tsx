"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "Snehil consistently delivers high-quality code and shows great potential. His trading dashboard exceeded our expectations and our users love the intuitive interface.",
    author: "Alex Kumar",
    role: "Senior Developer",
    company: "FinTech Startup",
    project: "TradeDash Pro dashboard",
  },
  {
    quote:
      "Working with Snehil was a great experience. He's reliable, communicates well, and always delivers on time. His technical skills are impressive for someone with 2 years experience.",
    author: "Maria Rodriguez",
    role: "Project Manager",
    company: "Tech Consulting Agency",
    project: "Multiple web applications",
  },
  {
    quote:
      "Snehil has strong problem-solving skills and writes clean, maintainable code. He's someone I'd definitely want on my team for future projects.",
    author: "James Thompson",
    role: "Tech Lead",
    company: "Local Startup",
    project: "TaskFlow Manager development",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [active, setActive] = useState(0);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 sm:py-32 px-5 sm:px-8 bg-[var(--bg)]"
    >
      <div className="absolute inset-0 bg-grid-dark-dense pointer-events-none opacity-30" aria-hidden />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-sm font-medium text-[var(--accent)] uppercase tracking-widest mb-3">
            Testimonials
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--text)] tracking-tight">
            What people say
          </h2>
        </motion.div>

        <div className="relative bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-8 sm:p-12 shadow-[var(--shadow-card)] overflow-hidden hover:border-[var(--border-hover)] transition-colors">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[var(--accent)] to-[var(--accent-secondary)]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="pl-4 sm:pl-6"
            >
              <blockquote className="text-xl sm:text-2xl font-medium text-[var(--text)] leading-relaxed mb-8">
                &ldquo;{testimonials[active].quote}&rdquo;
              </blockquote>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-display font-bold text-[var(--text)]">{testimonials[active].author}</p>
                  <p className="text-sm font-medium text-[var(--accent)]">{testimonials[active].role}</p>
                  <p className="text-sm text-[var(--text-muted)]">
                    {testimonials[active].company} · {testimonials[active].project}
                  </p>
                </div>
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === active
                          ? "bg-[var(--accent)] scale-110 shadow-[var(--glow-accent-sm)]"
                          : "bg-[var(--border)] hover:bg-[var(--accent)]/50"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

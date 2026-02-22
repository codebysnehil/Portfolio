"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const contactMethods = [
  {
    title: "Email",
    value: "work.snehil01@gmail.com",
    href: "mailto:work.snehil01@gmail.com",
  },
  {
    title: "LinkedIn",
    value: "Connect",
    href: "https://linkedin.com/in/yourprofile",
  },
  {
    title: "GitHub",
    value: "Repos",
    href: "https://github.com/yourprofile",
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setForm({ name: "", email: "", message: "" });
      setStatus("done");
    }, 1200);
  };

  return (
    <section
      id="contact"
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
            Contact
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--text)] tracking-tight">
            Let&apos;s work together
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--text)] mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text)] mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--text)] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 resize-none transition-all"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-soft)] text-white font-semibold text-sm uppercase tracking-wider rounded-lg hover:shadow-[var(--glow-accent)] disabled:opacity-70 transition-all"
              >
                {status === "sending" ? "Sending…" : status === "done" ? "Sent" : "Send message"}
              </button>
              {status === "done" && (
                <p className="text-sm text-[var(--accent)]">Thanks — I&apos;ll get back soon.</p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <p className="text-sm text-[var(--text-muted)]">
              Or reach out directly:
            </p>
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl hover:border-[var(--accent)]/50 hover:bg-[var(--accent)]/10 transition-all group"
              >
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{method.title}</p>
                <p className="font-display font-bold text-[var(--text)] mt-1 group-hover:text-[var(--accent)] transition-colors">
                  {method.value}
                </p>
              </a>
            ))}
            <div className="pt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse flex-shrink-0" />
              <span className="text-sm font-medium text-[var(--text)]">Available for new projects</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialSection";
import ContactSection from "./components/ContactSection";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />
      <main>
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <footer className="relative py-12 px-5 sm:px-8 border-t border-[var(--border)] bg-[var(--bg-alt)]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[var(--accent)] via-[var(--accent-soft)] to-[var(--accent-secondary)]" />
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-[var(--text-muted)] mb-8">
            Open to full-time roles & freelance projects
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-display font-bold text-[var(--text)] hover:text-[var(--accent)] transition-colors cursor-default">Snehil Sharma</p>
            <div className="flex gap-8 text-sm text-[var(--text-muted)]">
              <button
                type="button"
                onClick={() => document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-[var(--accent)] transition-colors"
              >
                Work
              </button>
              <button
                type="button"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="hover:text-[var(--accent)] transition-colors"
              >
                Contact
              </button>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}

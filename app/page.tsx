"use client";

import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import IntroLoader from "./components/IntroLoader";
import MatrixBackground from "./components/MatrixBackground";
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import StatsStrip from "./components/StatsStrip";
import ContactSection from "./components/ContactSection";

const FOOTER_SOCIALS = [
  { label: "GitHub", href: "https://github.com/codebysnehil" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/snehil-sharma-in/" },
];

export default function Portfolio() {
  return (
    <div style={{ color: "var(--text)", minHeight: "100vh" }}>
      <MatrixBackground />
      <IntroLoader />
      <div className="page-layer">
        <Navbar />
        <main>
          <HeroSection />
          <StatsStrip />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </main>

        <footer
          style={{
            borderTop: "1px solid var(--border)",
            padding: "36px 0",
          }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
              }}
            >
              <span
                className="mono"
                style={{ color: "var(--accent)", fontSize: "13px" }}
              >
                {"//"}
              </span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "14.5px",
                }}
              >
                Snehil Sharma
              </span>
            </div>

            <div style={{ display: "flex", gap: "22px" }}>
              {FOOTER_SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono"
                  style={{
                    fontSize: "11.5px",
                    letterSpacing: "0.1em",
                    color: "var(--muted)",
                    textDecoration: "none",
                    transition: "color 0.18s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--muted)")
                  }
                >
                  {s.label}
                </a>
              ))}
            </div>

            <span
              className="mono"
              style={{
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--faint)",
              }}
            >
              © {new Date().getFullYear()} Snehil Sharma
            </span>
          </div>
        </footer>
      </div>
      <BackToTop />
    </div>
  );
}

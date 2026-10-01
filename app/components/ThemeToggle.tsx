"use client";

import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as
        | "dark"
        | "light"
        | null) || "dark";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      window.localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  };

  // Avoid a mismatched icon flash before hydration determines the theme.
  const isLight = theme === "light";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Toggle color theme"
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLight ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4.5" />
          <path
            strokeLinecap="round"
            d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.742 13.045a8.088 8.088 0 01-2.077.273c-4.508 0-8.16-3.653-8.16-8.16 0-1.276.293-2.484.816-3.56a.5.5 0 00-.578-.7A9.09 9.09 0 002 12.09C2 17.56 6.44 22 11.91 22a9.09 9.09 0 008.83-6.855.5.5 0 00-.58-.6z" />
        </svg>
      )}
    </button>
  );
}

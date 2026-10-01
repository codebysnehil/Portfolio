import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-body-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.devsnehil.com"),
  title: {
    default: "Snehil Sharma | Software Engineer",
    template: "%s | Snehil Sharma",
  },
  description:
    "Software Engineer building scalable backend systems and full-stack products. Go, TypeScript, Next.js, PostgreSQL, AWS — plus LLM-powered tools and agent workflows.",
  keywords: [
    "Snehil Sharma",
    "Software Engineer",
    "Backend Engineer",
    "Full-Stack Developer",
    "Go",
    "TypeScript",
    "Next.js",
    "PostgreSQL",
    "AWS",
    "LLM tools",
  ],
  authors: [{ name: "Snehil Sharma" }],
  creator: "Snehil Sharma",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Snehil Sharma",
    title: "Snehil Sharma | Software Engineer",
    description:
      "Full-stack engineer working on real-time video infrastructure. Go, TypeScript, Next.js, PostgreSQL.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snehil Sharma | Software Engineer",
    description:
      "Full-stack engineer working on real-time video infrastructure. Go, TypeScript, Next.js, PostgreSQL.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

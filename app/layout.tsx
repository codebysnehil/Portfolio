import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  // TODO: replace with your deployed domain
  metadataBase: new URL("https://snehilsharma.dev"),
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
      "Building scalable backend systems and full-stack products — real-time video infrastructure, logistics APIs, and LLM-powered tools.",
    images: [
      {
        // TODO: add a 1200x630 og.png to /public
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Snehil Sharma — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snehil Sharma | Software Engineer",
    description:
      "Building scalable backend systems and full-stack products — real-time video infrastructure, logistics APIs, and LLM-powered tools.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}

// Single source of truth for site content.
// NOTE: every number below is a public claim on your résumé/portfolio.
// Keep only what you can defend, unprompted, in an interview.

export const RESUME_URL = process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf";

export const stats: {
  prefix?: string;
  to: number;
  suffix?: string;
  label: string;
}[] = [
  { to: 2, suffix: "+", label: "Years experience" },
  { to: 3, label: "Shipped projects" },
  { to: 2, label: "Production companies" },
];

export const marquee = [
  "Go",
  "Java",
  "TypeScript",
  "Python",
  "Spring Boot",
  "Node.js",
  "WebSockets",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "Elasticsearch",
  "AWS",
  "Docker",
  "Microservices",
];

export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  summary: string;
  problem: string;
  approach: string;
  built: string[];
  stack: string[];
  image?: string;
  live?: string;
  source?: string;
}

export const projects: Project[] = [
  {
    id: "ridebrisk",
    title: "RideBrisk",
    category: "Backend",
    year: "2025",
    role: "Backend engineer",
    summary:
      "A ride-hailing backend focused on one hard problem: matching drivers to riders correctly under concurrent demand, with zero double-assignments.",
    problem:
      "When many ride requests compete for the same nearby drivers at once, naive matching either double-books a driver or is too slow to feel real-time.",
    approach:
      "Geospatial driver search with Redis Geo (O(log N) lookups) combined with pessimistic database locking, so only one request can win a driver even under heavy concurrency.",
    built: [
      "Redis Geo-based nearest-driver search",
      "Pessimistic locking to prevent double-assignment",
      "Kafka Outbox Pattern for at-least-once event delivery",
      "Sliding-window rate limiting with Lua scripts and AOP",
      "Live driver tracking over Redis Pub/Sub and SSE",
    ],
    stack: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Kafka"],
    source: "https://github.com/codebysnehil/RideBrisk",
  },
  {
    id: "virtualstage",
    title: "VirtualStage",
    category: "Full-stack / GenAI",
    year: "2025",
    role: "Full-stack and AI engineer",
    summary:
      "A real-time generative AI virtual studio — creators stream AI-composited video without owning studio hardware.",
    problem:
      "AI video compositing is usually too slow for live streaming. Making it feel real-time means squeezing latency out of every hop between camera, inference and viewer.",
    approach:
      "A WebSocket pipeline connects a React frontend to a Python inference backend, keeping the round trip from frame capture to composited output under 50ms at 30 FPS.",
    built: [
      "WebSocket streaming pipeline, capture to composited output",
      "AI inference pipeline for live compositing",
      "Canvas rendering and session recording",
      "4K export and multi-tier subscriptions",
      "End-to-end production deployment",
    ],
    stack: ["React", "Python", "WebSockets", "GenAI"],
    source: "https://github.com/codebysnehil/VirtualStage",
  },
  {
    id: "airbnb-redesigned",
    title: "Airbnb Redesigned",
    category: "Full-stack",
    year: "2024",
    role: "Full-stack developer and UI engineer",
    summary:
      "A redesign of the Airbnb booking experience with dynamic listings, search and Stripe checkout.",
    problem:
      "A booking flow that looks good and still feels quick as the number of listings grows.",
    approach:
      "Next.js with server rendering and ISR, Redis caching, PostgreSQL for listings, Stripe for multi-currency payments.",
    built: [
      "Server-rendered listing and search pages",
      "Redis caching in front of PostgreSQL",
      "Stripe multi-currency checkout",
      "Responsive redesign of the full booking flow",
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "Tailwind"],
    image: "/project4.png",
    live: "https://airbnb-version1.vercel.app",
    source: "https://github.com/codebysnehil/Airbnb/tree/redesign",
  },
];
export interface Job {
  company: string;
  logo: string;
  role: string;
  period: string;
  summary: string;
  points: string[];
  stack: string[];
}

export const jobs: Job[] = [
  {
    company: "LenscorpAI",
    logo: "/lens.png",
    role: "Software Development Engineer",
    period: "Jan 2025 to present",
    summary:
      "Backend for an AI-powered surveillance platform: Go microservices running CCTV and inference infrastructure across enterprise deployments on three continents.",
    points: [
      "Architected and shipped 10 production Go microservices (AWS EC2, S3, Docker) across 15+ enterprise deployments in India, the US, Saudi Arabia and Egypt, managing 15,000+ CCTV cameras at 99% uptime on air-gapped, offline-first infrastructure",
      "Built a real-time video ingestion layer (WebSockets, Redis, Go) streaming 8,000-10,000+ camera feeds into a GPU-offloaded AI inference pipeline (face recognition, intrusion detection, line crossing, GIS), cutting system CPU usage from 85% to 58% with concurrent Go services",
      "Built a Kafka-based messaging pipeline for real-time AI alerts and license-update distribution across all 15+ sites, with at-least-once delivery",
      "Engineered an S3-backed remote update system for the Electron desktop app, delivering live config and binary updates across 15+ globally distributed field deployments",
      "Lead a 4-engineer backend pod as primary technical decision-maker: code review, sprint planning and end-to-end delivery",
    ],
    stack: [
      "Go",
      "TypeScript",
      "Electron",
      "AWS",
      "Docker",
      "Redis",
      "Kafka",
      "WebSockets",
      "Nginx",
      "Tunneling",
    ],
  },
  {
    company: "Stockarea",
    logo: "/sa.png",
    role: "Software Development Engineer",
    period: "Jan 2024 to Dec 2024",
    summary:
      "Backend performance and tooling for a digital warehousing and logistics platform.",
    points: [
      "Diagnosed and eliminated memory leaks and N+1 query bottlenecks under sustained enterprise load (AWS RDS, Docker), cutting p99 query latency from 3s to 0.5s, an 83% reduction",
      "Redesigned backend search logic and indexing strategy, reducing search latency by 68% across the platform's core discovery flow",
      "Built a RBAC-enabled Excel reporting tool (Docker, AWS RDS) serving 20+ admin and finance users with role-filtered exports and zero manual intervention from engineering",
      "Integrated Zoho Books, E-way Bill and Toll APIs to automate accounting and logistics workflows, improving operational efficiency by 30% and tracking accuracy by 95%",
    ],
    stack: ["MySQL", "TypeScript", "Redis", "AWS RDS", "AWS EC2", "Docker"],
  },
];
export const skills: { title: string; sub: string; items: string[] }[] = [
  {
    title: "Languages",
    sub: "Core languages",
    items: ["Go", "Java", "Python", "TypeScript", "SQL"],
  },
  {
    title: "Backend & Systems",
    sub: "Server-side & APIs",
    items: [
      "Node.js",
      "Spring Boot",
      "Microservices",
      "Distributed Systems",
      "WebSockets",
    ],
  },
  {
    title: "Databases & Messaging",
    sub: "Data & streaming",
    items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "Kafka"],
  },
  {
    title: "Cloud & DevOps",
    sub: "Infrastructure",
    items: ["AWS (EC2, S3, RDS)", "Docker", "CI/CD"],
  },
  {
    title: "AI / ML",
    sub: "Inference & models",
    items: [
      "TensorFlow",
      "HuggingFace",
      "ONNX Runtime",
      "VLMs",
      "Real-time inference",
    ],
  },
];

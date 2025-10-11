"use client";
import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface Experience {
  company: string;
  role: string;
  period: string;
  logo: string;
  description: string;
  achievements: string[];
  technologies: string[];
  color: string;
  impact: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

const experiences: Experience[] = [
  {
    company: "LENS Corporation",
    role: "Senior Full-Stack Engineer",
    period: "Jan 2025 – Present",
    logo: "/lens.png",
    description:
      "Architecting next-generation video infrastructure at scale. Building real-time streaming systems that power thousands of concurrent streams with enterprise-grade reliability and sub-100ms latency.",
    achievements: [
      "Engineered high-throughput Go backend achieving <100ms latency for live streaming at scale",
      "Architected distributed API layer handling 10K+ concurrent connections with 99.9% uptime",
      "Built cross-platform desktop applications using Electron and TypeScript for seamless UX",
      "Implemented automated CI/CD pipelines, reducing deployment cycles by 70% and eliminating downtime",
    ],
    technologies: [
      "Go",
      "TypeScript",
      "Electron",
      "Next.js",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Kubernetes",
    ],
    color: "from-emerald-600 via-emerald-600 to-emerald-600",
    impact: "Real-Time Video Infrastructure",
    metrics: [
      { label: "Latency", value: "<100ms" },
      { label: "Concurrent", value: "10K+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    company: "Stockarea",
    role: "Backend Engineering Lead",
    period: "2023 – 2024",
    logo: "/sa.png",
    description:
      "Led backend architecture for India's largest digital warehousing network. Designed and scaled distributed systems powering logistics operations across 100+ facilities, processing millions of transactions daily.",
    achievements: [
      "Architected RESTful APIs powering nationwide logistics network across 100+ warehouses",
      "Optimized PostgreSQL queries and indexing strategies, achieving 60% faster response times",
      "Designed microservices architecture processing 1M+ daily transactions with zero data loss",
      "Built real-time monitoring infrastructure with automated alerting and incident response",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "AWS",
      "React",
      "Kafka",
    ],
    color: "from-red-300 via-red-600 to-red-800",
    impact: "Enterprise Logistics Platform",
    metrics: [
      { label: "Facilities", value: "100+" },
      { label: "Daily Txns", value: "1M+" },
      { label: "Performance", value: "+60%" },
    ],
  },
];

const ExperienceCard: React.FC<{ exp: Experience; index: number; isInView: boolean }> = ({
  exp,
  index,
  isInView,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Glow Effect on Hover */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${exp.color} rounded-3xl opacity-0 blur-xl transition-all duration-700`}
        animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
      />
      
      <div className="relative bg-gradient-to-br from-slate-950 to-slate-900/50 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
        {/* Animated Mesh Background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* Gradient Overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 transition-opacity duration-700`}
          animate={isHovered ? { opacity: 0.05 } : { opacity: 0 }}
        />

        <div className="relative p-6 sm:p-8 lg:p-10">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-8">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group/logo"
            >
              <motion.div
                className={`absolute -inset-2 bg-gradient-to-br ${exp.color} blur-2xl opacity-40 group-hover/logo:opacity-60 transition-opacity rounded-2xl`}
                animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              />
              <div className="relative bg-white/5 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border border-white/10 group-hover/logo:border-white/30 transition-all">
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  width={80}
                  height={80}
                  className="rounded-xl object-contain w-16 h-16 sm:w-20 sm:h-20"
                />
              </div>
            </motion.div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex flex-col gap-4 mb-4">
                <div>
                  <motion.h3
                    className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    {exp.company}
                  </motion.h3>
                  <p className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mb-2`}>
                    {exp.role}
                  </p>
                  <div className="flex items-center gap-2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium">{exp.period}</span>
                  </div>
                </div>

                {/* Impact Badge */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className={`w-fit px-5 py-2.5 bg-gradient-to-r ${exp.color} rounded-xl text-white font-bold text-xs sm:text-sm shadow-lg`}
                >
                  {exp.impact}
                </motion.div>
              </div>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                {exp.description}
              </p>

              {/* Metrics */}
              {exp.metrics && (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {exp.metrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.15 + 0.4 + i * 0.08 }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      className="relative group/metric"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover/metric:opacity-10 rounded-xl transition-opacity`} />
                      <div className="relative bg-white/5 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-white/10 group-hover/metric:border-white/20 transition-all text-center">
                        <div className={`text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mb-1`}>
                          {metric.value}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gray-400 font-semibold uppercase tracking-wider">
                          {metric.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h4 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Impact & Achievements
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {exp.achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15 + 0.5 + i * 0.08 }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="relative group/item"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover/item:opacity-5 rounded-xl transition-opacity`} />
                  <div className="relative flex items-start gap-3 p-3 sm:p-4 bg-white/[0.03] backdrop-blur-xl rounded-xl border border-white/10 group-hover/item:border-white/20 group-hover/item:bg-white/[0.06] transition-all duration-300">
                    <div className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.color} flex-shrink-0 group-hover/item:scale-150 group-hover/item:shadow-lg transition-all`} />
                    <p className="text-gray-200 text-sm leading-relaxed">{achievement}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + 0.7 + i * 0.04 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="relative group/tech"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${exp.color} opacity-0 group-hover/tech:opacity-20 rounded-lg blur transition-opacity`} />
                  <span className="relative px-3 sm:px-4 py-2 bg-white/[0.04] backdrop-blur-xl text-gray-300 rounded-lg border border-white/10 font-semibold text-xs sm:text-sm group-hover/tech:border-white/30 group-hover/tech:bg-white/[0.08] group-hover/tech:text-white transition-all duration-300 cursor-default inline-block">
                    {tech}
                  </span>
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <motion.div
          className={`h-1 bg-gradient-to-r ${exp.color}`}
          initial={{ scaleX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </motion.div>
  );
};

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [downloading, setDownloading] = useState(false);
  const handleDownload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  
    setDownloading(true);
  
    const link = document.createElement("a");
    link.href = process.env.NEXT_PUBLIC_RESUME_URL!;
    link.download = "Snehil_Resume.pdf";
    link.click();
  
    setTimeout(() => setDownloading(false), 2000);
  };
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden bg-black"
    >
      {/* Animated Background Orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-600/20 rounded-full blur-[100px] sm:blur-[120px]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/20 rounded-full blur-[100px] sm:blur-[120px]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 px-6 py-3 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 font-bold text-xs sm:text-sm tracking-wider uppercase">
              Professional Journey
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 tracking-tighter leading-none">
            <span className="inline-block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              EXPERIENCE
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-1.5 w-24 sm:w-32 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full mx-auto mb-8"
          />

          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
            Architecting scalable systems and building products that drive real-world impact
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8 sm:space-y-12">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.company}
              exp={exp}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center mt-16 sm:mt-20"
        >
           <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDownload}
                className={`group relative overflow-hidden px-8 py-4 rounded-2xl shadow-2xl transition-colors duration-300 ${
                    downloading ? "bg-emerald-800" : ""
                }`}
                >
                {/* Main Gradient (hidden when downloading) */}
                {!downloading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600" />
                )}
                
                {/* Hover Glow */}
                <div
                    className={`absolute inset-0 bg-gradient-to-r from-green-600 via-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 ${
                    downloading ? "opacity-20" : ""
                    }`}
                />
                
                {/* Animated Shine */}
                {!downloading && (
                    <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                    />
                )}

                {/* Button Text */}
                <span className="relative z-10 flex items-center gap-3 font-bold text-base sm:text-lg text-white">
                    {downloading ? (
                    <>
                        <span>Downloading</span>
                        {/* Loader Circle */}
                        <motion.span
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        />
                    </>
                    ) : (
                    "Download Resume"
                    )}
                </span>
                </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
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
    role: "Full-Stack & Backend Developer",
    period: "Jan 2025 – Present",
    logo: "/lens.png",
    description:
      "Leading backend infrastructure development for a cutting-edge video management platform, architecting high-performance streaming solutions and cross-platform desktop applications.",
    achievements: [
      "Engineered backend services in Go for live streaming with sub-100ms latency",
      "Architected scalable API infrastructure supporting 10K+ concurrent users",
      "Built production-ready Electron desktop apps with TypeScript",
      "Implemented CI/CD pipelines reducing deployment time by 70%",
    ],
    technologies: [
      "Go",
      "TypeScript",
      "Electron",
      "Next.js",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    color: "from-violet-600 via-purple-600 to-fuchsia-600",
    impact: "High-Performance Streaming Infrastructure",
    metrics: [
      { label: "Latency", value: "<100ms" },
      { label: "Concurrent Users", value: "10K+" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    company: "Stockarea",
    role: "Backend Developer",
    period: "2023 – 2024",
    logo: "/sa.png",
    description:
      "Architected and scaled backend systems for India's largest digital warehousing network, optimizing logistics operations across 100+ facilities nationwide.",
    achievements: [
      "Designed REST APIs powering 100+ warehouses across India",
      "Optimized database queries reducing response time by 60%",
      "Built microservices architecture handling 1M+ daily transactions",
      "Implemented real-time monitoring and alerting systems",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "AWS",
      "React",
    ],
    color: "from-cyan-600 via-blue-600 to-indigo-600",
    impact: "Enterprise Logistics Platform",
    metrics: [
      { label: "Warehouses", value: "100+" },
      { label: "Daily Transactions", value: "1M+" },
      { label: "Query Speed", value: "+60%" },
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
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Animated Border Gradient */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
      
      <div className="relative bg-slate-950/90 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-500">
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                           linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        <div className="relative p-8 lg:p-12">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-10">
            {/* Logo with Glow Effect */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500 rounded-2xl`} />
              <div className="relative bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 w-fit">
                <Image
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  width={100}
                  height={100}
                  className="rounded-xl object-contain w-20 h-20 lg:w-24 lg:h-24"
                />
              </div>
            </motion.div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div>
                  <motion.h3
                    className="text-3xl lg:text-4xl font-black text-white mb-2 tracking-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {exp.company}
                  </motion.h3>
                  <p className={`text-xl font-bold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mb-2`}>
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
                  whileHover={{ scale: 1.05 }}
                  className={`px-6 py-3 bg-gradient-to-r ${exp.color} rounded-2xl text-white font-bold text-sm text-center lg:text-right shadow-lg`}
                >
                  {exp.impact}
                </motion.div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {exp.description}
              </p>

              {/* Metrics */}
              {exp.metrics && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {exp.metrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: index * 0.2 + 0.5 + i * 0.1 }}
                      className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-center group-hover:border-purple-500/30 transition-colors"
                    >
                      <div className={`text-2xl lg:text-3xl font-black bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mb-1`}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Key Achievements
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {exp.achievements.map((achievement, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 + 0.6 + i * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 group/item"
                >
                  <div className={`mt-0.5 w-2 h-2 rounded-full bg-gradient-to-r ${exp.color} flex-shrink-0 group-hover/item:scale-150 transition-transform`} />
                  <p className="text-gray-200 text-sm leading-relaxed">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.2 + 0.8 + i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 bg-white/5 backdrop-blur-xl text-gray-300 rounded-xl border border-white/10 font-semibold text-sm hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 cursor-default"
                >
                  {tech}
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
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 overflow-hidden bg-black"
    >
      {/* Animated Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6 px-6 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold text-sm tracking-wider uppercase">
              💼 Professional Journey
            </span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white mb-6 tracking-tight">
            <span className="inline-block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              EXPERIENCE
            </span>
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1.5 w-32 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full mx-auto mb-8"
          />

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Building enterprise-grade solutions that power millions of users and transform industries
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-12">
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
          transition={{ delay: 1.5 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-purple-500/50"
          >
            <span className="relative z-10 flex items-center gap-3">
              <span>View Full Resume</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
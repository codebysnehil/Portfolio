"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "framer-motion";

// Custom Hook for scroll animation
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
};

const ExperienceSection = () => {
  const { ref, isInView } = useScrollAnimation();

  const experiences = [
    {
      company: "LENS Corporation",
      role: "Full-Stack & Backend Developer",
      period: "Jan 2025 – Present",
      logo: "/lens.png",
      description:
        "Contributing to the backend infrastructure of a video management platform, focusing on high-performance streaming, playback optimization, and deployment pipelines. Built and maintained Electron-based desktop applications with TypeScript for seamless cross-platform delivery.",
      achievements: [
        "🔴 Engineered backend services in Go for live streaming and on-demand playback with low-latency performance",
        "⚙️ Developed scalable API endpoints supporting real-time video workflows",
        "💻 Built and maintained Electron desktop apps with TypeScript for video content management",
        "🚢 Automated build and deployment pipelines to streamline cross-platform releases",
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
      color: "from-purple-600 to-violet-600",
      impact: "High-Performance Streaming & Desktop Delivery",
    },
    {
      company: "Stockarea",
      role: "Backend Developer",
      period: "2023 – 2024",
      logo: "/sa.png",
      description:
        "Worked on backend systems for a nationwide digital warehousing and transportation network, enhancing database performance, implementing new service features, and improving overall platform scalability.",
      achievements: [
        "📦 Designed and optimized backend APIs powering logistics operations across 100+ warehouses in India",
        "🗄️ Migrated and refactored database schemas to improve query efficiency and reduce latency",
        "🚀 Built new backend modules to support expanded warehouse and transportation services",
        "🔍 Implemented monitoring and performance tuning for critical infrastructure components",
      ],
      technologies: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "Docker",
        "AWS",
        "React",
      ],
      color: "from-blue-600 to-cyan-600",
      impact: "Nationwide Logistics Platform Backend",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 relative">
            EXPERIENCE
            <motion.div
              className="absolute -bottom-2 sm:-bottom-4 left-1/2 transform -translate-x-1/2 h-1 sm:h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: "150px" } : {}}
              transition={{ delay: 0.5, duration: 1.5 }}
            />
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Building enterprise solutions that scale globally and drive real
            business impact
          </p>
        </motion.div>

        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500 hover:border-purple-500/40">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-5 rounded-2xl sm:rounded-3xl`}
                />

                <div className="relative z-10">
                  {/* Header - Mobile Optimized */}
                  <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={100}
                        height={100}
                        className="rounded-md object-contain sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px]"
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                          {exp.company}
                        </h3>
                        <p className="text-lg sm:text-xl text-purple-300 font-semibold mb-1">
                          {exp.role}
                        </p>
                        <p className="text-gray-400 text-sm sm:text-base">
                          {exp.period}
                        </p>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto">
                      <div
                        className={`px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r ${exp.color} rounded-xl sm:rounded-2xl text-white font-bold text-center text-sm sm:text-base`}
                      >
                        {exp.impact}
                      </div>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements Grid - Mobile Responsive */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {exp.achievements.map((achievement, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 p-3 sm:p-4 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 hover:border-amber-500/30 transition-colors"
                        whileHover={{ scale: 1.01 }}
                      >
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                          {achievement}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech Stack - Mobile Friendly */}
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-500/20 text-purple-300 rounded-lg sm:rounded-xl border border-purple-500/30 font-semibold backdrop-blur-sm text-sm sm:text-base"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

// Custom Hook for scroll animation
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
};

const SkillsSection = () => {
  const { ref, isInView } = useScrollAnimation();

  const skillCategories = [
    {
      title: "Frontend Architecture",
      icon: "🎨",
      description: "Building scalable, performant user experiences",
      skills: [
        { name: "React Ecosystem", level: 98, icon: "⚛️" },
        { name: "Next.js/SSR", level: 95, icon: "▲" },
        { name: "TypeScript", level: 96, icon: "📘" },
        { name: "Performance Optimization", level: 94, icon: "⚡" },
      ],
      gradient: "from-cyan-400 to-purple-600",
    },
    {
      title: "Backend Systems",
      icon: "🏗️",
      description: "Designing robust, scalable server architectures",
      skills: [
        { name: "Node.js/Go", level: 97, icon: "🚀" },
        { name: "System Design", level: 93, icon: "📊" },
        { name: "Database Design", level: 91, icon: "🗄️" },
        { name: "API Architecture", level: 95, icon: "🔌" },
      ],
      gradient: "from-purple-400 to-pink-600",
    },
    {
      title: "Cloud & DevOps",
      icon: "☁️",
      description: "Infrastructure that scales globally",
      skills: [
        { name: "AWS/Azure", level: 92, icon: "☁️" },
        { name: "Docker/K8s", level: 88, icon: "🐳" },
        { name: "CI/CD Pipelines", level: 90, icon: "🔄" },
        { name: "Monitoring/Observability", level: 87, icon: "📈" },
      ],
      gradient: "from-green-400 to-blue-600",
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6">
            EXPERTISE
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Mastering the technologies that power the world&apos;s most
            successful companies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-[1.02] sm:hover:scale-105 transition-all duration-500 hover:border-purple-500/40 h-full">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 rounded-2xl sm:rounded-3xl group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
                    <div className="text-3xl sm:text-4xl lg:text-5xl">
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-400 text-sm sm:text-base">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {category.skills.map((skill, i) => (
                      <div key={skill.name} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg">
                              {skill.icon}
                            </span>
                            <span className="text-white font-semibold text-sm sm:text-base">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-purple-300 font-bold text-sm sm:text-base">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                            initial={{ width: 0 }}
                            animate={
                              isInView ? { width: `${skill.level}%` } : {}
                            }
                            transition={{
                              delay: index * 0.2 + i * 0.1 + 0.5,
                              duration: 1.5,
                            }}
                          />
                        </div>
                      </div>
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

export default SkillsSection;

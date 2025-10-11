"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
  gradient: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    description: "Modern web technologies and frameworks",
    skills: [
      { name: "React & Next.js", level: 98, category: "Framework" },
      { name: "TypeScript", level: 96, category: "Language" },
      { name: "Tailwind CSS", level: 97, category: "Styling" },
      { name: "State Management", level: 94, category: "Architecture" },
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend Engineering",
    description: "Server-side architecture and APIs",
    skills: [
      { name: "Node.js", level: 97, category: "Runtime" },
      { name: "Go", level: 93, category: "Language" },
      { name: "PostgreSQL", level: 91, category: "Database" },
      { name: "Redis", level: 89, category: "Cache" },
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Cloud & DevOps",
    description: "Infrastructure and deployment",
    skills: [
      { name: "AWS", level: 92, category: "Platform" },
      { name: "Docker", level: 90, category: "Containerization" },
      { name: "Kubernetes", level: 88, category: "Orchestration" },
      { name: "CI/CD Pipelines", level: 90, category: "Automation" },
    ],
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "System Design",
    description: "Architecture and scalability",
    skills: [
      { name: "Microservices", level: 93, category: "Architecture" },
      { name: "API Design", level: 95, category: "Interface" },
      { name: "Performance Optimization", level: 91, category: "Efficiency" },
      { name: "Security Best Practices", level: 89, category: "Security" },
    ],
    gradient: "from-orange-500 to-red-500",
  },
];

const SkillCard: React.FC<{ 
  category: SkillCategory; 
  index: number; 
  isInView: boolean;
}> = ({ category, index, isInView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className="group relative h-full"
    >
      <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-500 h-full">
        {/* Subtle gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

        <div className="relative p-8">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-slate-800">
            <h3 className="text-2xl font-bold text-white mb-2">
              {category.title}
            </h3>
            <p className="text-slate-400 text-sm">
              {category.description}
            </p>
          </div>

          {/* Skills List */}
          <div className="space-y-4">
            {category.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + i * 0.08 + 0.3 }}
                className="group/skill relative"
              >
                <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors duration-300 border border-transparent hover:border-slate-700">
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">
                      {skill.name}
                    </div>
                    <div className="text-slate-500 text-xs uppercase tracking-wider">
                      {skill.category}
                    </div>
                  </div>

                  {/* Proficiency Indicator - Visual only, no numbers */}
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <motion.div
                        key={dot}
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                          dot <= Math.round(skill.level / 20)
                            ? `bg-gradient-to-r ${category.gradient}`
                            : 'bg-slate-700'
                        }`}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ 
                          delay: index * 0.1 + i * 0.08 + 0.3 + dot * 0.05,
                          type: "spring",
                          stiffness: 200
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Progress bar - subtle and clean */}
                <div className="mt-2 h-1 bg-slate-800/50 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{
                      delay: index * 0.1 + i * 0.08 + 0.5,
                      duration: 1,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className={`h-0.5 bg-gradient-to-r ${category.gradient} opacity-50`} />
      </div>
    </motion.div>
  );
};

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Calculate total skills
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  const avgProficiency = Math.round(
    skillCategories.reduce((acc, cat) => 
      acc + cat.skills.reduce((sum, skill) => sum + skill.level, 0) / cat.skills.length
    , 0) / skillCategories.length
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 overflow-hidden bg-black"
    >
      {/* Subtle background gradient */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-block mb-4 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-xl border border-slate-700"
          >
            <span className="text-slate-400 font-medium text-sm tracking-wider uppercase">
              Technical Expertise
            </span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Skills & Technologies
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Comprehensive expertise across modern development stack
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-12 mt-12"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {totalSkills}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">
                Core Technologies
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {skillCategories.length}
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">
                Specializations
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                {avgProficiency}%
              </div>
              <div className="text-sm text-slate-400 uppercase tracking-wider">
                Avg Proficiency
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <p className="text-slate-500 text-sm">
            Continuously learning and adapting to emerging technologies
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
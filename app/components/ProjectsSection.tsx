"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "framer-motion";

// Types
type ProjectMetrics = {
  impact?: string;
  scale?: string;
  performance?: string;
  revenue?: string;
  growth?: string;
  users?: string;
  efficiency?: string;
  accuracy?: string;
  [key: string]: string | undefined;
};

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  metrics: ProjectMetrics;
  featured: boolean;
  size: "small" | "medium" | "large";
  achievement: string;
  businessValue: string;
}

interface MouseEvent {
  clientX: number;
  clientY: number;
}

// Custom Hook for scroll animation
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
};

// Magnetic Button Component
type MagneticButtonProps = React.ComponentProps<typeof motion.button> & {
  children?: React.ReactNode;
  className?: string;
};

const MagneticButton = ({
  children,
  className = "",
  ...props
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * 0.15);
      y.set((e.clientY - centerY) * 0.15);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const ProjectsSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "EcoTracker 1",
      category: "Environmental Web App",
      description:
        "Full-stack web application helping users track their carbon footprint and discover eco-friendly alternatives.",
      longDescription:
        "Developed a comprehensive environmental tracking platform where users can log daily activities, track carbon emissions, and get personalized recommendations. Features include data visualization, social sharing, gamification elements, and integration with environmental APIs.",
      image: "🌱",
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "MongoDB",
        "Chart.js",
        "Tailwind CSS",
        "Vercel",
      ],
      metrics: {
        users: "500+ Users",
        engagement: "80% Return Rate",
        impact: "CO2 Tracking",
        growth: "50% Monthly",
      },
      featured: true,
      size: "medium",
      achievement: "Featured on Product Hunt",
      businessValue: "Promoted environmental awareness among users",
    },
    {
      id: 2,
      title: "EcoTracker",
      category: "Environmental Web App",
      description:
        "Full-stack web application helping users track their carbon footprint and discover eco-friendly alternatives.",
      longDescription:
        "Developed a comprehensive environmental tracking platform where users can log daily activities, track carbon emissions, and get personalized recommendations. Features include data visualization, social sharing, gamification elements, and integration with environmental APIs.",
      image: "🌱",
      technologies: [
        "Next.js",
        "React",
        "Node.js",
        "MongoDB",
        "Chart.js",
        "Tailwind CSS",
        "Vercel",
      ],
      metrics: {
        users: "500+ Users",
        engagement: "80% Return Rate",
        impact: "CO2 Tracking",
        growth: "50% Monthly",
      },
      featured: true,
      size: "small",
      achievement: "Featured on Product Hunt",
      businessValue: "Promoted environmental awareness among users",
    },
    {
      id: 3,
      title: "Personal Portfolio v2",
      category: "Creative Showcase",
      description:
        "Interactive portfolio website with advanced animations, 3D elements, and modern design patterns.",
      longDescription:
        "Designed and developed a cutting-edge portfolio website showcasing my projects and skills. Features smooth animations, interactive elements, responsive design, and optimized performance. Built with modern technologies and deployed with CI/CD pipeline.",
      image: "💼",
      technologies: [
        "Next.js",
        "Three.js",
        "Framer Motion",
        "TypeScript",
        "Tailwind CSS",
        "Vercel",
      ],
      metrics: {
        visitors: "2K+ Visitors",
        performance: "95+ Lighthouse",
        animations: "10+ Custom",
        responsive: "100% Mobile",
      },
      featured: false,
      size: "small",
      achievement: "Impressed Potential Employers",
      businessValue: "Showcases technical skills effectively",
    },
    {
      id: 4,
      title: "TaskFlow Manager",
      category: "Productivity SaaS",
      description:
        "Team collaboration and project management tool with real-time updates, file sharing, and progress tracking.",
      longDescription:
        "Created a modern project management solution with features like task assignment, real-time collaboration, file uploads, progress tracking, and team analytics. Implemented responsive design, real-time notifications, and integrated calendar functionality.",
      image: "📋",
      technologies: [
        "React",
        "Express.js",
        "Socket.io",
        "PostgreSQL",
        "AWS S3",
        "Material-UI",
      ],
      metrics: {
        teams: "50+ Teams",
        productivity: "30% Increase",
        features: "25+ Features",
        satisfaction: "4.8/5 Rating",
      },
      featured: true,
      size: "medium",
      achievement: "Used by Local Startups",
      businessValue: "Increased team productivity and collaboration",
    },
  ];

  const getGridClass = (project: Project, isMobile: boolean) => {
    if (isMobile) return "col-span-1"; // Single column on mobile

    switch (project.size) {
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-2";
      default:
        return "md:col-span-1";
    }
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      ref={ref}
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 relative"
    >
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6">
            PROJECTS
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4">
            Building high-impact digital experiences with clean architecture,
            scalable systems, and a passion for elegant UI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative cursor-pointer ${getGridClass(
                project,
                isMobile
              )}`}
              onClick={() => setSelectedProject(project)}
            >
              <div className="relative h-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl overflow-hidden hover:scale-[1.01] sm:hover:scale-[1.02] transition-all duration-500 hover:border-purple-500/40 min-h-[400px] sm:min-h-[500px]">
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
                    <div className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-bold text-white shadow-lg">
                      🏆 FEATURED
                    </div>
                  </div>
                )}

                {/* Project Visual */}
                <div className="relative h-32 sm:h-48 md:h-64 flex items-center justify-center overflow-hidden">
                  <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                    {project.image}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                </div>

                {/* Project Content */}
                <div className="relative p-4 sm:p-6 md:p-8 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="text-purple-400 font-semibold text-xs sm:text-sm tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 mb-4 leading-relaxed flex-1 text-sm sm:text-base line-clamp-3">
                    {project.description}
                  </p>

                  {/* Achievement Badge */}
                  <div className="mb-4 p-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30">
                    <div className="text-purple-300 font-semibold text-xs sm:text-sm">
                      {project.achievement}
                    </div>
                    <div className="text-gray-400 text-xs mt-1 line-clamp-2">
                      {project.businessValue}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {Object.entries(project.metrics)
                      .slice(0, 4)
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="text-center p-2 bg-white/5 rounded-lg"
                        >
                          <div className="text-sm sm:text-base lg:text-lg font-bold text-white truncate">
                            {value}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            {key}
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.technologies
                      .slice(0, isMobile ? 3 : 4)
                      .map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-lg border border-purple-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    {project.technologies.length > (isMobile ? 3 : 4) && (
                      <span className="px-2 sm:px-3 py-1 bg-gray-500/20 text-gray-400 text-xs rounded-lg">
                        +{project.technologies.length - (isMobile ? 3 : 4)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Project Modal - Mobile Responsive */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 max-w-6xl w-full max-h-[95vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6 sm:mb-8">
                <div className="flex-1 pr-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-purple-400 font-semibold text-base sm:text-lg">
                    {selectedProject.category}
                  </p>
                  <div className="mt-4 p-3 sm:p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl border border-purple-500/30">
                    <div className="text-purple-300 font-semibold text-sm sm:text-base">
                      {selectedProject.achievement}
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm mt-1">
                      {selectedProject.businessValue}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white transition-colors p-2 sm:p-3 hover:bg-white/10 rounded-full flex-shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Project Visual */}
              <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
                <div className="text-6xl sm:text-8xl md:text-9xl lg:text-[200px] opacity-30">
                  {selectedProject.image}
                </div>
              </div>

              <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              {/* Enhanced Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                {Object.entries(selectedProject.metrics).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-white/10"
                  >
                    <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                      {value}
                    </div>
                    <div className="text-gray-400 capitalize font-semibold text-xs sm:text-sm">
                      {key}
                    </div>
                  </div>
                ))}
              </div>

              {/* Full Tech Stack */}
              <div className="mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-purple-500/20 text-purple-300 rounded-lg sm:rounded-xl border border-purple-500/30 font-semibold text-sm sm:text-base"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <MagneticButton className="flex-1 border-2 border-emerald-500 text-emerald-300 py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-emerald-500/10 relative overflow-hidden">
                  <span className="live-indicator mr-2">
                    <span className="dot"></span>
                    <span className="pulse"></span>
                    <span className="pulse"></span>
                  </span>
                  Live Website
                  <style jsx>{`
                    .live-indicator {
                      position: relative;
                      display: inline-flex;
                      align-items: center;
                      justify-content: center;
                      width: 14px;
                      height: 14px;
                    }

                    .dot {
                      position: absolute;
                      width: 8px;
                      height: 8px;
                      background-color: red;
                      border-radius: 50%;
                      z-index: 2;
                    }

                    .pulse {
                      position: absolute;
                      width: 14px;
                      height: 14px;
                      background-color: red;
                      border-radius: 50%;
                      opacity: 0.6;
                      animation: pulse-ring 1.5s ease-out infinite;
                      z-index: 1;
                    }

                    .pulse:nth-child(3) {
                      animation-delay: 0.75s;
                    }

                    @keyframes pulse-ring {
                      0% {
                        transform: scale(1);
                        opacity: 0.6;
                      }
                      70% {
                        transform: scale(2.2);
                        opacity: 0;
                      }
                      100% {
                        opacity: 0;
                      }
                    }
                  `}</style>
                </MagneticButton>

                <MagneticButton className="flex-1 border-2 border-blue-500 text-blue-300 py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-blue-500/10">
                  💻 Codebase
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;

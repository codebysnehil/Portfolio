"use client";
import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useInView, useScroll, useTransform } from "framer-motion";

interface ProjectMetrics {
  [key: string]: string;
}

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
  year: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  link?: string;
  github?: string;
}

interface MouseEvent {
  clientX: number;
  clientY: number;
}

const MagneticButton: React.FC<React.ComponentProps<typeof motion.button>> = ({
  children,
  className = "",
  ...props
}) => {
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const projects: Project[] = [
    {
      id: 1,
      title: "Enterprise Video Platform",
      category: "Full-Stack Development",
      description: "High-performance video streaming platform with real-time analytics and CDN integration.",
      longDescription: "Architected and developed a comprehensive video management system handling thousands of concurrent streams with sub-100ms latency.",
      image: "/lens.png",
      technologies: ["Go", "TypeScript", "Next.js", "PostgreSQL", "AWS", "Docker"],
      metrics: {
        "Concurrent Users": "10K+",
        "Latency": "<100ms",
        "Uptime": "99.9%",
        "Video Processing": "Real-time"
      },
      featured: true,
      year: "2025",
      role: "Full-Stack & Backend Developer",
      challenge: "Building a scalable streaming infrastructure that could handle massive concurrent load while maintaining low latency.",
      solution: "Implemented microservices architecture with Go for backend services, optimized CDN delivery, and built real-time monitoring systems.",
      results: [
        "Achieved sub-100ms latency for video streaming",
        "Supported 10,000+ concurrent users",
        "Maintained 99.9% uptime SLA",
        "Reduced infrastructure costs by 30%"
      ],
    },
    {
      id: 2,
      title: "Logistics Management System",
      category: "Backend Engineering",
      description: "Nationwide digital warehousing and transportation network serving 100+ facilities.",
      longDescription: "Designed and optimized backend infrastructure for India's largest digital warehousing platform.",
      image: "/sa.png",
      technologies: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "React"],
      metrics: {
        "Warehouses": "100+",
        "Daily Transactions": "1M+",
        "Query Speed": "+60%",
        "Coverage": "Pan-India"
      },
      featured: true,
      year: "2024",
      role: "Backend Developer",
      challenge: "Scaling backend systems to handle millions of daily transactions while maintaining data integrity across distributed warehouses.",
      solution: "Refactored database schemas, implemented caching strategies, and built microservices for critical operations.",
      results: [
        "Improved query performance by 60%",
        "Processed 1M+ daily transactions",
        "Reduced database load by 40%",
        "Zero data loss incidents"
      ],
    },
    {
      id: 3,
      title: "AI-Powered Analytics Dashboard",
      category: "Machine Learning",
      description: "Real-time data visualization platform with predictive analytics and automated insights.",
      longDescription: "Built an intelligent analytics system that processes millions of data points to generate actionable business insights.",
      image: "/project3.png",
      technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB", "D3.js"],
      metrics: {
        "Data Points": "10M+",
        "Accuracy": "94%",
        "Processing": "Real-time",
        "Users": "500+"
      },
      featured: false,
      year: "2024",
      role: "Full-Stack Developer",
      challenge: "Processing and visualizing massive datasets in real-time while providing accurate predictive insights.",
      solution: "Developed ML models for prediction, implemented efficient data pipelines, and created interactive visualizations.",
      results: [
        "94% prediction accuracy achieved",
        "Real-time data processing implemented",
        "Reduced analysis time by 70%",
        "Automated 80% of reporting tasks"
      ],
    },
    {
      id: 4,
      title: "E-Commerce Platform",
      category: "Full-Stack Development",
      description: "Modern e-commerce solution with advanced search, real-time inventory, and payment integration.",
      longDescription: "Developed a complete e-commerce platform with sophisticated product management and seamless checkout experience.",
      image: "/project4.png",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "Redis", "AWS"],
      metrics: {
        "Products": "50K+",
        "Orders": "10K+",
        "Conversion": "3.5%",
        "Load Time": "<2s"
      },
      featured: false,
      year: "2023",
      role: "Full-Stack Developer",
      challenge: "Creating a high-performance platform that could handle thousands of products while maintaining fast search and checkout.",
      solution: "Implemented advanced caching, optimized database queries, and integrated modern payment gateways.",
      results: [
        "3.5% conversion rate achieved",
        "Sub-2 second page load times",
        "99.99% payment success rate",
        "Scaled to 50K+ products"
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 overflow-hidden bg-black"
    >
      {/* Background Elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
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
              Selected Work
            </span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Featured Projects
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
            Delivering production-grade solutions that drive business impact
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            //   onMouseEnter={() => setHoveredId(project.id)}
            //   onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedProject(project)}
              className="group relative cursor-pointer"
            >
              <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all duration-500 h-full">
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xs font-bold text-white">
                      Featured
                    </div>
                  </div>
                )}

                {/* Image Section */}
                <div className="relative h-64 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                      {project.image.startsWith('/') ? '🚀' : project.image}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-slate-500 text-sm">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {Object.entries(project.metrics).slice(0, 4).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-slate-800/50 rounded-lg p-3 text-center"
                      >
                        <div className="text-lg font-bold text-white mb-1">
                          {value}
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-800/50 text-slate-300 text-xs rounded-lg border border-slate-700 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-3 py-1 bg-slate-800/50 text-slate-400 text-xs rounded-lg">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <button className="w-full py-3 bg-slate-800/50 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors duration-300 border border-slate-700 hover:border-slate-600">
                    View Details
                  </button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 transition-all duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl max-w-5xl w-full my-8"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative p-8 border-b border-slate-800">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="flex items-start gap-4 mb-4">
                  {selectedProject.featured && (
                    <div className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xs font-bold text-white">
                      Featured Project
                    </div>
                  )}
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-400">
                    {selectedProject.year}
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-white mb-3">
                  {selectedProject.title}
                </h2>
                
                <div className="flex items-center gap-4 text-slate-400">
                  <span className="text-sm">{selectedProject.category}</span>
                  <span className="text-slate-700">•</span>
                  <span className="text-sm">{selectedProject.role}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Image */}
                <div className="relative h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-9xl opacity-30">
                      {selectedProject.image.startsWith('/') ? '🚀' : selectedProject.image}
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Overview</h3>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Metrics Grid */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Impact Metrics</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(selectedProject.metrics).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700"
                      >
                        <div className="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                          {value}
                        </div>
                        <div className="text-sm text-slate-400 uppercase tracking-wider">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenge & Solution */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-white mb-3">Challenge</h4>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedProject.challenge}
                    </p>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                    <h4 className="text-lg font-bold text-white mb-3">Solution</h4>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Key Results</h3>
                  <div className="grid lg:grid-cols-2 gap-3">
                    {selectedProject.results.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-xl border border-slate-700"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0" />
                        <p className="text-slate-300">{result}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Technology Stack</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-xl border border-slate-700 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <MagneticButton className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300">
                    View Live Project
                  </MagneticButton>
                  <MagneticButton className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-4 px-6 rounded-xl font-bold border border-slate-700 transition-all duration-300">
                    View Source Code
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;
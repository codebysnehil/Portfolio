"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import SilkBackground from "../SilkBackground";

interface MouseEvent {
  clientX: number;
  clientY: number;
}

type MagneticButtonProps = React.ComponentProps<typeof motion.button> & {
  children?: React.ReactNode;
  className?: string;
};

// Enhanced Magnetic Button with premium effects
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

const techStack = [
  {
    name: "System Architecture",
    level: "Designed a scalable microservices diagram for a SaaS app",
    icon: "🏗️",
  },
  {
    name: "AI/ML Engineering",
    level: "Trained a sentiment analysis model on 10k tweets",
    icon: "🧠",
  },
  {
    name: "Blockchain/Web3",
    level: "Built an NFT minting dApp on Ethereum testnet",
    icon: "⛓️",
  },
  {
    name: "Cloud Native",
    level: "Deployed app on Kubernetes + CI/CD pipeline",
    icon: "☁️",
  },
  {
    name: "DevOps/SRE",
    level: "Automated infra monitoring with Grafana + Prometheus",
    icon: "⚡",
  },
];

const achievements = [
  "2+ Years Experience",
  "10+ Projects Delivered",
  "99%+ Client Satisfaction",
  "Modern Tech Stack Expert",
];

const TypewriterTech = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const current = techStack[index];
    const fullText = `${current.name} • ${current.level}`;

    if (!deleting && displayed.length < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length + 1));
      }, 100);
    } else if (!deleting && displayed.length === fullText.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(fullText.slice(0, displayed.length - 1));
      }, 50);
    } else if (deleting && displayed.length === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % techStack.length);
      }, 300);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center">
      <span className="text-2xl sm:text-3xl md:text-4xl">
        {techStack[index].icon}
      </span>
      <span className="inline-block font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent text-center min-h-[1.5rem] sm:min-h-[2rem] md:min-h-[3rem]">
        {displayed}
        <span className="animate-pulse text-purple-400">|</span>
      </span>
    </div>
  );
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Silk Background Layer */}
      <div className="absolute inset-0 w-full h-full">
        <SilkBackground
          speed={5}
          scale={1}
          color="#7ec8cf"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 via-purple-950/40 to-slate-950/60 pointer-events-none" />

      {/* Interactive mouse effect - hidden on mobile */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 80%)`,
        }}
        transition={{ type: "spring", damping: 30 }}
      />

      {/* Content layer */}
      <div className="text-center z-10 max-w-6xl mx-auto relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight">
            SNEHIL
            <br />
            SHARMA
          </h1>

          <div className="mb-6 sm:mb-8">
            <TypewriterTech />
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-3 sm:p-4"
              >
                <div className="text-sm sm:text-base lg:text-lg font-bold text-white text-center">
                  {achievement}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            Transforming Complex Problems into Scalable Solutions • Building the
            Future of Technology
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-xl mx-auto px-4"
        >
          <MagneticButton className="group relative overflow-hidden bg-gradient-to-r from-sky-600 via-gray-500 to-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-white font-bold text-base sm:text-lg border border-white-400/40 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 w-full sm:w-auto">
            <span className="relative z-10 flex items-center justify-center gap-2">
              🚀 View Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

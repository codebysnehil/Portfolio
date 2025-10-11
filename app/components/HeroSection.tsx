"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MouseEvent {
  clientX: number;
  clientY: number;
}

interface MagneticButtonProps extends React.ComponentProps<typeof motion.button> {
  children?: React.ReactNode;
  className?: string;
}

interface FloatingOrbProps {
  delay?: number;
  duration?: number;
  size?: number;
  color: string;
}

interface TechStack {
  name: string;
  detail: string;
  icon: string;
  color: string;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = "", 
  ...props 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * 0.2,
      y: (e.clientY - centerY) * 0.2,
    });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const FloatingOrb: React.FC<FloatingOrbProps> = ({ 
  delay = 0, 
  duration = 20, 
  size = 400, 
  color 
}) => (
  <motion.div
    className="absolute rounded-full blur-3xl opacity-20"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    }}
    animate={{
      x: [0, 100, -50, 0],
      y: [0, -100, 50, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

const GridPattern: React.FC = () => (
  <div className="absolute inset-0 opacity-20">
    <div className="absolute inset-0" style={{
      backgroundImage: `
        linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
      `,
      backgroundSize: '80px 80px',
    }} />
  </div>
);

const techStack: TechStack[] = [
  { name: "System Architecture", detail: "Microservices • Cloud Native • Distributed Systems", icon: "🏗️", color: "from-cyan-400 to-blue-500" },
  { name: "AI/ML Engineering", detail: "Neural Networks • LLMs • Computer Vision", icon: "🧠", color: "from-purple-400 to-pink-500" },
  { name: "Blockchain/Web3", detail: "Smart Contracts • DeFi • dApps", icon: "⛓️", color: "from-orange-400 to-red-500" },
  { name: "Full Stack Dev", detail: "React • Node.js • Next.js • TypeScript", icon: "💻", color: "from-green-400 to-emerald-500" },
  { name: "DevOps/SRE", detail: "Kubernetes • Docker • CI/CD • Monitoring", icon: "⚡", color: "from-yellow-400 to-orange-500" },
];

const stats: Stat[] = [
  { value: "2+", label: "Years Experience", icon: "⏱️" },
  { value: "15+", label: "Projects Shipped", icon: "🚀" },
  { value: "99%", label: "Client Satisfaction", icon: "⭐" },
  { value: "24/7", label: "Support Available", icon: "💬" },
];

const HeroSection: React.FC = () => {
  const [currentTech, setCurrentTech] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % techStack.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />
        <GridPattern />
        
        {/* Floating Orbs */}
        <FloatingOrb delay={0} color="#8b5cf6" size={600} duration={25} />
        <FloatingOrb delay={5} color="#3b82f6" size={500} duration={20} />
        <FloatingOrb delay={10} color="#06b6d4" size={400} duration={30} />
        
        {/* Mouse Gradient */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none hidden lg:block"
          style={{
            left: mousePos.x - 300,
            top: mousePos.y - 300,
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>

      {/* Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20"
      >
        {/* Name with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <motion.div
            className="inline-block mb-6 px-6 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-semibold text-sm tracking-wider">
              ✨ AVAILABLE FOR FREELANCE
            </span>
          </motion.div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tight">
            <span className="inline-block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              SNEHIL
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              SHARMA
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Architecting tomorrow&apos;s digital experiences with precision engineering and creative innovation
          </motion.p>
        </motion.div>

        {/* Tech Stack Carousel with Enhanced Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16 w-full max-w-4xl"
        >
          <div className="relative h-48 flex items-center justify-center">
            {techStack.map((item, index) => (
              <motion.div
                key={item.name}
                initial={false}
                animate={{
                  opacity: index === currentTech ? 1 : 0,
                  y: index === currentTech ? 0 : 20,
                  scale: index === currentTech ? 1 : 0.8,
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="text-6xl md:text-8xl mb-6 filter drop-shadow-2xl"
                >
                  {item.icon}
                </motion.div>
                <h3 className={`text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  {item.name}
                </h3>
                <p className="text-gray-400 text-lg md:text-xl">{item.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {techStack.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentTech(index)}
                className="group relative"
              >
                <div className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentTech ? 'bg-gradient-to-r from-purple-500 to-cyan-500' : 'bg-white/20'
                }`} />
                {index === currentTech && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full bg-white/20 blur-sm"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid with Modern Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 w-full max-w-5xl"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <MagneticButton className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80 transition-all duration-300">
            <span className="relative z-10 flex items-center gap-3">
              <span>View Projects</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-5 h-5"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </motion.svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
          </MagneticButton>

          <MagneticButton className="group relative overflow-hidden bg-white/5 backdrop-blur-xl px-8 py-4 rounded-2xl text-white font-bold text-lg border border-white/20 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
            <span className="relative z-10 flex items-center gap-3">
              <span>Get In Touch</span>
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                👋
              </motion.span>
            </span>
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
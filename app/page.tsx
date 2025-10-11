"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialSection";
import ContactSection from "./components/ContactSection";


// Magnetic Button Component for Footer
interface MouseEvent {
  clientX: number;
  clientY: number;
}

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

// Premium Animated Background
// const PremiumBackground = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const updateMousePosition = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", updateMousePosition);
//     return () => window.removeEventListener("mousemove", updateMousePosition);
//   }, []);

//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden">
//       {/* Dynamic gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />

//       {/* Mouse-following premium gradient - hidden on mobile for performance */}
//       <motion.div
//         className="absolute inset-0 opacity-30 hidden md:block"
//         style={{
//           background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 80%)`,
//         }}
//       />

//       {/* Floating orbs - reduced on mobile */}
//       {[...Array(window.innerWidth < 768 ? 4 : 8)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute rounded-full blur-xl opacity-20"
//           style={{
//             width: `${
//               Math.random() * (window.innerWidth < 768 ? 150 : 300) + 100
//             }px`,
//             height: `${
//               Math.random() * (window.innerWidth < 768 ? 150 : 300) + 100
//             }px`,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             background: `linear-gradient(45deg, ${
//               ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"][
//                 Math.floor(Math.random() * 5)
//               ]
//             }, transparent)`,
//           }}
//           animate={{
//             x: [0, Math.random() * 200 - 100, 0],
//             y: [0, Math.random() * 200 - 100, 0],
//             scale: [1, Math.random() * 0.5 + 0.5, 1],
//           }}
//           transition={{
//             duration: Math.random() * 10 + 10,
//             repeat: Infinity,
//             delay: Math.random() * 5,
//           }}
//         />
//       ))}

//       {/* Premium grid overlay */}
//       <div
//         className="absolute inset-0 opacity-5"
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
//           `,
//           backgroundSize: "60px 60px",
//         }}
//       />
//     </div>
//   );
// };

const PremiumBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [orbs, setOrbs] = useState<
    {
      width: number;
      height: number;
      left: string;
      top: string;
      bg: string;
      x: number[];
      y: number[];
      scale: number[];
      duration: number;
      delay: number;
    }[]
  >([]);

  useEffect(() => {
    // Track mouse position
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);

    // Generate orbs only in browser
    const orbCount = window.innerWidth < 768 ? 4 : 8;
    const colors = ["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B", "#EF4444"];
    const generatedOrbs = Array.from({ length: orbCount }, () => {
      const size = Math.random() * (window.innerWidth < 768 ? 150 : 300) + 100;
      return {
        width: size,
        height: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        bg: `linear-gradient(45deg, ${
          colors[Math.floor(Math.random() * colors.length)]
        }, transparent)`,
        x: [0, Math.random() * 200 - 100, 0],
        y: [0, Math.random() * 200 - 100, 0],
        scale: [1, Math.random() * 0.5 + 0.5, 1],
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
      };
    });
    setOrbs(generatedOrbs);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />

      {/* Mouse-follow gradient */}
      <motion.div
        className="absolute inset-0 opacity-30 hidden md:block"
        style={{
          background: `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.1) 25%, rgba(16, 185, 129, 0.05) 50%, transparent 80%)`,
        }}
      />

      {/* Floating orbs */}
      {orbs.map((orb: any, i: number) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-xl opacity-20"
          style={{
            width: `${orb.width}px`,
            height: `${orb.height}px`,
            left: orb.left,
            top: orb.top,
            background: orb.bg,
          }}
          animate={{ x: orb.x, y: orb.y, scale: orb.scale }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
          }}
        />
      ))}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
};

// Revolutionary Hero Section - Enhanced for Mobile
// Main Portfolio Component





// Main Portfolio Component
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden relative">
      <HeroSection />
      <div className="relative bg-slate-950">
        <PremiumBackground />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>

      {/* Premium Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let&apos;s transform your ideas into industry-leading solutions
              that drive real business results.
            </p>
            <MagneticButton className="bg-gradient-to-r from-purple-600 to-blue-600 px-12 py-4 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-purple-500/25">
              🚀 Let&apos;s Build Something Amazing
            </MagneticButton>
            <div className="mt-12 pt-8 border-t border-white/10 text-gray-500 text-sm">
              © 2025 Snehil Sharma • Software Engineer • Building the Future
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

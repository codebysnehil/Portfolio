"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

const HeroSection: React.FC = () => {
//   const [time, setTime] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentWord, setCurrentWord] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const words = ["CREATE", "INNOVATE", "SHIP", "SCALE"];
  const wordColors = [
    { from: "#06b6d4", via: "#3b82f6", to: "#8b5cf6" },
    { from: "#8b5cf6", via: "#d946ef", to: "#ec4899" },
    { from: "#10b981", via: "#06b6d4", to: "#3b82f6" },
    { from: "#f59e0b", via: "#ef4444", to: "#dc2626" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  // Advanced Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, `rgba(139, 92, 246, ${particle.opacity})`);
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = (1 - distance / 120) * 0.15;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

//   useAnimationFrame((t) => {
//     setTime(t / 1000);
//   });

  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x * 40);
      mouseY.set(y * 40);
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-50"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Dynamic Gradient Mesh */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(139, 92, 246, 0.25) 0%, transparent 50%),
              radial-gradient(circle at ${mousePos.x * 0.8}px ${mousePos.y * 0.8}px, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              radial-gradient(circle at ${mousePos.x * 1.2}px ${mousePos.y * 1.2}px, rgba(6, 182, 212, 0.15) 0%, transparent 50%)
            `,
            opacity: 0.4,
          }}
        />
      </div>

      {/* Advanced Grid System */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `perspective(1200px) rotateX(60deg) scale(2.5) translateZ(0)`,
            transformOrigin: 'center 80%'
          }}
        />
      </motion.div>

      {/* Floating 3D Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 400 + i * 250,
              height: 400 + i * 250,
              border: `1px solid rgba(139, 92, 246, ${0.05 - i * 0.01})`,
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.03, 1],
            }}
            transition={{
              rotate: { duration: 25 + i * 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </div>

      {/* Ambient Light Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[150px]"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.3, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Hero Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <motion.div 
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
            <div className="relative flex items-center gap-4 px-8 py-4 rounded-full bg-slate-950/60 backdrop-blur-2xl border border-white/10 group-hover:border-white/20 transition-all shadow-2xl">
              <motion.div
                className="relative w-3 h-3 rounded-full bg-emerald-400"
                animate={{ 
                  boxShadow: [
                    "0 0 10px 2px rgba(52, 211, 153, 0.4)",
                    "0 0 20px 4px rgba(52, 211, 153, 0.6)",
                    "0 0 10px 2px rgba(52, 211, 153, 0.4)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-300"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <span className="text-sm font-bold text-white tracking-wide">AVAILABLE FOR PROJECTS</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Name */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow Effect Behind Text */}
            <div className="absolute inset-0 blur-3xl opacity-30">
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[11rem] font-black tracking-tighter leading-none bg-gradient-to-b from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                SNEHIL
              </div>
            </div>

            <motion.h1 
              className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[11rem] font-black tracking-tighter leading-none mb-2 sm:mb-3 md:mb-4"
              style={{ x: useTransform(smoothMouseX, (x) => x * 0.3) }}
            >
              <span className="inline-block bg-gradient-to-b from-white via-white/95 to-white/80 bg-clip-text text-transparent">
                SNEHIL
              </span>
            </motion.h1>
            
            <motion.h2 
              className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] 2xl:text-[9rem] font-black tracking-tighter leading-none"
              style={{ x: useTransform(smoothMouseX, (x) => -x * 0.3) }}
            >
              <span className="inline-block relative">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-400 blur-2xl opacity-60" />
                <span className="relative bg-gradient-to-r from-purple-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  SHARMA
                </span>
              </span>
            </motion.h2>
          </motion.div>

          {/* Dynamic Word Rotation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative h-24 flex items-center justify-center mt-12"
          >
            {words.map((word, i) => (
              <motion.div
                key={word}
                initial={false}
                animate={{
                  opacity: i === currentWord ? 1 : 0,
                  y: i === currentWord ? 0 : 30,
                  scale: i === currentWord ? 1 : 0.8,
                  filter: i === currentWord ? "blur(0px)" : "blur(10px)",
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
              >
                <div className="relative">
                  <div 
                    className="absolute inset-0 blur-2xl opacity-50"
                    style={{
                      background: `linear-gradient(90deg, ${wordColors[i].from}, ${wordColors[i].via}, ${wordColors[i].to})`
                    }}
                  />
                  <div 
                    className="relative text-5xl sm:text-6xl md:text-7xl font-black bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, ${wordColors[i].from}, ${wordColors[i].via}, ${wordColors[i].to})`
                    }}
                  >
                    {word}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-lg md:text-xl text-white/40 font-light max-w-2xl text-center mb-16 leading-relaxed px-4"
        >
          Transforming ideas into exceptional digital experiences
          <span className="hidden sm:inline"> with modern technology and design</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-5 mb-24"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-12 py-6 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
            />
            <span className="relative z-10 flex items-center gap-3 text-white font-bold text-lg">
              View Work
              <motion.svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </motion.svg>
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-12 py-6 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-3 text-white font-bold text-lg">
              <motion.span
                animate={{ rotate: [0, 14, -14, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                👋
              </motion.span>
              Let&apos;s Connect
            </span>
          </motion.button>
        </motion.div>

        {/* Minimal Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex flex-wrap justify-center gap-12 text-center"
        >
          {[
            { value: "2+", label: "Years" },
            { value: "15+", label: "Projects" },
            { value: "99%", label: "Satisfaction" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + i * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="group"
            >
              <div className="text-4xl sm:text-5xl font-black bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/40 font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative w-7 h-11 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
              <motion.div
                className="w-1.5 h-2.5 bg-gradient-to-b from-white/80 to-white/20 rounded-full"
                animate={{ 
                  y: [0, 18, 0],
                  opacity: [1, 0.3, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <span className="text-[10px] text-white/30 uppercase tracking-[0.25em] font-bold">Scroll</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;
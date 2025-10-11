"use client";
import React, { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useInView } from "framer-motion";

// Custom Hook for scroll animation
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
};

// Magnetic Button Component
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

const ContactSection = () => {
  const { ref, isInView } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    budget: "",
    timeline: "",
    projectType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        budget: "",
        timeline: "",
        projectType: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            LET&apos;S WORK TOGETHER
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
            <span className="text-purple-400 font-bold">
              2+ years experience
            </span>{" "}
            • Available for exciting projects •{" "}
            <span className="text-emerald-400 font-bold">
              Modern tech stack expert
            </span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Start Your Project
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
              Quality development • Fast delivery • Let&apos;s build something
              amazing
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        projectType: e.target.value,
                      }))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="">Select project type</option>
                    <option value="web-app">Web Application</option>
                    <option value="mobile-app">Mobile App</option>
                    <option value="website">Website</option>
                    <option value="api">API Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        timeline: e.target.value,
                      }))
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors text-sm sm:text-base"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3months">1-3 months</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="6months+">6+ months</option>
                    <option value="ongoing">Ongoing partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Project Details *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors h-24 sm:h-32 resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project, goals, and challenges..."
                  required
                />
              </div>

              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg sm:rounded-xl font-bold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/25"
              >
                {isSubmitting ? "🚀 Sending..." : "🚀 START THE CONVERSATION"}
              </MagneticButton>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 sm:p-4 bg-green-500/20 border border-green-500/30 rounded-lg sm:rounded-xl text-green-300 text-center text-sm sm:text-base"
                >
                  ✅ Message sent! I&apos;ll get back to you within 24 hours.
                </motion.div>
              )}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 sm:p-4 bg-red-500/20 border border-red-500/30 rounded-lg sm:rounded-xl text-red-300 text-center text-sm sm:text-base"
                >
                  ❌ Failed to send. Please try again or email me directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Why Work With Me */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                Why Work With Me
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-2xl">🚀</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm sm:text-base">
                      Modern Tech Stack
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      React, Node.js, TypeScript, AWS, and latest tools
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-2xl">💡</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm sm:text-base">
                      Problem Solver
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Strong analytical skills and creative solutions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-2xl">📈</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm sm:text-base">
                      Growing Experience
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      2+ years with proven track record of delivery
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-500/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-2xl">⚡</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold text-sm sm:text-base">
                      Fast & Reliable
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      On-time delivery with clean, maintainable code
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-[1.01] sm:hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-2xl sm:text-3xl">✉️</div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    Email
                  </h4>
                  <p className="text-purple-300 font-medium text-sm sm:text-base break-all">
                    work.snehil01@gmail.com
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Best way to reach me
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <motion.a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-[1.01] sm:hover:scale-105 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                    [in]
                  </div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    LinkedIn
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Professional profile
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-[1.01] sm:hover:scale-105 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                    𝕏
                  </div>
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    Twitter
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Follow my journey
                  </p>
                </div>
              </motion.a>
            </div>

            <motion.a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="block bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-[1.01] sm:hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                  🌟
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm sm:text-base">
                    Portfolio
                  </h4>
                  <p className="text-purple-300 font-medium text-sm sm:text-base">
                    View My Work
                  </p>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    Check out my latest projects
                  </p>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

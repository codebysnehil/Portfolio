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

const TestimonialsSection = () => {
  const { ref, isInView } = useScrollAnimation();

  const testimonials = [
    {
      quote:
        "Snehil consistently delivers high-quality code and shows great potential. His trading dashboard exceeded our expectations and our users love the intuitive interface.",
      author: "Alex Kumar",
      role: "Senior Developer",
      company: "FinTech Startup",
      rating: 5,
      project: "Built TradeDash Pro dashboard",
    },
    {
      quote:
        "Working with Snehil was a great experience. He's reliable, communicates well, and always delivers on time. His technical skills are impressive for someone with 2 years experience.",
      author: "Maria Rodriguez",
      role: "Project Manager",
      company: "Tech Consulting Agency",
      rating: 5,
      project: "Multiple web applications",
    },
    {
      quote:
        "Snehil has strong problem-solving skills and writes clean, maintainable code. He's someone I'd definitely want on my team for future projects.",
      author: "James Thompson",
      role: "Tech Lead",
      company: "Local Startup",
      rating: 5,
      project: "TaskFlow Manager development",
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
            CLIENT TESTIMONIALS
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto px-4">
            What colleagues and clients say about working with me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:scale-[1.01] sm:hover:scale-105 transition-all duration-500"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-xl sm:text-2xl text-amber-400">
                    ⭐
                  </span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-base sm:text-lg text-gray-200 leading-relaxed mb-4 sm:mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Author Info */}
              <div className="border-t border-white/10 pt-4 sm:pt-6">
                <div className="font-bold text-white text-base sm:text-lg">
                  {testimonial.author}
                </div>
                <div className="text-amber-400 font-semibold text-sm sm:text-base">
                  {testimonial.role}
                </div>
                <div className="text-gray-400 text-sm">
                  {testimonial.company}
                </div>
                <div className="text-purple-300 text-xs sm:text-sm mt-2 font-medium">
                  {testimonial.project}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

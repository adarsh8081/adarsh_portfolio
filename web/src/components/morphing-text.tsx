"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const texts = [
  "AI/ML Engineer",
  "Creative Professional", 
  "Full-Stack Developer",
  "Innovation Catalyst",
  "Tech Visionary",
  "Problem Solver",
  "Digital Artist",
  "Future Builder"
];

export function MorphingText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-16 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 50, opacity: 0, rotateX: 90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -50, opacity: 0, rotateX: -90 }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.span
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          >
            {texts[currentIndex]}
          </motion.span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

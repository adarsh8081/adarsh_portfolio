"use client";

import { motion } from "framer-motion";
import { useState, useEffect, memo, useCallback } from "react";

interface TechIconProps {
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
  icon: React.ReactNode;
  color: string;
  label: string;
  category: "tech" | "project";
}

const TechIcon = memo(function TechIcon({ x, y, delay, duration, size, icon, color, label, category }: TechIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      setIsDesktop(hasMouse);
    };
    checkIsDesktop();
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isDesktop) setIsHovered(true);
  }, [isDesktop]);

  const handleMouseLeave = useCallback(() => {
    if (isDesktop) setIsHovered(false);
  }, [isDesktop]);

  return (
    <motion.div
      className={`absolute group ${isDesktop ? 'cursor-pointer' : 'pointer-events-none'}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: [0, -15, 0],
        rotate: [0, 180, 0],
        scale: isHovered && isDesktop ? [1, 1.15, 1] : [1, 1.03, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      whileHover={isDesktop ? {
        scale: 1.2,
        y: -8,
        transition: { duration: 0.2 }
      } : {}}
    >
      <div className="relative w-full h-full">
        {/* Icon container */}
        <motion.div
          className={`w-full h-full rounded-xl flex items-center justify-center text-white shadow-lg ${
            category === "tech" 
              ? "bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-sm border border-white/15"
              : "bg-gradient-to-br from-cyan-500/15 to-purple-500/15 backdrop-blur-sm border border-cyan-400/25"
          }`}
          animate={{
            boxShadow: isHovered 
              ? [`0 0 15px ${color}30`, `0 0 25px ${color}40`, `0 0 15px ${color}30`]
              : [`0 3px 10px rgba(0,0,0,0.15)`, `0 6px 20px rgba(0,0,0,0.25)`, `0 3px 10px rgba(0,0,0,0.15)`]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="text-xl">
            {icon}
          </div>
        </motion.div>

        {/* Hover tooltip - only on desktop */}
        {isDesktop && (
          <motion.div
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-slate-900/90 text-white text-xs rounded-lg backdrop-blur-sm border border-white/20 whitespace-nowrap z-50"
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 8,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.15 }}
          >
            {label}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-slate-900/90" />
          </motion.div>
        )}

        {/* Glow effect - only on desktop */}
        {isDesktop && (
          <motion.div
            className={`absolute inset-0 rounded-xl blur-sm opacity-0`}
            style={{ backgroundColor: color }}
            animate={{
              opacity: isHovered ? 0.4 : 0,
              scale: isHovered ? 1.3 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        )}
      </div>
    </motion.div>
  );
});

export const FloatingTechIcons = memo(function FloatingTechIcons() {
  const [mounted, setMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for reduced motion preference
    const checkReducedMotion = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsReducedMotion(prefersReducedMotion);
    };

    checkReducedMotion();

    return () => {
      // Cleanup if needed
    };
  }, []);

  if (!mounted || isReducedMotion) return null;

  // Reduced number of icons for better performance
  const techIcons = [
    // AI/ML Technologies
    {
      x: 15, y: 20, delay: 0, duration: 8, size: 45, 
      icon: <span className="text-xl">🧠</span>, 
      color: "#64FFDA", 
      label: "Machine Learning", 
      category: "tech" as const
    },
    {
      x: 85, y: 25, delay: 1, duration: 10, size: 40, 
      icon: <span className="text-xl">🤖</span>, 
      color: "#8B5CF6", 
      label: "Artificial Intelligence", 
      category: "tech" as const
    },
    {
      x: 20, y: 75, delay: 2, duration: 12, size: 43, 
      icon: <span className="text-xl">⚡</span>, 
      color: "#EC4899", 
      label: "Deep Learning", 
      category: "tech" as const
    },
    {
      x: 80, y: 70, delay: 0.5, duration: 9, size: 47, 
      icon: <span className="text-xl">🔬</span>, 
      color: "#3B82F6", 
      label: "Data Science", 
      category: "tech" as const
    },

    // Web Technologies
    {
      x: 10, y: 45, delay: 3, duration: 7, size: 41, 
      icon: <span className="text-xl">⚛️</span>, 
      color: "#10B981", 
      label: "React/Next.js", 
      category: "tech" as const
    },
    {
      x: 90, y: 50, delay: 1.5, duration: 11, size: 39, 
      icon: <span className="text-xl">🐍</span>, 
      color: "#F59E0B", 
      label: "Python", 
      category: "tech" as const
    },
    {
      x: 25, y: 10, delay: 2.5, duration: 13, size: 44, 
      icon: <span className="text-xl">💎</span>, 
      color: "#EF4444", 
      label: "Ruby on Rails", 
      category: "tech" as const
    },
    {
      x: 75, y: 15, delay: 1.2, duration: 6, size: 42, 
      icon: <span className="text-xl">☁️</span>, 
      color: "#06B6D4", 
      label: "Cloud Computing", 
      category: "tech" as const
    },

    // Projects
    {
      x: 30, y: 35, delay: 0.8, duration: 9, size: 50, 
      icon: <span className="text-xl">🎵</span>, 
      color: "#8B5CF6", 
      label: "Spotify Clone", 
      category: "project" as const
    },
    {
      x: 70, y: 40, delay: 2.2, duration: 8, size: 48, 
      icon: <span className="text-xl">♻️</span>, 
      color: "#10B981", 
      label: "E-Waste AI", 
      category: "project" as const
    },
    {
      x: 40, y: 60, delay: 1.8, duration: 10, size: 46, 
      icon: <span className="text-xl">📊</span>, 
      color: "#F59E0B", 
      label: "Analytics Dashboard", 
      category: "project" as const
    },
    {
      x: 60, y: 85, delay: 3.2, duration: 7, size: 49, 
      icon: <span className="text-xl">🎨</span>, 
      color: "#EC4899", 
      label: "3D Portfolio", 
      category: "project" as const
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {techIcons.map((icon, index) => (
        <TechIcon key={index} {...icon} />
      ))}
    </div>
  );
});

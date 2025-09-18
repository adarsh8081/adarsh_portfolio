"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useState } from "react";

const techStack = [
  { name: "React", icon: "⚛️", color: "from-blue-500 to-cyan-500", description: "Frontend Library" },
  { name: "Next.js", icon: "▲", color: "from-gray-800 to-gray-600", description: "React Framework" },
  { name: "TypeScript", icon: "🔷", color: "from-blue-600 to-blue-400", description: "Type Safety" },
  { name: "Python", icon: "🐍", color: "from-yellow-500 to-orange-500", description: "Backend Language" },
  { name: "TensorFlow", icon: "🧠", color: "from-orange-500 to-red-500", description: "ML Framework" },
  { name: "Node.js", icon: "🟢", color: "from-green-500 to-emerald-500", description: "Runtime Environment" },
  { name: "PostgreSQL", icon: "🐘", color: "from-blue-700 to-blue-500", description: "Database" },
  { name: "AWS", icon: "☁️", color: "from-orange-400 to-yellow-500", description: "Cloud Platform" },
  { name: "Docker", icon: "🐳", color: "from-blue-500 to-cyan-400", description: "Containerization" },
  { name: "Git", icon: "📦", color: "from-orange-600 to-red-600", description: "Version Control" },
  { name: "Figma", icon: "🎨", color: "from-purple-500 to-pink-500", description: "Design Tool" },
  { name: "Vercel", icon: "▲", color: "from-gray-700 to-gray-500", description: "Deployment" },
  { name: "Tailwind CSS", icon: "🎨", color: "from-cyan-500 to-blue-500", description: "CSS Framework" },
  { name: "Prisma", icon: "🔧", color: "from-indigo-500 to-purple-500", description: "ORM" },
  { name: "Framer Motion", icon: "✨", color: "from-pink-500 to-purple-500", description: "Animations" },
  { name: "Three.js", icon: "🎮", color: "from-green-600 to-blue-600", description: "3D Graphics" }
];

export function TechCarousel() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const itemsPerView = 6; // Number of items visible at once
  const totalItems = techStack.length;
  const maxIndex = totalItems - itemsPerView;

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, maxIndex]);

  // Animate carousel movement
  useEffect(() => {
    controls.start({
      x: -currentIndex * (100 / itemsPerView),
      transition: { duration: 0.8, ease: "easeInOut" }
    });
  }, [currentIndex, controls]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="text-center flex-1">
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent-500 to-blue-600 flex items-center justify-center mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--blue-500))]">
            Tech Stack & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mastering cutting-edge technologies to build innovative solutions
          </p>
        </div>

        {/* Controls - Hidden */}
        <div className="hidden">
          <button
            onClick={togglePlayPause}
            className="p-3 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Progress Bar - Hidden */}
        <div className="hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-500 to-blue-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Carousel Track */}
        <div className="relative overflow-hidden rounded-2xl">
          <motion.div
            className="flex"
            style={{ width: `${(totalItems / itemsPerView) * 100}%` }}
            animate={controls}
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / totalItems}%` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="group relative h-32 bg-white/5 dark:bg-white/5 backdrop-blur-sm border border-white/10 dark:border-white/10 rounded-2xl p-6 hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-500 cursor-pointer overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm rounded-2xl`} />

                  <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                    {/* Icon */}
                    <motion.div
                      className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {tech.icon}
                    </motion.div>

                    {/* Name */}
                    <h3 className="text-sm font-bold text-white mb-1 group-hover:text-accent-300 transition-colors duration-300">
                      {tech.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {tech.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dots Indicator - Hidden */}
        <div className="hidden">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-accent-500 scale-125"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Floating tech icons */}
        <motion.div
          className="absolute top-20 left-20 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-lg flex items-center justify-center"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-2xl">⚛️</span>
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-md flex items-center justify-center"
          animate={{
            y: [0, 25, 0],
            rotate: [0, -360, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <span className="text-xl">🧠</span>
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-10 w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-sm flex items-center justify-center"
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          <span className="text-lg">⚡</span>
        </motion.div>
      </div>
    </div>
  );
}

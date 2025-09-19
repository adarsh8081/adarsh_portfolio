"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkIsMobile = () => {
      const isMobileDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
      setIsMobile(isMobileDevice);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Only show on mobile devices
  if (!isMobile) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200/30 dark:bg-gray-700/30 z-50">
      <motion.div
        className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500"
        style={{
          width: `${scrollProgress}%`,
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
}

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function InteractiveCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(springY, [-300, 300], [30, -30]);
  const rotateY = useTransform(springX, [-300, 300], [-30, 30]);

  useEffect(() => {
    // Check if device supports mouse (desktop)
    const checkIsDesktop = () => {
      const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      setIsDesktop(hasMouse);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDesktop) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      if (!isDesktop) return;
      setIsHovering(true);
    };
    
    const handleMouseLeave = () => {
      if (!isDesktop) return;
      setIsHovering(false);
    };

    if (isDesktop) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseenter", handleMouseEnter);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, [mouseX, mouseY, isDesktop]);

  // Don't render on mobile devices
  if (!isDesktop) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 border border-cyan-400/30 rounded-full pointer-events-none z-40"
        style={{
          x: springX,
          y: springY,
          transform: "translate(-50%, -50%)",
          rotateX,
          rotateY,
        }}
        animate={{
          scale: isHovering ? 1.2 : 0.8,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      />
      
      {/* Cursor particles */}
      {isHovering && (
        <div className="fixed top-0 left-0 pointer-events-none z-30">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: mousePosition.x,
                top: mousePosition.y,
              }}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

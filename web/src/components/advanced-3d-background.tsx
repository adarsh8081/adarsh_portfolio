"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, memo, useCallback } from "react";

interface FloatingElementProps {
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  shape: "circle" | "square" | "triangle" | "hexagon";
}

const FloatingElement = memo(function FloatingElement({ x, y, delay, duration, size, color, shape }: FloatingElementProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(springY, [-300, 300], [15, -15]);
  const rotateY = useTransform(springX, [-300, 300], [-15, 15]);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const getShapeElement = useCallback(() => {
    const baseClasses = "absolute inset-0";
    
    switch (shape) {
      case "circle":
        return <div className={`${baseClasses} rounded-full bg-gradient-to-br ${color}`} />;
      case "square":
        return <div className={`${baseClasses} rounded-lg bg-gradient-to-br ${color}`} />;
      case "triangle":
        return (
          <div className={`${baseClasses} bg-gradient-to-br ${color}`} 
               style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
        );
      case "hexagon":
        return (
          <div className={`${baseClasses} bg-gradient-to-br ${color}`}
               style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)" }} />
        );
      default:
        return <div className={`${baseClasses} rounded-full bg-gradient-to-br ${color}`} />;
    }
  }, [shape, color]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: [0, -20, 0],
        rotate: [0, 180, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <div className="relative w-full h-full" style={{ transform: "translateZ(30px)" }}>
        {getShapeElement()}
        <div 
          className="absolute inset-0 bg-white/10 rounded-full blur-sm"
          style={{ transform: "translateZ(-5px)" }}
        />
      </div>
    </motion.div>
  );
});

const NeuralNetwork = memo(function NeuralNetwork() {
  const [nodes, setNodes] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [connections, setConnections] = useState<Array<{ from: number; to: number }>>([]);

  useEffect(() => {
    // Reduced node count for better performance
    const nodeCount = 8;
    const newNodes = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));

    // Generate connections between nearby nodes
    const newConnections: Array<{ from: number; to: number }> = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const distance = Math.sqrt(
          Math.pow(newNodes[i].x - newNodes[j].x, 2) + 
          Math.pow(newNodes[i].y - newNodes[j].y, 2)
        );
        if (distance < 35) {
          newConnections.push({ from: i, to: j });
        }
      }
    }

    setNodes(newNodes);
    setConnections(newConnections);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Connections */}
        {connections.map((conn, index) => (
          <motion.line
            key={index}
            x1={nodes[conn.from]?.x || 0}
            y1={nodes[conn.from]?.y || 0}
            x2={nodes[conn.to]?.x || 0}
            y2={nodes[conn.to]?.y || 0}
            stroke="url(#neuralGradient)"
            strokeWidth="0.08"
            opacity="0.4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.5, delay: index * 0.05 }}
          />
        ))}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="0.6"
            fill="url(#nodeGradient)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: node.id * 0.05 
            }}
          />
        ))}
        
        <defs>
          <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64FFDA" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#64FFDA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
});

const ParticleField = memo(function ParticleField() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
  }>>([]);

  useEffect(() => {
    // Reduced particle count for better performance
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 1,
      color: ["#64FFDA", "#8B5CF6", "#EC4899", "#3B82F6"][Math.floor(Math.random() * 4)],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
          }}
          animate={{
            x: [0, particle.vx * 50, 0],
            y: [0, particle.vy * 50, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
});

function HolographicGrid() {
  return (
    <div className="absolute inset-0 opacity-20">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="holographicGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="url(#gridGradient)" strokeWidth="0.5"/>
            <circle cx="20" cy="20" r="1" fill="url(#gridGradient)" opacity="0.6"/>
          </pattern>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64FFDA" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#holographicGrid)" />
      </svg>
    </div>
  );
}

export const Advanced3DBackground = memo(function Advanced3DBackground() {
  const [mounted, setMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 -z-10" />
    );
  }

  // Reduced number of floating elements for better performance
  const floatingElements = [
    { x: 15, y: 25, delay: 0, duration: 8, size: 50, color: "from-cyan-500/15 to-blue-500/15", shape: "circle" as const },
    { x: 80, y: 20, delay: 1, duration: 10, size: 35, color: "from-purple-500/15 to-pink-500/15", shape: "square" as const },
    { x: 25, y: 75, delay: 2, duration: 12, size: 45, color: "from-emerald-500/15 to-cyan-500/15", shape: "triangle" as const },
    { x: 70, y: 65, delay: 0.5, duration: 9, size: 30, color: "from-violet-500/15 to-purple-500/15", shape: "hexagon" as const },
    { x: 50, y: 15, delay: 1.5, duration: 11, size: 40, color: "from-rose-500/15 to-pink-500/15", shape: "circle" as const },
  ];

  return (
    <div className="absolute inset-0 -z-10">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900" />
      
      {/* Holographic grid */}
      <HolographicGrid />
      
      {/* Neural network - only if not reduced motion */}
      {!isReducedMotion && <NeuralNetwork />}
      
      {/* Particle field - only if not reduced motion */}
      {!isReducedMotion && <ParticleField />}
      
      {/* Floating 3D elements - only if not reduced motion */}
      {!isReducedMotion && floatingElements.map((element, index) => (
        <FloatingElement key={index} {...element} />
      ))}
      
      {/* Ambient lighting effects - simplified */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-cyan-500/8 via-transparent to-transparent rounded-full blur-3xl"
        animate={!isReducedMotion ? {
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        } : {}}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-purple-500/8 via-transparent to-transparent rounded-full blur-3xl"
        animate={!isReducedMotion ? {
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.5, 0.3],
        } : {}}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
});

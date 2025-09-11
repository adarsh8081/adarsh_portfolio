"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverGlowProps {
	children: ReactNode;
	className?: string;
	glowColor?: string;
}

export function HoverGlow({ children, className = "", glowColor = "var(--accent-500)" }: HoverGlowProps) {
	return (
		<motion.div
			className={`relative ${className}`}
			whileHover={{ scale: 1.02 }}
			transition={{ type: "spring", stiffness: 300, damping: 20 }}
		>
			{children}
			<motion.div
				className="absolute inset-0 rounded-inherit opacity-0 blur-xl"
				style={{ backgroundColor: glowColor }}
				whileHover={{ opacity: 0.3 }}
				transition={{ duration: 0.3 }}
			/>
		</motion.div>
	);
}

interface RippleButtonProps {
	children: ReactNode;
	onClick?: () => void;
	className?: string;
}

export function RippleButton({ children, onClick, className = "" }: RippleButtonProps) {
	return (
		<motion.button
			className={`relative overflow-hidden ${className}`}
			onClick={onClick}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
		>
			{children}
			<motion.div
				className="absolute inset-0 bg-white/20 rounded-inherit"
				initial={{ scale: 0, opacity: 0 }}
				whileTap={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.2 }}
			/>
		</motion.button>
	);
}

interface FloatingCardProps {
	children: ReactNode;
	className?: string;
}

export function FloatingCard({ children, className = "" }: FloatingCardProps) {
	return (
		<motion.div
			className={className}
			whileHover={{ 
				y: -8,
				rotateX: 5,
				rotateY: 5,
			}}
			transition={{ 
				type: "spring", 
				stiffness: 300, 
				damping: 20 
			}}
			style={{
				transformStyle: "preserve-3d",
			}}
		>
			{children}
		</motion.div>
	);
}

interface TextRevealProps {
	children: ReactNode;
	className?: string;
	delay?: number;
}

export function TextReveal({ children, className = "", delay = 0 }: TextRevealProps) {
	return (
		<motion.div
			className={`overflow-hidden ${className}`}
			initial={{ y: "100%" }}
			whileInView={{ y: 0 }}
			transition={{ 
				duration: 0.8, 
				delay,
				ease: [0.25, 0.1, 0.25, 1]
			}}
			viewport={{ once: true, margin: "-100px" }}
		>
			{children}
		</motion.div>
	);
}

interface ParallaxElementProps {
	children: ReactNode;
	className?: string;
	offset?: number;
}

export function ParallaxElement({ children, className = "", offset = 50 }: ParallaxElementProps) {
	return (
		<motion.div
			className={className}
			initial={{ y: offset }}
			whileInView={{ y: -offset }}
			transition={{ 
				duration: 1,
				ease: "easeOut"
			}}
			viewport={{ once: true, margin: "-200px" }}
		>
			{children}
		</motion.div>
	);
}

interface StaggerContainerProps {
	children: ReactNode;
	className?: string;
	stagger?: number;
}

export function StaggerContainer({ children, className = "", stagger = 0.1 }: StaggerContainerProps) {
	return (
		<motion.div
			className={className}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: "-100px" }}
			variants={{
				hidden: { opacity: 0 },
				visible: {
					opacity: 1,
					transition: {
						staggerChildren: stagger,
					},
				},
			}}
		>
			{children}
		</motion.div>
	);
}

interface StaggerItemProps {
	children: ReactNode;
	className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
	return (
		<motion.div
			className={className}
			variants={{
				hidden: { opacity: 0, y: 20 },
				visible: { 
					opacity: 1, 
					y: 0,
					transition: {
						duration: 0.6,
						ease: "easeOut"
					}
				},
			}}
		>
			{children}
		</motion.div>
	);
}

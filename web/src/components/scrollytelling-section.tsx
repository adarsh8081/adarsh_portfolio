"use client";

import { useRef, memo } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface ScrollytellingSectionProps {
	children: React.ReactNode;
	className?: string;
}

export const ScrollytellingSection = memo(function ScrollytellingSection({ children, className = "" }: ScrollytellingSectionProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
	const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

	return (
		<motion.section
			ref={ref}
			style={{ y, opacity, scale }}
			className={`relative py-24 ${className}`}
		>
			<div className="container-safe">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					{children}
				</motion.div>
			</div>
		</motion.section>
	);
});

export function ParallaxText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

	return (
		<div ref={ref} className={`relative overflow-hidden ${className}`}>
			<motion.div style={{ y }} className="will-change-transform">
				{children}
			</motion.div>
		</div>
	);
}

export const RevealOnScroll = memo(function RevealOnScroll({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-30px" });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 40 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
			transition={{ duration: 0.5, delay, ease: "easeOut" }}
		>
			{children}
		</motion.div>
	);
});

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Background3DWrapper } from "@/components/background-3d-wrapper";

export function Hero3D() {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
	const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
	const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

	return (
		<section ref={ref} className="relative h-[100vh] flex items-center overflow-hidden">
			{/* Enhanced 3D Background */}
			<Background3DWrapper intensity={1.2} />
			
			{/* Content */}
			<div className="container-safe relative z-10">
				<motion.div
					style={{ y, opacity }}
					className="glass rounded-3xl p-8 sm:p-12 max-w-4xl border border-white/20 dark:border-white/10 backdrop-blur-xl"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: "easeOut" }}
				>
					<motion.h1 
						className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight font-heading bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--brand-accent),var(--accent-400),var(--accent-300))]"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
					>
						Adarsh Kumar
					</motion.h1>
					
					<motion.p 
						className="mt-6 text-xl sm:text-2xl font-medium text-brand-accent font-heading"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						AI/ML Engineer | Creative Professional | Full-Stack Developer
					</motion.p>
					
					<motion.p 
						className="mt-4 max-w-3xl text-lg text-brand-light/90 font-sans"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.6 }}
					>
						Bridging artificial intelligence with creative design to build intelligent, user-centric solutions that push the boundaries of what&apos;s possible.
					</motion.p>
					
					<motion.div 
						className="mt-8 flex flex-col sm:flex-row gap-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.8 }}
					>
						<Link
							href="/projects"
							className="group pointer-events-auto inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold text-brand-dark transition-all duration-300 hover:scale-105 hover:shadow-2xl font-heading"
							style={{ 
								background: "linear-gradient(135deg, var(--brand-accent), var(--accent-400))",
								boxShadow: "0 10px 30px rgba(100, 255, 218, 0.3)"
							}}
						>
							🚀 View Projects
							<span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
						</Link>
						<Link
							href="/contact"
							className="group pointer-events-auto inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold border-2 border-brand-accent/30 text-brand-accent transition-all duration-300 hover:border-brand-accent hover:bg-brand-accent/10 hover:scale-105 font-heading"
							style={{ 
								background: "color-mix(in srgb, var(--foreground) 6%, transparent)",
								backdropFilter: "blur(10px)"
							}}
						>
							📬 Contact Me
							<span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
						</Link>
					</motion.div>
				</motion.div>
			</div>
			
			{/* Scroll Indicator */}
			<motion.div 
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 1.5 }}
			>
				<motion.div
					className="w-6 h-10 border-2 border-accent-500/50 rounded-full flex justify-center"
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
				>
					<motion.div
						className="w-1 h-3 bg-accent-500 rounded-full mt-2"
						animate={{ opacity: [0, 1, 0] }}
						transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
					/>
				</motion.div>
			</motion.div>
		</section>
	);
}



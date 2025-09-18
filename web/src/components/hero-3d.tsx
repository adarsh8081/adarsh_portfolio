"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { LazyAdvanced3DBackground, LazyFloatingTechIcons } from "@/components/lazy-loading-wrapper";
import { MorphingText } from "@/components/morphing-text";

export function Hero3D() {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
	const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
	const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
	const [isLoaded, setIsLoaded] = useState(false);
	
	// Interactive mouse tracking
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);
	const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
	const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

	useEffect(() => {
		setIsLoaded(true);
		
		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX);
			mouseY.set(e.clientY);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [mouseX, mouseY]);

	return (
		<section ref={ref} className="relative h-[100vh] flex items-center justify-center overflow-hidden">
			{/* Advanced 3D Background */}
			{isLoaded && <LazyAdvanced3DBackground />}
			
			
			{/* Floating Tech & Project Icons */}
			<LazyFloatingTechIcons />
			
			{/* Interactive Mouse Effects */}
			<motion.div
				className="absolute inset-0 pointer-events-none"
				style={{
					background: `radial-gradient(600px circle at ${springX}px ${springY}px, rgba(100, 255, 218, 0.1), transparent 40%)`,
				}}
			/>
			
			{/* Content */}
			<div className="container-safe relative z-10 flex justify-center" style={{ transform: "none" }}>
				<motion.div
					className="relative glass rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border border-white/20 dark:border-white/10 backdrop-blur-xl overflow-hidden"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, ease: "easeOut" }}
					style={{ 
						y, 
						opacity,
						transform: "translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)",
						transformStyle: "flat"
					}}
				>
					{/* Animated Background Pattern */}
					<div className="absolute inset-0 -z-10">
						<motion.div
							className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-500/5 via-transparent to-purple-500/5"
							animate={{
								opacity: [0.3, 0.7, 0.3],
								scale: [1, 1.05, 1]
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: "easeInOut"
							}}
						/>
						<motion.div
							className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-accent-400/10 via-transparent to-transparent rounded-full blur-2xl"
							animate={{
								x: [-50, 50, -50],
								y: [-30, 30, -30],
								scale: [0.8, 1.2, 0.8]
							}}
							transition={{
								duration: 8,
								repeat: Infinity,
								ease: "easeInOut"
							}}
						/>
					</div>
					<motion.h1 
						className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight font-heading bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--brand-accent),var(--accent-400),var(--accent-300))]"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
					>
						Adarsh Kumar
					</motion.h1>
					
					<motion.div 
						className="mt-6"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						<MorphingText />
					</motion.div>
					
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
						<motion.div
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							className="relative group"
						>
							<Link
								href="/projects"
								className="relative pointer-events-auto inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 font-heading overflow-hidden"
								style={{ 
									background: "linear-gradient(135deg, #64FFDA, #8B5CF6)",
									boxShadow: "0 10px 30px rgba(100, 255, 218, 0.3)"
								}}
							>
								<motion.div
									className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
									initial={{ x: "-100%" }}
									whileHover={{ x: "100%" }}
									transition={{ duration: 0.6 }}
								/>
								<span className="relative z-10 flex items-center">
									🚀 View Projects
									<motion.span 
										className="ml-2"
										animate={{ x: [0, 5, 0] }}
										transition={{ duration: 1.5, repeat: Infinity }}
									>
										→
									</motion.span>
								</span>
							</Link>
						</motion.div>
						
						<motion.div
							whileHover={{ scale: 1.05, y: -2 }}
							whileTap={{ scale: 0.95 }}
							className="relative group"
						>
							<Link
								href="/contact"
								className="relative pointer-events-auto inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold border-2 border-cyan-400/30 text-cyan-400 transition-all duration-300 font-heading overflow-hidden backdrop-blur-xl"
								style={{ 
									background: "rgba(100, 255, 218, 0.1)",
									backdropFilter: "blur(10px)"
								}}
							>
								<motion.div
									className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20"
									initial={{ scale: 0 }}
									whileHover={{ scale: 1 }}
									transition={{ duration: 0.3 }}
								/>
								<span className="relative z-10 flex items-center">
									📬 Contact Me
									<motion.span 
										className="ml-2"
										animate={{ x: [0, 5, 0] }}
										transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
									>
										→
									</motion.span>
								</span>
							</Link>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
			

			{/* Enhanced Scroll Indicator */}
			<motion.div 
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 1.5 }}
			>
				<motion.div
					className="relative w-6 h-10 border-2 border-accent-500/50 rounded-full flex justify-center"
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
				>
					<motion.div
						className="w-1 h-3 bg-accent-500 rounded-full mt-2"
						animate={{ opacity: [0, 1, 0] }}
						transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
					/>
				</motion.div>
				<motion.div
					className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-accent-500/70 text-xs"
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
				>
					Scroll
				</motion.div>
			</motion.div>
		</section>
	);
}



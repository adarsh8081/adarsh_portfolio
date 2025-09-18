"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

export function SimpleHero() {
	return (
		<section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-20">
				<div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
			</div>
			
			{/* Content */}
			<div className="container-safe relative z-10 text-center">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="max-w-4xl mx-auto"
				>
					{/* Greeting */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="text-accent-400 text-lg font-medium mb-4"
					>
						Hello, I&apos;m
					</motion.div>
					
					{/* Name */}
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="text-6xl md:text-8xl font-bold text-white mb-6"
					>
						Adarsh Kumar
					</motion.h1>
					
					{/* Title */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="text-2xl md:text-3xl text-gray-300 mb-8"
					>
						AI/ML Engineer & Creative Professional
					</motion.div>
					
					{/* Description */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
					>
						I build intelligent solutions that bridge artificial intelligence with design, 
						creating innovative applications that solve real-world problems.
					</motion.p>
					
					{/* CTA Buttons */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.6 }}
						className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
					>
						<Link
							href="/projects"
							className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
							style={{ 
								background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
								boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
							}}
						>
							View My Work
							<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
						</Link>
						<Link
							href="/contact"
							className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold border-2 border-white/20 text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
						>
							Get In Touch
						</Link>
					</motion.div>
					
					{/* Social Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.7 }}
						className="flex items-center justify-center gap-6"
					>
						<a href="https://github.com/adarsh8081" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
							<Github className="w-6 h-6" />
						</a>
						<a href="https://linkedin.com/in/adarsh8081" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
							<Linkedin className="w-6 h-6" />
						</a>
						<a href="mailto:adarsh@example.com" className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
							<Mail className="w-6 h-6" />
						</a>
						<a href="/resume.pdf" download className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
							<Download className="w-6 h-6" />
						</a>
					</motion.div>
				</motion.div>
			</div>
			
			{/* Scroll Indicator */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 1 }}
				className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
			>
				<div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
					<motion.div
						animate={{ y: [0, 12, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className="w-1 h-3 bg-white/60 rounded-full mt-2"
					/>
				</div>
			</motion.div>
		</section>
	);
}

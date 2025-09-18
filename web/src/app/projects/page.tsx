"use client";

import { motion } from "framer-motion";
import { ProjectsGallery } from "@/components/projects-gallery";
import { ScrollytellingSection, RevealOnScroll } from "@/components/scrollytelling-section";
import { ParallaxText } from "@/components/scrollytelling-section";
import { Background3DWrapper } from "@/components/background-3d-wrapper";

export default function ProjectsPage() {
	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="relative py-20 overflow-hidden">
				<Background3DWrapper intensity={0.8} showTorus={false} showSpheres={true} />
				<div className="absolute inset-0 bg-gradient-to-br from-accent-50/30 via-transparent to-accent-900/20 dark:from-accent-900/20 dark:via-transparent dark:to-accent-500/10" />
				<div className="container-safe relative z-10">
					<RevealOnScroll>
						<div className="text-center max-w-4xl mx-auto">
							<motion.h1 
								className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
							>
								Featured Projects
							</motion.h1>
							<motion.p 
								className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								Explore my portfolio of innovative projects spanning AI/ML, full-stack development, and creative solutions.
							</motion.p>
						</div>
					</RevealOnScroll>
				</div>
			</section>

			{/* Projects Stats - Simplified */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						{/* Section Header */}
						<div className="text-center mb-12">
							<motion.h2 
								className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400))]"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								viewport={{ once: true }}
							>
								Project Impact
							</motion.h2>
							<motion.p 
								className="text-muted-foreground max-w-2xl mx-auto"
								initial={{ opacity: 0, y: 15 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.1 }}
								viewport={{ once: true }}
							>
								Key metrics from my development journey
							</motion.p>
						</div>

						{/* Stats Grid */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							{[
								{ number: "8+", label: "Projects Completed", icon: "🚀" },
								{ number: "95%", label: "Client Satisfaction", icon: "⭐" },
								{ number: "10+", label: "Technologies Used", icon: "⚡" },
								{ number: "3+", label: "Years Experience", icon: "🎯" }
							].map((stat, index) => (
								<motion.div
									key={stat.label}
									className="text-center group"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ y: -5 }}
								>
									{/* Simple Card */}
									<div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300 group-hover:shadow-lg">
										{/* Icon */}
										<div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
											{stat.icon}
										</div>

										{/* Number */}
										<div className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2 group-hover:text-accent-500 transition-colors duration-300">
											{stat.number}
										</div>

										{/* Label */}
										<div className="text-sm text-muted-foreground font-medium">
											{stat.label}
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Projects Gallery */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="container-safe">
						<ProjectsGallery />
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Call to Action - Modern Design */}
			<ScrollytellingSection className="py-20 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-indigo-900/20 dark:from-purple-900/30 dark:via-blue-900/20 dark:to-indigo-900/30 relative overflow-hidden">
				{/* Subtle background pattern */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl" />
					<div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl" />
				</div>

				<RevealOnScroll>
					<div className="max-w-5xl mx-auto relative z-10">
						{/* Main CTA Card */}
						<motion.div 
							className="relative bg-gradient-to-br from-white/90 to-white/70 dark:from-slate-800/90 dark:to-slate-700/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30 dark:border-white/20 overflow-hidden"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							viewport={{ once: true }}
						>
							{/* Decorative elements */}
							<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl" />
							<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/20 to-cyan-400/20 rounded-full blur-xl" />

							{/* Content */}
							<div className="relative z-10 text-center">
								{/* Icon */}
								<motion.div
									className="inline-block mb-6"
									initial={{ scale: 0 }}
									whileInView={{ scale: 1 }}
									transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
									viewport={{ once: true }}
								>
									<div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg">
										💬
									</div>
								</motion.div>

								{/* Title */}
								<motion.h2 
									className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,#8b5cf6,#ec4899,#06b6d4)]"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.2 }}
									viewport={{ once: true }}
								>
									Let&apos;s Create Something Amazing
								</motion.h2>

								{/* Description */}
								<motion.p 
									className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed"
									initial={{ opacity: 0, y: 15 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.3 }}
									viewport={{ once: true }}
								>
									Ready to bring your ideas to life? I&apos;m here to help you build innovative solutions that make a real impact.
								</motion.p>

								{/* Buttons */}
								<motion.div 
									className="flex flex-col sm:flex-row gap-6 justify-center"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.4 }}
									viewport={{ once: true }}
								>
									<a
										href="/contact"
										className="group relative inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
										style={{ 
											background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
											boxShadow: "0 8px 25px rgba(139, 92, 246, 0.4)"
										}}
									>
										<span className="relative z-10">Start a Project</span>
										<div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</a>

									<a
										href="https://github.com/adarsh8081"
										target="_blank"
										rel="noreferrer"
										className="group relative inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-semibold border-2 border-purple-500/30 transition-all duration-300 hover:border-purple-500 hover:bg-purple-500/10 hover:scale-105 overflow-hidden"
										style={{ 
											background: "rgba(255, 255, 255, 0.1)",
											backdropFilter: "blur(10px)"
										}}
									>
										<span className="relative z-10 text-slate-700 dark:text-slate-300">View My Work</span>
										<div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</a>
								</motion.div>

								{/* Bottom accent */}
								<motion.div 
									className="mt-8 h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1 }}
									transition={{ duration: 0.8, delay: 0.6 }}
									viewport={{ once: true }}
								/>
							</div>
						</motion.div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Parallax Text */}
			<ParallaxText className="py-16">
				<div className="text-center">
					<h2 className="text-6xl md:text-8xl font-bold opacity-10 select-none">
						INNOVATION
					</h2>
				</div>
			</ParallaxText>
		</main>
	);
}



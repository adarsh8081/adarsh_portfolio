"use client";

import { motion } from "framer-motion";
import { Hero3D } from "@/components/hero-3d";
import { AccentSwitcher } from "@/components/theme-provider";
import { ScrollytellingSection, ParallaxText, RevealOnScroll } from "@/components/scrollytelling-section";
import { ArrowRight, Code, Brain, Palette, Zap } from "lucide-react";

const featuredProjects = [
	{
		title: "AI Summarization System",
		description: "Multi-platform AI-powered content summarization supporting videos, images, PDFs, and text.",
		tech: ["React", "Flask", "AWS", "Whisper", "BART"],
		impact: "Processed 10,000+ documents with 95% accuracy",
		icon: Brain,
		gradient: "from-blue-500 to-purple-600"
	},
	{
		title: "Spotify Clone",
		description: "Complete music streaming platform with real-time sync and advanced features.",
		tech: ["React", "Node.js", "MongoDB", "Web Audio API"],
		impact: "Full-featured platform with device sync",
		icon: Code,
		gradient: "from-green-500 to-emerald-600"
	},
	{
		title: "3D Interactive Portfolio",
		description: "Next-level portfolio with 3D visuals, particle effects, and smooth animations.",
		tech: ["Next.js", "Three.js", "Framer Motion", "TypeScript"],
		impact: "Immersive 60fps user experience",
		icon: Palette,
		gradient: "from-pink-500 to-rose-600"
	}
];

const services = [
	{
		title: "Web Development",
		description: "Full-stack applications with modern frameworks",
		icon: Code,
		features: ["React", "Next.js", "Node.js", "TypeScript"]
	},
	{
		title: "AI/ML Solutions",
		description: "Custom AI models and machine learning solutions",
		icon: Brain,
		features: ["TensorFlow", "PyTorch", "Python", "AWS"]
	},
	{
		title: "UI/UX Design",
		description: "Creative and user-centered design solutions",
		icon: Palette,
		features: ["Figma", "Adobe Suite", "Prototyping", "Design Systems"]
	},
	{
		title: "Performance Optimization",
		description: "Speed, scalability, and user experience optimization",
		icon: Zap,
		features: ["Code Review", "Database Optimization", "CDN", "Monitoring"]
	}
];

const stats = [
	{ number: "8+", label: "Projects Completed" },
	{ number: "95%", label: "Client Satisfaction" },
	{ number: "10+", label: "Technologies Mastered" },
	{ number: "3+", label: "Years Experience" }
];

export default function Home() {
	return (
		<main>
			<Hero3D />
			
			{/* Accent Switcher */}
			<section className="container-safe py-6">
				<div className="flex items-center gap-3">
					<span className="text-sm text-muted-foreground">Accent</span>
					<AccentSwitcher />
				</div>
			</section>

			{/* Stats Section */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{stats.map((stat, index) => (
								<motion.div
									key={stat.label}
									className="text-center"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									<div className="text-4xl font-bold text-accent-600 mb-2">{stat.number}</div>
									<div className="text-muted-foreground">{stat.label}</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Featured Projects */}
			<ScrollytellingSection>
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Featured Projects
						</h2>
						<p className="text-muted-foreground text-lg mb-8">Explore my most impactful work across AI, web development, and design.</p>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			<ScrollytellingSection>
				<RevealOnScroll delay={0.2}>
					<div className="max-w-6xl mx-auto">
						<div className="grid md:grid-cols-3 gap-8">
							{featuredProjects.map((project, index) => (
								<motion.div
									key={project.title}
									className="glass rounded-2xl p-8 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300 group"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.02, y: -5 }}
								>
									<div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
										<project.icon className="w-6 h-6 text-white" />
									</div>
									<h3 className="text-xl font-semibold mb-3">{project.title}</h3>
									<p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
									<div className="mb-4 p-2 rounded-lg bg-accent-50 dark:bg-accent-900/20">
										<p className="text-xs font-medium text-accent-700 dark:text-accent-300">
											📈 {project.impact}
										</p>
									</div>
									<div className="flex flex-wrap gap-2">
										{project.tech.map((tech) => (
											<span
												key={tech}
												className="px-2 py-1 rounded-full text-xs font-medium"
												style={{ background: "var(--gradient-1)", color: "white" }}
											>
												{tech}
											</span>
										))}
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Services Preview */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							What I Do
						</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							{services.map((service, index) => (
								<motion.div
									key={service.title}
									className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300 text-center"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.05 }}
								>
									<div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
										<service.icon className="w-6 h-6 text-white" />
									</div>
									<h3 className="text-lg font-semibold mb-2">{service.title}</h3>
									<p className="text-sm text-muted-foreground mb-4">{service.description}</p>
									<div className="flex flex-wrap gap-1 justify-center">
										{service.features.map((feature) => (
											<span
												key={feature}
												className="px-2 py-1 rounded-full text-xs bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300"
											>
												{feature}
											</span>
										))}
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* CTA Section */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Ready to Work Together?
						</h2>
						<p className="text-xl text-muted-foreground mb-8">
							I&apos;m always excited to take on new challenges and create innovative solutions. 
							Let&apos;s discuss your next project and bring your ideas to life.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="/contact"
								className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
								style={{ 
									background: "linear-gradient(135deg, var(--accent-600), var(--accent-400))",
									boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)"
								}}
							>
								Get In Touch
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
							</a>
							<a
								href="/projects"
								className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold border-2 border-accent-500/30 transition-all duration-300 hover:border-accent-500 hover:bg-accent-500/10 hover:scale-105"
								style={{ 
									background: "color-mix(in srgb, var(--foreground) 6%, transparent)",
									backdropFilter: "blur(10px)"
								}}
							>
								View All Projects
							</a>
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

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

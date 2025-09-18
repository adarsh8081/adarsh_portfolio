"use client";

import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { AccentSwitcher } from "@/components/theme-provider";
import { ScrollytellingSection, ParallaxText, RevealOnScroll } from "@/components/scrollytelling-section";
import { TechCarousel } from "@/components/tech-carousel";
import { ArrowRight, Code, Brain, Palette, Zap, Star, Award, Users, TrendingUp, Github, Linkedin, Mail, Download } from "lucide-react";

// Lazy load heavy components
const Hero3D = lazy(() => import("@/components/hero-3d").then(module => ({ default: module.Hero3D })));
const FeaturedProjectsPreview = lazy(() => import("@/components/featured-projects-preview").then(module => ({ default: module.FeaturedProjectsPreview })));


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
	{ number: "50+", label: "Projects Completed" },
	{ number: "100%", label: "Client Satisfaction" },
	{ number: "15+", label: "Technologies Mastered" },
	{ number: "3+", label: "Years Experience" }
];

const achievements = [
	{
		icon: Award,
		title: "Hackathon Winner",
		description: "Multiple hackathon victories",
		color: "from-yellow-500 to-orange-500"
	},
	{
		icon: Users,
		title: "50+ Students Trained",
		description: "Quantum Computing Workshop",
		color: "from-blue-500 to-purple-500"
	},
	{
		icon: TrendingUp,
		title: "95% Accuracy",
		description: "AI Model Performance",
		color: "from-green-500 to-emerald-500"
	},
	{
		icon: Star,
		title: "Featured Projects",
		description: "Industry Recognition",
		color: "from-pink-500 to-rose-500"
	}
];

const testimonials = [
	{
		text: "Adarsh delivered an exceptional AI solution that exceeded our expectations. His technical expertise and attention to detail are remarkable.",
		author: "Sarah Johnson",
		role: "CTO, TechCorp",
		rating: 5
	},
	{
		text: "Working with Adarsh was a game-changer. He transformed our complex requirements into a beautiful, functional application.",
		author: "Michael Chen",
		role: "Product Manager, StartupXYZ",
		rating: 5
	},
	{
		text: "Adarsh's AI/ML expertise helped us achieve 95% accuracy in our prediction models. Highly recommended!",
		author: "Dr. Emily Rodriguez",
		role: "Data Science Lead, AI Solutions Inc",
		rating: 5
	}
];

export default function Home() {
	return (
		<main>
			<Suspense fallback={
				<section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 -z-10" />
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
						<p className="text-cyan-400">Loading...</p>
					</div>
				</section>
			}>
			<Hero3D />
			</Suspense>
			
			{/* Quick Actions Bar */}
			<section className="container-safe py-6">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-3">
						<span className="text-sm text-muted-foreground">Theme</span>
					<AccentSwitcher />
					</div>
					<div className="flex items-center gap-4">
						<a
							href="/resume.pdf"
							download
							className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-600 dark:text-accent-400 hover:bg-accent-500/20 transition-all duration-300"
						>
							<Download className="w-4 h-4" />
							<span className="text-sm font-medium">Download CV</span>
						</a>
						<div className="flex items-center gap-2">
							<a href="https://github.com/adarsh8081" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-accent-500/10 transition-colors">
								<Github className="w-5 h-5" />
							</a>
							<a href="https://linkedin.com/in/adarsh8081" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-accent-500/10 transition-colors">
								<Linkedin className="w-5 h-5" />
							</a>
							<a href="mailto:adarsh@example.com" className="p-2 rounded-full hover:bg-accent-500/10 transition-colors">
								<Mail className="w-5 h-5" />
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Achievements Section */}
			<ScrollytellingSection className="py-20 relative overflow-hidden">
				{/* Background Graphics */}
				<div className="absolute inset-0 -z-10">
					{/* Floating geometric shapes */}
					<motion.div
						className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-accent-500/20 to-purple-500/20 rounded-full blur-xl"
						animate={{
							y: [0, -20, 0],
							x: [0, 10, 0],
							scale: [1, 1.1, 1],
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							ease: "easeInOut"
						}}
					/>
					<motion.div
						className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-lg"
						animate={{
							y: [0, 15, 0],
							x: [0, -10, 0],
							scale: [1, 0.9, 1],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 2
						}}
					/>
					<motion.div
						className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full blur-md"
						animate={{
							y: [0, -10, 0],
							x: [0, 15, 0],
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 7,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 1
						}}
					/>
					
					{/* Grid pattern */}
					<div className="absolute inset-0 opacity-5">
						<div className="w-full h-full" style={{
							backgroundImage: `radial-gradient(circle at 1px 1px, var(--accent-500) 1px, transparent 0)`,
							backgroundSize: '20px 20px'
						}} />
					</div>
				</div>

				<RevealOnScroll>
					<div className="max-w-6xl mx-auto relative z-10">
						<div className="text-center mb-16">
							<motion.div
								className="inline-block mb-6"
								initial={{ scale: 0 }}
								whileInView={{ scale: 1 }}
								transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
								viewport={{ once: true }}
							>
								<div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center mb-4">
									<Award className="w-10 h-10 text-white" />
								</div>
							</motion.div>
							<h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--purple-500))]">
								Achievements & Recognition
							</h2>
							<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
								Highlights of my professional journey and accomplishments that showcase my expertise and impact
							</p>
						</div>
						
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{achievements.map((achievement, index) => (
								<motion.div
									key={achievement.title}
									className="group relative text-center p-8 rounded-3xl glass border border-white/20 dark:border-white/10 hover:border-accent-500/50 transition-all duration-500 overflow-hidden"
									initial={{ opacity: 0, y: 30, scale: 0.9 }}
									whileInView={{ opacity: 1, y: 0, scale: 1 }}
									transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 100 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.05, y: -10 }}
								>
									{/* Animated background gradient */}
									<motion.div
										className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
										style={{
											background: `linear-gradient(135deg, ${achievement.color.replace('from-', '').replace('to-', '').split(' ')[0]}, ${achievement.color.replace('from-', '').replace('to-', '').split(' ')[1]})`
										}}
									/>
									
									{/* Glow effect */}
									<motion.div
										className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
										style={{
											background: `linear-gradient(135deg, ${achievement.color.replace('from-', '').replace('to-', '').split(' ')[0]}, ${achievement.color.replace('from-', '').replace('to-', '').split(' ')[1]})`
										}}
									/>

									<div className="relative z-10">
										<motion.div
											className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center shadow-lg`}
											whileHover={{ rotate: 360 }}
											transition={{ duration: 0.6 }}
										>
											<achievement.icon className="w-8 h-8 text-white" />
										</motion.div>
										
										<h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
											{achievement.title}
										</h3>
										<p className="text-muted-foreground group-hover:text-white/80 transition-colors duration-300 leading-relaxed">
											{achievement.description}
										</p>
										
										{/* Animated underline */}
										<motion.div
											className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-accent-500 to-purple-500 mx-auto mt-4 transition-all duration-500"
											initial={{ width: 0 }}
											whileHover={{ width: "100%" }}
										/>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Stats Section */}
			<ScrollytellingSection className="py-20 relative overflow-hidden">
				{/* Background Graphics */}
				<div className="absolute inset-0 -z-10">
					{/* Animated background orbs */}
					<motion.div
						className="absolute top-10 right-1/4 w-32 h-32 bg-gradient-to-br from-accent-500/10 to-purple-500/10 rounded-full blur-2xl"
						animate={{
							y: [0, -30, 0],
							x: [0, 20, 0],
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 10,
							repeat: Infinity,
							ease: "easeInOut"
						}}
					/>
					<motion.div
						className="absolute bottom-10 left-1/3 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-xl"
						animate={{
							y: [0, 25, 0],
							x: [0, -15, 0],
							scale: [1, 0.8, 1],
						}}
						transition={{
							duration: 12,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 3
						}}
					/>
					
					{/* Connecting lines */}
					<svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
						<motion.path
							d="M10,50 Q30,20 50,50 T90,50"
							stroke="url(#gradient1)"
							strokeWidth="0.5"
							fill="none"
							opacity="0.3"
							initial={{ pathLength: 0 }}
							whileInView={{ pathLength: 1 }}
							transition={{ duration: 3, delay: 0.5 }}
							viewport={{ once: true }}
						/>
						<motion.path
							d="M10,30 Q50,60 90,30"
							stroke="url(#gradient2)"
							strokeWidth="0.3"
							fill="none"
							opacity="0.2"
							initial={{ pathLength: 0 }}
							whileInView={{ pathLength: 1 }}
							transition={{ duration: 4, delay: 1 }}
							viewport={{ once: true }}
						/>
						<defs>
							<linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="var(--accent-500)" />
								<stop offset="100%" stopColor="var(--purple-500)" />
							</linearGradient>
							<linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="var(--blue-500)" />
								<stop offset="100%" stopColor="var(--cyan-500)" />
							</linearGradient>
						</defs>
					</svg>
				</div>

				<RevealOnScroll>
					<div className="max-w-6xl mx-auto relative z-10">
						<div className="text-center mb-16">
							<motion.div
								className="inline-block mb-6"
								initial={{ scale: 0, rotate: -180 }}
								whileInView={{ scale: 1, rotate: 0 }}
								transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
								viewport={{ once: true }}
							>
								<div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent-500 to-blue-600 flex items-center justify-center mb-4">
									<TrendingUp className="w-10 h-10 text-white" />
								</div>
							</motion.div>
							<h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--blue-500))]">
								By The Numbers
							</h2>
							<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
								Quantifying my impact and expertise through measurable achievements
							</p>
						</div>
						
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{stats.map((stat, index) => (
								<motion.div
									key={stat.label}
									className="group relative text-center p-8 rounded-3xl glass border border-white/20 dark:border-white/10 hover:border-accent-500/50 transition-all duration-500 overflow-hidden"
									initial={{ opacity: 0, y: 30, scale: 0.9 }}
									whileInView={{ opacity: 1, y: 0, scale: 1 }}
									transition={{ duration: 0.8, delay: index * 0.2, type: "spring", stiffness: 100 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.05, y: -10 }}
								>
									{/* Animated background */}
									<motion.div
										className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
									/>
									
									{/* Glow effect */}
									<motion.div
										className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-accent-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
									/>

									<div className="relative z-10">
										{/* Animated number */}
										<motion.div
											className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400))] mb-4"
											initial={{ scale: 0 }}
											whileInView={{ scale: 1 }}
											transition={{ duration: 0.6, delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
											viewport={{ once: true }}
										>
											{stat.number}
										</motion.div>
										
										{/* Label with icon */}
										<div className="flex items-center justify-center gap-2 mb-2">
											<motion.div
												className="w-2 h-2 rounded-full bg-gradient-to-r from-accent-500 to-purple-500"
												animate={{
													scale: [1, 1.2, 1],
													opacity: [0.7, 1, 0.7],
												}}
												transition={{
													duration: 2,
													repeat: Infinity,
													delay: index * 0.5
												}}
											/>
											<div className="text-muted-foreground group-hover:text-white transition-colors duration-300 font-medium">
												{stat.label}
											</div>
										</div>
										
										{/* Progress bar animation */}
										<motion.div
											className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
											initial={{ opacity: 0 }}
											whileInView={{ opacity: 1 }}
											transition={{ duration: 0.5, delay: index * 0.2 + 0.8 }}
											viewport={{ once: true }}
										>
											<motion.div
												className="h-full bg-gradient-to-r from-accent-500 to-purple-500 rounded-full"
												initial={{ width: 0 }}
												whileInView={{ width: "100%" }}
												transition={{ duration: 1.5, delay: index * 0.2 + 1 }}
												viewport={{ once: true }}
											/>
										</motion.div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Featured Projects */}
			<ScrollytellingSection className="py-20 relative overflow-hidden">
				{/* Background Graphics */}
				<div className="absolute inset-0 -z-10">
					{/* Floating project icons */}
					<motion.div
						className="absolute top-20 right-10 w-16 h-16 bg-gradient-to-br from-accent-500/20 to-purple-500/20 rounded-full blur-lg flex items-center justify-center"
						animate={{
							y: [0, -25, 0],
							rotate: [0, 180, 360],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: "easeInOut"
						}}
					>
						<Code className="w-8 h-8 text-accent-500/60" />
					</motion.div>
					<motion.div
						className="absolute bottom-20 left-10 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-md flex items-center justify-center"
						animate={{
							y: [0, 20, 0],
							rotate: [0, -180, -360],
						}}
						transition={{
							duration: 10,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 2
						}}
					>
						<Brain className="w-6 h-6 text-blue-500/60" />
					</motion.div>
					<motion.div
						className="absolute top-1/2 right-1/4 w-10 h-10 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full blur-sm flex items-center justify-center"
						animate={{
							x: [0, 15, 0],
							y: [0, -10, 0],
							scale: [1, 1.2, 1],
						}}
						transition={{
							duration: 6,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 4
						}}
					>
						<Palette className="w-5 h-5 text-pink-500/60" />
					</motion.div>
					
					{/* Grid pattern */}
					<div className="absolute inset-0 opacity-5">
						<div className="w-full h-full" style={{
							backgroundImage: `linear-gradient(45deg, var(--accent-500) 1px, transparent 1px), linear-gradient(-45deg, var(--accent-500) 1px, transparent 1px)`,
							backgroundSize: '30px 30px'
						}} />
					</div>
				</div>

				<RevealOnScroll>
					<div className="max-w-6xl mx-auto relative z-10">
						<div className="text-center mb-16">
							<motion.div
								className="inline-block mb-6"
								initial={{ scale: 0, rotate: 180 }}
								whileInView={{ scale: 1, rotate: 0 }}
								transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
								viewport={{ once: true }}
							>
								<div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center mb-4">
									<Code className="w-10 h-10 text-white" />
								</div>
							</motion.div>
							<h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--purple-500))]">
							Featured Projects
						</h2>
							<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
								Explore my most impactful work across AI, web development, and design that showcases innovation and technical excellence
							</p>
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			<ScrollytellingSection>
				<RevealOnScroll delay={0.2}>
					<Suspense fallback={
					<div className="max-w-6xl mx-auto">
							<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
								{Array.from({ length: 4 }).map((_, i) => (
									<div key={i} className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 glass">
										<div className="aspect-[16/10] bg-gray-200 dark:bg-gray-800 animate-pulse" />
										<div className="p-6">
											<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse" />
											<div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
										</div>
									</div>
								))}
							</div>
						</div>
					}>
						<FeaturedProjectsPreview />
					</Suspense>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Tech Stack Carousel */}
			<ScrollytellingSection className="py-20 relative overflow-hidden">
				<RevealOnScroll>
					<TechCarousel />
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Services Preview */}
			<ScrollytellingSection className="py-20 relative overflow-hidden">
				{/* Background Graphics */}
				<div className="absolute inset-0 -z-10">
					{/* Floating service icons */}
					<motion.div
						className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-accent-500/20 to-purple-500/20 rounded-full blur-lg flex items-center justify-center"
						animate={{
							y: [0, -25, 0],
							rotate: [0, 180, 360],
						}}
						transition={{
							duration: 8,
							repeat: Infinity,
							ease: "easeInOut"
						}}
					>
						<Palette className="w-8 h-8 text-accent-500/60" />
					</motion.div>
					<motion.div
						className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-md flex items-center justify-center"
						animate={{
							y: [0, 20, 0],
							rotate: [0, -180, -360],
						}}
						transition={{
							duration: 10,
							repeat: Infinity,
							ease: "easeInOut",
							delay: 2
						}}
					>
						<Brain className="w-6 h-6 text-blue-500/60" />
					</motion.div>
				</div>

				<RevealOnScroll>
					<div className="max-w-6xl mx-auto relative z-10">
						<div className="text-center mb-16">
							<motion.div
								className="inline-block mb-6"
								initial={{ scale: 0, rotate: 180 }}
								whileInView={{ scale: 1, rotate: 0 }}
								transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
								viewport={{ once: true }}
							>
								<div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center mb-4">
									<Palette className="w-10 h-10 text-white" />
								</div>
							</motion.div>
							<h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--purple-500))]">
								What I Do
							</h2>
							<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
								Comprehensive solutions spanning development, design, and innovation
							</p>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{services.map((service, index) => (
								<motion.div
									key={service.title}
									className="group glass rounded-3xl p-8 border border-white/20 dark:border-white/10 hover:border-accent-500/50 transition-all duration-500 text-center overflow-hidden"
									initial={{ opacity: 0, y: 30, scale: 0.9 }}
									whileInView={{ opacity: 1, y: 0, scale: 1 }}
									transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 100 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.05, y: -10 }}
								>
									{/* Animated background */}
									<motion.div
										className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
									/>
									
									<div className="relative z-10">
										<motion.div
											className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center shadow-lg"
											whileHover={{ rotate: 360 }}
											transition={{ duration: 0.6 }}
										>
											<service.icon className="w-8 h-8 text-white" />
										</motion.div>
										<h3 className="text-xl font-bold mb-4 group-hover:text-accent-400 transition-colors duration-300">{service.title}</h3>
										<p className="text-muted-foreground mb-6 group-hover:text-white/80 transition-colors duration-300 leading-relaxed">{service.description}</p>
										<div className="flex flex-wrap gap-2 justify-center">
											{service.features.map((feature) => (
											<span
													key={feature}
													className="px-3 py-1 rounded-full text-xs font-medium bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 group-hover:bg-accent-200 dark:group-hover:bg-accent-800 transition-colors duration-300"
											>
													{feature}
											</span>
										))}
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Testimonials Section */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
								What Clients Say
						</h2>
							<p className="text-muted-foreground text-lg">Testimonials from satisfied clients and collaborators</p>
						</div>
						<div className="grid md:grid-cols-3 gap-8">
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={testimonial.author}
									className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.02 }}
								>
									<div className="flex items-center mb-4">
										{Array.from({ length: testimonial.rating }).map((_, i) => (
											<Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
										))}
									</div>
									<p className="text-muted-foreground mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
									<div className="border-t border-white/10 pt-4">
										<div className="font-semibold">{testimonial.author}</div>
										<div className="text-sm text-muted-foreground">{testimonial.role}</div>
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

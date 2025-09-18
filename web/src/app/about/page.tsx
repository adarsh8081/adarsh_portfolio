"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ScrollytellingSection, RevealOnScroll } from "@/components/scrollytelling-section";
import { ParallaxText } from "@/components/scrollytelling-section";
import { Background3DWrapper } from "@/components/background-3d-wrapper";

const timelineData = [
	{
		year: "2021",
		title: "The Beginning",
		description: "Started B.Tech in Computer Science with AI & ML specialization at GLA University",
		icon: "🎓",
		highlight: "Academic Foundation"
	},
	{
		year: "2022",
		title: "First Steps in Tech",
		description: "Began freelance work as Graphic Designer, Video Editor & Content Writer. Started exploring web development and AI/ML concepts.",
		icon: "💡",
		highlight: "Freelance Journey"
	},
	{
		year: "2023",
		title: "AI & ML Deep Dive",
		description: "Completed Machine Learning and Deep Learning Specializations on Coursera. Built first AI projects including CNN Image Classifier and LSTM Energy Predictor.",
		icon: "🤖",
		highlight: "AI Mastery"
	},
	{
		year: "2024",
		title: "Full-Stack Development",
		description: "Internship at Mindware. Developed comprehensive projects including AI Summarization System and Spotify Clone. Conducted Quantum Computing Workshop.",
		icon: "🚀",
		highlight: "Professional Growth"
	},
	{
		year: "2025",
		title: "Innovation & Leadership",
		description: "Coordinated IBM ICE Day & Brij Literature Festival. Built E-Waste Management Prototype. Currently finalizing degree and preparing for advanced roles.",
		icon: "⭐",
		highlight: "Leadership & Innovation"
	}
];

const softSkills = [
	{
		skill: "Leadership",
		description: "Led multiple team projects and coordinated major university events",
		icon: "👥"
	},
	{
		skill: "Communication",
		description: "Effective in both technical and non-technical communication",
		icon: "💬"
	},
	{
		skill: "Team Collaboration",
		description: "Experienced in cross-functional teams and remote collaboration",
		icon: "🤝"
	},
	{
		skill: "Problem-solving",
		description: "Analytical approach to complex technical and business challenges",
		icon: "🧩"
	},
	{
		skill: "Adaptability",
		description: "Quick learner with experience across multiple domains and technologies",
		icon: "🔄"
	}
];

const values = [
	{
		value: "Discipline",
		description: "Consistent work ethic and commitment to excellence",
		icon: "⚡"
	},
	{
		value: "Continuous Learning",
		description: "Always exploring new technologies and methodologies",
		icon: "📚"
	},
	{
		value: "Respect for People",
		description: "Inclusive approach to teamwork and collaboration",
		icon: "🤝"
	},
	{
		value: "Integrity",
		description: "Ethical approach to technology and business decisions",
		icon: "⚖️"
	},
	{
		value: "Empathy",
		description: "User-centric design and understanding diverse perspectives",
		icon: "❤️"
	}
];

const achievements = [
	{
		title: "District-level Under-19 Weightlifting Champion",
		description: "Demonstrated discipline, perseverance, and goal-oriented mindset",
		icon: "🏆"
	},
	{
		title: "10+ Hackathons Participated",
		description: "Consistent participation in competitive programming and innovation challenges",
		icon: "💻"
	},
	{
		title: "Multiple AI/ML Workshops Conducted",
		description: "Shared knowledge and mentored fellow students in emerging technologies",
		icon: "🎯"
	},
	{
		title: "Literario Club Member",
		description: "Content & event management, showcasing leadership and organizational skills",
		icon: "📚"
	}
];

export default function AboutPage() {
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
								About Adarsh
							</motion.h1>
							<motion.p 
								className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								Hi, I&apos;m Adarsh Kumar, a passionate AI/ML Engineer and Full-Stack Developer who thrives on solving complex problems and creating impactful digital solutions.
							</motion.p>
						</div>
					</RevealOnScroll>
				</div>
			</section>

			{/* Personal Story - Split Layout Design */}
			<section className="relative h-screen flex overflow-hidden">
				{/* Left Side - Background Image with Enhanced Quality */}
				<div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-800 via-blue-900 to-slate-700">
					<div className="relative w-full h-full">
						{/* High-quality background image */}
						<div className="absolute inset-0 bg-slate-800">
						<Image 
							src="/images/IMG-20250909-WA0009.jpg" 
							alt="Adarsh Kumar professional portrait" 
							fill
							priority
							className="object-cover object-center"
							style={{
								filter: 'brightness(0.8) contrast(1.1) saturate(1.1)'
							}}
							sizes="(max-width: 768px) 100vw, 50vw"
							quality={90}
						/>
						</div>
						{/* Elegant overlay */}
						<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
						<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
					</div>
				</div>

				{/* Right Side - Content */}
				<div className="w-full lg:w-1/2 p-6 lg:p-12 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-slate-800/95 backdrop-blur-sm flex items-center">
					<div className="max-w-2xl mx-auto lg:mx-0 w-full">
						<RevealOnScroll>
							{/* Profile Image */}
							<motion.div
								className="mb-6 text-center lg:text-left"
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, ease: "easeOut" }}
							>
								<div className="relative inline-block">
									{/* Glow effect */}
									<div className="absolute inset-0 bg-gradient-to-r from-accent-400/30 to-blue-400/30 rounded-full blur-xl scale-110" />
									{/* Profile image */}
									<div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
									<Image 
										src="/images/IMG-20250909-WA0007.jpg" 
										alt="Adarsh Kumar working on coding projects" 
										fill
										priority
										className="object-cover"
										style={{
											filter: 'brightness(1.1) contrast(1.05)'
										}}
										sizes="(max-width: 768px) 100px, 112px"
										quality={90}
									/>
									</div>
								</div>
							</motion.div>

							{/* Title */}
							<motion.h2 
								className="text-4xl lg:text-5xl font-bold mb-6 text-white"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
							>
								My Story
							</motion.h2>
							
							{/* Content */}
							<motion.div
								className="space-y-4 text-base lg:text-lg text-white leading-relaxed"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
							>
								<p>
									From building <span className="text-cyan-200 font-bold">deep learning models</span> to designing <span className="text-blue-200 font-bold">interactive UIs</span>, I bring together technology, creativity, and strategy to craft modern solutions.
								</p>
								<p>
								I&apos;ve contributed to hackathons, workshops, and large-scale projects ranging from AI-powered summarization systems to Spotify-level music streaming platforms.
								</p>
								<p>
								My journey is driven by <span className="text-purple-200 font-bold">curiosity</span> and a passion for <span className="text-cyan-200 font-bold">innovation</span>. Whether it&apos;s developing cutting-edge AI solutions or creating seamless user experiences, I believe in the power of technology to transform ideas into reality.
								</p>
							</motion.div>

							{/* Stats/Highlights */}
							<motion.div
								className="mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
							>
								<div className="text-center lg:text-left">
									<div className="text-xl lg:text-2xl font-bold text-cyan-200 mb-1">50+</div>
									<div className="text-xs text-white font-medium">Projects Completed</div>
								</div>
								<div className="text-center lg:text-left">
									<div className="text-xl lg:text-2xl font-bold text-blue-200 mb-1">3+</div>
									<div className="text-xs text-white font-medium">Years Experience</div>
								</div>
								<div className="text-center lg:text-left col-span-2 lg:col-span-1">
									<div className="text-xl lg:text-2xl font-bold text-purple-200 mb-1">10+</div>
									<div className="text-xs text-white font-medium">Technologies</div>
								</div>
							</motion.div>

							{/* CTA Button */}
							<motion.div
								className="mt-8"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
							>
								<Link href="/projects">
									<button className="group relative px-6 py-3 bg-gradient-to-r from-accent-500 to-blue-500 rounded-full text-white font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
										<span className="relative z-10">View My Work</span>
										<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</button>
								</Link>
							</motion.div>
						</RevealOnScroll>
					</div>
				</div>
			</section>

			{/* Enhanced Timeline */}
			<ScrollytellingSection className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-transparent dark:from-slate-900 dark:via-blue-900/20 dark:to-transparent">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto px-4">
						{/* Section Header */}
						<div className="text-center mb-16">
							<motion.h2 
								className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
							>
								My Journey
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-2xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								A timeline of my growth, achievements, and the milestones that shaped my career in technology
							</motion.p>
						</div>

						{/* Timeline Container */}
						<div className="relative">
							{/* Central Timeline Line */}
							<div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent-500 via-accent-400 to-accent-300 rounded-full shadow-lg hidden md:block" />
							
							{/* Timeline Items */}
							<div className="space-y-16 md:space-y-20">
								{timelineData.map((item, index) => (
									<motion.div
										key={item.year}
										className={`relative flex items-center timeline-mobile ${
											index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
										} flex-col`}
										initial={{ opacity: 0, y: 50 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.8, delay: index * 0.2 }}
										viewport={{ once: true }}
									>
										{/* Timeline Dot */}
										<div className="absolute left-1/2 transform -translate-x-1/2 z-20 timeline-dot hidden md:block">
											<motion.div
												className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-3xl shadow-2xl border-4 border-background relative overflow-hidden timeline-float"
												whileHover={{ scale: 1.1, rotate: 5 }}
												transition={{ type: "spring", stiffness: 300 }}
											>
												{/* Animated background */}
												<div className="absolute inset-0 bg-gradient-to-br from-accent-400 to-accent-600 opacity-0 hover:opacity-100 transition-opacity duration-300" />
												<span className="relative z-10">{item.icon}</span>
												
												{/* Glow effect */}
												<div className="absolute inset-0 rounded-full bg-accent-400/30 blur-xl scale-150 opacity-0 hover:opacity-100 transition-opacity duration-300" />
											</motion.div>
										</div>

										{/* Mobile Timeline Dot */}
										<div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-2xl shadow-2xl border-4 border-background relative overflow-hidden timeline-float md:hidden mb-4">
											<span className="relative z-10">{item.icon}</span>
											<div className="absolute inset-0 rounded-full bg-accent-400/30 blur-xl scale-150 opacity-0 hover:opacity-100 transition-opacity duration-300" />
										</div>

										{/* Content Card */}
										<div className={`w-full md:w-5/12 timeline-content ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} text-center md:text-left`}>
											<motion.div
												className="group relative timeline-card"
												whileHover={{ y: -5 }}
												transition={{ type: "spring", stiffness: 300 }}
											>
												{/* Card Background */}
												<div className="relative timeline-glass rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
													{/* Gradient overlay */}
													<div className="absolute inset-0 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20 dark:to-transparent" />
													
													{/* Content */}
													<div className="relative z-10">
														{/* Year and Category */}
														<div className={`flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end justify-center' : 'md:justify-start justify-center'}`}>
															<span className="text-2xl md:text-3xl font-bold timeline-gradient-text">
																{item.year}
															</span>
															<span className="px-3 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold bg-gradient-to-r from-accent-100 to-accent-200 dark:from-accent-800 dark:to-accent-900 text-accent-700 dark:text-accent-300 shadow-lg">
																{item.highlight}
															</span>
														</div>

														{/* Title */}
														<h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-slate-800 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
															{item.title}
														</h3>

														{/* Description */}
														<p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg">
															{item.description}
														</p>

														{/* Decorative elements */}
														<div className="absolute top-4 right-4 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-accent-200/30 to-accent-300/30 dark:from-accent-700/30 dark:to-accent-800/30 rounded-full blur-xl" />
														<div className="absolute bottom-4 left-4 w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-200/30 to-blue-300/30 dark:from-blue-700/30 dark:to-blue-800/30 rounded-full blur-lg" />
													</div>
												</div>

												{/* Card shadow */}
												<div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
											</motion.div>
										</div>
									</motion.div>
								))}
							</div>
						</div>

						{/* Bottom CTA */}
						<motion.div 
							className="text-center mt-16"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							viewport={{ once: true }}
						>
							<Link href="/projects">
								<button className="group relative px-8 py-4 bg-gradient-to-r from-accent-500 to-blue-500 rounded-full text-white font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
									<span className="relative z-10">Explore My Projects</span>
									<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-accent-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									<div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
								</button>
							</Link>
						</motion.div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Achievements */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Achievements & Recognition
						</h2>
						<div className="grid md:grid-cols-2 gap-6">
							{achievements.map((achievement, index) => (
								<motion.div
									key={achievement.title}
									className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.02 }}
								>
									<div className="flex items-start gap-4">
										<div className="text-3xl">{achievement.icon}</div>
										<div>
											<h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
											<p className="text-muted-foreground">{achievement.description}</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Soft Skills */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Soft Skills
						</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{softSkills.map((skill, index) => (
								<motion.div
									key={skill.skill}
									className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.05, y: -5 }}
								>
									<div className="text-4xl mb-4">{skill.icon}</div>
									<h3 className="text-xl font-semibold mb-2">{skill.skill}</h3>
									<p className="text-muted-foreground">{skill.description}</p>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Enhanced Core Values */}
			<ScrollytellingSection className="py-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-transparent dark:from-slate-900 dark:via-purple-900/20 dark:to-transparent relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-accent-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
				</div>

				<RevealOnScroll>
					<div className="max-w-7xl mx-auto relative z-10">
						{/* Section Header */}
						<div className="text-center mb-16">
							<motion.h2 
								className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
							>
								Core Values
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								The principles that guide my work, shape my decisions, and drive my passion for creating meaningful impact
							</motion.p>
						</div>

						{/* Values Grid */}
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{values.map((value, index) => (
								<motion.div
									key={value.value}
									className="group relative"
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.15 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.02 }}
								>
									{/* Card Background */}
									<div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden h-full">
										{/* Gradient overlay */}
										<div className="absolute inset-0 bg-gradient-to-br from-accent-50/30 to-transparent dark:from-accent-900/10 dark:to-transparent" />
										
										{/* Animated background pattern */}
										<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-200/20 to-transparent dark:from-accent-700/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
										<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/20 to-transparent dark:from-blue-700/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />

										{/* Content */}
										<div className="relative z-10 h-full flex flex-col">
											{/* Icon Container */}
											<motion.div 
												className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-800 dark:to-accent-900 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300"
												whileHover={{ rotate: 10 }}
												transition={{ type: "spring", stiffness: 300 }}
											>
												<span className="group-hover:scale-110 transition-transform duration-300">
													{value.icon}
												</span>
											</motion.div>

											{/* Title */}
											<h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
												{value.value}
											</h3>

											{/* Description */}
											<p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-grow">
												{value.description}
											</p>

											{/* Bottom accent line */}
											<div className="mt-6 h-1 bg-gradient-to-r from-accent-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										</div>

										{/* Hover glow effect */}
										<div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>

									{/* Card shadow */}
									<div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</motion.div>
							))}
						</div>

						{/* Bottom Quote */}
						<motion.div 
							className="text-center mt-16 max-w-4xl mx-auto"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							viewport={{ once: true }}
						>
							<blockquote className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-300 italic leading-relaxed">
								&ldquo;These values aren&apos;t just words on a page—they&apos;re the foundation of how I approach every project, 
								every collaboration, and every opportunity to make a positive impact through technology.&rdquo;
							</blockquote>
							<div className="mt-6 h-1 w-24 bg-gradient-to-r from-accent-500 to-blue-500 rounded-full mx-auto" />
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



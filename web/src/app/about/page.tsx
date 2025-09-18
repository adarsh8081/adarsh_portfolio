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
						<img 
							src="/web/images/IMG-20250909-WA0009.jpg" 
							alt="Adarsh Kumar professional portrait" 
							className="w-full h-full object-cover object-center"
							style={{
								filter: 'brightness(0.8) contrast(1.1) saturate(1.1)'
							}}
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

			{/* Timeline */}
			<ScrollytellingSection className="py-16 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20">
				<RevealOnScroll>
					<div className="max-w-4xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							My Journey
						</h2>
						<div className="relative">
							{/* Timeline Line */}
							<div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent-500 to-accent-300" />
							
							{timelineData.map((item, index) => (
								<motion.div
									key={item.year}
									className="relative flex items-start gap-8 mb-12"
									initial={{ opacity: 0, x: -50 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									{/* Timeline Dot */}
									<div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-2xl relative z-10 border-4 border-background">
										{item.icon}
									</div>
									
									{/* Content */}
									<div className="flex-1 glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
										<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
											<span className="text-2xl font-bold text-accent-600">{item.year}</span>
											<span className="px-3 py-1 rounded-full text-sm font-medium bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300">
												{item.highlight}
											</span>
										</div>
										<h3 className="text-xl font-semibold mb-2">{item.title}</h3>
										<p className="text-muted-foreground">{item.description}</p>
									</div>
								</motion.div>
							))}
						</div>
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

			{/* Values */}
			<ScrollytellingSection className="py-16 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Core Values
						</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{values.map((value, index) => (
								<motion.div
									key={value.value}
									className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.05, y: -5 }}
								>
									<div className="text-4xl mb-4">{value.icon}</div>
									<h3 className="text-xl font-semibold mb-2">{value.value}</h3>
									<p className="text-muted-foreground">{value.description}</p>
								</motion.div>
							))}
						</div>
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



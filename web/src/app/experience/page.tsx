"use client";

import { motion } from "framer-motion";
import { ScrollytellingSection, RevealOnScroll } from "@/components/scrollytelling-section";
import { ParallaxText } from "@/components/scrollytelling-section";
import { Background3DWrapper } from "@/components/background-3d-wrapper";

const experienceData = [
	{
		title: "Software Developer",
		company: "Mindware Technologies",
		period: "Jan 2025 - Present",
		location: "Remote",
		description: "Full-time software development role focusing on enterprise-level applications and innovative solutions.",
		achievements: [
			"Developing scalable software solutions for enterprise clients",
			"Collaborating with cross-functional teams on complex projects",
			"Implementing best practices in software development and code quality",
			"Contributing to architectural decisions and technical planning"
		],
		tech: ["Software Development", "Enterprise Solutions", "Team Collaboration", "Full-Stack Development"],
		icon: "💻",
		type: "Full-Time"
	},
	{
		title: "Machine Learning Developer",
		company: "V.developer Pvt. Ltd.",
		period: "Aug 2023 - Dec 2024",
		location: "Remote",
		description: "Specialized in developing and deploying machine learning models and AI solutions for various business applications.",
		achievements: [
			"Developed and deployed ML models for business intelligence and automation",
			"Built AI-powered applications processing large datasets with high accuracy",
			"Collaborated with data scientists and engineers on ML pipeline development",
			"Implemented MLOps practices for model deployment and monitoring"
		],
		tech: ["Python", "Machine Learning", "TensorFlow", "PyTorch", "MLOps", "Data Science"],
		icon: "🤖",
		type: "Full-Time"
	},
	{
		title: "President",
		company: "Club Literario, GLA University",
		period: "Aug 2024 - Mar 2025",
		location: "Mathura, India",
		description: "Leading the literary club and organizing cultural events, workshops, and competitions for university students.",
		achievements: [
			"Led a team of 50+ members in organizing literary and cultural events",
			"Coordinated workshops, competitions, and guest lectures for 1000+ students",
			"Managed club operations, budget planning, and event logistics",
			"Enhanced student engagement and cultural activities on campus"
		],
		tech: ["Leadership", "Event Management", "Team Management", "Public Speaking", "Project Coordination"],
		icon: "👑",
		type: "Leadership"
	},
	{
		title: "IBM ICE Day & Brij Literature Festival — Coordinator",
		company: "GLA University",
		period: "2024 - Present",
		location: "Mathura, India",
		description: "Leading technical and cultural fest coordination with focus on innovation and community engagement.",
		achievements: [
			"Managed technical and cultural fest events, coordinating logistics and technical workflows",
			"Boosted team collaboration and handled multi-event execution successfully",
			"Organized workshops and competitions for 500+ participants",
			"Implemented digital solutions for event management and participant tracking"
		],
		tech: ["Event Management", "Leadership", "Project Coordination", "Team Management"],
		icon: "🎯",
		type: "Leadership"
	},
	{
		title: "AI/ML Engineer & Full-Stack Developer",
		company: "Freelance & Personal Projects",
		period: "2023 - Present",
		location: "Remote",
		description: "Developing cutting-edge AI solutions and full-stack applications for diverse clients and personal projects.",
		achievements: [
			"Built AI-powered summarization system processing 10,000+ documents with 95% accuracy",
			"Developed complete Spotify clone with real-time sync and advanced music features",
			"Created CNN-based image classifier achieving 92% accuracy on custom datasets",
			"Implemented LSTM energy prediction model with 15% improvement over baseline",
			"Designed and deployed 3D interactive portfolio with 60fps performance"
		],
		tech: ["Python", "TensorFlow", "PyTorch", "React", "Next.js", "Node.js", "AWS", "Docker"],
		icon: "🚀",
		type: "Freelance"
	},
	{
		title: "Freelance Graphic Designer, Video Editor & Content Writer",
		company: "Self-Employed",
		period: "2022 - Present",
		location: "Remote",
		description: "Delivering high-quality creative services and content strategy for multiple clients across various industries.",
		achievements: [
			"Designed branding material, UI mockups, and engaging video content for 20+ clients",
			"Delivered high-quality content strategy + visuals for multiple clients",
			"Maintained 95% client satisfaction rate with on-time delivery",
			"Developed comprehensive brand identities and marketing materials"
		],
		tech: ["Adobe Creative Suite", "Figma", "Video Editing", "Content Strategy", "Brand Design"],
		icon: "🎨",
		type: "Freelance"
	}
];

const skills = [
	{
		category: "Technical Leadership",
		level: 90,
		description: "Leading technical teams and coordinating complex projects"
	},
	{
		category: "Full-Stack Development",
		level: 85,
		description: "End-to-end web application development"
	},
	{
		category: "AI/ML Implementation",
		level: 80,
		description: "Building and deploying machine learning solutions"
	},
	{
		category: "Creative Design",
		level: 88,
		description: "UI/UX design and visual content creation"
	},
	{
		category: "Project Management",
		level: 82,
		description: "Planning, executing, and delivering projects successfully"
	}
];

export default function ExperiencePage() {
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
								Experience
							</motion.h1>
							<motion.p 
								className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								My professional journey showcasing leadership, technical expertise, and measurable impact across diverse roles.
							</motion.p>
						</div>
					</RevealOnScroll>
				</div>
			</section>

			{/* Experience Timeline */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-5xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Professional Timeline
						</h2>
						<div className="relative">
							{/* Timeline Line */}
							<div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-500 via-accent-400 to-accent-300 rounded-full" />
							
							{experienceData.map((exp, index) => (
								<motion.div
									key={exp.title}
									className="relative flex items-start gap-8 mb-16"
									initial={{ opacity: 0, x: -50 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.8, delay: index * 0.2 }}
									viewport={{ once: true }}
								>
									{/* Timeline Dot */}
									<div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-2xl relative z-10 border-4 border-background shadow-lg">
										{exp.icon}
									</div>
									
									{/* Content */}
									<div className="flex-1 glass rounded-3xl p-8 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300">
										<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
											<div className="flex-1">
												<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
													<h3 className="text-2xl font-bold">{exp.title}</h3>
													<span className="px-3 py-1 rounded-full text-sm font-medium bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300">
														{exp.type}
													</span>
												</div>
												<p className="text-lg font-semibold text-accent-600 mb-1">{exp.company}</p>
												<div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
													<span>{exp.period}</span>
													<span className="hidden sm:inline">•</span>
													<span>{exp.location}</span>
												</div>
											</div>
										</div>
										
										<p className="text-lg text-muted-foreground mb-6">{exp.description}</p>
										
										<div className="mb-6">
											<h4 className="text-lg font-semibold mb-3">Key Achievements:</h4>
											<ul className="space-y-2">
												{exp.achievements.map((achievement, idx) => (
													<li key={idx} className="flex items-start gap-3">
														<span className="text-accent-500 mt-1">✓</span>
														<span className="text-muted-foreground">{achievement}</span>
													</li>
												))}
											</ul>
										</div>
										
										<div className="flex flex-wrap gap-2">
											{exp.tech.map((tech, idx) => (
												<span
													key={idx}
													className="px-3 py-1 rounded-full text-sm font-medium"
													style={{ 
														background: "var(--gradient-1)", 
														color: "white" 
													}}
												>
													{tech}
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

			{/* Enhanced Skills & Expertise */}
			<ScrollytellingSection className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-transparent dark:from-slate-900 dark:via-blue-900/20 dark:to-transparent relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-accent-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
								Skills & Expertise
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								My technical proficiency across different domains, measured by real-world experience and continuous learning
							</motion.p>
						</div>

						{/* Skills Grid */}
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{skills.map((skill, index) => (
								<motion.div
									key={skill.category}
									className="group relative skills-card skills-float"
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
											{/* Skill Header */}
											<div className="mb-6">
												<h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
													{skill.category}
												</h3>
												
												{/* Progress Bar Container */}
												<div className="relative skills-progress-bar">
													<div className="w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full h-3 mb-3 overflow-hidden">
														<motion.div
															className="h-3 rounded-full bg-gradient-to-r from-accent-500 via-accent-400 to-accent-300 relative overflow-hidden"
															initial={{ width: 0 }}
															whileInView={{ width: `${skill.level}%` }}
															transition={{ duration: 1.5, delay: index * 0.2 }}
															viewport={{ once: true }}
														>
															{/* Animated shimmer effect */}
															<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" />
														</motion.div>
													</div>
													
													{/* Percentage Display */}
													<div className="flex justify-between items-center">
														<span className="text-sm font-medium text-slate-600 dark:text-slate-400">
															Proficiency Level
														</span>
														<motion.span 
															className={`text-2xl font-bold bg-gradient-to-r from-accent-600 to-accent-400 bg-clip-text text-transparent ${
																skill.level >= 90 ? 'skill-expert' :
																skill.level >= 80 ? 'skill-advanced' :
																skill.level >= 70 ? 'skill-intermediate' : 'skill-learning'
															}`}
															initial={{ scale: 0 }}
															whileInView={{ scale: 1 }}
															transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
															viewport={{ once: true }}
														>
															{skill.level}%
														</motion.span>
													</div>
												</div>
											</div>

											{/* Description */}
											<p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-grow text-base">
												{skill.description}
											</p>

											{/* Skill Level Indicator */}
											<div className="mt-6 flex items-center gap-2">
												<div className="flex-1 h-1 bg-gradient-to-r from-accent-500 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
												<span className={`text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
													skill.level >= 90 ? 'skill-expert' :
													skill.level >= 80 ? 'skill-advanced' :
													skill.level >= 70 ? 'skill-intermediate' : 'skill-learning'
												}`}>
													{skill.level >= 90 && "Expert Level"}
													{skill.level >= 80 && skill.level < 90 && "Advanced Level"}
													{skill.level >= 70 && skill.level < 80 && "Intermediate Level"}
													{skill.level < 70 && "Learning & Growing"}
												</span>
											</div>
										</div>

										{/* Hover glow effect */}
										<div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>

									{/* Card shadow */}
									<div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</motion.div>
							))}
						</div>

						{/* Skills Summary */}
						<motion.div 
							className="text-center mt-16 max-w-4xl mx-auto"
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.5 }}
							viewport={{ once: true }}
						>
							<div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-white/10">
								<h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
									Continuous Growth & Learning
								</h3>
								<p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
									These percentages represent my current proficiency levels, but I&apos;m always learning and expanding my skills. 
									Technology evolves rapidly, and so do I—committed to staying at the forefront of innovation.
								</p>
								<div className="mt-6 h-1 w-24 bg-gradient-to-r from-accent-500 to-blue-500 rounded-full mx-auto" />
							</div>
						</motion.div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Parallax Text */}
			<ParallaxText className="py-16">
				<div className="text-center">
					<h2 className="text-6xl md:text-8xl font-bold opacity-10 select-none">
						EXCELLENCE
					</h2>
				</div>
			</ParallaxText>
		</main>
	);
}



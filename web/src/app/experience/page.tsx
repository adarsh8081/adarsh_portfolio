"use client";

import { motion } from "framer-motion";
import { ScrollytellingSection, RevealOnScroll } from "@/components/scrollytelling-section";
import { ParallaxText } from "@/components/scrollytelling-section";
import { Background3DWrapper } from "@/components/background-3d-wrapper";

const experienceData = [
	{
		title: "IBM ICE Day & Brij Literature Festival — Coordinator",
		company: "GLA University",
		period: "2024 - Present",
		location: "Delhi, India",
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
		location: "Delhi, India",
		description: "Developing cutting-edge AI solutions and full-stack applications for diverse clients and personal projects.",
		achievements: [
			"Built AI-powered summarization system processing 10,000+ documents with 95% accuracy",
			"Developed complete Spotify clone with real-time sync and advanced music features",
			"Created CNN-based image classifier achieving 92% accuracy on custom datasets",
			"Implemented LSTM energy prediction model with 15% improvement over baseline",
			"Designed and deployed 3D interactive portfolio with 60fps performance"
		],
		tech: ["Python", "TensorFlow", "PyTorch", "React", "Next.js", "Node.js", "AWS", "Docker"],
		icon: "🤖",
		type: "AI/ML Development"
	},
	{
		title: "Mindware — Software Development Intern",
		company: "Mindware Technologies",
		period: "2024",
		location: "Remote",
		description: "Gained hands-on experience in corporate work culture while developing real-time project solutions.",
		achievements: [
			"Developed solutions for real-time projects, gaining experience in corporate work culture",
			"Enhanced technical exposure in Python scripting & web development",
			"Collaborated with senior developers on enterprise-level applications",
			"Contributed to code reviews and documentation processes"
		],
		tech: ["Python", "Web Development", "Corporate Culture", "Team Collaboration"],
		icon: "💼",
		type: "Internship"
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

			{/* Skills Overview */}
			<ScrollytellingSection className="py-16 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Skills & Expertise
						</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{skills.map((skill, index) => (
								<motion.div
									key={skill.category}
									className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.02 }}
								>
									<div className="mb-4">
										<h3 className="text-lg font-semibold mb-2">{skill.category}</h3>
										<div className="w-full bg-muted/20 rounded-full h-2 mb-2">
											<motion.div
												className="h-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-400"
												initial={{ width: 0 }}
												whileInView={{ width: `${skill.level}%` }}
												transition={{ duration: 1, delay: index * 0.1 }}
												viewport={{ once: true }}
											/>
										</div>
										<span className="text-sm text-muted-foreground">{skill.level}%</span>
									</div>
									<p className="text-sm text-muted-foreground">{skill.description}</p>
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
						EXCELLENCE
					</h2>
				</div>
			</ParallaxText>
		</main>
	);
}



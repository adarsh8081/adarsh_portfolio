"use client";

import { motion } from "framer-motion";
import { ScrollytellingSection, RevealOnScroll } from "@/components/scrollytelling-section";
import { ParallaxText } from "@/components/scrollytelling-section";
import { Background3DWrapper } from "@/components/background-3d-wrapper";

const skillCategories = [
	{
		name: "Programming Languages",
		skills: [
			{ name: "Python", level: 95, color: "#3776ab", icon: "🐍" },
			{ name: "JavaScript", level: 90, color: "#f7df1e", icon: "⚡" },
			{ name: "TypeScript", level: 88, color: "#3178c6", icon: "🔷" },
			{ name: "Java", level: 85, color: "#ed8b00", icon: "☕" },
			{ name: "Bash", level: 80, color: "#4eaa25", icon: "💻" }
		]
	},
	{
		name: "Web Development",
		skills: [
			{ name: "React", level: 92, color: "#61dafb", icon: "⚛️" },
			{ name: "Next.js", level: 90, color: "#000000", icon: "▲" },
			{ name: "Node.js", level: 88, color: "#339933", icon: "🟢" },
			{ name: "Flask", level: 85, color: "#000000", icon: "🌶️" },
			{ name: "Django", level: 82, color: "#092e20", icon: "🎸" }
		]
	},
	{
		name: "AI/ML & Data Science",
		skills: [
			{ name: "TensorFlow", level: 90, color: "#ff6f00", icon: "🧠" },
			{ name: "PyTorch", level: 88, color: "#ee4c2c", icon: "🔥" },
			{ name: "Scikit-learn", level: 85, color: "#f7931e", icon: "🔬" },
			{ name: "Pandas", level: 92, color: "#150458", icon: "🐼" },
			{ name: "NumPy", level: 90, color: "#4dabcf", icon: "🔢" }
		]
	},
	{
		name: "Deep Learning",
		skills: [
			{ name: "CNN", level: 88, color: "#ff6b6b", icon: "👁️" },
			{ name: "RNN/LSTM", level: 85, color: "#4ecdc4", icon: "🔄" },
			{ name: "Transformers", level: 82, color: "#45b7d1", icon: "🤖" },
			{ name: "BERT", level: 80, color: "#96ceb4", icon: "📝" },
			{ name: "GPT", level: 78, color: "#feca57", icon: "💬" }
		]
	},
	{
		name: "DevOps & Tools",
		skills: [
			{ name: "Git", level: 95, color: "#f05032", icon: "📚" },
			{ name: "Docker", level: 85, color: "#2496ed", icon: "🐳" },
			{ name: "AWS", level: 80, color: "#ff9900", icon: "☁️" },
			{ name: "Prisma", level: 88, color: "#2d3748", icon: "🗄️" },
			{ name: "MLflow", level: 75, color: "#0194e2", icon: "📊" }
		]
	},
	{
		name: "Soft Skills",
		skills: [
			{ name: "Leadership", level: 90, color: "#8e44ad", icon: "👑" },
			{ name: "Teamwork", level: 92, color: "#3498db", icon: "🤝" },
			{ name: "Communication", level: 88, color: "#e74c3c", icon: "💬" },
			{ name: "Problem Solving", level: 95, color: "#f39c12", icon: "🧩" },
			{ name: "Event Management", level: 85, color: "#2ecc71", icon: "🎯" }
		]
	}
];


// Removed unused RadialProgress component - replaced with card-based design

export default function SkillsPage() {
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
								Skills & Expertise
							</motion.h1>
							<motion.p 
								className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								A comprehensive overview of my technical skills, tools, and expertise across multiple domains.
							</motion.p>
						</div>
					</RevealOnScroll>
				</div>
			</section>

			{/* Skills Overview - Modern Design */}
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
								className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
							>
								Technical Expertise
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								My comprehensive skill set across programming languages, frameworks, and cutting-edge technologies
							</motion.p>
						</div>

						{/* Skills Stats */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
							{[
								{ number: "25+", label: "Technologies", icon: "⚡", color: "from-yellow-500 to-orange-400" },
								{ number: "6", label: "Categories", icon: "🎯", color: "from-blue-500 to-purple-400" },
								{ number: "90%", label: "Average Proficiency", icon: "📈", color: "from-green-500 to-teal-400" },
								{ number: "5+", label: "Years Learning", icon: "🚀", color: "from-pink-500 to-red-400" }
							].map((stat, index) => (
								<motion.div
									key={stat.label}
									className="group relative"
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.15 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.05 }}
								>
									<div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-white/10 overflow-hidden h-full">
										<div className="text-center">
											<div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
												{stat.icon}
											</div>
											<div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
												{stat.number}
											</div>
											<div className="text-sm text-muted-foreground font-medium">
												{stat.label}
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Skills Categories - Modern Design */}
			{skillCategories.map((category, categoryIndex) => (
				<ScrollytellingSection 
					key={category.name} 
					className={`py-20 ${categoryIndex % 2 === 0 ? 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-transparent dark:from-slate-900 dark:via-blue-900/20 dark:to-transparent' : 'bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-transparent dark:from-purple-900/20 dark:via-pink-900/10 dark:to-transparent'} relative overflow-hidden`}
				>
					{/* Background Effects */}
					<div className="absolute inset-0">
						<div className={`absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r ${categoryIndex % 2 === 0 ? 'from-blue-400/10 to-cyan-400/10' : 'from-purple-400/10 to-pink-400/10'} rounded-full blur-3xl`} />
						<div className={`absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r ${categoryIndex % 2 === 0 ? 'from-accent-400/10 to-blue-400/10' : 'from-pink-400/10 to-purple-400/10'} rounded-full blur-2xl`} />
					</div>

					<RevealOnScroll>
						<div className="max-w-7xl mx-auto relative z-10">
							{/* Category Header */}
							<div className="text-center mb-16">
								<motion.h3 
									className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]"
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8 }}
									viewport={{ once: true }}
								>
									{category.name}
								</motion.h3>
								<motion.div 
									className="h-1 w-24 bg-gradient-to-r from-accent-500 to-blue-500 rounded-full mx-auto"
									initial={{ scaleX: 0 }}
									whileInView={{ scaleX: 1 }}
									transition={{ duration: 0.8, delay: 0.2 }}
									viewport={{ once: true }}
								/>
							</div>
							
							{/* Skills Grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
								{category.skills.map((skill, skillIndex) => (
									<motion.div
										key={skill.name}
										className="group relative"
										initial={{ opacity: 0, y: 50 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.8, delay: skillIndex * 0.1 }}
										viewport={{ once: true }}
										whileHover={{ y: -10, scale: 1.05 }}
									>
										{/* Skill Card */}
										<div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden h-full">
											{/* Gradient overlay */}
											<div className="absolute inset-0 bg-gradient-to-br from-accent-50/30 to-transparent dark:from-accent-900/10 dark:to-transparent" />
											
											{/* Animated background pattern */}
											<div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent-200/20 to-transparent dark:from-accent-700/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />

											{/* Content */}
											<div className="relative z-10 text-center">
												{/* Icon */}
												<motion.div 
													className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300"
													whileHover={{ rotate: 10 }}
													transition={{ type: "spring", stiffness: 300 }}
												>
													{skill.icon}
												</motion.div>

												{/* Skill Name */}
												<h4 className="text-lg font-bold mb-4 text-slate-800 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
													{skill.name}
												</h4>

												{/* Progress Bar */}
												<div className="mb-4">
													<div className="w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full h-3 mb-2 overflow-hidden">
														<motion.div
															className="h-3 rounded-full relative overflow-hidden"
															style={{ backgroundColor: skill.color }}
															initial={{ width: 0 }}
															whileInView={{ width: `${skill.level}%` }}
															transition={{ duration: 1.5, delay: skillIndex * 0.1 + 0.3 }}
															viewport={{ once: true }}
														>
															{/* Shimmer effect */}
															<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" />
														</motion.div>
													</div>
													<div className="flex justify-between items-center">
														<span className="text-xs text-slate-600 dark:text-slate-400">
															Proficiency
														</span>
														<motion.span 
															className="text-lg font-bold"
															style={{ color: skill.color }}
															initial={{ scale: 0 }}
															whileInView={{ scale: 1 }}
															transition={{ duration: 0.5, delay: skillIndex * 0.1 + 0.5 }}
															viewport={{ once: true }}
														>
															{skill.level}%
														</motion.span>
													</div>
												</div>

												{/* Skill Level Badge */}
												<div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
													skill.level >= 90 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
													skill.level >= 80 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
													skill.level >= 70 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
													'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
												}`}>
													{skill.level >= 90 && "Expert"}
													{skill.level >= 80 && skill.level < 90 && "Advanced"}
													{skill.level >= 70 && skill.level < 80 && "Intermediate"}
													{skill.level < 70 && "Learning"}
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
						</div>
					</RevealOnScroll>
				</ScrollytellingSection>
			))}

			{/* Skills Summary - Enhanced */}
			<ScrollytellingSection className="py-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-transparent dark:from-slate-900 dark:via-purple-900/20 dark:to-transparent relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-accent-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
				</div>

				<RevealOnScroll>
					<div className="max-w-6xl mx-auto relative z-10">
						{/* Section Header */}
						<div className="text-center mb-16">
							<motion.h2 
								className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
							>
								Technical Proficiency Summary
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								A comprehensive overview of my core strengths and specializations
							</motion.p>
						</div>

						{/* Summary Cards */}
						<div className="grid md:grid-cols-2 gap-8">
							{[
								{
									title: "Core Strengths",
									icon: "💪",
									items: [
										"Full-stack web development with modern frameworks",
										"AI/ML model development and deployment",
										"Data processing and analysis with Python",
										"UI/UX design and creative content creation"
									],
									color: "from-blue-500 to-cyan-400"
								},
								{
									title: "Specializations",
									icon: "🎯",
									items: [
										"Deep learning and neural networks",
										"Real-time applications and APIs",
										"Cloud deployment and DevOps",
										"Project leadership and team coordination"
									],
									color: "from-purple-500 to-pink-400"
								}
							].map((section, index) => (
								<motion.div
									key={section.title}
									className="group relative"
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.2 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.02 }}
								>
									{/* Card Background */}
									<div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden h-full">
										{/* Gradient overlay */}
										<div className="absolute inset-0 bg-gradient-to-br from-accent-50/30 to-transparent dark:from-accent-900/10 dark:to-transparent" />
										
										{/* Animated background pattern */}
										<div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${section.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />

										{/* Content */}
										<div className="relative z-10">
											{/* Header */}
											<div className="flex items-center gap-4 mb-6">
												<div className="text-4xl group-hover:scale-110 transition-transform duration-300">
													{section.icon}
												</div>
												<h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
													{section.title}
												</h3>
											</div>

											{/* Items */}
											<ul className="space-y-4">
												{section.items.map((item, itemIndex) => (
													<motion.li 
														key={item}
														className="flex items-start gap-3 text-slate-600 dark:text-slate-300"
														initial={{ opacity: 0, x: -20 }}
														whileInView={{ opacity: 1, x: 0 }}
														transition={{ duration: 0.6, delay: itemIndex * 0.1 }}
														viewport={{ once: true }}
													>
														<div className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.color} mt-2 flex-shrink-0`} />
														<span className="leading-relaxed">{item}</span>
													</motion.li>
												))}
											</ul>

											{/* Bottom accent line */}
											<div className={`mt-6 h-1 bg-gradient-to-r ${section.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
										</div>

										{/* Hover glow effect */}
										<div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>

									{/* Card shadow */}
									<div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
						MASTERY
					</h2>
				</div>
			</ParallaxText>
		</main>
	);
}



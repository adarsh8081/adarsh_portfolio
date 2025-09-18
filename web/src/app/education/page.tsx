"use client";

import { motion } from "framer-motion";
import { ScrollytellingSection, RevealOnScroll } from "@/components/scrollytelling-section";
import { ParallaxText } from "@/components/scrollytelling-section";
import { Background3DWrapper } from "@/components/background-3d-wrapper";

const educationData = [
	{
		title: "B.Tech in Computer Science (AI & ML)",
		institution: "GLA University",
		period: "2021 - 2025",
		location: "Mathura, India",
		description: "Specialized program focusing on artificial intelligence, machine learning, and advanced computer science concepts.",
		highlights: [
			"CGPA: 8.5/10",
			"Specialization in AI & ML",
			"Active participation in technical fests",
			"President of Literario Club"
		],
		logo: "🎓",
		type: "Degree",
		status: "Graduated",
		grade: "8.5/10",
		year: 2021,
		universityLogo: "https://gla.school.blog/wp-content/uploads/2020/02/gla-university-logo.jpg"
	},
	{
		title: "Higher Secondary Education (+2)",
		institution: "JLM Inter College",
		period: "2019 - 2021",
		location: "Iffco Phulpur, Prayagraj",
		description: "Completed 12th standard with Science stream, focusing on Physics, Chemistry, Mathematics, and Computer Science.",
		highlights: [
			"Percentage: 85%",
			"Science Stream (PCM + CS)",
			"Active in school competitions",
			"Member of Science Club"
		],
		logo: "📚",
		type: "Higher Secondary",
		status: "Completed",
		grade: "85%",
		year: 2019
	},
	{
		title: "Secondary Education (10th)",
		institution: "JLM Inter College",
		period: "2017 - 2019",
		location: "Iffco Phulpur, Prayagraj",
		description: "Completed 10th standard with excellent academic performance and active participation in extracurricular activities.",
		highlights: [
			"Percentage: 92%",
			"School Topper in Mathematics",
			"Active in sports and cultural events",
			"Member of Student Council"
		],
		logo: "🏆",
		type: "Secondary",
		status: "Completed",
		grade: "92%",
		year: 2017
	}
];

const certifications = [
	{
		title: "Machine Learning",
		provider: "Coursera",
		period: "2023",
		description: "Comprehensive course covering supervised and unsupervised learning algorithms, model evaluation, and practical applications.",
		skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Python", "Scikit-learn"],
		logo: "🤖",
		credential: "Verified Certificate",
		status: "Completed"
	},
	{
		title: "Deep Learning Specialization",
		provider: "Coursera",
		period: "2023",
		description: "Advanced specialization covering neural networks, CNNs, RNNs, and modern deep learning architectures.",
		skills: ["Neural Networks", "CNN", "RNN", "TensorFlow", "Keras", "PyTorch"],
		logo: "🧠",
		credential: "Specialization Certificate",
		status: "Completed"
	},
	{
		title: "Web Development Bootcamp",
		provider: "Udemy",
		period: "2022",
		description: "Full-stack web development course covering modern frameworks and best practices.",
		skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "HTML/CSS"],
		logo: "💻",
		credential: "Course Certificate",
		status: "Completed"
	},
	{
		title: "Quantum Computing Workshop",
		provider: "GLA University",
		period: "2024",
		description: "Conducted comprehensive quantum computing workshop covering quantum algorithms, quantum gates, and practical implementations.",
		skills: ["Qiskit", "Quantum Algorithms", "Linear Algebra", "Quantum Gates", "Python"],
		logo: "⚛️",
		credential: "Workshop Certificate",
		status: "Conducted"
	}
];

const achievements = [
	{
		title: "District-level Under-19 Weightlifting Champion",
		year: "2020",
		description: "Demonstrated discipline, perseverance, and goal-oriented mindset through competitive sports.",
		icon: "🏆",
		category: "Sports"
	},
	{
		title: "10+ Hackathons Participated",
		year: "2021-2024",
		description: "Consistent participation in competitive programming and innovation challenges across various platforms.",
		icon: "💻",
		category: "Competitions"
	},
	{
		title: "Multiple AI/ML Workshops Conducted",
		year: "2023-2024",
		description: "Shared knowledge and mentored fellow students in emerging technologies and AI concepts.",
		icon: "🎯",
		category: "Leadership"
	},
	{
		title: "President - Literario Club",
		year: "2021-2024",
		description: "Led content & event management initiatives, showcasing exceptional leadership and organizational skills in cultural activities. Managed club operations, coordinated events, and mentored fellow members.",
		icon: "👑",
		category: "Leadership"
	}
];

export default function EducationPage() {
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
								Education & Certifications
							</motion.h1>
							<motion.p 
								className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								My academic journey, professional certifications, and continuous learning achievements.
							</motion.p>
						</div>
					</RevealOnScroll>
				</div>
			</section>

			{/* Education Timeline - Modern Design */}
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
								Academic Journey
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								My educational progression from school to university, showcasing consistent academic excellence
							</motion.p>
						</div>

						{/* Timeline */}
						<div className="relative">
							{/* Central Timeline Line */}
							<div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent-500 via-accent-400 to-accent-300 rounded-full shadow-lg hidden md:block" />
							
							{/* Timeline Items - Compact Spacing */}
							<div className="space-y-16 md:space-y-20">
								{educationData.map((edu, index) => (
									<motion.div
										key={edu.title}
										className={`relative flex items-start ${
											index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
										} flex-col`}
										initial={{ opacity: 0, y: 50 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.8, delay: index * 0.2 }}
										viewport={{ once: true }}
									>
										{/* Timeline Dot */}
										<div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:block top-8">
											<motion.div
												className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-3xl shadow-2xl border-4 border-background relative overflow-hidden"
												whileHover={{ scale: 1.1, rotate: 5 }}
												transition={{ type: "spring", stiffness: 300 }}
											>
												<span className="relative z-10">{edu.logo}</span>
												<div className="absolute inset-0 rounded-full bg-accent-400/30 blur-xl scale-150 opacity-0 hover:opacity-100 transition-opacity duration-300" />
											</motion.div>
										</div>

										{/* Mobile Timeline Dot */}
										<div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-2xl shadow-2xl border-4 border-background relative overflow-hidden md:hidden mb-4">
											<span className="relative z-10">{edu.logo}</span>
											<div className="absolute inset-0 rounded-full bg-accent-400/30 blur-xl scale-150 opacity-0 hover:opacity-100 transition-opacity duration-300" />
										</div>

										{/* Content Card - Compact and Dense */}
										<div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} text-center md:text-left`}>
											<motion.div
												className="group relative"
												whileHover={{ y: -5 }}
												transition={{ type: "spring", stiffness: 300 }}
											>
												{/* Card Background - Compact */}
												<div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30 dark:border-white/20 overflow-hidden">
													{/* Gradient overlay */}
													<div className="absolute inset-0 bg-gradient-to-br from-accent-50/60 to-transparent dark:from-accent-900/30 dark:to-transparent" />
													
													{/* Content */}
													<div className="relative z-10">
														{/* Header Section - Compact */}
														<div className="flex items-start justify-between mb-4">
															{/* University Logo (for B.Tech only) */}
															{edu.universityLogo && (
																<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 p-2 shadow-lg border border-white/30 dark:border-white/20 flex items-center justify-center relative overflow-hidden">
																	{/* Fallback text logo */}
																	<div className="text-xs font-bold text-white text-center z-10">
																		GLA
																	</div>
																	{/* Image logo */}
																	<img 
																		src={edu.universityLogo} 
																		alt={`${edu.institution} Logo`}
																		className="absolute inset-0 w-full h-full object-contain opacity-0 hover:opacity-100 transition-opacity duration-300"
																		onLoad={(e) => {
																			// Hide text when image loads successfully
																			const textElement = e.currentTarget.parentElement?.querySelector('div');
																			if (textElement) {
																				textElement.style.display = 'none';
																			}
																			e.currentTarget.style.opacity = '1';
																		}}
																	/>
																</div>
															)}
															
															{/* Year and Status */}
															<div className="flex flex-col items-end gap-2">
																<span className="text-2xl font-bold text-accent-600 dark:text-accent-400">
																	{edu.year}
																</span>
																<span className={`px-3 py-1 rounded-full text-xs font-semibold ${
																	edu.status === 'Graduated' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
																	edu.status === 'Completed' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
																	'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
																}`}>
																	{edu.status}
																</span>
															</div>
														</div>

														{/* Title Section - Compact */}
														<div className="mb-4">
															<h3 className="text-xl font-bold mb-1 text-slate-800 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
																{edu.title}
															</h3>
															<p className="text-lg font-semibold text-accent-600 dark:text-accent-400">
																{edu.institution}
															</p>
														</div>

														{/* Details Section - Compact Grid */}
														<div className="mb-4">
															<div className="grid grid-cols-2 gap-4 mb-3">
																{/* Period */}
																<div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
																	<span className="text-accent-500">📅</span>
																	<span className="text-sm font-medium">{edu.period}</span>
																</div>
																{/* Location */}
																<div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
																	<span className="text-accent-500">📍</span>
																	<span className="text-sm font-medium">{edu.location}</span>
																</div>
															</div>
															
															{/* Grade - Compact */}
															<div className="flex items-center gap-2 p-2 bg-accent-50/50 dark:bg-accent-900/20 rounded-lg">
																<span className="text-accent-500">🎯</span>
																<span className="text-lg font-bold text-accent-600 dark:text-accent-400">
																	{edu.grade}
																</span>
																<span className="text-slate-600 dark:text-slate-400 text-sm">CGPA</span>
															</div>
														</div>

														{/* Description - Compact */}
														<p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-sm">
															{edu.description}
														</p>

														{/* Highlights Section - Compact */}
														<div>
															<h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
																Key Highlights:
															</h4>
															<div className="space-y-1">
																{edu.highlights.map((highlight, idx) => (
																	<div key={idx} className="flex items-center gap-2">
																		<span className="text-accent-500 text-sm">✓</span>
																		<span className="text-xs text-slate-600 dark:text-slate-300">{highlight}</span>
																	</div>
																))}
															</div>
														</div>

														{/* Decorative elements */}
														<div className="absolute top-3 right-3 w-12 h-12 bg-gradient-to-br from-accent-200/30 to-accent-300/30 dark:from-accent-700/30 dark:to-accent-800/30 rounded-full blur-lg" />
														<div className="absolute bottom-3 left-3 w-8 h-8 bg-gradient-to-br from-blue-200/30 to-blue-300/30 dark:from-blue-700/30 dark:to-blue-800/30 rounded-full blur-md" />
													</div>
												</div>

												{/* Card shadow */}
												<div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
											</motion.div>
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Certifications - Enhanced Design */}
			<ScrollytellingSection className="py-20 bg-gradient-to-br from-purple-50/30 via-pink-50/20 to-transparent dark:from-purple-900/20 dark:via-pink-900/10 dark:to-transparent relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-accent-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
								Certifications & Courses
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								Professional certifications and courses that have enhanced my technical expertise
							</motion.p>
						</div>

						{/* Certifications Grid */}
						<div className="grid md:grid-cols-2 gap-8">
							{certifications.map((cert, index) => (
								<motion.div
									key={cert.title}
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
										<div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent-200/20 to-transparent dark:from-accent-700/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />

										{/* Content */}
										<div className="relative z-10">
											{/* Header */}
											<div className="flex items-start gap-4 mb-6">
												<div className="text-4xl group-hover:scale-110 transition-transform duration-300">
													{cert.logo}
												</div>
												<div className="flex-1">
													<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
														<h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
															{cert.title}
														</h3>
														<span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
															{cert.status}
														</span>
													</div>
													<p className="text-sm font-semibold text-accent-600 dark:text-accent-400 mb-1">
														{cert.provider}
													</p>
													<p className="text-xs text-muted-foreground">
														{cert.period} • {cert.credential}
													</p>
												</div>
											</div>

											{/* Description */}
											<p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
												{cert.description}
											</p>

											{/* Skills */}
											<div className="mb-4">
												<h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
													Skills Gained:
												</h4>
												<div className="flex flex-wrap gap-2">
													{cert.skills.map((skill, idx) => (
														<motion.span
															key={idx}
															className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-accent-500 to-blue-500 text-white shadow-lg"
															initial={{ scale: 0 }}
															whileInView={{ scale: 1 }}
															transition={{ duration: 0.3, delay: idx * 0.05 }}
															viewport={{ once: true }}
															whileHover={{ scale: 1.05 }}
														>
															{skill}
														</motion.span>
													))}
												</div>
											</div>

											{/* Bottom accent line */}
											<div className="h-1 bg-gradient-to-r from-accent-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

			{/* Achievements - Enhanced Design */}
			<ScrollytellingSection className="py-20 bg-gradient-to-br from-slate-50 via-green-50/30 to-transparent dark:from-slate-900 dark:via-green-900/20 dark:to-transparent relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
								Achievements & Recognition
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								Notable achievements and recognitions that highlight my dedication and excellence
							</motion.p>
						</div>

						{/* Achievements Grid */}
						<div className="grid md:grid-cols-2 gap-8">
							{achievements.map((achievement, index) => (
								<motion.div
									key={achievement.title}
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
										<div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent-200/20 to-transparent dark:from-accent-700/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />

										{/* Content */}
										<div className="relative z-10">
											{/* Header */}
											<div className="flex items-start gap-4 mb-6">
												<div className="text-4xl group-hover:scale-110 transition-transform duration-300">
													{achievement.icon}
												</div>
												<div className="flex-1">
													<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
														<h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
															{achievement.title}
														</h3>
														<span className="px-3 py-1 rounded-full text-xs font-semibold bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300">
															{achievement.category}
														</span>
													</div>
													<p className="text-sm font-semibold text-accent-600 dark:text-accent-400 mb-2">
														{achievement.year}
													</p>
												</div>
											</div>

											{/* Description */}
											<p className="text-slate-600 dark:text-slate-300 leading-relaxed">
												{achievement.description}
											</p>

											{/* Bottom accent line */}
											<div className="mt-6 h-1 bg-gradient-to-r from-accent-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
						LEARNING
					</h2>
				</div>
			</ParallaxText>
		</main>
	);
}



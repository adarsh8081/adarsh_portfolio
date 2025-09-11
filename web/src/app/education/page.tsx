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
			"Member of Literario Club"
		],
		logo: "🎓",
		type: "Degree",
		status: "Pursuing"
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
		title: "Literario Club Member",
		year: "2021-2024",
		description: "Content & event management, showcasing leadership and organizational skills in cultural activities.",
		icon: "📚",
		category: "Extracurricular"
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

			{/* Education */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Academic Background
						</h2>
						<div className="grid md:grid-cols-1 gap-8">
							{educationData.map((edu, index) => (
								<motion.div
									key={edu.title}
									className="glass rounded-3xl p-8 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.02 }}
								>
									<div className="flex flex-col lg:flex-row gap-8 items-start">
										<div className="flex-shrink-0">
											<div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-3xl">
												{edu.logo}
											</div>
										</div>
										<div className="flex-1">
											<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
												<h3 className="text-2xl font-bold">{edu.title}</h3>
												<span className="px-3 py-1 rounded-full text-sm font-medium bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300">
													{edu.status}
												</span>
											</div>
											<p className="text-lg font-semibold text-accent-600 mb-2">{edu.institution}</p>
											<div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground mb-4">
												<span>{edu.period}</span>
												<span className="hidden sm:inline">•</span>
												<span>{edu.location}</span>
											</div>
											<p className="text-muted-foreground mb-4">{edu.description}</p>
											<div className="grid sm:grid-cols-2 gap-2">
												{edu.highlights.map((highlight, idx) => (
													<div key={idx} className="flex items-center gap-2">
														<span className="text-accent-500">✓</span>
														<span className="text-sm">{highlight}</span>
													</div>
												))}
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Certifications */}
			<ScrollytellingSection className="py-16 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Certifications & Courses
						</h2>
						<div className="grid md:grid-cols-2 gap-6">
							{certifications.map((cert, index) => (
								<motion.div
									key={cert.title}
									className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.02 }}
								>
									<div className="flex items-start gap-4 mb-4">
										<div className="text-3xl">{cert.logo}</div>
										<div className="flex-1">
											<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
												<h3 className="text-lg font-semibold">{cert.title}</h3>
												<span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
													{cert.status}
												</span>
											</div>
											<p className="text-sm font-medium text-accent-600 mb-1">{cert.provider}</p>
											<p className="text-xs text-muted-foreground">{cert.period} • {cert.credential}</p>
										</div>
									</div>
									<p className="text-sm text-muted-foreground mb-4">{cert.description}</p>
									<div className="flex flex-wrap gap-2">
										{cert.skills.map((skill, idx) => (
											<span
												key={idx}
												className="px-2 py-1 rounded-full text-xs font-medium"
												style={{ 
													background: "var(--gradient-1)", 
													color: "white" 
												}}
											>
												{skill}
											</span>
										))}
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
										<div className="flex-1">
											<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
												<h3 className="text-lg font-semibold">{achievement.title}</h3>
												<span className="px-2 py-1 rounded-full text-xs font-medium bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300">
													{achievement.category}
												</span>
											</div>
											<p className="text-sm text-muted-foreground mb-2">{achievement.year}</p>
											<p className="text-sm text-muted-foreground">{achievement.description}</p>
										</div>
									</div>
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



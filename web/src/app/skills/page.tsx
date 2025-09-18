"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import { ScrollytellingSection, RevealOnScroll } from "@/components/scrollytelling-section";
import { ParallaxText } from "@/components/scrollytelling-section";
import { useRef, useMemo } from "react";
import * as THREE from "three";
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

function SkillSphere() {
	const meshRef = useRef<THREE.Mesh>(null);
	const groupRef = useRef<THREE.Group>(null);

	useFrame((state) => {
		if (meshRef.current) {
			meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
			meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
		}
		if (groupRef.current) {
			groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
		}
	});

	const skills = useMemo(() => [
		{ name: "AI/ML", position: [2, 0, 0], color: "#ff6f00" },
		{ name: "Web Dev", position: [-2, 0, 0], color: "#61dafb" },
		{ name: "Python", position: [0, 2, 0], color: "#3776ab" },
		{ name: "React", position: [0, -2, 0], color: "#61dafb" },
		{ name: "Data", position: [0, 0, 2], color: "#4dabcf" },
		{ name: "Design", position: [0, 0, -2], color: "#e74c3c" }
	], []);

	return (
		<group ref={groupRef}>
			<Sphere ref={meshRef} args={[1.5, 32, 32]} position={[0, 0, 0]}>
				<meshStandardMaterial
					color="var(--accent-500)"
					transparent
					opacity={0.3}
					wireframe
				/>
			</Sphere>
			{skills.map((skill) => (
				<Sphere
					key={skill.name}
					args={[0.2, 16, 16]}
					position={skill.position as [number, number, number]}
				>
					<meshBasicMaterial color={skill.color} />
				</Sphere>
			))}
		</group>
	);
}

function RadialProgress({ skill, index }: { skill: { name: string; level: number; color: string; icon: string }; index: number }) {
	const circumference = 2 * Math.PI * 45;
	const strokeDasharray = circumference;
	const strokeDashoffset = circumference - (skill.level / 100) * circumference;

	return (
		<motion.div
			className="relative w-32 h-32 flex items-center justify-center"
			initial={{ opacity: 0, scale: 0.8 }}
			whileInView={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.6, delay: index * 0.1 }}
			viewport={{ once: true }}
		>
			<svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
				<circle
					cx="50"
					cy="50"
					r="45"
					stroke="currentColor"
					strokeWidth="8"
					fill="none"
					className="text-muted/20"
				/>
				<motion.circle
					cx="50"
					cy="50"
					r="45"
					stroke={skill.color}
					strokeWidth="8"
					fill="none"
					strokeLinecap="round"
					strokeDasharray={strokeDasharray}
					initial={{ strokeDashoffset: circumference }}
					whileInView={{ strokeDashoffset }}
					transition={{ duration: 1.5, delay: index * 0.1 }}
					viewport={{ once: true }}
				/>
			</svg>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<div className="text-2xl mb-1">{skill.icon}</div>
				<span className="text-lg font-bold" style={{ color: skill.color }}>
					{skill.level}%
				</span>
				<span className="text-xs text-muted-foreground text-center px-2">
					{skill.name}
				</span>
			</div>
		</motion.div>
	);
}

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

			{/* 3D Skills Visualization */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-4xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							3D Skills Overview
						</h2>
						<div className="h-96 glass rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden">
							<Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
								<ambientLight intensity={0.6} />
								<directionalLight position={[5, 5, 5]} intensity={1.2} />
								<pointLight position={[-5, -5, 5]} intensity={0.8} color="var(--accent-400)" />
								<SkillSphere />
								<OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
							</Canvas>
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Skills Categories - New Design */}
			{skillCategories.map((category, categoryIndex) => (
				<ScrollytellingSection 
					key={category.name} 
					className={`py-16 ${categoryIndex % 2 === 0 ? 'bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20' : ''}`}
				>
					<RevealOnScroll>
						<div className="max-w-7xl mx-auto">
							<h3 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
								{category.name}
							</h3>
							
							{/* New Card-based Layout */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{category.skills.map((skill, skillIndex) => (
									<motion.div
										key={skill.name}
										className="group glass rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl"
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.6, delay: skillIndex * 0.1 }}
										viewport={{ once: true }}
									>
										{/* Skill Header */}
										<div className="flex items-center gap-4 mb-4">
											<div className="text-3xl">{skill.icon}</div>
											<div className="flex-1">
												<h4 className="text-lg font-semibold">{skill.name}</h4>
												<div className="flex items-center gap-2">
													<div className="flex-1 bg-muted/20 rounded-full h-2">
														<motion.div
															className="h-2 rounded-full"
															style={{ backgroundColor: skill.color }}
															initial={{ width: 0 }}
															whileInView={{ width: `${skill.level}%` }}
															transition={{ duration: 1.5, delay: skillIndex * 0.1 }}
															viewport={{ once: true }}
														/>
													</div>
													<span className="text-sm font-bold" style={{ color: skill.color }}>
														{skill.level}%
													</span>
												</div>
											</div>
										</div>
										
										{/* Skill Description */}
										<div className="text-sm text-muted-foreground">
											{skill.level >= 90 && "Expert level proficiency"}
											{skill.level >= 80 && skill.level < 90 && "Advanced proficiency"}
											{skill.level >= 70 && skill.level < 80 && "Intermediate proficiency"}
											{skill.level < 70 && "Learning and growing"}
										</div>
									</motion.div>
								))}
							</div>
						</div>
					</RevealOnScroll>
				</ScrollytellingSection>
			))}

			{/* Skills Summary */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-4xl mx-auto">
						<div className="glass rounded-3xl p-8 sm:p-12 border border-white/20 dark:border-white/10">
							<h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
								Technical Proficiency Summary
							</h2>
							<div className="grid md:grid-cols-2 gap-8">
								<div>
									<h3 className="text-xl font-semibold mb-4">Core Strengths</h3>
									<ul className="space-y-2 text-muted-foreground">
										<li className="flex items-center gap-2">
											<span className="text-accent-500">✓</span>
											Full-stack web development with modern frameworks
										</li>
										<li className="flex items-center gap-2">
											<span className="text-accent-500">✓</span>
											AI/ML model development and deployment
										</li>
										<li className="flex items-center gap-2">
											<span className="text-accent-500">✓</span>
											Data processing and analysis with Python
										</li>
										<li className="flex items-center gap-2">
											<span className="text-accent-500">✓</span>
											UI/UX design and creative content creation
										</li>
									</ul>
								</div>
								<div>
									<h3 className="text-xl font-semibold mb-4">Specializations</h3>
									<ul className="space-y-2 text-muted-foreground">
										<li className="flex items-center gap-2">
											<span className="text-accent-500">✓</span>
											Deep learning and neural networks
										</li>
										<li className="flex items-center gap-2">
											<span className="text-accent-500">✓</span>
											Real-time applications and APIs
										</li>
										<li className="flex items-center gap-2">
											<span className="text-accent-500">✓</span>
											Cloud deployment and DevOps
										</li>
										<li className="flex items-center gap-2">
											<span className="text-accent-500">✓</span>
											Project leadership and team coordination
										</li>
									</ul>
								</div>
							</div>
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



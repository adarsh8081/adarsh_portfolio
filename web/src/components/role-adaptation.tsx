"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type RoleType = "job" | "freelance" | "academia";

interface RoleAdaptationProps {
	children: React.ReactNode;
	roleType: RoleType;
}

const roleConfigs = {
	job: {
		title: "For Job Applications",
		description: "Highlighting technical depth, ML/AI expertise, and teamwork",
		accent: "var(--brand-accent)",
		icon: "💼"
	},
	freelance: {
		title: "For Freelance Projects", 
		description: "Emphasizing creativity, versatility, and client satisfaction",
		accent: "var(--accent-400)",
		icon: "🎨"
	},
	academia: {
		title: "For Academia",
		description: "Showcasing research mindset, projects, and workshops conducted",
		accent: "var(--accent-600)",
		icon: "🎓"
	}
};

export function RoleAdaptation({ children, roleType }: RoleAdaptationProps) {
	const [activeRole, setActiveRole] = useState<RoleType>(roleType);
	const config = roleConfigs[activeRole];

	return (
		<div className="w-full">
			{/* Role Selector */}
			<div className="flex justify-center mb-8">
				<div className="glass rounded-2xl p-2 border border-white/20 dark:border-white/10">
					<div className="flex gap-2">
						{Object.entries(roleConfigs).map(([key, config]) => (
							<button
								key={key}
								onClick={() => setActiveRole(key as RoleType)}
								className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
									activeRole === key
										? "text-white"
										: "text-muted-foreground hover:text-foreground"
								}`}
								style={{
									background: activeRole === key ? config.accent : "transparent"
								}}
							>
								<span className="mr-2">{config.icon}</span>
								{config.title}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Role Description */}
			<motion.div
				key={activeRole}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="text-center mb-8"
			>
				<h3 className="text-2xl font-bold mb-2" style={{ color: config.accent }}>
					{config.title}
				</h3>
				<p className="text-muted-foreground">{config.description}</p>
			</motion.div>

			{/* Content */}
			<AnimatePresence mode="wait">
				<motion.div
					key={activeRole}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}
				>
					{children}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}

// Role-specific content components
export function JobApplicationContent() {
	return (
		<div className="space-y-6">
			<div className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
				<h4 className="text-xl font-semibold mb-4 text-brand-accent">Technical Expertise</h4>
				<ul className="space-y-2 text-muted-foreground">
					<li>• Advanced ML/AI model development and deployment</li>
					<li>• Full-stack development with modern frameworks</li>
					<li>• Cloud architecture and DevOps practices</li>
					<li>• Data science and analytics proficiency</li>
				</ul>
			</div>
			
			<div className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
				<h4 className="text-xl font-semibold mb-4 text-brand-accent">Team Collaboration</h4>
				<ul className="space-y-2 text-muted-foreground">
					<li>• Led cross-functional teams in 10+ hackathons</li>
					<li>• Coordinated major university events (IBM ICE Day, Literature Festival)</li>
					<li>• Mentored peers in AI/ML and web development</li>
					<li>• Effective communication across technical and non-technical stakeholders</li>
				</ul>
			</div>
		</div>
	);
}

export function FreelanceContent() {
	return (
		<div className="space-y-6">
			<div className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
				<h4 className="text-xl font-semibold mb-4 text-accent-400">Creative Versatility</h4>
				<ul className="space-y-2 text-muted-foreground">
					<li>• Graphic Design & Video Editing expertise</li>
					<li>• Content Writing and Technical Documentation</li>
					<li>• UI/UX Design with modern design principles</li>
					<li>• 3D Visuals and Interactive Experiences</li>
				</ul>
			</div>
			
			<div className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
				<h4 className="text-xl font-semibold mb-4 text-accent-400">Client Satisfaction</h4>
				<ul className="space-y-2 text-muted-foreground">
					<li>• 100% client satisfaction rate in freelance projects</li>
					<li>• Quick turnaround times with quality deliverables</li>
					<li>• Custom solutions tailored to client needs</li>
					<li>• Ongoing support and maintenance services</li>
				</ul>
			</div>
		</div>
	);
}

export function AcademiaContent() {
	return (
		<div className="space-y-6">
			<div className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
				<h4 className="text-xl font-semibold mb-4 text-accent-600">Research & Innovation</h4>
				<ul className="space-y-2 text-muted-foreground">
					<li>• Published research in AI/ML applications</li>
					<li>• Quantum Computing Workshop conductor</li>
					<li>• E-Waste Management research project</li>
					<li>• LSTM Energy Prediction research</li>
				</ul>
			</div>
			
			<div className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10">
				<h4 className="text-xl font-semibold mb-4 text-accent-600">Educational Impact</h4>
				<ul className="space-y-2 text-muted-foreground">
					<li>• Trained 50+ students in quantum computing</li>
					<li>• Conducted technical workshops and seminars</li>
					<li>• Mentored junior developers and students</li>
					<li>• Contributed to open-source educational resources</li>
				</ul>
			</div>
		</div>
	);
}

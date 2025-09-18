"use client";

import { motion } from "framer-motion";
import { ScrollytellingSection, RevealOnScroll } from "@/components/scrollytelling-section";
import { ParallaxText } from "@/components/scrollytelling-section";
import { Background3DWrapper } from "@/components/background-3d-wrapper";
import { BlogList } from "@/components/blog-list";
import { PenTool, BookOpen, TrendingUp, Users } from "lucide-react";

const blogStats = [
	{
		number: "25+",
		label: "Articles Published",
		icon: PenTool,
		color: "from-blue-500 to-cyan-400"
	},
	{
		number: "10K+",
		label: "Total Reads",
		icon: BookOpen,
		color: "from-purple-500 to-pink-400"
	},
	{
		number: "95%",
		label: "Reader Satisfaction",
		icon: TrendingUp,
		color: "from-green-500 to-emerald-400"
	},
	{
		number: "5K+",
		label: "Active Readers",
		icon: Users,
		color: "from-orange-500 to-red-400"
	}
];

export default function BlogPage() {
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
								Blog & Insights
							</motion.h1>
							<motion.p 
								className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								Exploring the latest in technology, AI/ML, web development, and creative solutions through in-depth articles and tutorials.
							</motion.p>
						</div>
					</RevealOnScroll>
				</div>
			</section>

			{/* Blog Stats */}
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
								Blog Impact
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								Sharing knowledge and insights that make a difference in the tech community
							</motion.p>
						</div>

						{/* Stats Grid */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
							{blogStats.map((stat, index) => (
								<motion.div
									key={stat.label}
									className="group relative"
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.15 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.05 }}
								>
									<div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden h-full">
										<div className="text-center">
											<div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
												<stat.icon className="w-8 h-8 mx-auto" />
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

			{/* Blog Content */}
			<ScrollytellingSection className="py-20">
				<RevealOnScroll>
					<div className="max-w-7xl mx-auto">
						<BlogList />
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Parallax Text */}
			<ParallaxText className="py-16">
				<div className="text-center">
					<h2 className="text-6xl md:text-8xl font-bold opacity-10 select-none">
						KNOWLEDGE
					</h2>
				</div>
			</ParallaxText>
		</main>
	);
}



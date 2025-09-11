"use client";

import { motion } from "framer-motion";
import { ProjectsGallery } from "@/components/projects-gallery";
import { ScrollytellingSection, RevealOnScroll } from "@/components/scrollytelling-section";
import { ParallaxText } from "@/components/scrollytelling-section";
import { Background3DWrapper } from "@/components/background-3d-wrapper";

export default function ProjectsPage() {
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
								Featured Projects
							</motion.h1>
							<motion.p 
								className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								Explore my portfolio of innovative projects spanning AI/ML, full-stack development, and creative solutions.
							</motion.p>
						</div>
					</RevealOnScroll>
				</div>
			</section>

			{/* Projects Stats */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{[
								{ number: "8+", label: "Projects Completed" },
								{ number: "95%", label: "Client Satisfaction" },
								{ number: "10+", label: "Technologies Used" },
								{ number: "3+", label: "Years Experience" }
							].map((stat, index) => (
								<motion.div
									key={stat.label}
									className="text-center"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									<div className="text-4xl font-bold text-accent-600 mb-2">{stat.number}</div>
									<div className="text-muted-foreground">{stat.label}</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Projects Gallery */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="container-safe">
						<ProjectsGallery />
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Call to Action */}
			<ScrollytellingSection className="py-16 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20">
				<RevealOnScroll>
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Interested in Working Together?
						</h2>
						<p className="text-xl text-muted-foreground mb-8">
							I&apos;m always excited to take on new challenges and create innovative solutions. Let&apos;s discuss your next project!
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="/contact"
								className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
								style={{ 
									background: "linear-gradient(135deg, var(--accent-600), var(--accent-400))",
									boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)"
								}}
							>
								Get In Touch
							</a>
							<a
								href="https://github.com/adarsh8081"
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold border-2 border-accent-500/30 transition-all duration-300 hover:border-accent-500 hover:bg-accent-500/10 hover:scale-105"
								style={{ 
									background: "color-mix(in srgb, var(--foreground) 6%, transparent)",
									backdropFilter: "blur(10px)"
								}}
							>
								View GitHub
							</a>
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



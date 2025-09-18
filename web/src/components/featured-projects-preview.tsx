"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

// Filter to get only the 4 specific projects
const featuredProjectIds = [
	"tagsindia-ecommerce",
	"ai-summarization", 
	"spotify-clone",
	"e-waste-management"
];

const featuredProjects = projects.filter(project => 
	featuredProjectIds.includes(project.id)
);

export function FeaturedProjectsPreview() {
	return (
		<div className="max-w-7xl mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
				{featuredProjects.map((project, index) => (
					<motion.div
						key={project.id}
						className="group relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: index * 0.15, type: "spring", stiffness: 100 }}
						viewport={{ once: true }}
						whileHover={{ scale: 1.03, y: -8 }}
					>
						{/* Gradient overlay for better contrast */}
						<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
						
						{/* Project Image */}
						<div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
							<img
								src={project.image}
								alt={project.title}
								className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								onError={(e) => {
									console.error(`Failed to load image for ${project.title}:`, project.image);
									// Show a fallback with project icon
									const fallback = e.currentTarget.parentElement;
									if (fallback) {
										fallback.innerHTML = `
											<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10">
												<div class="text-center">
													<div class="w-20 h-20 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
														<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
														</svg>
													</div>
													<p class="text-lg font-semibold text-gray-800 dark:text-white">${project.title}</p>
												</div>
											</div>
										`;
									}
								}}
								onLoad={() => {
									console.log(`Successfully loaded image for ${project.title}:`, project.image);
								}}
							/>
							
							{/* Gradient overlay for better text readability */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
							
							{/* Action Buttons */}
							<div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
								{project.links?.live && (
									<Link
										href={project.links.live}
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
										onClick={(e) => e.stopPropagation()}
									>
										<ExternalLink className="w-4 h-4 text-gray-800" />
									</Link>
								)}
								{project.links?.repo && (
									<Link
										href={project.links.repo}
										target="_blank"
										rel="noopener noreferrer"
										className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
										onClick={(e) => e.stopPropagation()}
									>
										<Github className="w-4 h-4 text-gray-800" />
									</Link>
								)}
							</div>
						</div>

						{/* Project Content */}
						<div className="p-6 relative z-10 flex flex-col h-full">
							{/* Tags */}
							<div className="flex flex-wrap gap-2 mb-3">
								{project.tags.slice(0, 2).map((tag) => (
									<span
										key={tag}
										className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-sm"
									>
										{tag}
									</span>
								))}
							</div>

							{/* Title */}
							<h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
								{project.title}
							</h3>

							{/* Description */}
							<p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-2 flex-grow">
								{project.description}
							</p>

							{/* Impact */}
							{project.impact && (
								<div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
									<div className="flex items-start gap-2">
										<div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
											<svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
											</svg>
										</div>
										<p className="text-xs font-medium text-green-800 dark:text-green-200 leading-relaxed line-clamp-2">
											{project.impact}
										</p>
									</div>
								</div>
							)}

							{/* Tech Stack */}
							<div className="flex flex-wrap gap-1.5 mt-auto">
								{project.tech.slice(0, 2).map((tech) => (
									<span
										key={tech}
										className="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
									>
										{tech}
									</span>
								))}
								{project.tech.length > 2 && (
									<span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
										+{project.tech.length - 2}
									</span>
								)}
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* View More Button */}
			<motion.div
				className="text-center mt-16"
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				viewport={{ once: true }}
			>
				<Link
					href="/projects"
					className="group inline-flex items-center gap-3 px-10 py-4 rounded-2xl text-lg font-bold text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 shadow-lg"
				>
					<span>View All Projects</span>
					<ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
				</Link>
			</motion.div>
		</div>
	);
}

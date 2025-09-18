"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { allTags, projects as allProjects, type Project } from "@/data/projects";
import { X, ExternalLink, Github, Star } from "lucide-react";

function ProjectModal({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) {
	if (!project) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					onClick={onClose}
				>
					<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl border border-white/20 dark:border-white/10"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="relative">
							<button
								onClick={onClose}
								className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
							<div className="relative aspect-[16/9]">
								<img 
									src={project.image} 
									alt={project.title} 
									className="w-full h-full object-cover rounded-t-3xl"
								/>
								{project.featured && (
									<div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-accent-500 text-white text-sm font-medium">
										<Star className="w-4 h-4 fill-current" />
										Featured
									</div>
								)}
							</div>
						</div>
						
						<div className="p-8">
							<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
								<div className="flex-1">
									<h2 className="text-3xl font-bold mb-2">{project.title}</h2>
									<p className="text-lg text-muted-foreground mb-4">{project.description}</p>
									{project.impact && (
										<div className="mb-4 p-3 rounded-lg bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800">
											<p className="text-sm font-medium text-accent-700 dark:text-accent-300">
												📈 Impact: {project.impact}
											</p>
										</div>
									)}
								</div>
								<div className="flex gap-3">
									{project.links?.live && (
										<a
											href={project.links.live}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105"
											style={{ background: "linear-gradient(135deg, var(--accent-600), var(--accent-400))" }}
										>
											<ExternalLink className="w-4 h-4" />
											Live Demo
										</a>
									)}
									{project.links?.repo && (
										<a
											href={project.links.repo}
											target="_blank"
											rel="noreferrer"
											className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-foreground/20 hover:border-accent-500 hover:bg-accent-500/10 transition-all duration-300"
										>
											<Github className="w-4 h-4" />
											Source Code
										</a>
									)}
								</div>
							</div>
							
							<div className="mb-6">
								<h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
								<div className="flex flex-wrap gap-2">
									{project.tech.map((tech, idx) => (
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
							
							<div className="flex flex-wrap gap-2">
								{project.tags.map((tag) => (
									<span 
										key={tag} 
										className="px-3 py-1 rounded-full text-sm border border-accent-200 dark:border-accent-800 text-accent-700 dark:text-accent-300"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			whileHover={{ y: -6 }}
			className="group rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 glass cursor-pointer"
			onClick={onClick}
		>
			<div className="relative aspect-[16/10] bg-gray-200 dark:bg-gray-800">
				<img 
					src={project.image} 
					alt={project.title} 
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				{project.featured && (
					<div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-accent-500 text-white text-xs font-medium">
						<Star className="w-3 h-3 fill-current" />
						Featured
					</div>
				)}
				<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						whileHover={{ opacity: 1, scale: 1 }}
						className="p-3 rounded-full bg-white/90 dark:bg-black/90"
					>
						<ExternalLink className="w-5 h-5" />
					</motion.div>
				</div>
			</div>
			<div className="p-4">
				<h3 className="font-semibold tracking-tight mb-1">{project.title}</h3>
				<p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
				<div className="mt-3 flex flex-wrap gap-2">
					{project.tags.slice(0, 3).map((t) => (
						<span key={t} className="text-xs px-2 py-1 rounded-full border border-black/5 dark:border-white/10">
							{t}
						</span>
					))}
					{project.tags.length > 3 && (
						<span className="text-xs px-2 py-1 rounded-full border border-black/5 dark:border-white/10">
							+{project.tags.length - 3}
						</span>
					)}
				</div>
			</div>
		</motion.div>
	);
}

export function ProjectsGallery() {
	const [activeTag, setActiveTag] = useState<string>("All");
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const filtered = useMemo(() => {
		if (activeTag === "All") return allProjects;
		return allProjects.filter((p) => p.tags.includes(activeTag));
	}, [activeTag]);

	const handleProjectClick = (project: Project) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setTimeout(() => setSelectedProject(null), 300);
	};

	return (
		<div>
			<div className="flex flex-wrap gap-3 mb-8">
				{["All", ...allTags].map((tag) => (
					<button
						key={tag}
						onClick={() => setActiveTag(tag)}
						className={clsx(
							"px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
							activeTag === tag 
								? "text-white" 
								: "border border-accent-200 dark:border-accent-800 text-accent-700 dark:text-accent-300 hover:border-accent-500 hover:bg-accent-500/10"
						)}
						style={activeTag === tag ? { background: "var(--gradient-1)" } : {}}
					>
						{tag}
					</button>
				))}
			</div>
			
			<AnimatePresence mode="popLayout">
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{filtered.map((p) => (
						<ProjectCard 
							key={p.id} 
							project={p} 
							onClick={() => handleProjectClick(p)}
						/>
					))}
				</div>
			</AnimatePresence>

			<ProjectModal 
				project={selectedProject}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</div>
	);
}



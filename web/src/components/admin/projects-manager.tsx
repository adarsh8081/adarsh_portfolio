"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Project {
	id: number;
	slug: string;
	title: string;
	description: string;
	image?: string;
	tech: string[];
	tags: string[];
	createdAt: string;
}

interface ProjectsManagerProps {
	onUpdate: () => void;
}

export function ProjectsManager({ onUpdate }: ProjectsManagerProps) {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingProject, setEditingProject] = useState<Project | null>(null);

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			const response = await fetch("http://localhost:4000/api/projects");
			const data = await response.json();
			setProjects(data);
		} catch (error) {
			console.error("Failed to fetch projects:", error);
		} finally {
			setLoading(false);
		}
	};

	const deleteProject = async (id: number) => {
		if (!confirm("Are you sure you want to delete this project?")) return;

		try {
			const token = localStorage.getItem("auth_token");
			const response = await fetch(`http://localhost:4000/api/projects/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				setProjects(projects.filter((p) => p.id !== id));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to delete project:", error);
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-semibold">Projects</h2>
				<button
					onClick={() => setShowForm(true)}
					className="flex items-center gap-2 px-4 py-2 rounded-xl text-white"
					style={{ background: "var(--gradient-1)" }}
				>
					<Plus size={18} />
					Add Project
				</button>
			</div>

			<div className="grid gap-4">
				<AnimatePresence>
					{projects.map((project) => (
						<motion.div
							key={project.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="p-4 rounded-xl border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-colors"
						>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<h3 className="font-semibold text-lg mb-2">{project.title}</h3>
									<p className="text-muted-foreground mb-3 line-clamp-2">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-2">
										{project.tech.slice(0, 3).map((tech) => (
											<span
												key={tech}
												className="px-2 py-1 text-xs rounded-full"
												style={{ background: "var(--gradient-1)", color: "white" }}
											>
												{tech}
											</span>
										))}
										{project.tech.length > 3 && (
											<span className="text-xs text-muted-foreground">
												+{project.tech.length - 3} more
											</span>
										)}
									</div>
								</div>
								<div className="flex items-center gap-2 ml-4">
									<button
										onClick={() => setEditingProject(project)}
										className="p-2 rounded-lg hover:bg-white/10 transition-colors"
									>
										<Edit size={16} />
									</button>
									<button
										onClick={() => deleteProject(project.id)}
										className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
									>
										<Trash2 size={16} />
									</button>
								</div>
							</div>
						</motion.div>
					))}
				</AnimatePresence>
			</div>

			{projects.length === 0 && (
				<div className="text-center py-12 text-muted-foreground">
					<p>No projects found. Create your first project!</p>
				</div>
			)}

			{/* Project Form Modal */}
			<AnimatePresence>
				{(showForm || editingProject) && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className="glass rounded-2xl p-6 w-full max-w-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl"
						>
							<ProjectForm
								project={editingProject}
								onClose={() => {
									setShowForm(false);
									setEditingProject(null);
								}}
								onSuccess={() => {
									fetchProjects();
									onUpdate();
									setShowForm(false);
									setEditingProject(null);
								}}
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function ProjectForm({
	project,
	onClose,
	onSuccess,
}: {
	project?: Project | null;
	onClose: () => void;
	onSuccess: () => void;
}) {
	const [formData, setFormData] = useState({
		slug: project?.slug || "",
		title: project?.title || "",
		description: project?.description || "",
		image: project?.image || "",
		tech: project?.tech.join(", ") || "",
		tags: project?.tags.join(", ") || "",
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const token = localStorage.getItem("auth_token");
			const payload = {
				...formData,
				tech: formData.tech.split(",").map((t) => t.trim()).filter(Boolean),
				tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
			};

			const url = project
				? `http://localhost:4000/api/projects/${project.id}`
				: "http://localhost:4000/api/projects";
			const method = project ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			if (response.ok) {
				onSuccess();
			}
		} catch (error) {
			console.error("Failed to save project:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-xl font-semibold">
					{project ? "Edit Project" : "Add New Project"}
				</h3>
				<button
					onClick={onClose}
					className="p-2 rounded-lg hover:bg-white/10 transition-colors"
				>
					×
				</button>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-2">Slug</label>
						<input
							type="text"
							value={formData.slug}
							onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
							required
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">Title</label>
						<input
							type="text"
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							required
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium mb-2">Description</label>
					<textarea
						value={formData.description}
						onChange={(e) => setFormData({ ...formData, description: e.target.value })}
						required
						rows={3}
						className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-2">Image URL</label>
					<input
						type="url"
						value={formData.image}
						onChange={(e) => setFormData({ ...formData, image: e.target.value })}
						className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
					<input
						type="text"
						value={formData.tech}
						onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
						placeholder="React, TypeScript, Next.js"
						className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
					<input
						type="text"
						value={formData.tags}
						onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
						placeholder="web, frontend, portfolio"
						className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					/>
				</div>

				<div className="flex gap-3 pt-4">
					<button
						type="submit"
						disabled={loading}
						className="flex-1 py-2 rounded-lg text-white font-medium disabled:opacity-50"
						style={{ background: "var(--gradient-1)" }}
					>
						{loading ? "Saving..." : project ? "Update" : "Create"}
					</button>
					<button
						type="button"
						onClick={onClose}
						className="px-6 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

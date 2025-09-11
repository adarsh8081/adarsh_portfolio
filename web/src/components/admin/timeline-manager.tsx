"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Briefcase, GraduationCap, Code, Award } from "lucide-react";

interface TimelineEvent {
	id: number;
	title: string;
	description: string;
	date: string;
	type: "work" | "education" | "project" | "achievement";
	location?: string;
	company?: string;
	url?: string;
	featured: boolean;
	createdAt: string;
}

interface TimelineManagerProps {
	onUpdate: () => void;
}

const typeIcons = {
	work: Briefcase,
	education: GraduationCap,
	project: Code,
	achievement: Award,
};

export function TimelineManager({ onUpdate }: TimelineManagerProps) {
	const [events, setEvents] = useState<TimelineEvent[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);

	useEffect(() => {
		fetchEvents();
	}, []);

	const fetchEvents = async () => {
		try {
			const response = await fetch("http://localhost:4000/api/timeline");
			const data = await response.json();
			setEvents(data);
		} catch (error) {
			console.error("Failed to fetch timeline events:", error);
		} finally {
			setLoading(false);
		}
	};

	const deleteEvent = async (id: number) => {
		if (!confirm("Are you sure you want to delete this timeline event?")) return;

		try {
			const token = localStorage.getItem("auth_token");
			const response = await fetch(`http://localhost:4000/api/timeline/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				setEvents(events.filter((e) => e.id !== id));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to delete timeline event:", error);
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
				<h2 className="text-2xl font-semibold">Timeline Events</h2>
				<button
					onClick={() => setShowForm(true)}
					className="flex items-center gap-2 px-4 py-2 rounded-xl text-white"
					style={{ background: "var(--gradient-1)" }}
				>
					<Plus size={18} />
					Add Event
				</button>
			</div>

			<div className="space-y-4">
				<AnimatePresence>
					{events.map((event) => {
						const IconComponent = typeIcons[event.type];
						return (
							<motion.div
								key={event.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className={`p-4 rounded-xl border transition-colors ${
									event.featured
										? "border-accent-500/50 bg-accent-50/50 dark:bg-accent-900/20"
										: "border-white/20 dark:border-white/10"
								}`}
							>
								<div className="flex items-start justify-between">
									<div className="flex items-start gap-3 flex-1">
										<div className="p-2 rounded-lg bg-accent-100 dark:bg-accent-900/20">
											<IconComponent size={20} className="text-accent-600 dark:text-accent-400" />
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-lg mb-1">{event.title}</h3>
											<p className="text-muted-foreground mb-2 line-clamp-2">
												{event.description}
											</p>
											<div className="flex items-center gap-4 text-sm text-muted-foreground">
												<span className="capitalize">{event.type}</span>
												<span>•</span>
												<span>{new Date(event.date).toLocaleDateString()}</span>
												{event.company && (
													<>
														<span>•</span>
														<span>{event.company}</span>
													</>
												)}
												{event.location && (
													<>
														<span>•</span>
														<span>{event.location}</span>
													</>
												)}
												{event.url && (
													<>
														<span>•</span>
														<a
															href={event.url}
															target="_blank"
															rel="noopener noreferrer"
															className="text-accent-600 dark:text-accent-400 hover:underline"
														>
															View
														</a>
													</>
												)}
											</div>
											{event.featured && (
												<span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300">
													Featured
												</span>
											)}
										</div>
									</div>
									<div className="flex items-center gap-2 ml-4">
										<button
											onClick={() => setEditingEvent(event)}
											className="p-2 rounded-lg hover:bg-white/10 transition-colors"
										>
											<Edit size={16} />
										</button>
										<button
											onClick={() => deleteEvent(event.id)}
											className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
										>
											<Trash2 size={16} />
										</button>
									</div>
								</div>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</div>

			{events.length === 0 && (
				<div className="text-center py-12 text-muted-foreground">
					<p>No timeline events found. Add your first event!</p>
				</div>
			)}

			{/* Timeline Event Form Modal */}
			<AnimatePresence>
				{(showForm || editingEvent) && (
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
							<TimelineEventForm
								event={editingEvent}
								onClose={() => {
									setShowForm(false);
									setEditingEvent(null);
								}}
								onSuccess={() => {
									fetchEvents();
									onUpdate();
									setShowForm(false);
									setEditingEvent(null);
								}}
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function TimelineEventForm({
	event,
	onClose,
	onSuccess,
}: {
	event?: TimelineEvent | null;
	onClose: () => void;
	onSuccess: () => void;
}) {
	const [formData, setFormData] = useState({
		title: event?.title || "",
		description: event?.description || "",
		date: event?.date ? new Date(event.date).toISOString().split("T")[0] : "",
		type: event?.type || "work" as const,
		location: event?.location || "",
		company: event?.company || "",
		url: event?.url || "",
		featured: event?.featured || false,
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const token = localStorage.getItem("auth_token");
			const payload = {
				...formData,
				location: formData.location || undefined,
				company: formData.company || undefined,
				url: formData.url || undefined,
			};

			const url = event
				? `http://localhost:4000/api/timeline/${event.id}`
				: "http://localhost:4000/api/timeline";
			const method = event ? "PUT" : "POST";

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
			console.error("Failed to save timeline event:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-xl font-semibold">
					{event ? "Edit Timeline Event" : "Add New Timeline Event"}
				</h3>
				<button
					onClick={onClose}
					className="p-2 rounded-lg hover:bg-white/10 transition-colors"
				>
					×
				</button>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
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

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-2">Type</label>
						<select
							value={formData.type}
							onChange={(e) => setFormData({ ...formData, type: e.target.value as "work" | "education" | "project" | "achievement" })}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						>
							<option value="work">Work</option>
							<option value="education">Education</option>
							<option value="project">Project</option>
							<option value="achievement">Achievement</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">Date</label>
						<input
							type="date"
							value={formData.date}
							onChange={(e) => setFormData({ ...formData, date: e.target.value })}
							required
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-2">Company (optional)</label>
						<input
							type="text"
							value={formData.company}
							onChange={(e) => setFormData({ ...formData, company: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">Location (optional)</label>
						<input
							type="text"
							value={formData.location}
							onChange={(e) => setFormData({ ...formData, location: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium mb-2">URL (optional)</label>
					<input
						type="url"
						value={formData.url}
						onChange={(e) => setFormData({ ...formData, url: e.target.value })}
						placeholder="https://example.com"
						className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					/>
				</div>

				<div className="flex items-center gap-2">
					<input
						type="checkbox"
						id="featured"
						checked={formData.featured}
						onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
						className="rounded"
					/>
					<label htmlFor="featured" className="text-sm font-medium">
						Featured event
					</label>
				</div>

				<div className="flex gap-3 pt-4">
					<button
						type="submit"
						disabled={loading}
						className="flex-1 py-2 rounded-lg text-white font-medium disabled:opacity-50"
						style={{ background: "var(--gradient-1)" }}
					>
						{loading ? "Saving..." : event ? "Update" : "Create"}
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

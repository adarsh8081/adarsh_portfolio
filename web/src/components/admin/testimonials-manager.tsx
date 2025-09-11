"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
	id: number;
	name: string;
	role: string;
	company?: string;
	content: string;
	rating: number;
	avatar?: string;
	featured: boolean;
	createdAt: string;
}

interface TestimonialsManagerProps {
	onUpdate: () => void;
}

export function TestimonialsManager({ onUpdate }: TestimonialsManagerProps) {
	const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

	useEffect(() => {
		fetchTestimonials();
	}, []);

	const fetchTestimonials = async () => {
		try {
			const response = await fetch("http://localhost:4000/api/testimonials");
			const data = await response.json();
			setTestimonials(data);
		} catch (error) {
			console.error("Failed to fetch testimonials:", error);
		} finally {
			setLoading(false);
		}
	};

	const deleteTestimonial = async (id: number) => {
		if (!confirm("Are you sure you want to delete this testimonial?")) return;

		try {
			const token = localStorage.getItem("auth_token");
			const response = await fetch(`http://localhost:4000/api/testimonials/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				setTestimonials(testimonials.filter((t) => t.id !== id));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to delete testimonial:", error);
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
				<h2 className="text-2xl font-semibold">Testimonials</h2>
				<button
					onClick={() => setShowForm(true)}
					className="flex items-center gap-2 px-4 py-2 rounded-xl text-white"
					style={{ background: "var(--gradient-1)" }}
				>
					<Plus size={18} />
					Add Testimonial
				</button>
			</div>

			<div className="grid gap-4">
				<AnimatePresence>
					{testimonials.map((testimonial) => (
						<motion.div
							key={testimonial.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className={`p-4 rounded-xl border transition-colors ${
								testimonial.featured
									? "border-accent-500/50 bg-accent-50/50 dark:bg-accent-900/20"
									: "border-white/20 dark:border-white/10"
							}`}
						>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-3 mb-2">
										{testimonial.avatar && (
											<div className="w-10 h-10 rounded-full overflow-hidden relative">
												<Image
													src={testimonial.avatar}
													alt={testimonial.name}
													fill
													className="object-cover"
												/>
											</div>
										)}
										<div>
											<h3 className="font-semibold">{testimonial.name}</h3>
											<p className="text-sm text-muted-foreground">
												{testimonial.role}
												{testimonial.company && ` at ${testimonial.company}`}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-1 mb-2">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												size={16}
												className={
													i < testimonial.rating
														? "text-yellow-400 fill-current"
														: "text-gray-300"
												}
											/>
										))}
									</div>
									<p className="text-muted-foreground line-clamp-3">
										&quot;{testimonial.content}&quot;
									</p>
									{testimonial.featured && (
										<span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300">
											Featured
										</span>
									)}
								</div>
								<div className="flex items-center gap-2 ml-4">
									<button
										onClick={() => setEditingTestimonial(testimonial)}
										className="p-2 rounded-lg hover:bg-white/10 transition-colors"
									>
										<Edit size={16} />
									</button>
									<button
										onClick={() => deleteTestimonial(testimonial.id)}
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

			{testimonials.length === 0 && (
				<div className="text-center py-12 text-muted-foreground">
					<p>No testimonials found. Add your first testimonial!</p>
				</div>
			)}

			{/* Testimonial Form Modal */}
			<AnimatePresence>
				{(showForm || editingTestimonial) && (
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
							<TestimonialForm
								testimonial={editingTestimonial}
								onClose={() => {
									setShowForm(false);
									setEditingTestimonial(null);
								}}
								onSuccess={() => {
									fetchTestimonials();
									onUpdate();
									setShowForm(false);
									setEditingTestimonial(null);
								}}
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function TestimonialForm({
	testimonial,
	onClose,
	onSuccess,
}: {
	testimonial?: Testimonial | null;
	onClose: () => void;
	onSuccess: () => void;
}) {
	const [formData, setFormData] = useState({
		name: testimonial?.name || "",
		role: testimonial?.role || "",
		company: testimonial?.company || "",
		content: testimonial?.content || "",
		rating: testimonial?.rating || 5,
		avatar: testimonial?.avatar || "",
		featured: testimonial?.featured || false,
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const token = localStorage.getItem("auth_token");
			const payload = {
				...formData,
				company: formData.company || undefined,
				avatar: formData.avatar || undefined,
			};

			const url = testimonial
				? `http://localhost:4000/api/testimonials/${testimonial.id}`
				: "http://localhost:4000/api/testimonials";
			const method = testimonial ? "PUT" : "POST";

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
			console.error("Failed to save testimonial:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-xl font-semibold">
					{testimonial ? "Edit Testimonial" : "Add New Testimonial"}
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
						<label className="block text-sm font-medium mb-2">Name</label>
						<input
							type="text"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							required
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">Role</label>
						<input
							type="text"
							value={formData.role}
							onChange={(e) => setFormData({ ...formData, role: e.target.value })}
							required
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
				</div>

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
					<label className="block text-sm font-medium mb-2">Testimonial</label>
					<textarea
						value={formData.content}
						onChange={(e) => setFormData({ ...formData, content: e.target.value })}
						required
						rows={4}
						className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-2">Rating</label>
						<select
							value={formData.rating}
							onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						>
							{[1, 2, 3, 4, 5].map((rating) => (
								<option key={rating} value={rating}>
									{rating} Star{rating > 1 ? "s" : ""}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">Avatar URL (optional)</label>
						<input
							type="url"
							value={formData.avatar}
							onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
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
						Featured testimonial
					</label>
				</div>

				<div className="flex gap-3 pt-4">
					<button
						type="submit"
						disabled={loading}
						className="flex-1 py-2 rounded-lg text-white font-medium disabled:opacity-50"
						style={{ background: "var(--gradient-1)" }}
					>
						{loading ? "Saving..." : testimonial ? "Update" : "Create"}
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

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
	Plus, 
	Edit, 
	Trash2, 
	Eye, 
	Search, 
	Calendar, 
	User, 
	Globe,
	Lock,
	RefreshCw,
	Download,
	Star,
	Clock
} from "lucide-react";

interface BlogPost {
	id: number;
	title: string;
	excerpt: string;
	content: string;
	tags: string[];
	published: boolean;
	featured: boolean;
	author: string;
	createdAt: string;
	updatedAt: string;
	slug: string;
	readTime: number;
	views: number;
}

export function BlogManager({ onUpdate }: { onUpdate: () => void }) {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
	const [filterFeatured, setFilterFeatured] = useState<"all" | "featured" | "regular">("all");
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		try {
			setLoading(true);
			const response = await fetch("http://localhost:4000/api/posts");
			if (response.ok) {
				const data = await response.json();
				setPosts(data);
			}
		} catch (error) {
			console.error("Failed to fetch posts:", error);
		} finally {
			setLoading(false);
		}
	};

	const deletePost = async (id: number) => {
		if (!confirm("Are you sure you want to delete this post?")) return;
		
		try {
			const response = await fetch(`http://localhost:4000/api/posts/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
				},
			});

			if (response.ok) {
				setPosts(posts.filter(post => post.id !== id));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to delete post:", error);
		}
	};

	const togglePublished = async (post: BlogPost) => {
		try {
			const response = await fetch(`http://localhost:4000/api/posts/${post.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
				},
				body: JSON.stringify({ published: !post.published }),
			});

			if (response.ok) {
				setPosts(posts.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to update post:", error);
		}
	};

	const toggleFeatured = async (post: BlogPost) => {
		try {
			const response = await fetch(`http://localhost:4000/api/posts/${post.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
				},
				body: JSON.stringify({ featured: !post.featured }),
			});

			if (response.ok) {
				setPosts(posts.map(p => p.id === post.id ? { ...p, featured: !p.featured } : p));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to update post:", error);
		}
	};

	const filteredPosts = posts.filter(post => {
		const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
		
		const matchesStatus = filterStatus === "all" || 
			(filterStatus === "published" && post.published) ||
			(filterStatus === "draft" && !post.published);
		
		const matchesFeatured = filterFeatured === "all" ||
			(filterFeatured === "featured" && post.featured) ||
			(filterFeatured === "regular" && !post.featured);

		return matchesSearch && matchesStatus && matchesFeatured;
	});

	const exportPosts = () => {
		const csvContent = "data:text/csv;charset=utf-8," + 
			"Title,Status,Featured,Views,Created\n" +
			filteredPosts.map(post => 
				`"${post.title}","${post.published ? 'Published' : 'Draft'}","${post.featured ? 'Yes' : 'No'}","${post.views}","${post.createdAt}"`
			).join("\n");
		
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "blog_posts.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold">Blog Management</h2>
					<p className="text-muted-foreground">Manage your blog posts and content</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={exportPosts}
						className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
					>
						<Download size={16} />
						Export
					</button>
					<button
						onClick={() => setShowCreateForm(true)}
						className="flex items-center gap-2 px-4 py-2 rounded-xl text-white"
						style={{ background: "var(--gradient-1)" }}
					>
						<Plus size={16} />
						New Post
					</button>
				</div>
			</div>

			{/* Filters */}
			<div className="flex flex-wrap gap-4">
				<div className="flex-1 min-w-64 relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search posts..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					/>
				</div>
				<select
					value={filterStatus}
					onChange={(e) => setFilterStatus(e.target.value as "all" | "published" | "draft")}
					className="px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
				>
					<option value="all">All Status</option>
					<option value="published">Published</option>
					<option value="draft">Draft</option>
				</select>
				<select
					value={filterFeatured}
				onChange={(e) => setFilterFeatured(e.target.value as "all" | "featured" | "regular")}
					className="px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
				>
					<option value="all">All Posts</option>
					<option value="featured">Featured</option>
					<option value="regular">Regular</option>
				</select>
			</div>

			{/* Posts List */}
			<div className="space-y-4">
				{loading ? (
					<div className="text-center py-8">
						<RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-accent-500" />
						<p className="text-muted-foreground">Loading posts...</p>
					</div>
				) : filteredPosts.length === 0 ? (
					<div className="text-center py-8 text-muted-foreground">
						<Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
						<p>No posts found</p>
						<p className="text-sm">Try adjusting your search or filters</p>
					</div>
				) : (
					filteredPosts.map((post) => (
						<motion.div
							key={post.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="glass rounded-xl p-6 border border-white/20 dark:border-white/10"
						>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="text-lg font-semibold">{post.title}</h3>
										{post.featured && (
											<span className="px-2 py-1 text-xs bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full">
												Featured
											</span>
										)}
										{post.published ? (
											<span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex items-center gap-1">
												<Globe size={12} />
												Published
											</span>
										) : (
											<span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full flex items-center gap-1">
												<Lock size={12} />
												Draft
											</span>
										)}
									</div>
									<p className="text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>
									<div className="flex items-center gap-4 text-sm text-muted-foreground">
										<div className="flex items-center gap-1">
											<User size={14} />
											{post.author}
										</div>
										<div className="flex items-center gap-1">
											<Calendar size={14} />
											{new Date(post.createdAt).toLocaleDateString()}
										</div>
										<div className="flex items-center gap-1">
											<Eye size={14} />
											{post.views} views
										</div>
										<div className="flex items-center gap-1">
											<Clock size={14} />
											{post.readTime} min read
										</div>
									</div>
									{post.tags.length > 0 && (
										<div className="flex flex-wrap gap-1 mt-3">
											{post.tags.map((tag, index) => (
												<span key={index} className="px-2 py-1 text-xs bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 rounded-full">
													{tag}
												</span>
											))}
										</div>
									)}
								</div>
								<div className="flex items-center gap-2 ml-4">
									<button
										onClick={() => togglePublished(post)}
										className={`p-2 rounded-lg transition-colors ${
											post.published 
												? "text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20"
												: "text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
										}`}
										title={post.published ? "Unpublish" : "Publish"}
									>
										{post.published ? <Globe size={16} /> : <Lock size={16} />}
									</button>
									<button
										onClick={() => toggleFeatured(post)}
										className={`p-2 rounded-lg transition-colors ${
											post.featured 
												? "text-accent-600 dark:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-900/20"
												: "text-muted-foreground hover:bg-white/10"
										}`}
										title={post.featured ? "Remove from featured" : "Add to featured"}
									>
										<Star size={16} />
									</button>
									<button
										onClick={() => setEditingPost(post)}
										className="p-2 rounded-lg text-muted-foreground hover:bg-white/10 transition-colors"
										title="Edit post"
									>
										<Edit size={16} />
									</button>
									<button
										onClick={() => deletePost(post.id)}
										className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
										title="Delete post"
									>
										<Trash2 size={16} />
									</button>
								</div>
							</div>
						</motion.div>
					))
				)}
			</div>

			{/* Create/Edit Form Modal */}
			{(showCreateForm || editingPost) && (
				<PostFormModal
					post={editingPost}
					onClose={() => {
						setShowCreateForm(false);
						setEditingPost(null);
					}}
					onSave={(post) => {
						if (editingPost) {
							setPosts(posts.map(p => p.id === post.id ? post : p));
						} else {
							setPosts([post, ...posts]);
						}
						setShowCreateForm(false);
						setEditingPost(null);
						onUpdate();
					}}
				/>
			)}
		</div>
	);
}

// Post Form Modal Component
function PostFormModal({ 
	post, 
	onClose, 
	onSave 
}: { 
	post: BlogPost | null; 
	onClose: () => void; 
	onSave: (post: BlogPost) => void; 
}) {
	const [formData, setFormData] = useState({
		title: post?.title || "",
		excerpt: post?.excerpt || "",
		content: post?.content || "",
		tags: post?.tags || [],
		published: post?.published || false,
		featured: post?.featured || false,
	});
	const [tagInput, setTagInput] = useState("");
	const [saving, setSaving] = useState(false);

	const handleSave = async () => {
		if (!formData.title.trim() || !formData.content.trim()) return;
		
		setSaving(true);
		try {
			const response = await fetch(
				post ? `http://localhost:4000/api/posts/${post.id}` : "http://localhost:4000/api/posts",
				{
					method: post ? "PUT" : "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				const savedPost = await response.json();
				onSave(savedPost);
			}
		} catch (error) {
			console.error("Failed to save post:", error);
		} finally {
			setSaving(false);
		}
	};

	const addTag = () => {
		if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
			setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
			setTagInput("");
		}
	};

	const removeTag = (tagToRemove: string) => {
		setFormData({ ...formData, tags: formData.tags.filter(tag => tag !== tagToRemove) });
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div className="glass rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20 dark:border-white/10">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-semibold">
						{post ? "Edit Post" : "Create New Post"}
					</h2>
					<button
						onClick={onClose}
						className="p-2 rounded-lg hover:bg-white/10 transition-colors"
					>
						×
					</button>
				</div>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-2">Title</label>
						<input
							type="text"
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
							placeholder="Enter post title..."
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Excerpt</label>
						<textarea
							value={formData.excerpt}
							onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
							rows={3}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
							placeholder="Enter post excerpt..."
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Content</label>
						<textarea
							value={formData.content}
							onChange={(e) => setFormData({ ...formData, content: e.target.value })}
							rows={10}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
							placeholder="Enter post content..."
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Tags</label>
						<div className="flex gap-2 mb-2">
							<input
								type="text"
								value={tagInput}
								onChange={(e) => setTagInput(e.target.value)}
								onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
								className="flex-1 px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
								placeholder="Add a tag..."
							/>
							<button
								onClick={addTag}
								className="px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
							>
								Add
							</button>
						</div>
						<div className="flex flex-wrap gap-2">
							{formData.tags.map((tag, index) => (
								<span
									key={index}
									className="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full text-sm flex items-center gap-1"
								>
									{tag}
									<button
										onClick={() => removeTag(tag)}
										className="ml-1 hover:text-red-500"
									>
										×
									</button>
								</span>
							))}
						</div>
					</div>

					<div className="flex items-center gap-4">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={formData.published}
								onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
								className="rounded"
							/>
							<span className="text-sm">Published</span>
						</label>
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={formData.featured}
								onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
								className="rounded"
							/>
							<span className="text-sm">Featured</span>
						</label>
					</div>
				</div>

				<div className="flex items-center gap-2 mt-6">
					<button
						onClick={handleSave}
						disabled={saving || !formData.title.trim() || !formData.content.trim()}
						className="flex items-center gap-2 px-4 py-2 rounded-xl text-white disabled:opacity-50"
						style={{ background: "var(--gradient-1)" }}
					>
						{saving ? <RefreshCw size={16} className="animate-spin" /> : <Plus size={16} />}
						{saving ? "Saving..." : "Save Post"}
					</button>
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

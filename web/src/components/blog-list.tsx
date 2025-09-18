"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, Star, ArrowRight, Calendar } from "lucide-react";
import { posts as allPosts, postTags } from "@/data/posts";

export function BlogList() {
	const [activeTag, setActiveTag] = useState<string>("All");

	const filtered = useMemo(() => {
		if (activeTag === "All") return allPosts;
		return allPosts.filter((p) => p.tags.includes(activeTag));
	}, [activeTag]);

	const featuredPosts = allPosts.filter(post => post.featured);
	const regularPosts = filtered.filter(post => !post.featured);

	// Helper function to get relative time
	const getRelativeTime = (date: string) => {
		const now = dayjs();
		const postDate = dayjs(date);
		const diffInDays = now.diff(postDate, 'day');
		
		if (diffInDays === 0) return 'Today';
		if (diffInDays === 1) return 'Yesterday';
		if (diffInDays < 7) return `${diffInDays} days ago`;
		if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
		if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
		return `${Math.floor(diffInDays / 365)} years ago`;
	};

	// Helper function to check if post is new (less than 7 days old)
	const isNewPost = (date: string) => {
		const now = dayjs();
		const postDate = dayjs(date);
		return now.diff(postDate, 'day') < 7;
	};

	return (
		<div>
			{/* Filter Tags - Enhanced */}
			<div className="flex flex-wrap gap-3 mb-12">
				{["All", ...postTags].map((tag) => (
					<motion.button
						key={tag}
						onClick={() => setActiveTag(tag)}
						className={clsx(
							"px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden group",
							activeTag === tag 
								? "text-white shadow-lg" 
								: "border border-accent-200 dark:border-accent-800 text-accent-700 dark:text-accent-300 hover:border-accent-500 hover:bg-accent-500/10 hover:scale-105"
						)}
						style={activeTag === tag ? { background: "var(--gradient-1)" } : {}}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						{activeTag === tag && (
							<div className="absolute inset-0 bg-gradient-to-r from-accent-400/20 to-blue-400/20 rounded-full animate-pulse" />
						)}
						<span className="relative z-10">{tag}</span>
					</motion.button>
				))}
			</div>

			{/* Featured Posts */}
			{activeTag === "All" && featuredPosts.length > 0 && (
				<div className="mb-16">
					<motion.h2 
						className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						Featured Articles
					</motion.h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{featuredPosts.map((post, index) => (
							<motion.article
								key={post.slug}
								className="group relative h-full"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: index * 0.15 }}
								whileHover={{ y: -10, scale: 1.02 }}
							>
								{/* Card Background */}
								<div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 h-full flex flex-col">
									{/* Gradient overlay */}
									<div className="absolute inset-0 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20 dark:to-transparent" />
									
									<Link href={`/blog/${post.slug}`} className="block flex flex-col h-full">
										<div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
											<Image 
												src={post.coverImage} 
												alt={post.title} 
												fill
												className="object-cover transition-transform duration-500 group-hover:scale-105" 
												priority={post.featured}
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
											<div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-accent-500 to-blue-500 text-white text-xs font-semibold shadow-lg">
												<Star className="w-3 h-3 fill-current" />
												Featured
											</div>
											{isNewPost(post.date) && (
												<div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold shadow-lg">
													<span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
													New
												</div>
											)}
										</div>
										<div className="p-8 relative z-10 flex flex-col flex-grow">
											<div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
												<div className="flex items-center gap-2">
													<User className="w-4 h-4" />
													{post.author}
												</div>
												<div className="flex items-center gap-2">
													<Clock className="w-4 h-4" />
													{post.readingTime} min read
												</div>
												<div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/50 text-accent-700 dark:text-accent-300 font-medium">
													<Calendar className="w-3 h-3" />
													<span className="text-xs">{getRelativeTime(post.date)}</span>
													<span className="text-xs opacity-60">•</span>
													<span className="text-xs">{dayjs(post.date).format("MMM D")}</span>
												</div>
											</div>
											<h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
												{post.title}
											</h3>
											<p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-grow">
												{post.summary}
											</p>
											<div className="flex flex-wrap gap-2 mb-4">
												{post.tags.slice(0, 3).map((tag) => (
													<span 
														key={tag} 
														className="px-3 py-1 rounded-full text-xs font-medium bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300"
													>
														{tag}
													</span>
												))}
												{post.tags.length > 3 && (
													<span className="px-3 py-1 rounded-full text-xs font-medium bg-muted/20 text-muted-foreground">
														+{post.tags.length - 3}
													</span>
												)}
											</div>
											<div className="flex items-center gap-2 text-sm font-semibold text-accent-600 dark:text-accent-400 group-hover:gap-3 transition-all duration-300 mt-auto">
												Read More
												<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
											</div>
										</div>
									</Link>

									{/* Card shadow */}
									<div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</div>
							</motion.article>
						))}
					</div>
				</div>
			)}

			{/* Regular Posts */}
			<div>
				{activeTag === "All" && (
					<motion.h2 
						className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						All Articles
					</motion.h2>
				)}
				<AnimatePresence mode="popLayout">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{regularPosts.map((post, index) => (
							<motion.article
								key={post.slug}
								className="group relative h-full"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.8, delay: index * 0.1 }}
								whileHover={{ y: -10, scale: 1.02 }}
							>
								{/* Card Background */}
								<div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10 h-full flex flex-col">
									{/* Gradient overlay */}
									<div className="absolute inset-0 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20 dark:to-transparent" />
									
									<Link href={`/blog/${post.slug}`} className="block flex flex-col h-full">
										<div className="relative aspect-[16/10] overflow-hidden flex-shrink-0">
											<Image 
												src={post.coverImage} 
												alt={post.title} 
												fill
												className="object-cover transition-transform duration-500 group-hover:scale-105" 
												priority={post.featured}
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
											{isNewPost(post.date) && (
												<div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold shadow-lg">
													<span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
													New
												</div>
											)}
										</div>
										<div className="p-6 relative z-10 flex flex-col flex-grow">
											<div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
												<div className="flex items-center gap-2">
													<User className="w-4 h-4" />
													{post.author}
												</div>
												<div className="flex items-center gap-2">
													<Clock className="w-4 h-4" />
													{post.readingTime} min read
												</div>
												<div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/50 text-accent-700 dark:text-accent-300 font-medium">
													<Calendar className="w-3 h-3" />
													<span className="text-xs">{getRelativeTime(post.date)}</span>
													<span className="text-xs opacity-60">•</span>
													<span className="text-xs">{dayjs(post.date).format("MMM D")}</span>
												</div>
											</div>
											<h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
												{post.title}
											</h3>
											<p className="text-sm text-muted-foreground mb-3 line-clamp-3 leading-relaxed flex-grow">
												{post.summary}
											</p>
											<div className="flex flex-wrap gap-2 mb-3">
												{post.tags.slice(0, 3).map((tag) => (
													<span 
														key={tag} 
														className="px-2 py-1 rounded-full text-xs font-medium bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300"
													>
														{tag}
													</span>
												))}
												{post.tags.length > 3 && (
													<span className="px-2 py-1 rounded-full text-xs font-medium bg-muted/20 text-muted-foreground">
														+{post.tags.length - 3}
													</span>
												)}
											</div>
											<div className="flex items-center gap-2 text-sm font-semibold text-accent-600 dark:text-accent-400 group-hover:gap-3 transition-all duration-300 mt-auto">
												Read More
												<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
											</div>
										</div>
									</Link>

									{/* Card shadow */}
									<div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</div>
							</motion.article>
						))}
					</div>
				</AnimatePresence>
			</div>
		</div>
	);
}



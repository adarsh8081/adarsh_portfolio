"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, User, Star, ArrowRight } from "lucide-react";
import { posts as allPosts, postTags } from "@/data/posts";

export function BlogList() {
	const [activeTag, setActiveTag] = useState<string>("All");

	const filtered = useMemo(() => {
		if (activeTag === "All") return allPosts;
		return allPosts.filter((p) => p.tags.includes(activeTag));
	}, [activeTag]);

	const featuredPosts = allPosts.filter(post => post.featured);
	const regularPosts = filtered.filter(post => !post.featured);

	return (
		<div>
			{/* Filter Tags */}
			<div className="flex flex-wrap gap-3 mb-8">
				{["All", ...postTags].map((tag) => (
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

			{/* Featured Posts */}
			{activeTag === "All" && featuredPosts.length > 0 && (
				<div className="mb-12">
					<h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
						Featured Articles
					</h2>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{featuredPosts.map((post, index) => (
							<motion.article
								key={post.slug}
								className="group glass rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								whileHover={{ scale: 1.02, y: -5 }}
							>
								<Link href={`/blog/${post.slug}`} className="block">
									<div className="relative aspect-[16/10] overflow-hidden">
										<Image 
											src={post.coverImage} 
											alt={post.title} 
											fill 
											className="object-cover transition-transform duration-500 group-hover:scale-105" 
										/>
										<div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-accent-500 text-white text-xs font-medium">
											<Star className="w-3 h-3 fill-current" />
											Featured
										</div>
									</div>
									<div className="p-6">
										<div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
											<div className="flex items-center gap-1">
												<User className="w-3 h-3" />
												{post.author}
											</div>
											<div className="flex items-center gap-1">
												<Clock className="w-3 h-3" />
												{post.readingTime} min read
											</div>
											<span>{dayjs(post.date).format("MMM D, YYYY")}</span>
										</div>
										<h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-accent-600 transition-colors duration-300">
											{post.title}
										</h3>
										<p className="text-sm text-muted-foreground mb-4 line-clamp-3">
											{post.summary}
										</p>
										<div className="flex flex-wrap gap-2 mb-4">
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
										<div className="flex items-center gap-2 text-sm font-medium text-accent-600 group-hover:gap-3 transition-all duration-300">
											Read More
											<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
										</div>
									</div>
								</Link>
							</motion.article>
						))}
					</div>
				</div>
			)}

			{/* Regular Posts */}
			<div>
				{activeTag === "All" && (
					<h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
						All Articles
					</h2>
				)}
				<AnimatePresence mode="popLayout">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{regularPosts.map((post, index) => (
							<motion.article
								key={post.slug}
								className="group glass rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								whileHover={{ scale: 1.02, y: -5 }}
							>
								<Link href={`/blog/${post.slug}`} className="block">
									<div className="relative aspect-[16/10] overflow-hidden">
										<Image 
											src={post.coverImage} 
											alt={post.title} 
											fill 
											className="object-cover transition-transform duration-500 group-hover:scale-105" 
										/>
									</div>
									<div className="p-6">
										<div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
											<div className="flex items-center gap-1">
												<User className="w-3 h-3" />
												{post.author}
											</div>
											<div className="flex items-center gap-1">
												<Clock className="w-3 h-3" />
												{post.readingTime} min read
											</div>
											<span>{dayjs(post.date).format("MMM D, YYYY")}</span>
										</div>
										<h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-accent-600 transition-colors duration-300">
											{post.title}
										</h3>
										<p className="text-sm text-muted-foreground mb-4 line-clamp-3">
											{post.summary}
										</p>
										<div className="flex flex-wrap gap-2 mb-4">
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
										<div className="flex items-center gap-2 text-sm font-medium text-accent-600 group-hover:gap-3 transition-all duration-300">
											Read More
											<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
										</div>
									</div>
								</Link>
							</motion.article>
						))}
					</div>
				</AnimatePresence>
			</div>
		</div>
	);
}



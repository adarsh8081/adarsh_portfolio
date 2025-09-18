"use client";

import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { posts, type Post } from "@/data/posts";

interface BlogPostClientProps {
	post: Post;
}

export function BlogPostClient({ post }: BlogPostClientProps) {
	return (
		<main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
			{/* Hero Section */}
			<section className="relative py-20 overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
				<div className="absolute inset-0 bg-gradient-to-r from-blue-100/10 via-purple-100/10 to-pink-100/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20" />
				
				<div className="container-safe relative z-10">
					{/* Back Button */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="mb-8"
					>
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 transition-colors"
						>
							<ArrowLeft className="w-4 h-4" />
							Back to Blog
						</Link>
					</motion.div>

					{/* Article Header */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="max-w-4xl mx-auto text-center"
					>
						{/* Tags */}
						<div className="flex flex-wrap justify-center gap-2 mb-6">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300"
								>
									<Tag className="w-3 h-3" />
									{tag}
								</span>
							))}
						</div>

						{/* Title */}
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
							{post.title}
						</h1>

						{/* Summary */}
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
							{post.summary}
						</p>

						{/* Meta Information */}
						<div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
							<div className="flex items-center gap-2">
								<User className="w-4 h-4" />
								<span>{post.author}</span>
							</div>
							<div className="flex items-center gap-2">
								<Calendar className="w-4 h-4" />
								<span>{new Date(post.date).toLocaleDateString('en-US', { 
									year: 'numeric', 
									month: 'long', 
									day: 'numeric' 
								})}</span>
							</div>
							<div className="flex items-center gap-2">
								<Clock className="w-4 h-4" />
								<span>{post.readingTime} min read</span>
							</div>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Cover Image */}
			<motion.section
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className="container-safe -mt-10 relative z-20"
			>
				<div className="max-w-4xl mx-auto">
					<div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
						<Image
							src={post.coverImage}
							alt={post.title}
							fill
							className="object-cover"
							priority
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
					</div>
				</div>
			</motion.section>

			{/* Article Content */}
			<motion.section
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.3 }}
				className="container-safe py-16"
			>
				<div className="max-w-4xl mx-auto">
					<article className="prose prose-lg prose-zinc dark:prose-invert max-w-none">
						<ReactMarkdown rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}>
							{post.content}
						</ReactMarkdown>
					</article>

					{/* Article Footer */}
					<div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
						<div className="flex flex-col sm:flex-row items-center justify-between gap-6">
							{/* Author Info */}
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
									{post.author.charAt(0)}
								</div>
								<div>
									<h3 className="font-semibold text-gray-900 dark:text-white">{post.author}</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">AI/ML Engineer & Creative Professional</p>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex items-center gap-4">
								<button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
									<Heart className="w-4 h-4" />
									<span className="text-sm">Like</span>
								</button>
								<button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
									<Share2 className="w-4 h-4" />
									<span className="text-sm">Share</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</motion.section>

			{/* Related Posts */}
			<motion.section
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.4 }}
				className="container-safe py-16 bg-white/50 dark:bg-gray-900/50"
			>
				<div className="max-w-4xl mx-auto">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
						Related Articles
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						{posts
							.filter(p => p.slug !== post.slug)
							.slice(0, 2)
							.map((relatedPost) => (
								<Link
									key={relatedPost.slug}
									href={`/blog/${relatedPost.slug}`}
									className="group block p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-accent-300 dark:hover:border-accent-600 transition-all duration-300 hover:shadow-lg"
								>
									<div className="flex items-start gap-4">
										<div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
											<Image
												src={relatedPost.coverImage}
												alt={relatedPost.title}
												fill
												className="object-cover group-hover:scale-105 transition-transform duration-300"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors line-clamp-2">
												{relatedPost.title}
											</h3>
											<p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
												{relatedPost.summary}
											</p>
											<div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-500">
												<Clock className="w-3 h-3" />
												<span>{relatedPost.readingTime} min read</span>
											</div>
										</div>
									</div>
								</Link>
							))}
					</div>
				</div>
			</motion.section>
		</main>
	);
}

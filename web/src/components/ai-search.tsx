"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Sparkles } from "lucide-react";

interface SearchResult {
	id: number;
	type: string;
	title: string;
	content: string;
	tags: string[];
	score: number;
}

export function AISearch() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "/" && e.metaKey) {
				e.preventDefault();
				setIsOpen(true);
				setTimeout(() => inputRef.current?.focus(), 100);
			}
			if (e.key === "Escape") {
				setIsOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, []);

	const search = async (searchQuery: string) => {
		if (!searchQuery.trim()) {
			setResults([]);
			return;
		}

		setIsLoading(true);
		try {
			const response = await fetch("http://localhost:8000/search", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query: searchQuery, limit: 5 }),
			});

			if (response.ok) {
				const data = await response.json();
				setResults(data);
			}
		} catch (error) {
			console.error("Search error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		search(query);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setQuery(value);
		
		// Debounced search
		const timeoutId = setTimeout(() => {
			search(value);
		}, 300);

		return () => clearTimeout(timeoutId);
	};

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="glass rounded-full p-3 border border-white/20 dark:border-white/10 backdrop-blur-xl hover:scale-105 transition-transform"
				aria-label="Open AI Search"
			>
				<Search size={20} />
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
					>
						<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
						
						<motion.div
							initial={{ opacity: 0, y: -20, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -20, scale: 0.95 }}
							className="relative w-full max-w-2xl"
						>
							<div className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10 backdrop-blur-xl">
								<form onSubmit={handleSearch} className="relative mb-4">
									<div className="flex items-center gap-3">
										<Sparkles size={20} className="text-accent-500" />
										<input
											ref={inputRef}
											type="text"
											value={query}
											onChange={handleInputChange}
											placeholder="Search projects, skills, or ask anything..."
											className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground"
										/>
										{isLoading && (
											<motion.div
												animate={{ rotate: 360 }}
												transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
												className="w-5 h-5 border-2 border-accent-500 border-t-transparent rounded-full"
											/>
										)}
										<button
											type="button"
											onClick={() => setIsOpen(false)}
											className="p-1 hover:bg-white/10 rounded-full transition-colors"
										>
											<X size={18} />
										</button>
									</div>
								</form>

								<div className="space-y-3 max-h-96 overflow-y-auto">
									{results.length > 0 ? (
										results.map((result, index) => (
											<motion.div
												key={result.id}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.1 }}
												className="p-4 rounded-xl border border-white/10 hover:border-accent-500/30 transition-colors cursor-pointer"
												onClick={() => {
													// Navigate to relevant section
													if (result.type === "project") {
														window.location.href = "#projects";
													}
													setIsOpen(false);
												}}
											>
												<div className="flex items-start justify-between mb-2">
													<h3 className="font-semibold text-accent-600 dark:text-accent-400">
														{result.title}
													</h3>
													<span className="text-xs px-2 py-1 rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300">
														{result.type}
													</span>
												</div>
												<p className="text-sm text-muted-foreground mb-3 line-clamp-2">
													{result.content}
												</p>
												<div className="flex flex-wrap gap-1">
													{result.tags.slice(0, 3).map((tag) => (
														<span
															key={tag}
															className="text-xs px-2 py-1 rounded-full"
															style={{ background: "var(--gradient-1)", color: "white" }}
														>
															{tag}
														</span>
													))}
													{result.tags.length > 3 && (
														<span className="text-xs text-muted-foreground">
															+{result.tags.length - 3} more
														</span>
													)}
												</div>
											</motion.div>
										))
									) : query && !isLoading ? (
										<div className="text-center py-8 text-muted-foreground">
											<Sparkles size={32} className="mx-auto mb-2 opacity-50" />
											<p>No results found for &quot;{query}&quot;</p>
											<p className="text-sm">Try different keywords or ask a question</p>
										</div>
									) : (
										<div className="text-center py-8 text-muted-foreground">
											<Sparkles size={32} className="mx-auto mb-2 opacity-50" />
											<p>Start typing to search...</p>
											<p className="text-sm">Press Cmd+/ to open search anytime</p>
										</div>
									)}
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}

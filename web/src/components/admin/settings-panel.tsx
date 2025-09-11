"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Database, Trash2, Shield, Mail, Bot, RefreshCw, Activity } from "lucide-react";

export function SettingsPanel() {
	const [settings, setSettings] = useState({
		siteName: "Adarsh Portfolio",
		siteDescription: "Futuristic, interactive portfolio with 3D visuals and AI-powered features.",
		contactEmail: "contact@adarsh.dev",
		socialLinks: {
			github: "https://github.com/adarsh",
			linkedin: "https://linkedin.com/in/adarsh",
			twitter: "https://twitter.com/adarsh",
		},
		features: {
			aiSearch: true,
			blog: true,
			contactForm: true,
			analytics: true,
		},
	});

	const [loading, setLoading] = useState(false);
	const [aiStatus, setAiStatus] = useState<{ status: string; message: string; ok: boolean; llm_available: boolean; tts_available: boolean; portfolio_items: number } | null>(null);
	const [aiStats, setAiStats] = useState<{ llm_provider: string; embedding_model: string; audio_cache_size: number } | null>(null);
	const [refreshing, setRefreshing] = useState(false);

	const handleSave = async () => {
		setLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setLoading(false);
		alert("Settings saved successfully!");
	};

	const clearCache = async () => {
		if (!confirm("Are you sure you want to clear the cache?")) return;
		
		try {
			const response = await fetch("http://localhost:4000/api/cache/clear", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
				},
			});
			
			if (response.ok) {
				alert("Cache cleared successfully!");
			}
		} catch (error) {
			console.error("Failed to clear cache:", error);
		}
	};

	const refreshAiData = async () => {
		setRefreshing(true);
		try {
			const response = await fetch("http://localhost:4000/api/sync/refresh-ai-data", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
				},
			});
			
			if (response.ok) {
				const data = await response.json();
				alert(data.message || "AI data refreshed successfully!");
				// Refresh AI status and stats
				await Promise.all([checkAiStatus(), checkAiStats()]);
			} else {
				alert("Failed to refresh AI data");
			}
		} catch (error) {
			console.error("Failed to refresh AI data:", error);
			alert("Failed to refresh AI data");
		} finally {
			setRefreshing(false);
		}
	};

	const checkAiStatus = async () => {
		try {
			const response = await fetch("http://localhost:4000/api/sync/ai-status");
			if (response.ok) {
				const data = await response.json();
				setAiStatus(data.status);
			}
		} catch (error) {
			console.error("Failed to check AI status:", error);
		}
	};

	const checkAiStats = async () => {
		try {
			const response = await fetch("http://localhost:4000/api/sync/ai-stats");
			if (response.ok) {
				const data = await response.json();
				setAiStats(data.stats);
			}
		} catch (error) {
			console.error("Failed to check AI stats:", error);
		}
	};

	// Load AI status on component mount
	React.useEffect(() => {
		checkAiStatus();
		checkAiStats();
	}, []);

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-semibold">Settings</h2>
				<button
					onClick={handleSave}
					disabled={loading}
					className="px-4 py-2 rounded-xl text-white font-medium disabled:opacity-50"
					style={{ background: "var(--gradient-1)" }}
				>
					{loading ? "Saving..." : "Save Settings"}
				</button>
			</div>

			{/* General Settings */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="space-y-4"
			>
				<div className="flex items-center gap-2 mb-4">
					<Settings size={20} className="text-accent-600 dark:text-accent-400" />
					<h3 className="text-lg font-semibold">General</h3>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-2">Site Name</label>
						<input
							type="text"
							value={settings.siteName}
							onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">Contact Email</label>
						<input
							type="email"
							value={settings.contactEmail}
							onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium mb-2">Site Description</label>
					<textarea
						value={settings.siteDescription}
						onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
						rows={3}
						className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					/>
				</div>
			</motion.div>

			{/* Social Links */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="space-y-4"
			>
				<div className="flex items-center gap-2 mb-4">
					<Mail size={20} className="text-accent-600 dark:text-accent-400" />
					<h3 className="text-lg font-semibold">Social Links</h3>
				</div>

				<div className="grid grid-cols-3 gap-4">
					<div>
						<label className="block text-sm font-medium mb-2">GitHub</label>
						<input
							type="url"
							value={settings.socialLinks.github}
							onChange={(e) => setSettings({
								...settings,
								socialLinks: { ...settings.socialLinks, github: e.target.value }
							})}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">LinkedIn</label>
						<input
							type="url"
							value={settings.socialLinks.linkedin}
							onChange={(e) => setSettings({
								...settings,
								socialLinks: { ...settings.socialLinks, linkedin: e.target.value }
							})}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">Twitter</label>
						<input
							type="url"
							value={settings.socialLinks.twitter}
							onChange={(e) => setSettings({
								...settings,
								socialLinks: { ...settings.socialLinks, twitter: e.target.value }
							})}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
				</div>
			</motion.div>

			{/* Features */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="space-y-4"
			>
				<div className="flex items-center gap-2 mb-4">
					<Shield size={20} className="text-accent-600 dark:text-accent-400" />
					<h3 className="text-lg font-semibold">Features</h3>
				</div>

				<div className="grid grid-cols-2 gap-4">
					{Object.entries(settings.features).map(([key, value]) => (
						<div key={key} className="flex items-center justify-between p-3 rounded-lg border border-white/20 dark:border-white/10">
							<span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={value}
									onChange={(e) => setSettings({
										...settings,
										features: { ...settings.features, [key]: e.target.checked }
									})}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-300 dark:peer-focus:ring-accent-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent-600"></div>
							</label>
						</div>
					))}
				</div>
			</motion.div>

			{/* AI Service Management */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="space-y-4"
			>
				<div className="flex items-center gap-2 mb-4">
					<Bot size={20} className="text-accent-600 dark:text-accent-400" />
					<h3 className="text-lg font-semibold">AI Service</h3>
				</div>

				{/* AI Status */}
				{aiStatus && (
					<div className="grid grid-cols-2 gap-4 p-4 rounded-lg border border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/10">
						<div className="flex items-center gap-2">
							<Activity size={16} className={aiStatus.ok ? "text-green-500" : "text-red-500"} />
							<span className="text-sm font-medium">Status:</span>
							<span className={`text-sm ${aiStatus.ok ? "text-green-500" : "text-red-500"}`}>
								{aiStatus.ok ? "Online" : "Offline"}
							</span>
						</div>
						<div className="text-sm">
							<span className="font-medium">LLM:</span> {aiStatus.llm_available ? "Available" : "Unavailable"}
						</div>
						<div className="text-sm">
							<span className="font-medium">TTS:</span> {aiStatus.tts_available ? "Available" : "Unavailable"}
						</div>
						<div className="text-sm">
							<span className="font-medium">Portfolio Items:</span> {aiStatus.portfolio_items}
						</div>
					</div>
				)}

				{/* AI Stats */}
				{aiStats && (
					<div className="grid grid-cols-2 gap-4 p-4 rounded-lg border border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/10">
						<div className="text-sm">
							<span className="font-medium">Provider:</span> {aiStats.llm_provider}
						</div>
						<div className="text-sm">
							<span className="font-medium">Embedding Model:</span> {aiStats.embedding_model}
						</div>
						<div className="text-sm">
							<span className="font-medium">Audio Cache:</span> {aiStats.audio_cache_size} items
						</div>
					</div>
				)}

				<div className="flex gap-4">
					<button
						onClick={refreshAiData}
						disabled={refreshing}
						className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50"
					>
						<RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
						{refreshing ? "Refreshing..." : "Refresh AI Data"}
					</button>
					<button
						onClick={checkAiStatus}
						className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
					>
						<Activity size={16} />
						Check Status
					</button>
				</div>
			</motion.div>

			{/* System Actions */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className="space-y-4"
			>
				<div className="flex items-center gap-2 mb-4">
					<Database size={20} className="text-accent-600 dark:text-accent-400" />
					<h3 className="text-lg font-semibold">System</h3>
				</div>

				<div className="flex gap-4">
					<button
						onClick={clearCache}
						className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
					>
						<Trash2 size={16} />
						Clear Cache
					</button>
					<button
						onClick={() => window.location.reload()}
						className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
					>
						<Database size={16} />
						Restart Services
					</button>
				</div>
			</motion.div>
		</div>
	);
}

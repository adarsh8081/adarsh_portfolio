"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Database, Trash2, Shield, Mail } from "lucide-react";

export function SettingsPanel() {
	const [settings, setSettings] = useState({
		siteName: "Adarsh Portfolio",
		siteDescription: "Futuristic, interactive portfolio with 3D visuals and modern features.",
		contactEmail: "contact@adarsh.dev",
		socialLinks: {
			github: "https://github.com/adarsh",
			linkedin: "https://linkedin.com/in/adarsh",
			twitter: "https://twitter.com/adarsh",
		},
		features: {
			blog: true,
			contactForm: true,
			analytics: true,
		},
	});

	const [loading, setLoading] = useState(false);

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

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-semibold">Settings</h2>
				<button
					onClick={handleSave}
					disabled={loading}
					className="px-6 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white font-medium transition-colors disabled:opacity-50"
				>
					{loading ? "Saving..." : "Save Changes"}
				</button>
			</div>

			{/* General Settings */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="space-y-4"
			>
				<div className="flex items-center gap-2 mb-4">
					<Settings size={20} className="text-accent-600 dark:text-accent-400" />
					<h3 className="text-lg font-semibold">General</h3>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-2">Site Name</label>
						<input
							type="text"
							value={settings.siteName}
							onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/10 focus:outline-none focus:ring-2 focus:ring-accent-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">Contact Email</label>
						<input
							type="email"
							value={settings.contactEmail}
							onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/10 focus:outline-none focus:ring-2 focus:ring-accent-500"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium mb-2">Site Description</label>
					<textarea
						value={settings.siteDescription}
						onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
						rows={3}
						className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/10 focus:outline-none focus:ring-2 focus:ring-accent-500"
					/>
				</div>
			</motion.div>

			{/* Social Links */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="space-y-4"
			>
				<div className="flex items-center gap-2 mb-4">
					<Mail size={20} className="text-accent-600 dark:text-accent-400" />
					<h3 className="text-lg font-semibold">Social Links</h3>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-sm font-medium mb-2">GitHub</label>
						<input
							type="url"
							value={settings.socialLinks.github}
							onChange={(e) => setSettings(prev => ({ 
								...prev, 
								socialLinks: { ...prev.socialLinks, github: e.target.value }
							}))}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/10 focus:outline-none focus:ring-2 focus:ring-accent-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">LinkedIn</label>
						<input
							type="url"
							value={settings.socialLinks.linkedin}
							onChange={(e) => setSettings(prev => ({ 
								...prev, 
								socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
							}))}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/10 focus:outline-none focus:ring-2 focus:ring-accent-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">Twitter</label>
						<input
							type="url"
							value={settings.socialLinks.twitter}
							onChange={(e) => setSettings(prev => ({ 
								...prev, 
								socialLinks: { ...prev.socialLinks, twitter: e.target.value }
							}))}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/5 dark:bg-black/10 focus:outline-none focus:ring-2 focus:ring-accent-500"
						/>
					</div>
				</div>
			</motion.div>

			{/* Features */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="space-y-4"
			>
				<div className="flex items-center gap-2 mb-4">
					<Shield size={20} className="text-accent-600 dark:text-accent-400" />
					<h3 className="text-lg font-semibold">Features</h3>
				</div>

				<div className="space-y-3">
					<label className="flex items-center gap-3">
						<input
							type="checkbox"
							checked={settings.features.blog}
							onChange={(e) => setSettings(prev => ({ 
								...prev, 
								features: { ...prev.features, blog: e.target.checked }
							}))}
							className="w-4 h-4 text-accent-600 bg-white/5 border-white/20 rounded focus:ring-accent-500"
						/>
						<span className="text-sm font-medium">Enable Blog</span>
					</label>
					<label className="flex items-center gap-3">
						<input
							type="checkbox"
							checked={settings.features.contactForm}
							onChange={(e) => setSettings(prev => ({ 
								...prev, 
								features: { ...prev.features, contactForm: e.target.checked }
							}))}
							className="w-4 h-4 text-accent-600 bg-white/5 border-white/20 rounded focus:ring-accent-500"
						/>
						<span className="text-sm font-medium">Enable Contact Form</span>
					</label>
					<label className="flex items-center gap-3">
						<input
							type="checkbox"
							checked={settings.features.analytics}
							onChange={(e) => setSettings(prev => ({ 
								...prev, 
								features: { ...prev.features, analytics: e.target.checked }
							}))}
							className="w-4 h-4 text-accent-600 bg-white/5 border-white/20 rounded focus:ring-accent-500"
						/>
						<span className="text-sm font-medium">Enable Analytics</span>
					</label>
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

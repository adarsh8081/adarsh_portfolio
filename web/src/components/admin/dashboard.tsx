"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./auth-provider";
import { ProjectsManager } from "./projects-manager";
import { TestimonialsManager } from "./testimonials-manager";
import { AchievementsManager } from "./achievements-manager";
import { TimelineManager } from "./timeline-manager";
import { UsersManager } from "./users-manager";
import { SettingsPanel } from "./settings-panel";

type TabType = "projects" | "testimonials" | "achievements" | "timeline" | "users" | "settings";

export function AdminDashboard() {
	const { user, logout } = useAuth();
	const [activeTab, setActiveTab] = useState<TabType>("projects");
	const [stats, setStats] = useState({
		projects: 0,
		testimonials: 0,
		achievements: 0,
		timeline: 0,
	});

	useEffect(() => {
		fetchStats();
	}, []);

	const fetchStats = async () => {
		try {
			const [projectsRes, testimonialsRes, achievementsRes, timelineRes] = await Promise.all([
				fetch("http://localhost:4000/api/projects"),
				fetch("http://localhost:4000/api/testimonials"),
				fetch("http://localhost:4000/api/achievements"),
				fetch("http://localhost:4000/api/timeline"),
			]);

			const [projects, testimonials, achievements, timeline] = await Promise.all([
				projectsRes.json(),
				testimonialsRes.json(),
				achievementsRes.json(),
				timelineRes.json(),
			]);

			setStats({
				projects: projects.length,
				testimonials: testimonials.length,
				achievements: achievements.length,
				timeline: timeline.length,
			});
		} catch (error) {
			console.error("Failed to fetch stats:", error);
		}
	};

	const tabs = [
		{ id: "projects" as TabType, label: "Projects", count: stats.projects },
		{ id: "testimonials" as TabType, label: "Testimonials", count: stats.testimonials },
		{ id: "achievements" as TabType, label: "Achievements", count: stats.achievements },
		{ id: "timeline" as TabType, label: "Timeline", count: stats.timeline },
		{ id: "users" as TabType, label: "Users", count: 0 },
		{ id: "settings" as TabType, label: "Settings", count: 0 },
	];

	const renderContent = () => {
		switch (activeTab) {
			case "projects":
				return <ProjectsManager onUpdate={fetchStats} />;
			case "testimonials":
				return <TestimonialsManager onUpdate={fetchStats} />;
			case "achievements":
				return <AchievementsManager onUpdate={fetchStats} />;
			case "timeline":
				return <TimelineManager onUpdate={fetchStats} />;
			case "users":
				return <UsersManager onUpdate={fetchStats} />;
			case "settings":
				return <SettingsPanel />;
			default:
				return <ProjectsManager onUpdate={fetchStats} />;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-accent-50 to-transparent dark:from-accent-900/20">
			{/* Header */}
			<header className="glass border-b border-white/20 dark:border-white/10 backdrop-blur-xl">
				<div className="container-safe flex items-center justify-between py-4">
					<div>
						<h1 className="text-2xl font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Admin Dashboard
						</h1>
						<p className="text-muted-foreground">Welcome back, {user?.name}</p>
					</div>
					<div className="flex items-center gap-4">
						<span className="text-sm text-muted-foreground">Role: {user?.role}</span>
						<button
							onClick={logout}
							className="px-4 py-2 rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
						>
							Logout
						</button>
					</div>
				</div>
			</header>

			<div className="container-safe py-8">
				{/* Tabs */}
				<div className="flex flex-wrap gap-2 mb-8">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`px-4 py-2 rounded-xl transition-all ${
								activeTab === tab.id
									? "text-white"
									: "border border-white/20 dark:border-white/10 hover:bg-white/10"
							}`}
							style={
								activeTab === tab.id
									? { background: "var(--gradient-1)" }
									: {}
							}
						>
							{tab.label}
							{tab.count > 0 && (
								<span className="ml-2 px-2 py-1 text-xs rounded-full bg-white/20">
									{tab.count}
								</span>
							)}
						</button>
					))}
				</div>

				{/* Content */}
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10 backdrop-blur-xl"
				>
					{renderContent()}
				</motion.div>
			</div>
		</div>
	);
}

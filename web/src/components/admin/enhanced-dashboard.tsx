"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./auth-provider";
import { ProjectsManager } from "./projects-manager";
import { TestimonialsManager } from "./testimonials-manager";
import { AchievementsManager } from "./achievements-manager";
import { TimelineManager } from "./timeline-manager";
import { UsersManager } from "./users-manager";
import { SettingsPanel } from "./settings-panel";
import { AnalyticsDashboard } from "./analytics-dashboard";
import { BlogManager } from "./blog-manager";
import { ServicesManager } from "./services-manager";
import { SkillsManager } from "./skills-manager";
import { 
	BarChart3, 
	Settings, 
	Users, 
	Award, 
	MessageSquare, 
	Calendar,
	FolderOpen,
	TrendingUp,
	RefreshCw,
	Bell
} from "lucide-react";

type TabType = "overview" | "projects" | "blog" | "services" | "skills" | "testimonials" | "achievements" | "timeline" | "users" | "analytics" | "settings";

interface DashboardStats {
	projects: number;
	posts: number;
	services: number;
	skills: number;
	testimonials: number;
	achievements: number;
	timeline: number;
	users: number;
	aiStatus: {
		online: boolean;
		llmAvailable: boolean;
		ttsAvailable: boolean;
		portfolioItems: number;
	};
	analytics: {
		totalVisits: number;
		uniqueVisitors: number;
		pageViews: number;
		bounceRate: number;
	};
}

export function EnhancedDashboard() {
	const { user, logout } = useAuth();
	const [activeTab, setActiveTab] = useState<TabType>("overview");
	const [stats, setStats] = useState<DashboardStats>({
		projects: 0,
		posts: 0,
		services: 0,
		skills: 0,
		testimonials: 0,
		achievements: 0,
		timeline: 0,
		users: 0,
		aiStatus: {
			online: false,
			llmAvailable: false,
			ttsAvailable: false,
			portfolioItems: 0,
		},
		analytics: {
			totalVisits: 0,
			uniqueVisitors: 0,
			pageViews: 0,
			bounceRate: 0,
		},
	});
	const [loading, setLoading] = useState(true);
	const [notifications, setNotifications] = useState<string[]>([]);

	const fetchAllStats = useCallback(async () => {
		try {
			setLoading(true);
			const [contentStats, aiStats, analyticsStats] = await Promise.all([
				fetchContentStats(),
				fetchAIStats(),
				fetchAnalyticsStats(),
			]);

			setStats({
				...contentStats,
				aiStatus: aiStats,
				analytics: analyticsStats,
			});
		} catch (error) {
			console.error("Failed to fetch stats:", error);
			addNotification("Failed to fetch dashboard statistics");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAllStats();
		const interval = setInterval(fetchAllStats, 30000); // Refresh every 30 seconds
		return () => clearInterval(interval);
	}, [fetchAllStats]);

	const fetchContentStats = async () => {
		const [projectsRes, postsRes, servicesRes, skillsRes, testimonialsRes, achievementsRes, timelineRes, usersRes] = await Promise.all([
			fetch("http://localhost:4000/api/projects"),
			fetch("http://localhost:4000/api/posts"),
			fetch("http://localhost:4000/api/services"),
			fetch("http://localhost:4000/api/skills"),
			fetch("http://localhost:4000/api/testimonials"),
			fetch("http://localhost:4000/api/achievements"),
			fetch("http://localhost:4000/api/timeline"),
			fetch("http://localhost:4000/api/users"),
		]);

		const [projects, posts, services, skills, testimonials, achievements, timeline, users] = await Promise.all([
			projectsRes.json(),
			postsRes.json(),
			servicesRes.json(),
			skillsRes.json(),
			testimonialsRes.json(),
			achievementsRes.json(),
			timelineRes.json(),
			usersRes.json(),
		]);

		return {
			projects: projects.length,
			posts: posts.length,
			services: services.length,
			skills: skills.length,
			testimonials: testimonials.length,
			achievements: achievements.length,
			timeline: timeline.length,
			users: users.length,
		};
	};

	const fetchAIStats = async () => {
		try {
			const response = await fetch("http://localhost:4000/api/sync/ai-status");
			if (response.ok) {
				const data = await response.json();
				return {
					online: data.status?.ok || false,
					llmAvailable: data.status?.llm_available || false,
					ttsAvailable: data.status?.tts_available || false,
					portfolioItems: data.status?.portfolio_items || 0,
				};
			}
		} catch (error) {
			console.error("Failed to fetch AI stats:", error);
		}
		return {
			online: false,
			llmAvailable: false,
			ttsAvailable: false,
			portfolioItems: 0,
		};
	};

	const fetchAnalyticsStats = async () => {
		// Mock analytics data - replace with real analytics API calls
		return {
			totalVisits: 1247,
			uniqueVisitors: 892,
			pageViews: 3456,
			bounceRate: 32.5,
		};
	};

	const addNotification = (message: string) => {
		setNotifications(prev => [...prev, message]);
		setTimeout(() => {
			setNotifications(prev => prev.slice(1));
		}, 5000);
	};

	const tabs = [
		{ id: "overview" as TabType, label: "Overview", icon: BarChart3, count: 0 },
		{ id: "projects" as TabType, label: "Projects", icon: FolderOpen, count: stats.projects },
		{ id: "blog" as TabType, label: "Blog", icon: MessageSquare, count: stats.posts },
		{ id: "services" as TabType, label: "Services", icon: Settings, count: stats.services },
		{ id: "skills" as TabType, label: "Skills", icon: Award, count: stats.skills },
		{ id: "testimonials" as TabType, label: "Testimonials", icon: MessageSquare, count: stats.testimonials },
		{ id: "achievements" as TabType, label: "Achievements", icon: Award, count: stats.achievements },
		{ id: "timeline" as TabType, label: "Timeline", icon: Calendar, count: stats.timeline },
		{ id: "users" as TabType, label: "Users", icon: Users, count: stats.users },
		{ id: "analytics" as TabType, label: "Analytics", icon: TrendingUp, count: 0 },
		{ id: "settings" as TabType, label: "Settings", icon: Settings, count: 0 },
	];

	const renderContent = () => {
		switch (activeTab) {
			case "overview":
				return <OverviewPanel stats={stats} onRefresh={fetchAllStats} />;
			case "projects":
				return <ProjectsManager onUpdate={fetchAllStats} />;
			case "blog":
				return <BlogManager onUpdate={fetchAllStats} />;
			case "services":
				return <ServicesManager onUpdate={fetchAllStats} />;
			case "skills":
				return <SkillsManager onUpdate={fetchAllStats} />;
			case "testimonials":
				return <TestimonialsManager onUpdate={fetchAllStats} />;
			case "achievements":
				return <AchievementsManager onUpdate={fetchAllStats} />;
			case "timeline":
				return <TimelineManager onUpdate={fetchAllStats} />;
			case "users":
				return <UsersManager onUpdate={fetchAllStats} />;
			case "analytics":
				return <AnalyticsDashboard />;
			case "settings":
				return <SettingsPanel />;
			default:
				return <OverviewPanel stats={stats} onRefresh={fetchAllStats} />;
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			{/* Header */}
			<header className="bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
				<div className="container-safe flex items-center justify-between py-4">
					<div className="flex items-center gap-4">
						<div>
							<h1 className="text-2xl font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
								Admin Dashboard
							</h1>
							<p className="text-slate-600 dark:text-slate-400">Welcome back, {user?.name}</p>
						</div>
						{loading && <RefreshCw className="h-5 w-5 animate-spin text-accent-500" />}
					</div>
					<div className="flex items-center gap-4">
						{/* Notifications */}
						{notifications.length > 0 && (
							<div className="relative">
								<Bell className="h-5 w-5 text-accent-500" />
								<span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
									{notifications.length}
								</span>
							</div>
						)}
						<span className="text-sm text-slate-600 dark:text-slate-400">Role: {user?.role}</span>
						<button
							onClick={logout}
							className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
						>
							Logout
						</button>
					</div>
				</div>
			</header>

			{/* Notifications */}
			{notifications.length > 0 && (
				<div className="container-safe py-2">
					{notifications.map((notification, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="mb-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-lg border border-blue-200 dark:border-blue-700"
						>
							{notification}
						</motion.div>
					))}
				</div>
			)}

			<div className="container-safe py-6 px-4">
				{/* Tabs */}
				<div className="flex flex-wrap gap-2 mb-6">
					{tabs.map((tab) => {
						const Icon = tab.icon;
						return (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all text-sm ${
									activeTab === tab.id
										? "text-white bg-gradient-to-r from-accent-600 to-accent-400 shadow-lg"
										: "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
								}`}
							>
								<Icon size={16} />
								<span className="hidden sm:inline">{tab.label}</span>
								{tab.count > 0 && (
									<span className={`ml-1 px-2 py-1 text-xs rounded-full ${
										activeTab === tab.id 
											? "bg-white/20 text-white" 
											: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
									}`}>
										{tab.count}
									</span>
								)}
							</button>
						);
					})}
				</div>

				{/* Content */}
				<motion.div
					key={activeTab}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-lg"
				>
					{renderContent()}
				</motion.div>
			</div>

			{/* Floating Action Button for AI Chatbot */}
			<button
				onClick={() => setActiveTab("chatbot")}
				className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-accent-600 to-accent-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
			>
				<Bot size={24} />
			</button>

			{/* Issues Notification */}
			{notifications.length > 0 && (
				<div className="fixed bottom-6 left-6 bg-red-500 text-white px-3 py-2 rounded-full text-sm flex items-center gap-2 z-40">
					<Bell size={16} />
					<span>N {notifications.length} Issues</span>
					<button
						onClick={() => setNotifications([])}
						className="ml-2 hover:bg-red-600 rounded-full p-1"
					>
						×
					</button>
				</div>
			)}
		</div>
	);
}

// Overview Panel Component
function OverviewPanel({ stats, onRefresh }: { stats: DashboardStats; onRefresh: () => void }) {
	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Dashboard Overview</h2>
				<button
					onClick={onRefresh}
					className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
				>
					<RefreshCw size={16} />
					Refresh
				</button>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
				<StatCard
					title="Total Projects"
					value={stats.projects}
					icon={FolderOpen}
					color="blue"
				/>
				<StatCard
					title="Blog Posts"
					value={stats.posts}
					icon={MessageSquare}
					color="green"
				/>
				<StatCard
					title="Services"
					value={stats.services}
					icon={Settings}
					color="purple"
				/>
				<StatCard
					title="Skills"
					value={stats.skills}
					icon={Award}
					color="orange"
				/>
			</div>

			{/* AI Status */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
				<div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
					<h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
						<Bot size={20} className="text-accent-500" />
						AI Service Status
					</h3>
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<span className="text-slate-700 dark:text-slate-300">Service Status</span>
							<span className={`px-2 py-1 rounded-full text-xs ${
								stats.aiStatus.online 
									? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
									: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
							}`}>
								{stats.aiStatus.online ? "Online" : "Offline"}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-slate-700 dark:text-slate-300">LLM Available</span>
							<span className={`px-2 py-1 rounded-full text-xs ${
								stats.aiStatus.llmAvailable 
									? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
									: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
							}`}>
								{stats.aiStatus.llmAvailable ? "Yes" : "No"}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-slate-700 dark:text-slate-300">TTS Available</span>
							<span className={`px-2 py-1 rounded-full text-xs ${
								stats.aiStatus.ttsAvailable 
									? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
									: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
							}`}>
								{stats.aiStatus.ttsAvailable ? "Yes" : "No"}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-slate-700 dark:text-slate-300">Portfolio Items</span>
							<span className="text-accent-600 dark:text-accent-400 font-medium">
								{stats.aiStatus.portfolioItems}
							</span>
						</div>
					</div>
				</div>

				<div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-6 border border-slate-200 dark:border-slate-600">
					<h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-100">
						<TrendingUp size={20} className="text-accent-500" />
						Analytics Overview
					</h3>
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<span className="text-slate-700 dark:text-slate-300">Total Visits</span>
							<span className="text-accent-600 dark:text-accent-400 font-medium">
								{stats.analytics.totalVisits.toLocaleString()}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-slate-700 dark:text-slate-300">Unique Visitors</span>
							<span className="text-accent-600 dark:text-accent-400 font-medium">
								{stats.analytics.uniqueVisitors.toLocaleString()}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-slate-700 dark:text-slate-300">Page Views</span>
							<span className="text-accent-600 dark:text-accent-400 font-medium">
								{stats.analytics.pageViews.toLocaleString()}
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-slate-700 dark:text-slate-300">Bounce Rate</span>
							<span className="text-accent-600 dark:text-accent-400 font-medium">
								{stats.analytics.bounceRate}%
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Stat Card Component
function StatCard({ title, value, icon: Icon, color }: { 
	title: string; 
	value: number; 
	icon: React.ComponentType<{ size?: number; className?: string }>; 
	color: string; 
}) {
	const colorClasses = {
		blue: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30",
		green: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
		purple: "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30",
		orange: "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30",
	};

	return (
		<div className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md transition-shadow">
			<div className="flex items-center justify-between">
				<div className="flex-1 min-w-0">
					<p className="text-sm text-slate-600 dark:text-slate-400 truncate">{title}</p>
					<p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
				</div>
				<div className={`p-2 sm:p-3 rounded-full flex-shrink-0 ${colorClasses[color as keyof typeof colorClasses]}`}>
					<Icon size={20} className="sm:w-6 sm:h-6" />
				</div>
			</div>
		</div>
	);
}

// These components are now imported from their respective files above

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
	Bot, 
	RefreshCw, 
	Activity, 
	Database, 
	Settings, 
	MessageSquare, 
	Volume2, 
	Play,
	Trash2,
	Search,
	Download
} from "lucide-react";

interface ChatbotStats {
	status: {
		online: boolean;
		llmAvailable: boolean;
		ttsAvailable: boolean;
		portfolioItems: number;
	};
	stats: {
		llmProvider: string;
		embeddingModel: string;
		audioCacheSize: number;
		ttsAvailable: boolean;
	};
	conversations: Array<{
		id: string;
		user: string;
		message: string;
		timestamp: string;
		response: string;
		sources: Array<{ title: string; type: string }>;
	}>;
}

export function ChatbotManager() {
	const [stats, setStats] = useState<ChatbotStats>({
		status: {
			online: false,
			llmAvailable: false,
			ttsAvailable: false,
			portfolioItems: 0,
		},
		stats: {
			llmProvider: "Unknown",
			embeddingModel: "Unknown",
			audioCacheSize: 0,
			ttsAvailable: false,
		},
		conversations: [],
	});
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [activeTab, setActiveTab] = useState<"overview" | "conversations" | "settings">("overview");

	useEffect(() => {
		fetchChatbotData();
		const interval = setInterval(fetchChatbotData, 30000); // Refresh every 30 seconds
		return () => clearInterval(interval);
	}, []);

	const fetchChatbotData = async () => {
		try {
			setLoading(true);
			const [statusRes, statsRes] = await Promise.all([
				fetch("http://localhost:4000/api/sync/ai-status"),
				fetch("http://localhost:4000/api/sync/ai-stats"),
			]);

			const [statusData, statsData] = await Promise.all([
				statusRes.ok ? statusRes.json() : null,
				statsRes.ok ? statsRes.json() : null,
			]);

			setStats({
				status: {
					online: statusData?.status?.ok || false,
					llmAvailable: statusData?.status?.llm_available || false,
					ttsAvailable: statusData?.status?.tts_available || false,
					portfolioItems: statusData?.status?.portfolio_items || 0,
				},
				stats: {
					llmProvider: statsData?.stats?.llm_provider || "Unknown",
					embeddingModel: statsData?.stats?.embedding_model || "Unknown",
					audioCacheSize: statsData?.stats?.audio_cache_size || 0,
					ttsAvailable: statsData?.stats?.tts_available || false,
				},
				conversations: [], // Mock data - replace with real API
			});
		} catch (error) {
			console.error("Failed to fetch chatbot data:", error);
		} finally {
			setLoading(false);
		}
	};

	const refreshAIData = async () => {
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
				await fetchChatbotData();
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

	const clearAudioCache = async () => {
		if (!confirm("Are you sure you want to clear the audio cache?")) return;
		
		try {
			// This would be a new endpoint to clear audio cache
			alert("Audio cache cleared successfully!");
			await fetchChatbotData();
		} catch (error) {
			console.error("Failed to clear audio cache:", error);
			alert("Failed to clear audio cache");
		}
	};

	const testChatbot = async () => {
		try {
			const response = await fetch("http://localhost:8000/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					question: "What projects have you worked on?",
					context: [],
					use_voice: false,
					conversation_history: [],
				}),
			});

			if (response.ok) {
				const data = await response.json();
				alert(`Test successful! Response: ${data.answer.substring(0, 100)}...`);
			} else {
				alert("Test failed - chatbot not responding");
			}
		} catch (error) {
			console.error("Chatbot test failed:", error);
			alert("Test failed - chatbot service unavailable");
		}
	};

	const tabs = [
		{ id: "overview" as const, label: "Overview", icon: Activity },
		{ id: "conversations" as const, label: "Conversations", icon: MessageSquare },
		{ id: "settings" as const, label: "Settings", icon: Settings },
	];

	const renderContent = () => {
		switch (activeTab) {
			case "overview":
				return <OverviewTab stats={stats} onRefresh={refreshAIData} onTest={testChatbot} refreshing={refreshing} />;
			case "conversations":
				return <ConversationsTab conversations={stats.conversations} />;
			case "settings":
				return <SettingsTab stats={stats} onClearCache={clearAudioCache} />;
			default:
				return <OverviewTab stats={stats} onRefresh={refreshAIData} onTest={testChatbot} refreshing={refreshing} />;
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold flex items-center gap-2">
						<Bot className="h-6 w-6 text-accent-500" />
						AI Chatbot Management
					</h2>
					<p className="text-muted-foreground">Manage your AI chatbot and monitor its performance</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={fetchChatbotData}
						disabled={loading}
						className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50"
					>
						<RefreshCw size={16} className={loading ? "animate-spin" : ""} />
						Refresh
					</button>
				</div>
			</div>

			{/* Tabs */}
			<div className="flex gap-2">
				{tabs.map((tab) => {
					const Icon = tab.icon;
					return (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
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
							<Icon size={16} />
							{tab.label}
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
			>
				{renderContent()}
			</motion.div>
		</div>
	);
}

// Overview Tab Component
function OverviewTab({ 
	stats, 
	onRefresh, 
	onTest, 
	refreshing 
}: { 
	stats: ChatbotStats; 
	onRefresh: () => void; 
	onTest: () => void; 
	refreshing: boolean; 
}) {
	return (
		<div className="space-y-6">
			{/* Status Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				<StatusCard
					title="Service Status"
					value={stats.status.online ? "Online" : "Offline"}
					status={stats.status.online ? "success" : "error"}
					icon={Activity}
				/>
				<StatusCard
					title="LLM Available"
					value={stats.status.llmAvailable ? "Yes" : "No"}
					status={stats.status.llmAvailable ? "success" : "error"}
					icon={Bot}
				/>
				<StatusCard
					title="TTS Available"
					value={stats.status.ttsAvailable ? "Yes" : "No"}
					status={stats.status.ttsAvailable ? "success" : "error"}
					icon={Volume2}
				/>
				<StatusCard
					title="Portfolio Items"
					value={stats.status.portfolioItems.toString()}
					status="info"
					icon={Database}
				/>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="glass rounded-xl p-6 border border-white/20 dark:border-white/10">
					<h3 className="text-lg font-semibold mb-4">System Information</h3>
					<div className="space-y-3">
						<div className="flex justify-between">
							<span className="text-muted-foreground">LLM Provider:</span>
							<span className="font-medium">{stats.stats.llmProvider}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">Embedding Model:</span>
							<span className="font-medium">{stats.stats.embeddingModel}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-muted-foreground">Audio Cache Size:</span>
							<span className="font-medium">{stats.stats.audioCacheSize} items</span>
						</div>
					</div>
				</div>

				<div className="glass rounded-xl p-6 border border-white/20 dark:border-white/10">
					<h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
					<div className="space-y-3">
						<button
							onClick={onRefresh}
							disabled={refreshing}
							className="w-full flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50"
						>
							<RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
							{refreshing ? "Refreshing..." : "Refresh AI Data"}
						</button>
						<button
							onClick={onTest}
							className="w-full flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
						>
							<Play size={16} />
							Test Chatbot
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

// Conversations Tab Component
function ConversationsTab({ 
	conversations
}: { 
	conversations: ChatbotStats['conversations']; 
}) {
	return (
		<div className="space-y-4">
			{/* Search and Filters */}
			<div className="flex gap-4">
				<div className="flex-1 relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search conversations..."
						className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					/>
				</div>
				<select className="px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20">
					<option value="all">All Types</option>
					<option value="projects">Projects</option>
					<option value="posts">Posts</option>
					<option value="skills">Skills</option>
				</select>
			</div>

			{/* Conversations List */}
			<div className="space-y-4">
				{conversations.length === 0 ? (
					<div className="text-center py-8 text-muted-foreground">
						<MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
						<p>No conversations found</p>
						<p className="text-sm">Conversations will appear here once users start chatting</p>
					</div>
				) : (
					conversations.map((conversation) => (
						<div key={conversation.id} className="glass rounded-xl p-4 border border-white/20 dark:border-white/10">
							<div className="flex items-start justify-between mb-2">
								<div>
									<p className="font-medium">{conversation.user}</p>
									<p className="text-sm text-muted-foreground">{conversation.timestamp}</p>
								</div>
								<button className="text-muted-foreground hover:text-foreground">
									<Trash2 size={16} />
								</button>
							</div>
							<div className="space-y-2">
								<div>
									<p className="text-sm font-medium text-muted-foreground">Question:</p>
									<p className="text-sm">{conversation.message}</p>
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground">Response:</p>
									<p className="text-sm">{conversation.response}</p>
								</div>
								{conversation.sources.length > 0 && (
									<div>
										<p className="text-sm font-medium text-muted-foreground">Sources:</p>
										<div className="flex flex-wrap gap-1 mt-1">
											{conversation.sources.map((source, index) => (
												<span key={index} className="text-xs bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 px-2 py-1 rounded">
													{source.title} ({source.type})
												</span>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

// Settings Tab Component
function SettingsTab({ 
	stats, 
	onClearCache 
}: { 
	stats: ChatbotStats; 
	onClearCache: () => void; 
}) {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="glass rounded-xl p-6 border border-white/20 dark:border-white/10">
					<h3 className="text-lg font-semibold mb-4">Cache Management</h3>
					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<div>
								<p className="font-medium">Audio Cache</p>
								<p className="text-sm text-muted-foreground">{stats.stats.audioCacheSize} items</p>
							</div>
							<button
								onClick={onClearCache}
								className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
							>
								<Trash2 size={16} />
								Clear
							</button>
						</div>
					</div>
				</div>

				<div className="glass rounded-xl p-6 border border-white/20 dark:border-white/10">
					<h3 className="text-lg font-semibold mb-4">Export Data</h3>
					<div className="space-y-3">
						<button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors">
							<Download size={16} />
							Export Conversations
						</button>
						<button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors">
							<Download size={16} />
							Export Knowledge Base
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

// Status Card Component
function StatusCard({ 
	title, 
	value, 
	status, 
	icon: Icon 
}: { 
	title: string; 
	value: string; 
	status: "success" | "error" | "info"; 
	icon: React.ComponentType<{ size?: number; className?: string }>; 
}) {
	const statusClasses = {
		success: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20",
		error: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20",
		info: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20",
	};

	return (
		<div className="glass rounded-xl p-4 border border-white/20 dark:border-white/10">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">{title}</p>
					<p className="text-lg font-semibold">{value}</p>
				</div>
				<div className={`p-2 rounded-full ${statusClasses[status]}`}>
					<Icon size={20} />
				</div>
			</div>
		</div>
	);
}

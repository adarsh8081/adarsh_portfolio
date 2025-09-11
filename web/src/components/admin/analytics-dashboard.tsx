"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
	TrendingUp, 
	Users, 
	Eye, 
	MousePointer, 
	Clock, 
	Globe, 
	Smartphone, 
	Monitor,
	RefreshCw,
	Download,
	BarChart3,
	Activity
} from "lucide-react";

interface AnalyticsData {
	overview: {
		totalVisits: number;
		uniqueVisitors: number;
		pageViews: number;
		bounceRate: number;
		avgSessionDuration: number;
		conversionRate: number;
	};
	trends: {
		visits: Array<{ date: string; value: number }>;
		pageViews: Array<{ date: string; value: number }>;
		bounceRate: Array<{ date: string; value: number }>;
	};
	topPages: Array<{
		page: string;
		views: number;
		uniqueViews: number;
		bounceRate: number;
		avgTime: number;
	}>;
	devices: {
		desktop: number;
		mobile: number;
		tablet: number;
	};
	locations: Array<{
		country: string;
		visits: number;
		percentage: number;
	}>;
	referrers: Array<{
		source: string;
		visits: number;
		percentage: number;
	}>;
	realTime: {
		activeUsers: number;
		activePages: Array<{ page: string; users: number }>;
	};
}

export function AnalyticsDashboard() {
	const [data, setData] = useState<AnalyticsData>({
		overview: {
			totalVisits: 0,
			uniqueVisitors: 0,
			pageViews: 0,
			bounceRate: 0,
			avgSessionDuration: 0,
			conversionRate: 0,
		},
		trends: {
			visits: [],
			pageViews: [],
			bounceRate: [],
		},
		topPages: [],
		devices: { desktop: 0, mobile: 0, tablet: 0 },
		locations: [],
		referrers: [],
		realTime: { activeUsers: 0, activePages: [] },
	});
	const [loading, setLoading] = useState(true);
	const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");
	const [activeTab, setActiveTab] = useState<"overview" | "pages" | "audience" | "realtime">("overview");

	const fetchAnalyticsData = useCallback(async () => {
		try {
			setLoading(true);
			
			// Fetch real analytics data from API
			const [overviewRes, pagesRes, audienceRes, realtimeRes] = await Promise.all([
				fetch("http://localhost:4000/api/analytics/overview", {
					headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` }
				}),
				fetch("http://localhost:4000/api/analytics/pages", {
					headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` }
				}),
				fetch("http://localhost:4000/api/analytics/audience", {
					headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` }
				}),
				fetch("http://localhost:4000/api/analytics/realtime", {
					headers: { Authorization: `Bearer ${localStorage.getItem("auth_token")}` }
				}),
			]);

			const [overview, pages, audience, realtime] = await Promise.all([
				overviewRes.ok ? overviewRes.json() : null,
				pagesRes.ok ? pagesRes.json() : null,
				audienceRes.ok ? audienceRes.json() : null,
				realtimeRes.ok ? realtimeRes.json() : null,
			]);

			const analyticsData: AnalyticsData = {
				overview: overview?.data || {
					totalVisits: 0,
					uniqueVisitors: 0,
					pageViews: 0,
					bounceRate: 0,
					avgSessionDuration: 0,
					conversionRate: 0,
				},
				trends: overview?.data?.trends || {
					visits: [],
					pageViews: [],
					bounceRate: [],
				},
				topPages: pages?.data || [],
				devices: audience?.data?.devices || { desktop: 0, mobile: 0, tablet: 0 },
				locations: audience?.data?.locations || [],
				referrers: audience?.data?.referrers || [],
				realTime: realtime?.data || { activeUsers: 0, activePages: [] },
			};

			// Fallback to mock data if API fails
			const mockData: AnalyticsData = {
				overview: {
					totalVisits: 1247,
					uniqueVisitors: 892,
					pageViews: 3456,
					bounceRate: 32.5,
					avgSessionDuration: 2.5,
					conversionRate: 4.2,
				},
				trends: {
					visits: generateTrendData(30, 50, 200),
					pageViews: generateTrendData(30, 100, 500),
					bounceRate: generateTrendData(30, 20, 50),
				},
				topPages: [
					{ page: "/", views: 1247, uniqueViews: 892, bounceRate: 28.5, avgTime: 3.2 },
					{ page: "/projects", views: 456, uniqueViews: 234, bounceRate: 35.2, avgTime: 2.8 },
					{ page: "/about", views: 234, uniqueViews: 189, bounceRate: 42.1, avgTime: 1.9 },
					{ page: "/contact", views: 123, uniqueViews: 98, bounceRate: 38.7, avgTime: 2.1 },
					{ page: "/blog", views: 89, uniqueViews: 67, bounceRate: 45.3, avgTime: 1.5 },
				],
				devices: { desktop: 65, mobile: 30, tablet: 5 },
				locations: [
					{ country: "United States", visits: 456, percentage: 36.6 },
					{ country: "United Kingdom", visits: 234, percentage: 18.8 },
					{ country: "Canada", visits: 123, percentage: 9.9 },
					{ country: "Germany", visits: 89, percentage: 7.1 },
					{ country: "France", visits: 67, percentage: 5.4 },
				],
				referrers: [
					{ source: "Direct", visits: 456, percentage: 36.6 },
					{ source: "Google", visits: 234, percentage: 18.8 },
					{ source: "LinkedIn", visits: 123, percentage: 9.9 },
					{ source: "Twitter", visits: 89, percentage: 7.1 },
					{ source: "GitHub", visits: 67, percentage: 5.4 },
				],
				realTime: {
					activeUsers: 12,
					activePages: [
						{ page: "/", users: 5 },
						{ page: "/projects", users: 3 },
						{ page: "/about", users: 2 },
						{ page: "/contact", users: 2 },
					],
				},
			};
			
			// Use real data if available, otherwise fallback to mock data
			setData(analyticsData.overview.totalVisits > 0 ? analyticsData : mockData);
		} catch (error) {
			console.error("Failed to fetch analytics data:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchAnalyticsData();
		const interval = setInterval(fetchAnalyticsData, 60000); // Refresh every minute
		return () => clearInterval(interval);
	}, [fetchAnalyticsData]);

	const generateTrendData = (days: number, min: number, max: number) => {
		const data = [];
		for (let i = days - 1; i >= 0; i--) {
			const date = new Date();
			date.setDate(date.getDate() - i);
			data.push({
				date: date.toISOString().split('T')[0],
				value: Math.floor(Math.random() * (max - min + 1)) + min,
			});
		}
		return data;
	};

	const exportData = () => {
		const csvContent = "data:text/csv;charset=utf-8," + 
			"Metric,Value\n" +
			`Total Visits,${data.overview.totalVisits}\n` +
			`Unique Visitors,${data.overview.uniqueVisitors}\n` +
			`Page Views,${data.overview.pageViews}\n` +
			`Bounce Rate,${data.overview.bounceRate}%\n`;
		
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "analytics_data.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const tabs = [
		{ id: "overview" as const, label: "Overview", icon: BarChart3 },
		{ id: "pages" as const, label: "Pages", icon: Eye },
		{ id: "audience" as const, label: "Audience", icon: Users },
		{ id: "realtime" as const, label: "Real-time", icon: Activity },
	];

	const renderContent = () => {
		switch (activeTab) {
			case "overview":
				return <OverviewTab data={data} />;
			case "pages":
				return <PagesTab data={data} />;
			case "audience":
				return <AudienceTab data={data} />;
			case "realtime":
				return <RealTimeTab data={data} />;
			default:
				return <OverviewTab data={data} />;
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold flex items-center gap-2">
						<TrendingUp className="h-6 w-6 text-accent-500" />
						Analytics Dashboard
					</h2>
					<p className="text-muted-foreground">Track your portfolio performance and user engagement</p>
				</div>
				<div className="flex items-center gap-2">
					<select
						value={timeRange}
						onChange={(e) => setTimeRange(e.target.value as "7d" | "30d" | "90d" | "1y")}
						className="px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					>
						<option value="7d">Last 7 days</option>
						<option value="30d">Last 30 days</option>
						<option value="90d">Last 90 days</option>
						<option value="1y">Last year</option>
					</select>
					<button
						onClick={fetchAnalyticsData}
						disabled={loading}
						className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50"
					>
						<RefreshCw size={16} className={loading ? "animate-spin" : ""} />
						Refresh
					</button>
					<button
						onClick={exportData}
						className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
					>
						<Download size={16} />
						Export
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
function OverviewTab({ data }: { data: AnalyticsData }) {
	return (
		<div className="space-y-6">
			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
				<MetricCard
					title="Total Visits"
					value={data.overview.totalVisits.toLocaleString()}
					icon={TrendingUp}
					color="blue"
					change="+12.5%"
				/>
				<MetricCard
					title="Unique Visitors"
					value={data.overview.uniqueVisitors.toLocaleString()}
					icon={Users}
					color="green"
					change="+8.3%"
				/>
				<MetricCard
					title="Page Views"
					value={data.overview.pageViews.toLocaleString()}
					icon={Eye}
					color="purple"
					change="+15.2%"
				/>
				<MetricCard
					title="Bounce Rate"
					value={`${data.overview.bounceRate}%`}
					icon={MousePointer}
					color="orange"
					change="-2.1%"
				/>
				<MetricCard
					title="Avg. Session"
					value={`${data.overview.avgSessionDuration}m`}
					icon={Clock}
					color="teal"
					change="+0.3m"
				/>
				<MetricCard
					title="Conversion Rate"
					value={`${data.overview.conversionRate}%`}
					icon={Activity}
					color="pink"
					change="+1.2%"
				/>
			</div>

			{/* Charts */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="glass rounded-xl p-6 border border-white/20 dark:border-white/10">
					<h3 className="text-lg font-semibold mb-4">Visits Trend</h3>
					<div className="h-64 flex items-center justify-center text-muted-foreground">
						<BarChart3 size={48} className="opacity-50" />
						<span className="ml-2">Chart visualization coming soon</span>
					</div>
				</div>
				<div className="glass rounded-xl p-6 border border-white/20 dark:border-white/10">
					<h3 className="text-lg font-semibold mb-4">Device Distribution</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Monitor size={16} />
								<span>Desktop</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
									<div className="h-2 bg-blue-500 rounded-full" style={{ width: `${data.devices.desktop}%` }}></div>
								</div>
								<span className="text-sm font-medium">{data.devices.desktop}%</span>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Smartphone size={16} />
								<span>Mobile</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
									<div className="h-2 bg-green-500 rounded-full" style={{ width: `${data.devices.mobile}%` }}></div>
								</div>
								<span className="text-sm font-medium">{data.devices.mobile}%</span>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Monitor size={16} />
								<span>Tablet</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
									<div className="h-2 bg-purple-500 rounded-full" style={{ width: `${data.devices.tablet}%` }}></div>
								</div>
								<span className="text-sm font-medium">{data.devices.tablet}%</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// Pages Tab Component
function PagesTab({ data }: { data: AnalyticsData }) {
	return (
		<div className="space-y-6">
			<div className="glass rounded-xl p-6 border border-white/20 dark:border-white/10">
				<h3 className="text-lg font-semibold mb-4">Top Pages</h3>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-white/10">
								<th className="text-left py-3 px-4">Page</th>
								<th className="text-right py-3 px-4">Views</th>
								<th className="text-right py-3 px-4">Unique Views</th>
								<th className="text-right py-3 px-4">Bounce Rate</th>
								<th className="text-right py-3 px-4">Avg. Time</th>
							</tr>
						</thead>
						<tbody>
							{data.topPages.map((page, index) => (
								<tr key={index} className="border-b border-white/5">
									<td className="py-3 px-4 font-medium">{page.page}</td>
									<td className="py-3 px-4 text-right">{page.views.toLocaleString()}</td>
									<td className="py-3 px-4 text-right">{page.uniqueViews.toLocaleString()}</td>
									<td className="py-3 px-4 text-right">{page.bounceRate}%</td>
									<td className="py-3 px-4 text-right">{page.avgTime}m</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

// Audience Tab Component
function AudienceTab({ data }: { data: AnalyticsData }) {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="glass rounded-xl p-6 border border-white/20 dark:border-white/10">
					<h3 className="text-lg font-semibold mb-4">Top Countries</h3>
					<div className="space-y-3">
						{data.locations.map((location, index) => (
							<div key={index} className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Globe size={16} />
									<span>{location.country}</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
										<div className="h-2 bg-accent-500 rounded-full" style={{ width: `${location.percentage}%` }}></div>
									</div>
									<span className="text-sm font-medium w-16 text-right">{location.visits}</span>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="glass rounded-xl p-6 border border-white/20 dark:border-white/10">
					<h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
					<div className="space-y-3">
						{data.referrers.map((referrer, index) => (
							<div key={index} className="flex items-center justify-between">
								<span>{referrer.source}</span>
								<div className="flex items-center gap-2">
									<div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
										<div className="h-2 bg-green-500 rounded-full" style={{ width: `${referrer.percentage}%` }}></div>
									</div>
									<span className="text-sm font-medium w-16 text-right">{referrer.visits}</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

// Real-time Tab Component
function RealTimeTab({ data }: { data: AnalyticsData }) {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="glass rounded-xl p-6 border border-white/20 dark:border-white/10">
					<h3 className="text-lg font-semibold mb-4">Active Users</h3>
					<div className="text-center">
						<div className="text-4xl font-bold text-accent-500 mb-2">{data.realTime.activeUsers}</div>
						<p className="text-muted-foreground">users online now</p>
					</div>
				</div>

				<div className="glass rounded-xl p-6 border border-white/20 dark:border-white/10">
					<h3 className="text-lg font-semibold mb-4">Active Pages</h3>
					<div className="space-y-3">
						{data.realTime.activePages.map((page, index) => (
							<div key={index} className="flex items-center justify-between">
								<span className="font-medium">{page.page}</span>
								<span className="text-accent-500 font-semibold">{page.users} users</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

// Metric Card Component
function MetricCard({ 
	title, 
	value, 
	icon: Icon, 
	color, 
	change 
}: { 
	title: string; 
	value: string; 
	icon: React.ComponentType<{ size?: number; className?: string }>; 
	color: string; 
	change: string; 
}) {
	const colorClasses = {
		blue: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20",
		green: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20",
		purple: "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20",
		orange: "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20",
		teal: "text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/20",
		pink: "text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/20",
	};

	const isPositive = change.startsWith('+');
	const changeColor = isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";

	return (
		<div className="glass rounded-xl p-4 border border-white/20 dark:border-white/10">
			<div className="flex items-center justify-between mb-2">
				<div className={`p-2 rounded-full ${colorClasses[color as keyof typeof colorClasses]}`}>
					<Icon size={20} />
				</div>
				<span className={`text-sm font-medium ${changeColor}`}>{change}</span>
			</div>
			<div>
				<p className="text-2xl font-bold">{value}</p>
				<p className="text-sm text-muted-foreground">{title}</p>
			</div>
		</div>
	);
}

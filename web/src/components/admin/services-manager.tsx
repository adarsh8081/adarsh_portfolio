"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
	Plus, 
	Edit, 
	Trash2, 
	Search, 
	DollarSign, 
	Clock, 
	Star,
	RefreshCw,
	Download,
	Globe,
	Lock
} from "lucide-react";

interface Service {
	id: number;
	name: string;
	description: string;
	price: number;
	currency: string;
	duration: string;
	features: string[];
	category: string;
	featured: boolean;
	active: boolean;
	createdAt: string;
	updatedAt: string;
}

export function ServicesManager({ onUpdate }: { onUpdate: () => void }) {
	const [services, setServices] = useState<Service[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterCategory, setFilterCategory] = useState<"all" | "web" | "mobile" | "ai" | "consulting">("all");
	const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [editingService, setEditingService] = useState<Service | null>(null);

	useEffect(() => {
		fetchServices();
	}, []);

	const fetchServices = async () => {
		try {
			setLoading(true);
			const response = await fetch("http://localhost:4000/api/services");
			if (response.ok) {
				const data = await response.json();
				setServices(data);
			}
		} catch (error) {
			console.error("Failed to fetch services:", error);
		} finally {
			setLoading(false);
		}
	};

	const deleteService = async (id: number) => {
		if (!confirm("Are you sure you want to delete this service?")) return;
		
		try {
			const response = await fetch(`http://localhost:4000/api/services/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
				},
			});

			if (response.ok) {
				setServices(services.filter(service => service.id !== id));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to delete service:", error);
		}
	};

	const toggleActive = async (service: Service) => {
		try {
			const response = await fetch(`http://localhost:4000/api/services/${service.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
				},
				body: JSON.stringify({ active: !service.active }),
			});

			if (response.ok) {
				setServices(services.map(s => s.id === service.id ? { ...s, active: !s.active } : s));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to update service:", error);
		}
	};

	const toggleFeatured = async (service: Service) => {
		try {
			const response = await fetch(`http://localhost:4000/api/services/${service.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
				},
				body: JSON.stringify({ featured: !service.featured }),
			});

			if (response.ok) {
				setServices(services.map(s => s.id === service.id ? { ...s, featured: !s.featured } : s));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to update service:", error);
		}
	};

	const filteredServices = services.filter(service => {
		const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			service.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()));
		
		const matchesCategory = filterCategory === "all" || service.category === filterCategory;
		const matchesStatus = filterStatus === "all" || 
			(filterStatus === "active" && service.active) ||
			(filterStatus === "inactive" && !service.active);

		return matchesSearch && matchesCategory && matchesStatus;
	});

	const exportServices = () => {
		const csvContent = "data:text/csv;charset=utf-8," + 
			"Name,Category,Price,Duration,Active,Featured\n" +
			filteredServices.map(service => 
				`"${service.name}","${service.category}","${service.currency}${service.price}","${service.duration}","${service.active ? 'Yes' : 'No'}","${service.featured ? 'Yes' : 'No'}"`
			).join("\n");
		
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "services.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold">Services Management</h2>
					<p className="text-muted-foreground">Manage your service offerings and pricing</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={exportServices}
						className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
					>
						<Download size={16} />
						Export
					</button>
					<button
						onClick={() => setShowCreateForm(true)}
						className="flex items-center gap-2 px-4 py-2 rounded-xl text-white"
						style={{ background: "var(--gradient-1)" }}
					>
						<Plus size={16} />
						New Service
					</button>
				</div>
			</div>

			{/* Filters */}
			<div className="flex flex-wrap gap-4">
				<div className="flex-1 min-w-64 relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search services..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					/>
				</div>
				<select
					value={filterCategory}
				onChange={(e) => setFilterCategory(e.target.value as "all" | "web" | "mobile" | "ai" | "consulting")}
					className="px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
				>
					<option value="all">All Categories</option>
					<option value="web">Web Development</option>
					<option value="mobile">Mobile Development</option>
					<option value="ai">AI/ML</option>
					<option value="consulting">Consulting</option>
				</select>
				<select
					value={filterStatus}
					onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
					className="px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
				>
					<option value="all">All Status</option>
					<option value="active">Active</option>
					<option value="inactive">Inactive</option>
				</select>
			</div>

			{/* Services List */}
			<div className="space-y-4">
				{loading ? (
					<div className="text-center py-8">
						<RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-accent-500" />
						<p className="text-muted-foreground">Loading services...</p>
					</div>
				) : filteredServices.length === 0 ? (
					<div className="text-center py-8 text-muted-foreground">
						<Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
						<p>No services found</p>
						<p className="text-sm">Try adjusting your search or filters</p>
					</div>
				) : (
					filteredServices.map((service) => (
						<motion.div
							key={service.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="glass rounded-xl p-6 border border-white/20 dark:border-white/10"
						>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="text-lg font-semibold">{service.name}</h3>
										{service.featured && (
											<span className="px-2 py-1 text-xs bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full">
												Featured
											</span>
										)}
										{service.active ? (
											<span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex items-center gap-1">
												<Globe size={12} />
												Active
											</span>
										) : (
											<span className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full flex items-center gap-1">
												<Lock size={12} />
												Inactive
											</span>
										)}
									</div>
									<p className="text-muted-foreground mb-3 line-clamp-2">{service.description}</p>
									<div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
										<div className="flex items-center gap-1">
											<DollarSign size={14} />
											{service.currency}{service.price}
										</div>
										<div className="flex items-center gap-1">
											<Clock size={14} />
											{service.duration}
										</div>
										<div className="px-2 py-1 text-xs bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 rounded-full">
											{service.category}
										</div>
									</div>
									{service.features.length > 0 && (
										<div className="space-y-1">
											<p className="text-sm font-medium text-muted-foreground">Features:</p>
											<ul className="text-sm text-muted-foreground">
												{service.features.slice(0, 3).map((feature, index) => (
													<li key={index} className="flex items-center gap-1">
														<span className="w-1 h-1 bg-accent-500 rounded-full"></span>
														{feature}
													</li>
												))}
												{service.features.length > 3 && (
													<li className="text-xs text-muted-foreground">
														+{service.features.length - 3} more features
													</li>
												)}
											</ul>
										</div>
									)}
								</div>
								<div className="flex items-center gap-2 ml-4">
									<button
										onClick={() => toggleActive(service)}
										className={`p-2 rounded-lg transition-colors ${
											service.active 
												? "text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20"
												: "text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
										}`}
										title={service.active ? "Deactivate" : "Activate"}
									>
										{service.active ? <Globe size={16} /> : <Lock size={16} />}
									</button>
									<button
										onClick={() => toggleFeatured(service)}
										className={`p-2 rounded-lg transition-colors ${
											service.featured 
												? "text-accent-600 dark:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-900/20"
												: "text-muted-foreground hover:bg-white/10"
										}`}
										title={service.featured ? "Remove from featured" : "Add to featured"}
									>
										<Star size={16} />
									</button>
									<button
										onClick={() => setEditingService(service)}
										className="p-2 rounded-lg text-muted-foreground hover:bg-white/10 transition-colors"
										title="Edit service"
									>
										<Edit size={16} />
									</button>
									<button
										onClick={() => deleteService(service.id)}
										className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
										title="Delete service"
									>
										<Trash2 size={16} />
									</button>
								</div>
							</div>
						</motion.div>
					))
				)}
			</div>

			{/* Create/Edit Form Modal */}
			{(showCreateForm || editingService) && (
				<ServiceFormModal
					service={editingService}
					onClose={() => {
						setShowCreateForm(false);
						setEditingService(null);
					}}
					onSave={(service) => {
						if (editingService) {
							setServices(services.map(s => s.id === service.id ? service : s));
						} else {
							setServices([service, ...services]);
						}
						setShowCreateForm(false);
						setEditingService(null);
						onUpdate();
					}}
				/>
			)}
		</div>
	);
}

// Service Form Modal Component
function ServiceFormModal({ 
	service, 
	onClose, 
	onSave 
}: { 
	service: Service | null; 
	onClose: () => void; 
	onSave: (service: Service) => void; 
}) {
	const [formData, setFormData] = useState({
		name: service?.name || "",
		description: service?.description || "",
		price: service?.price || 0,
		currency: service?.currency || "USD",
		duration: service?.duration || "",
		features: service?.features || [],
		category: service?.category || "web",
		featured: service?.featured || false,
		active: service?.active ?? true,
	});
	const [featureInput, setFeatureInput] = useState("");
	const [saving, setSaving] = useState(false);

	const handleSave = async () => {
		if (!formData.name.trim() || !formData.description.trim()) return;
		
		setSaving(true);
		try {
			const response = await fetch(
				service ? `http://localhost:4000/api/services/${service.id}` : "http://localhost:4000/api/services",
				{
					method: service ? "PUT" : "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				const savedService = await response.json();
				onSave(savedService);
			}
		} catch (error) {
			console.error("Failed to save service:", error);
		} finally {
			setSaving(false);
		}
	};

	const addFeature = () => {
		if (featureInput.trim() && !formData.features.includes(featureInput.trim())) {
			setFormData({ ...formData, features: [...formData.features, featureInput.trim()] });
			setFeatureInput("");
		}
	};

	const removeFeature = (featureToRemove: string) => {
		setFormData({ ...formData, features: formData.features.filter(feature => feature !== featureToRemove) });
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div className="glass rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20 dark:border-white/10">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-semibold">
						{service ? "Edit Service" : "Create New Service"}
					</h2>
					<button
						onClick={onClose}
						className="p-2 rounded-lg hover:bg-white/10 transition-colors"
					>
						×
					</button>
				</div>

				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium mb-2">Name</label>
							<input
								type="text"
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
								placeholder="Service name..."
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Category</label>
							<select
								value={formData.category}
								onChange={(e) => setFormData({ ...formData, category: e.target.value })}
								className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
							>
								<option value="web">Web Development</option>
								<option value="mobile">Mobile Development</option>
								<option value="ai">AI/ML</option>
								<option value="consulting">Consulting</option>
							</select>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Description</label>
						<textarea
							value={formData.description}
							onChange={(e) => setFormData({ ...formData, description: e.target.value })}
							rows={3}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
							placeholder="Service description..."
						/>
					</div>

					<div className="grid grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-medium mb-2">Price</label>
							<input
								type="number"
								value={formData.price}
								onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
								className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
								placeholder="0"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Currency</label>
							<select
								value={formData.currency}
								onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
								className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
							>
								<option value="USD">USD</option>
								<option value="EUR">EUR</option>
								<option value="GBP">GBP</option>
								<option value="INR">INR</option>
							</select>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Duration</label>
							<input
								type="text"
								value={formData.duration}
								onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
								className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
								placeholder="e.g., 2 weeks"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Features</label>
						<div className="flex gap-2 mb-2">
							<input
								type="text"
								value={featureInput}
								onChange={(e) => setFeatureInput(e.target.value)}
								onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
								className="flex-1 px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
								placeholder="Add a feature..."
							/>
							<button
								onClick={addFeature}
								className="px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
							>
								Add
							</button>
						</div>
						<div className="flex flex-wrap gap-2">
							{formData.features.map((feature, index) => (
								<span
									key={index}
									className="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full text-sm flex items-center gap-1"
								>
									{feature}
									<button
										onClick={() => removeFeature(feature)}
										className="ml-1 hover:text-red-500"
									>
										×
									</button>
								</span>
							))}
						</div>
					</div>

					<div className="flex items-center gap-4">
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={formData.active}
								onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
								className="rounded"
							/>
							<span className="text-sm">Active</span>
						</label>
						<label className="flex items-center gap-2">
							<input
								type="checkbox"
								checked={formData.featured}
								onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
								className="rounded"
							/>
							<span className="text-sm">Featured</span>
						</label>
					</div>
				</div>

				<div className="flex items-center gap-2 mt-6">
					<button
						onClick={handleSave}
						disabled={saving || !formData.name.trim() || !formData.description.trim()}
						className="flex items-center gap-2 px-4 py-2 rounded-xl text-white disabled:opacity-50"
						style={{ background: "var(--gradient-1)" }}
					>
						{saving ? <RefreshCw size={16} className="animate-spin" /> : <Plus size={16} />}
						{saving ? "Saving..." : "Save Service"}
					</button>
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}

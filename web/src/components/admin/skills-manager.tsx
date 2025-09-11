"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
	Plus, 
	Edit, 
	Trash2, 
	Search, 
	Star,
	RefreshCw,
	Download,
	Globe,
	Lock,
	TrendingUp,
	Award
} from "lucide-react";

interface Skill {
	id: number;
	name: string;
	description: string;
	level: number; // 1-5
	category: string;
	icon?: string;
	featured: boolean;
	active: boolean;
	yearsOfExperience: number;
	projects: number;
	createdAt: string;
	updatedAt: string;
}

export function SkillsManager({ onUpdate }: { onUpdate: () => void }) {
	const [skills, setSkills] = useState<Skill[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [filterCategory, setFilterCategory] = useState<"all" | "frontend" | "backend" | "mobile" | "ai" | "tools">("all");
	const [filterLevel, setFilterLevel] = useState<"all" | "1" | "2" | "3" | "4" | "5">("all");
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

	useEffect(() => {
		fetchSkills();
	}, []);

	const fetchSkills = async () => {
		try {
			setLoading(true);
			const response = await fetch("http://localhost:4000/api/skills");
			if (response.ok) {
				const data = await response.json();
				setSkills(data);
			}
		} catch (error) {
			console.error("Failed to fetch skills:", error);
		} finally {
			setLoading(false);
		}
	};

	const deleteSkill = async (id: number) => {
		if (!confirm("Are you sure you want to delete this skill?")) return;
		
		try {
			const response = await fetch(`http://localhost:4000/api/skills/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
				},
			});

			if (response.ok) {
				setSkills(skills.filter(skill => skill.id !== id));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to delete skill:", error);
		}
	};

	const toggleActive = async (skill: Skill) => {
		try {
			const response = await fetch(`http://localhost:4000/api/skills/${skill.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
				},
				body: JSON.stringify({ active: !skill.active }),
			});

			if (response.ok) {
				setSkills(skills.map(s => s.id === skill.id ? { ...s, active: !s.active } : s));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to update skill:", error);
		}
	};

	const toggleFeatured = async (skill: Skill) => {
		try {
			const response = await fetch(`http://localhost:4000/api/skills/${skill.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
				},
				body: JSON.stringify({ featured: !skill.featured }),
			});

			if (response.ok) {
				setSkills(skills.map(s => s.id === skill.id ? { ...s, featured: !s.featured } : s));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to update skill:", error);
		}
	};

	const filteredSkills = skills.filter(skill => {
		const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			skill.description.toLowerCase().includes(searchQuery.toLowerCase());
		
		const matchesCategory = filterCategory === "all" || skill.category === filterCategory;
		const matchesLevel = filterLevel === "all" || skill.level.toString() === filterLevel;

		return matchesSearch && matchesCategory && matchesLevel;
	});

	const exportSkills = () => {
		const csvContent = "data:text/csv;charset=utf-8," + 
			"Name,Category,Level,Years,Projects,Active,Featured\n" +
			filteredSkills.map(skill => 
				`"${skill.name}","${skill.category}","${skill.level}","${skill.yearsOfExperience}","${skill.projects}","${skill.active ? 'Yes' : 'No'}","${skill.featured ? 'Yes' : 'No'}"`
			).join("\n");
		
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "skills.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const getLevelColor = (level: number) => {
		const colors = {
			1: "text-red-500",
			2: "text-orange-500", 
			3: "text-yellow-500",
			4: "text-blue-500",
			5: "text-green-500"
		};
		return colors[level as keyof typeof colors] || "text-gray-500";
	};

	const getLevelLabel = (level: number) => {
		const labels = {
			1: "Beginner",
			2: "Novice",
			3: "Intermediate", 
			4: "Advanced",
			5: "Expert"
		};
		return labels[level as keyof typeof labels] || "Unknown";
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-2xl font-semibold">Skills Management</h2>
					<p className="text-muted-foreground">Manage your technical skills and expertise levels</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={exportSkills}
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
						New Skill
					</button>
				</div>
			</div>

			{/* Filters */}
			<div className="flex flex-wrap gap-4">
				<div className="flex-1 min-w-64 relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
					<input
						type="text"
						placeholder="Search skills..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					/>
				</div>
				<select
					value={filterCategory}
				onChange={(e) => setFilterCategory(e.target.value as "all" | "frontend" | "backend" | "mobile" | "ai" | "tools")}
					className="px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
				>
					<option value="all">All Categories</option>
					<option value="frontend">Frontend</option>
					<option value="backend">Backend</option>
					<option value="mobile">Mobile</option>
					<option value="ai">AI/ML</option>
					<option value="tools">Tools</option>
				</select>
				<select
					value={filterLevel}
					onChange={(e) => setFilterLevel(e.target.value as "all" | "1" | "2" | "3" | "4" | "5")}
					className="px-4 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
				>
					<option value="all">All Levels</option>
					<option value="1">Beginner</option>
					<option value="2">Novice</option>
					<option value="3">Intermediate</option>
					<option value="4">Advanced</option>
					<option value="5">Expert</option>
				</select>
			</div>

			{/* Skills List */}
			<div className="space-y-4">
				{loading ? (
					<div className="text-center py-8">
						<RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-accent-500" />
						<p className="text-muted-foreground">Loading skills...</p>
					</div>
				) : filteredSkills.length === 0 ? (
					<div className="text-center py-8 text-muted-foreground">
						<Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
						<p>No skills found</p>
						<p className="text-sm">Try adjusting your search or filters</p>
					</div>
				) : (
					filteredSkills.map((skill) => (
						<motion.div
							key={skill.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="glass rounded-xl p-6 border border-white/20 dark:border-white/10"
						>
							<div className="flex items-start justify-between">
								<div className="flex-1">
									<div className="flex items-center gap-2 mb-2">
										<h3 className="text-lg font-semibold">{skill.name}</h3>
										{skill.featured && (
											<span className="px-2 py-1 text-xs bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300 rounded-full">
												Featured
											</span>
										)}
										{skill.active ? (
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
									<p className="text-muted-foreground mb-3 line-clamp-2">{skill.description}</p>
									<div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
										<div className="flex items-center gap-1">
											<TrendingUp size={14} />
											<span className={getLevelColor(skill.level)}>
												{getLevelLabel(skill.level)} ({skill.level}/5)
											</span>
										</div>
										<div className="flex items-center gap-1">
											<Award size={14} />
											{skill.yearsOfExperience} years
										</div>
										<div className="px-2 py-1 text-xs bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 rounded-full">
											{skill.category}
										</div>
									</div>
									{skill.projects > 0 && (
										<div className="text-sm text-muted-foreground">
											<span className="font-medium">Projects:</span> {skill.projects}
										</div>
									)}
								</div>
								<div className="flex items-center gap-2 ml-4">
									<button
										onClick={() => toggleActive(skill)}
										className={`p-2 rounded-lg transition-colors ${
											skill.active 
												? "text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20"
												: "text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
										}`}
										title={skill.active ? "Deactivate" : "Activate"}
									>
										{skill.active ? <Globe size={16} /> : <Lock size={16} />}
									</button>
									<button
										onClick={() => toggleFeatured(skill)}
										className={`p-2 rounded-lg transition-colors ${
											skill.featured 
												? "text-accent-600 dark:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-900/20"
												: "text-muted-foreground hover:bg-white/10"
										}`}
										title={skill.featured ? "Remove from featured" : "Add to featured"}
									>
										<Star size={16} />
									</button>
									<button
										onClick={() => setEditingSkill(skill)}
										className="p-2 rounded-lg text-muted-foreground hover:bg-white/10 transition-colors"
										title="Edit skill"
									>
										<Edit size={16} />
									</button>
									<button
										onClick={() => deleteSkill(skill.id)}
										className="p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
										title="Delete skill"
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
			{(showCreateForm || editingSkill) && (
				<SkillFormModal
					skill={editingSkill}
					onClose={() => {
						setShowCreateForm(false);
						setEditingSkill(null);
					}}
					onSave={(skill) => {
						if (editingSkill) {
							setSkills(skills.map(s => s.id === skill.id ? skill : s));
						} else {
							setSkills([skill, ...skills]);
						}
						setShowCreateForm(false);
						setEditingSkill(null);
						onUpdate();
					}}
				/>
			)}
		</div>
	);
}

// Skill Form Modal Component
function SkillFormModal({ 
	skill, 
	onClose, 
	onSave 
}: { 
	skill: Skill | null; 
	onClose: () => void; 
	onSave: (skill: Skill) => void; 
}) {
	const [formData, setFormData] = useState({
		name: skill?.name || "",
		description: skill?.description || "",
		level: skill?.level || 3,
		category: skill?.category || "frontend",
		icon: skill?.icon || "",
		featured: skill?.featured || false,
		active: skill?.active ?? true,
		yearsOfExperience: skill?.yearsOfExperience || 0,
		projects: skill?.projects || 0,
	});
	const [saving, setSaving] = useState(false);

	const handleSave = async () => {
		if (!formData.name.trim() || !formData.description.trim()) return;
		
		setSaving(true);
		try {
			const response = await fetch(
				skill ? `http://localhost:4000/api/skills/${skill.id}` : "http://localhost:4000/api/skills",
				{
					method: skill ? "PUT" : "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
					},
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				const savedSkill = await response.json();
				onSave(savedSkill);
			}
		} catch (error) {
			console.error("Failed to save skill:", error);
		} finally {
			setSaving(false);
		}
	};

	const getLevelColor = (level: number) => {
		const colors = {
			1: "text-red-500",
			2: "text-orange-500", 
			3: "text-yellow-500",
			4: "text-blue-500",
			5: "text-green-500"
		};
		return colors[level as keyof typeof colors] || "text-gray-500";
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div className="glass rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-white/20 dark:border-white/10">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-xl font-semibold">
						{skill ? "Edit Skill" : "Create New Skill"}
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
								placeholder="Skill name..."
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Category</label>
							<select
								value={formData.category}
								onChange={(e) => setFormData({ ...formData, category: e.target.value })}
								className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
							>
								<option value="frontend">Frontend</option>
								<option value="backend">Backend</option>
								<option value="mobile">Mobile</option>
								<option value="ai">AI/ML</option>
								<option value="tools">Tools</option>
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
							placeholder="Skill description..."
						/>
					</div>

					<div className="grid grid-cols-3 gap-4">
						<div>
							<label className="block text-sm font-medium mb-2">Level</label>
							<select
								value={formData.level}
								onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
								className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
							>
								<option value={1}>1 - Beginner</option>
								<option value={2}>2 - Novice</option>
								<option value={3}>3 - Intermediate</option>
								<option value={4}>4 - Advanced</option>
								<option value={5}>5 - Expert</option>
							</select>
							<div className="mt-1 text-sm">
								<span className={getLevelColor(formData.level)}>
									Level {formData.level}/5
								</span>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Years of Experience</label>
							<input
								type="number"
								value={formData.yearsOfExperience}
								onChange={(e) => setFormData({ ...formData, yearsOfExperience: Number(e.target.value) })}
								className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
								placeholder="0"
								min="0"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">Projects</label>
							<input
								type="number"
								value={formData.projects}
								onChange={(e) => setFormData({ ...formData, projects: Number(e.target.value) })}
								className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
								placeholder="0"
								min="0"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium mb-2">Icon (optional)</label>
						<input
							type="text"
							value={formData.icon}
							onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
							placeholder="Icon name or URL..."
						/>
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
						{saving ? "Saving..." : "Save Skill"}
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

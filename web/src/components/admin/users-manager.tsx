"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash2, User, Shield, UserCheck } from "lucide-react";

interface User {
	id: number;
	email: string;
	name: string;
	role: string;
	avatar?: string;
	createdAt: string;
}

interface UsersManagerProps {
	onUpdate: () => void;
}

const roleIcons = {
	admin: Shield,
	editor: UserCheck,
	user: User,
};

export function UsersManager({ onUpdate }: UsersManagerProps) {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			// Note: This would need a users endpoint in the API
			// For now, we'll show a placeholder
			setUsers([]);
		} catch (error) {
			console.error("Failed to fetch users:", error);
		} finally {
			setLoading(false);
		}
	};

	const deleteUser = async (id: number) => {
		if (!confirm("Are you sure you want to delete this user?")) return;

		try {
			const token = localStorage.getItem("auth_token");
			const response = await fetch(`http://localhost:4000/api/users/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				setUsers(users.filter((u) => u.id !== id));
				onUpdate();
			}
		} catch (error) {
			console.error("Failed to delete user:", error);
		}
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center py-12">
				<div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-semibold">Users</h2>
				<button
					onClick={() => setShowForm(true)}
					className="flex items-center gap-2 px-4 py-2 rounded-xl text-white"
					style={{ background: "var(--gradient-1)" }}
				>
					<Plus size={18} />
					Add User
				</button>
			</div>

			<div className="grid gap-4">
				<AnimatePresence>
					{users.map((user) => {
						const IconComponent = roleIcons[user.role as keyof typeof roleIcons] || User;
						return (
							<motion.div
								key={user.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className="p-4 rounded-xl border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-colors"
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3 flex-1">
										<div className="p-2 rounded-lg bg-accent-100 dark:bg-accent-900/20">
											<IconComponent size={20} className="text-accent-600 dark:text-accent-400" />
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-lg">{user.name}</h3>
											<p className="text-muted-foreground">{user.email}</p>
											<div className="flex items-center gap-2 mt-1">
												<span className="capitalize text-sm px-2 py-1 rounded-full bg-accent-100 dark:bg-accent-900 text-accent-700 dark:text-accent-300">
													{user.role}
												</span>
												<span className="text-xs text-muted-foreground">
													Joined {new Date(user.createdAt).toLocaleDateString()}
												</span>
											</div>
										</div>
									</div>
									<div className="flex items-center gap-2 ml-4">
										<button
											onClick={() => setEditingUser(user)}
											className="p-2 rounded-lg hover:bg-white/10 transition-colors"
										>
											<Edit size={16} />
										</button>
										<button
											onClick={() => deleteUser(user.id)}
											className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
										>
											<Trash2 size={16} />
										</button>
									</div>
								</div>
							</motion.div>
						);
					})}
				</AnimatePresence>
			</div>

			{users.length === 0 && (
				<div className="text-center py-12 text-muted-foreground">
					<p>No users found. User management coming soon!</p>
					<p className="text-sm mt-2">This feature requires additional API endpoints.</p>
				</div>
			)}

			{/* User Form Modal */}
			<AnimatePresence>
				{(showForm || editingUser) && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className="glass rounded-2xl p-6 w-full max-w-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl"
						>
							<UserForm
								user={editingUser}
								onClose={() => {
									setShowForm(false);
									setEditingUser(null);
								}}
								onSuccess={() => {
									fetchUsers();
									onUpdate();
									setShowForm(false);
									setEditingUser(null);
								}}
							/>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function UserForm({
	user,
	onClose,
	onSuccess,
}: {
	user?: User | null;
	onClose: () => void;
	onSuccess: () => void;
}) {
	const [formData, setFormData] = useState({
		email: user?.email || "",
		name: user?.name || "",
		role: user?.role || "user",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const token = localStorage.getItem("auth_token");
			const payload = {
				...formData,
				password: formData.password || undefined,
			};

			const url = user
				? `http://localhost:4000/api/users/${user.id}`
				: "http://localhost:4000/api/auth/register";
			const method = user ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			});

			if (response.ok) {
				onSuccess();
			}
		} catch (error) {
			console.error("Failed to save user:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-xl font-semibold">
					{user ? "Edit User" : "Add New User"}
				</h3>
				<button
					onClick={onClose}
					className="p-2 rounded-lg hover:bg-white/10 transition-colors"
				>
					×
				</button>
			</div>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium mb-2">Name</label>
						<input
							type="text"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							required
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium mb-2">Email</label>
						<input
							type="email"
							value={formData.email}
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							required
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium mb-2">Role</label>
					<select
						value={formData.role}
						onChange={(e) => setFormData({ ...formData, role: e.target.value })}
						className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
					>
						<option value="user">User</option>
						<option value="editor">Editor</option>
						<option value="admin">Admin</option>
					</select>
				</div>

				{!user && (
					<div>
						<label className="block text-sm font-medium mb-2">Password</label>
						<input
							type="password"
							value={formData.password}
							onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							required={!user}
							className="w-full px-3 py-2 rounded-lg border border-white/20 dark:border-white/10 bg-white/10 dark:bg-black/20"
						/>
					</div>
				)}

				<div className="flex gap-3 pt-4">
					<button
						type="submit"
						disabled={loading}
						className="flex-1 py-2 rounded-lg text-white font-medium disabled:opacity-50"
						style={{ background: "var(--gradient-1)" }}
					>
						{loading ? "Saving..." : user ? "Update" : "Create"}
					</button>
					<button
						type="button"
						onClick={onClose}
						className="px-6 py-2 rounded-lg border border-white/20 dark:border-white/10 hover:bg-white/10 transition-colors"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}

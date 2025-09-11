"use client";

import { LoginForm } from "@/components/admin/login-form";
import { useEffect, useState } from 'react';

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';

function AdminContent() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
			</div>
		);
	}

	// For now, just show the login form to avoid SSR issues
	return <LoginForm />;
}

export default function AdminPage() {
	return <AdminContent />;
}

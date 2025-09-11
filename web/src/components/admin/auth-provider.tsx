"use client";

import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useUser } from '@auth0/nextjs-auth0';

interface User {
	id: string;
	email: string;
	name: string;
	role?: string;
	picture?: string;
}

interface AuthContextType {
	user: User | null;
	login: () => void;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const { user: auth0User, isLoading } = useUser();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// Transform Auth0 user to our User interface
	const user: User | null = auth0User ? {
		id: auth0User.sub || '',
		email: auth0User.email || '',
		name: auth0User.name || '',
		role: auth0User['https://your-domain.com/roles']?.[0] || 'user',
		picture: auth0User.picture
	} : null;

	const login = () => {
		window.location.href = '/api/auth/login';
	};

	const logout = () => {
		window.location.href = '/api/auth/logout';
	};

	// Prevent hydration mismatch by not rendering until mounted
	if (!mounted) {
		return (
			<AuthContext.Provider value={{ user: null, login, logout, loading: true }}>
				{children}
			</AuthContext.Provider>
		);
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, loading: isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		// During SSR, return a safe default instead of throwing
		if (typeof window === 'undefined') {
			return {
				user: null,
				login: () => {},
				logout: () => {},
				loading: true
			};
		}
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

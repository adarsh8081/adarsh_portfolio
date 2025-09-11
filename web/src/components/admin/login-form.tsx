"use client";

import { motion } from "framer-motion";
import { useAuth } from "./auth-provider";

export function LoginForm() {
	const { login } = useAuth();

	const handleLogin = () => {
		login();
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent-50 to-transparent dark:from-accent-900/20"
		>
			<div className="glass rounded-2xl p-8 w-full max-w-md border border-white/20 dark:border-white/10 backdrop-blur-xl">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
						Admin Login
					</h1>
					<p className="text-muted-foreground mt-2">Access the portfolio dashboard</p>
				</div>

				<div className="space-y-6">
					<div className="text-center">
						<p className="text-muted-foreground mb-6">
							Click the button below to sign in with Auth0
						</p>
					</div>

					<button
						onClick={handleLogin}
						className="w-full py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
						style={{ background: "var(--gradient-1)" }}
					>
						Sign In with Auth0
					</button>
				</div>

				<div className="mt-6 p-4 rounded-xl bg-accent-100 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 text-sm">
					<p className="font-medium mb-1">Auth0 Integration:</p>
					<p>This login uses Auth0 for secure authentication</p>
					<p>Configure your Auth0 settings in .env.local</p>
				</div>
			</div>
		</motion.div>
	);
}

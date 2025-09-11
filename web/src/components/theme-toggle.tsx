"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = React.useState(false);

	// Avoid hydration mismatch
	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<button className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
				<Monitor className="w-5 h-5" />
			</button>
		);
	}

	const cycleTheme = () => {
		console.log("Current theme:", theme);
		if (theme === "light") {
			setTheme("dark");
			console.log("Switching to dark");
		} else if (theme === "dark") {
			setTheme("system");
			console.log("Switching to system");
		} else {
			setTheme("light");
			console.log("Switching to light");
		}
	};

	const getIcon = () => {
		if (theme === "light") {
			return <Sun className="w-5 h-5" />;
		} else if (theme === "dark") {
			return <Moon className="w-5 h-5" />;
		} else {
			return <Monitor className="w-5 h-5" />;
		}
	};

	const getLabel = () => {
		if (theme === "light") {
			return "Switch to dark mode";
		} else if (theme === "dark") {
			return "Switch to system mode";
		} else {
			return "Switch to light mode";
		}
	};

	return (
		<button
			onClick={cycleTheme}
			className="p-2 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
			aria-label={getLabel()}
			title={getLabel()}
		>
			<div className="transition-transform group-hover:scale-110">
				{getIcon()}
			</div>
		</button>
	);
}
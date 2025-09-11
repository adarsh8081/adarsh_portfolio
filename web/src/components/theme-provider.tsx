"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type ThemeProviderProps = {
	children: React.ReactNode;
	attribute?: "class" | "data-theme";
	defaultTheme?: "system" | "light" | "dark";
	enableSystem?: boolean;
};

export function ThemeProvider({
	children,
	attribute = "class",
	defaultTheme = "system",
	enableSystem = true,
}: ThemeProviderProps) {
	return (
		<NextThemesProvider attribute={attribute} defaultTheme={defaultTheme} enableSystem={enableSystem} disableTransitionOnChange>
			{children}
		</NextThemesProvider>
	);
}

export function AccentSwitcher() {
	const accents = [
		{ key: "indigo", label: "Indigo" },
		{ key: "violet", label: "Violet" },
		{ key: "emerald", label: "Emerald" },
		{ key: "rose", label: "Rose" },
	];

	const getCurrentAccent = () => {
		if (typeof window === "undefined") return "indigo";
		return document.documentElement.getAttribute("data-theme") || "indigo";
	};

	const [currentAccent, setCurrentAccent] = React.useState(getCurrentAccent);

	React.useEffect(() => {
		const observer = new MutationObserver(() => {
			setCurrentAccent(getCurrentAccent());
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
		return () => observer.disconnect();
	}, []);

	const setAccent = (key: string) => {
		if (key === "indigo") {
			document.documentElement.removeAttribute("data-theme");
			localStorage.removeItem("accent-theme");
		} else {
			document.documentElement.setAttribute("data-theme", key);
			localStorage.setItem("accent-theme", key);
		}
		setCurrentAccent(key);
	};

	React.useEffect(() => {
		const saved = localStorage.getItem("accent-theme");
		if (saved && saved !== "indigo") {
			document.documentElement.setAttribute("data-theme", saved);
			setCurrentAccent(saved);
		}
	}, []);

	return (
		<div className="flex gap-2">
			{accents.map((a) => (
				<button
					key={a.key}
					className={`h-8 w-8 rounded-full border-2 transition-all ${
						currentAccent === a.key
							? "border-foreground/30 scale-110"
							: "border-black/10 dark:border-white/10 hover:scale-105"
					}`}
					onClick={() => setAccent(a.key)}
					aria-label={`Use ${a.label} accent`}
					style={{
						background:
							a.key === "indigo"
								? "linear-gradient(90deg,#4f46e5,#818cf8)"
								: a.key === "violet"
								? "linear-gradient(90deg,#6d28d9,#a78bfa)"
								: a.key === "emerald"
								? "linear-gradient(90deg,#059669,#34d399)"
								: "linear-gradient(90deg,#e11d48,#fb7185)",
					}}
				/>
			))}
		</div>
	);
}



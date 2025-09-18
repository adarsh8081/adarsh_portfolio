"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
	{ href: "/", label: "Home" },
	{ href: "/about", label: "About" },
	{ href: "/experience", label: "Experience" },
	{ href: "/projects", label: "Projects" },
	{ href: "/skills", label: "Skills" },
	{ href: "/education", label: "Education" },
	{ href: "/blog", label: "Blog" },
	{ href: "/services", label: "Services" },
	{ href: "/contact", label: "Contact" },
];

export function Header() {
	const pathname = usePathname();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-40 backdrop-blur-md bg-white/60 dark:bg-black/40 border-b border-black/5 dark:border-white/10">
			<div className="container-safe flex h-16 items-center justify-between">
				<Link href="/" className="flex items-center">
					<img 
						src="/logo.svg" 
						alt="Adarsh Logo" 
						width={60} 
						height={60}
						className="w-12 h-12 sm:w-14 sm:h-14"
					/>
				</Link>
				<div className="flex items-center gap-4">
					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center gap-2">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={clsx(
									"px-3 py-2 text-sm rounded-full transition-colors",
									pathname === item.href
										? "bg-black/5 dark:bg-white/10"
										: "hover:bg-black/5 dark:hover:bg-white/10"
								)}
							>
								{item.label}
							</Link>
						))}
					</nav>
					
					{/* Mobile Menu Button */}
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="md:hidden p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							{isMobileMenuOpen ? (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							) : (
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							)}
						</svg>
					</button>
					
					<ThemeToggle />
				</div>
			</div>
			
			{/* Mobile Navigation */}
			{isMobileMenuOpen && (
				<div className="md:hidden border-t border-black/5 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-sm">
					<nav className="container-safe py-4 space-y-2">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setIsMobileMenuOpen(false)}
								className={clsx(
									"block px-4 py-3 text-sm rounded-lg transition-colors",
									pathname === item.href
										? "bg-black/5 dark:bg-white/10"
										: "hover:bg-black/5 dark:hover:bg-white/10"
								)}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}



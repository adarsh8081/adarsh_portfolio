"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

	return (
		<header className="sticky top-0 z-40 backdrop-blur-md bg-white/60 dark:bg-black/40 border-b border-black/5 dark:border-white/10">
			<div className="container-safe flex h-16 items-center justify-between">
				<Link href="/" className="flex items-center">
					<Image 
						src="/logo.svg" 
						alt="Adarsh Logo" 
						width={60} 
						height={60}
						className="w-45 h-60"
					/>
				</Link>
				<div className="flex items-center gap-4">
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
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}



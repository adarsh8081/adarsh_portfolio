import Link from "next/link";
import FlipLink from "./ui/text-effect-flipper-footer";

export function Footer() {
	return (
		<footer className="border-t border-black/5 dark:border-white/10 mt-20">
			<div className="container-safe py-12 px-6 grid gap-8 sm:grid-cols-5 text-xs text-foreground/70">
				<div className="sm:col-span-2">
					<p className="font-bold text-lg text-foreground mb-3">Adarsh Kumar</p>
					<p className="text-sm mb-3 text-foreground/80">
						&quot;Building the future, one line of code at a time. Innovation is not just about technology, 
						it&apos;s about solving real-world problems with creativity and passion.&quot;
					</p>
					<p className="text-xs text-foreground/60">© {new Date().getFullYear()} All rights reserved.</p>
				</div>
				<nav className="flex flex-col gap-3">
					<p className="font-semibold text-foreground mb-2 text-sm">Quick Links</p>
					<Link href="/about" className="hover:text-accent-500 transition-colors text-xs text-foreground/70">About</Link>
					<Link href="/projects" className="hover:text-accent-500 transition-colors text-xs text-foreground/70">Projects</Link>
					<Link href="/experience" className="hover:text-accent-500 transition-colors text-xs text-foreground/70">Experience</Link>
					<Link href="/skills" className="hover:text-accent-500 transition-colors text-xs text-foreground/70">Skills</Link>
					<Link href="/blog" className="hover:text-accent-500 transition-colors text-xs text-foreground/70">Blog</Link>
					<Link href="/services" className="hover:text-accent-500 transition-colors text-xs text-foreground/70">Services</Link>
				</nav>
				<div className="flex flex-col gap-3">
					<p className="font-semibold text-foreground mb-2 text-sm">Connect</p>
					<a href="mailto:adarsh.kumar.808168@gmail.com" className="hover:text-accent-500 transition-colors text-xs text-foreground/70">
						adarsh.kumar.808168@gmail.com
					</a>
					<a href="tel:+919005609660" className="hover:text-accent-500 transition-colors text-xs text-foreground/70">
						+91-9005609660
					</a>
				</div>
				<div className="flex flex-col gap-2">
					<p className="font-semibold text-foreground mb-1 text-sm">Follow</p>
					<div className="flex flex-col gap-1">
						<FlipLink href="https://github.com/adarsh8081">
							GitHub
						</FlipLink>
						<FlipLink href="https://www.linkedin.com/in/the-adarsh-kumar">
							LinkedIn
						</FlipLink>
						<FlipLink href="https://www.instagram.com/adii._.n/">
							Instagram
						</FlipLink>
					</div>
				</div>
			</div>
		</footer>
	);
}



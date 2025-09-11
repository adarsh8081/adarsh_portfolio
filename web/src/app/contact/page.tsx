"use client";

import { motion } from "framer-motion";
import { ScrollytellingSection, RevealOnScroll } from "@/components/scrollytelling-section";
import { ParallaxText } from "@/components/scrollytelling-section";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Background3DWrapper } from "@/components/background-3d-wrapper";
import FlipLink from "@/components/ui/text-effect-flipper-simple";

const contactInfo = [
	{
		icon: Mail,
		title: "Email",
		value: "adarsh.kumar.808168@gmail.com",
		href: "mailto:adarsh.kumar.808168@gmail.com",
		description: "Send me an email anytime"
	},
	{
		icon: Phone,
		title: "Phone",
		value: "+91-9005609660",
		href: "tel:+919005609660",
		description: "Call me for urgent matters"
	},
	{
		icon: MapPin,
		title: "Location",
		value: "Mathura, India",
		href: "#",
		description: "Available for remote work"
	}
];

const socialLinks = [
	{
		icon: Github,
		title: "GitHub",
		href: "https://github.com/adarsh8081",
		description: "View my code repositories"
	},
	{
		icon: Linkedin,
		title: "LinkedIn",
		href: "https://www.linkedin.com/in/the-adarsh-kumar",
		description: "Connect with me professionally"
	},
	{
		icon: Instagram,
		title: "Instagram",
		href: "https://www.instagram.com/adii._.n/",
		description: "Follow my creative journey"
	}
];

const communicationStyles = [
	{
		platform: "Email",
		format: "Semi-formal",
	example: "Hi [Name], I hope this email finds you well. I&apos;m reaching out regarding...",
		signature: "Best regards, Adarsh Kumar",
		icon: "📧"
	},
	{
		platform: "LinkedIn",
		format: "Polite, concise, professional",
	example: "Hi [Name], I&apos;d love to connect and discuss opportunities in AI/ML...",
		limit: "300 characters",
		icon: "💼"
	},
	{
		platform: "WhatsApp",
		format: "Semi-formal + friendly",
	example: "Hi [Name]! Hope you&apos;re doing well. Quick update on our project...",
		useCases: ["Job networking", "Sharing resume", "Quick updates"],
		icon: "💬"
	}
];

const stats = [
	{ number: "24h", label: "Response Time" },
	{ number: "100%", label: "Client Satisfaction" },
	{ number: "50+", label: "Projects Completed" },
	{ number: "3+", label: "Years Experience" }
];

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: ""
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		
		// Simulate form submission
		await new Promise(resolve => setTimeout(resolve, 2000));
		
		setIsSubmitting(false);
		setSubmitStatus("success");
		setFormData({ name: "", email: "", subject: "", message: "" });
		
		// Reset success message after 3 seconds
		setTimeout(() => setSubmitStatus("idle"), 3000);
	};

	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="relative py-20 overflow-hidden">
				<Background3DWrapper intensity={0.8} showTorus={false} showSpheres={true} />
				<div className="absolute inset-0 bg-gradient-to-br from-accent-50/30 via-transparent to-accent-900/20 dark:from-accent-900/20 dark:via-transparent dark:to-accent-500/10" />
				<div className="container-safe relative z-10">
					<RevealOnScroll>
						<div className="text-center max-w-4xl mx-auto">
							<motion.h1 
								className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
							>
								Get In Touch
							</motion.h1>
							<motion.p 
								className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
							Ready to bring your ideas to life? Let&apos;s discuss your next project and create something amazing together.
							</motion.p>
						</div>
					</RevealOnScroll>
				</div>
			</section>

			{/* Stats */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{stats.map((stat, index) => (
								<motion.div
									key={stat.label}
									className="text-center"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									<div className="text-4xl font-bold text-accent-600 mb-2">{stat.number}</div>
									<div className="text-muted-foreground">{stat.label}</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Contact Form & Info */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-7xl mx-auto">
						<div className="grid lg:grid-cols-2 gap-12">
							{/* Contact Form */}
							<div>
								<h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
									Send a Message
								</h2>
								<form onSubmit={handleSubmit} className="space-y-6">
									<div className="grid md:grid-cols-2 gap-6">
										<div>
											<label htmlFor="name" className="block text-sm font-medium mb-2">
												Full Name *
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleInputChange}
												required
												className="w-full px-4 py-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
												placeholder="Your full name"
											/>
										</div>
										<div>
											<label htmlFor="email" className="block text-sm font-medium mb-2">
												Email Address *
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleInputChange}
												required
												className="w-full px-4 py-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
												placeholder="your.email@example.com"
											/>
										</div>
									</div>
									<div>
										<label htmlFor="subject" className="block text-sm font-medium mb-2">
											Subject *
										</label>
										<input
											type="text"
											id="subject"
											name="subject"
											value={formData.subject}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300"
										placeholder="What&apos;s this about?"
										/>
									</div>
									<div>
										<label htmlFor="message" className="block text-sm font-medium mb-2">
											Message *
										</label>
										<textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleInputChange}
											required
											rows={6}
											className="w-full px-4 py-3 rounded-xl border border-white/20 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-300 resize-none"
											placeholder="Tell me about your project..."
										/>
									</div>
									<button
										type="submit"
										disabled={isSubmitting}
										className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
										style={{ 
											background: "linear-gradient(135deg, var(--accent-600), var(--accent-400))",
											boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)"
										}}
									>
										{isSubmitting ? (
											<>
												<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
												Sending...
											</>
										) : (
											<>
												Send Message
												<Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
											</>
										)}
									</button>
									
									{submitStatus === "success" && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className="flex items-center gap-2 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
										>
											<CheckCircle className="w-5 h-5 text-green-600" />
											<span className="text-green-700 dark:text-green-300">Message sent successfully! I&apos;ll get back to you soon.</span>
										</motion.div>
									)}
									
									{submitStatus === "error" && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
										>
											<AlertCircle className="w-5 h-5 text-red-600" />
											<span className="text-red-700 dark:text-red-300">Something went wrong. Please try again.</span>
										</motion.div>
									)}
								</form>
							</div>

							{/* Contact Info */}
							<div>
								<h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
									Contact Information
								</h2>
								<div className="space-y-6 mb-8">
									{contactInfo.map((info, index) => (
										<motion.a
											key={info.title}
											href={info.href}
											className="group flex items-start gap-4 p-4 rounded-xl border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300"
											initial={{ opacity: 0, x: 20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.6, delay: index * 0.1 }}
											viewport={{ once: true }}
											whileHover={{ scale: 1.02 }}
										>
											<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
												<info.icon className="w-6 h-6 text-white" />
											</div>
											<div>
												<h3 className="font-semibold text-lg mb-1">{info.title}</h3>
												<p className="text-accent-600 font-medium mb-1">{info.value}</p>
												<p className="text-sm text-muted-foreground">{info.description}</p>
											</div>
										</motion.a>
									))}
								</div>

								{/* Social Links */}
								<div>
									<h3 className="text-xl font-semibold mb-4">Follow Me</h3>
									<div className="flex gap-8">
										{socialLinks.map((social, index) => (
											<motion.div
												key={social.title}
												initial={{ opacity: 0, y: 20 }}
												whileInView={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.6, delay: index * 0.1 }}
												viewport={{ once: true }}
											>
												<FlipLink href={social.href}>
													{social.title}
												</FlipLink>
											</motion.div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Communication Styles */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Communication Preferences
						</h2>
						<div className="grid md:grid-cols-3 gap-6">
							{communicationStyles.map((style, index) => (
								<motion.div
									key={style.platform}
									className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.05, y: -5 }}
								>
									<div className="text-4xl mb-4">{style.icon}</div>
									<h3 className="text-xl font-semibold mb-2">{style.platform}</h3>
									<p className="text-sm text-muted-foreground mb-4">{style.format}</p>
									<div className="space-y-2">
										<div className="text-sm">
											<span className="font-medium">Example:</span>
											<p className="text-muted-foreground italic">&quot;{style.example}&quot;</p>
										</div>
										{style.signature && (
											<div className="text-sm">
												<span className="font-medium">Signature:</span>
												<p className="text-muted-foreground">{style.signature}</p>
											</div>
										)}
										{style.limit && (
											<div className="text-sm">
												<span className="font-medium">Character Limit:</span>
												<p className="text-muted-foreground">{style.limit}</p>
											</div>
										)}
										{style.useCases && (
											<div className="text-sm">
												<span className="font-medium">Use Cases:</span>
												<ul className="text-muted-foreground list-disc list-inside">
													{style.useCases.map((useCase, idx) => (
														<li key={idx}>{useCase}</li>
													))}
												</ul>
											</div>
										)}
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* CTA Section */}
			<ScrollytellingSection className="py-16 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20">
				<RevealOnScroll>
					<div className="max-w-4xl mx-auto text-center">
						<h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							Let&apos;s Build Something Amazing
						</h2>
						<p className="text-xl text-muted-foreground mb-8">
							I&apos;m always excited to work on new projects and help bring innovative ideas to life.
							Whether you need a website, AI solution, or technical consultation, I&apos;m here to help.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="mailto:adarsh.kumar.808168@gmail.com"
								className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
								style={{ 
									background: "linear-gradient(135deg, var(--accent-600), var(--accent-400))",
									boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)"
								}}
							>
								Start a Conversation
								<Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
							</a>
							<a
								href="https://github.com/adarsh8081"
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold border-2 border-accent-500/30 transition-all duration-300 hover:border-accent-500 hover:bg-accent-500/10 hover:scale-105"
								style={{ 
									background: "color-mix(in srgb, var(--foreground) 6%, transparent)",
									backdropFilter: "blur(10px)"
								}}
							>
								View My Work
							</a>
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Parallax Text */}
			<ParallaxText className="py-16">
				<div className="text-center">
					<h2 className="text-6xl md:text-8xl font-bold opacity-10 select-none">
						CONNECT
					</h2>
				</div>
			</ParallaxText>
		</main>
	);
}



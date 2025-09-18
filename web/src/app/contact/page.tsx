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
		value: "Delhi, India",
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
		setSubmitStatus("idle");
		
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setSubmitStatus("success");
				setFormData({ name: "", email: "", subject: "", message: "" });
			} else {
				const errorData = await response.json().catch(() => ({}));
				console.error('Error submitting form:', errorData);
				setSubmitStatus("error");
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
			// Reset status after 5 seconds
			setTimeout(() => setSubmitStatus("idle"), 5000);
		}
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

			{/* Stats - Enhanced */}
			<ScrollytellingSection className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-transparent dark:from-slate-900 dark:via-blue-900/20 dark:to-transparent relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-accent-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-accent-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
				</div>

				<RevealOnScroll>
					<div className="max-w-7xl mx-auto relative z-10">
						{/* Section Header */}
						<div className="text-center mb-16">
							<motion.h2 
								className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
							>
								Why Work With Me?
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								Proven track record of delivering exceptional results and maintaining strong client relationships
							</motion.p>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{stats.map((stat, index) => (
								<motion.div
									key={stat.label}
									className="group relative"
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.15 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.05 }}
								>
									<div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden h-full text-center">
										<div className="text-4xl font-bold text-accent-600 dark:text-accent-400 mb-2 group-hover:scale-110 transition-transform duration-300">
											{stat.number}
										</div>
										<div className="text-muted-foreground font-medium">{stat.label}</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Contact Form & Info - Enhanced */}
			<ScrollytellingSection className="py-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-transparent dark:from-slate-900 dark:via-purple-900/20 dark:to-transparent relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
				</div>

				<RevealOnScroll>
					<div className="max-w-7xl mx-auto relative z-10">
						<div className="grid lg:grid-cols-2 gap-12">
							{/* Contact Form */}
							<div className="relative">
								<div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden">
									{/* Decorative Elements */}
									<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-500/20 to-purple-500/20 rounded-full blur-2xl" />
									<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl" />
									
									<div className="relative z-10">
										<h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]">
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
											<span className="text-green-700 dark:text-green-300">Message sent successfully! I&apos;ll get back to you soon at adarsh.kumar.808168@gmail.com</span>
										</motion.div>
									)}
									
									{submitStatus === "error" && (
										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
										>
											<AlertCircle className="w-5 h-5 text-red-600" />
											<span className="text-red-700 dark:text-red-300">Failed to send message. Please try again or contact me directly at adarsh.kumar.808168@gmail.com</span>
										</motion.div>
									)}
								</form>
									</div>
								</div>
							</div>

							{/* Contact Info */}
							<div className="relative">
								<div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden">
									{/* Decorative Elements */}
									<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl" />
									<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
									
									<div className="relative z-10">
										<h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]">
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
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Communication Styles - Enhanced */}
			<ScrollytellingSection className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-transparent dark:from-slate-900 dark:via-blue-900/20 dark:to-transparent relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
				</div>

				<RevealOnScroll>
					<div className="max-w-7xl mx-auto relative z-10">
						{/* Section Header */}
						<div className="text-center mb-16">
							<motion.h2 
								className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,var(--accent-600),var(--accent-400),var(--accent-300))]"
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								viewport={{ once: true }}
							>
								Communication Preferences
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								Choose your preferred communication style for the best collaboration experience
							</motion.p>
						</div>

						<div className="grid md:grid-cols-3 gap-8">
							{communicationStyles.map((style, index) => (
								<motion.div
									key={style.platform}
									className="group relative"
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.15 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.02 }}
								>
									<div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 h-full overflow-hidden">
										{/* Gradient overlay */}
										<div className="absolute inset-0 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20 dark:to-transparent" />
										
										{/* Content */}
										<div className="relative z-10 h-full flex flex-col">
											{/* Icon */}
											<div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
												{style.icon}
											</div>
											
											{/* Platform Name */}
											<h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
												{style.platform}
											</h3>
											
											{/* Format */}
											<p className="text-muted-foreground mb-6 font-medium">{style.format}</p>
											
											{/* Details */}
											<div className="space-y-4 flex-grow">
												<div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl">
													<span className="font-semibold text-slate-800 dark:text-white">Example:</span>
													<p className="text-muted-foreground italic mt-2">&quot;{style.example}&quot;</p>
												</div>
												
												{style.signature && (
													<div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl">
														<span className="font-semibold text-slate-800 dark:text-white">Signature:</span>
														<p className="text-muted-foreground mt-2">{style.signature}</p>
													</div>
												)}
												
												{style.limit && (
													<div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl">
														<span className="font-semibold text-slate-800 dark:text-white">Character Limit:</span>
														<p className="text-muted-foreground mt-2">{style.limit}</p>
													</div>
												)}
												
												{style.useCases && (
													<div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-xl">
														<span className="font-semibold text-slate-800 dark:text-white">Use Cases:</span>
														<ul className="text-muted-foreground list-disc list-inside mt-2 space-y-1">
															{style.useCases.map((useCase, idx) => (
																<li key={idx}>{useCase}</li>
															))}
														</ul>
													</div>
												)}
											</div>
										</div>

										{/* Card shadow */}
										<div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* CTA Section - Enhanced */}
			<ScrollytellingSection className="py-20 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-indigo-900/20 relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-accent-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
				</div>

				<RevealOnScroll>
					<div className="max-w-5xl mx-auto text-center relative z-10">
						{/* Main CTA Card */}
						<div className="relative bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30 dark:border-white/20 overflow-hidden">
							{/* Decorative Elements */}
							<div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" />
							<div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl" />
							
							{/* Content */}
							<div className="relative z-10">
								{/* Icon */}
								<div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl shadow-2xl">
									🚀
								</div>
								
								{/* Title */}
								<motion.h2 
									className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,#8b5cf6,#ec4899,#06b6d4)]"
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8 }}
									viewport={{ once: true }}
								>
									Let&apos;s Build Something Amazing
								</motion.h2>
								
								{/* Description */}
								<motion.p 
									className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.2 }}
									viewport={{ once: true }}
								>
									I&apos;m always excited to work on new projects and help bring innovative ideas to life. Whether you need a website, AI solution, or technical consultation, I&apos;m here to help you achieve your goals.
								</motion.p>
								
								{/* CTA Buttons */}
								<motion.div 
									className="flex flex-col sm:flex-row gap-6 justify-center items-center"
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.4 }}
									viewport={{ once: true }}
								>
									<a
										href="mailto:adarsh.kumar.808168@gmail.com"
										className="group relative inline-flex items-center justify-center gap-3 rounded-full px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
										style={{ 
											background: "linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)",
											boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
										}}
									>
										<span className="relative z-10">Start a Conversation</span>
										<Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
										<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
									</a>
									
									<a
										href="https://github.com/adarsh8081"
										target="_blank"
										rel="noreferrer"
										className="group relative inline-flex items-center justify-center gap-3 rounded-full px-10 py-5 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-purple-500/30 hover:border-purple-500/60"
										style={{ 
											background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
											backdropFilter: "blur(10px)",
											color: "var(--foreground)"
										}}
									>
										<span className="relative z-10">View My Work</span>
										<div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</a>
								</motion.div>
								
								{/* Additional Info */}
								<motion.div 
									className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.6 }}
									viewport={{ once: true }}
								>
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
										<span>Available for new projects</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
										<span>Quick response time</span>
									</div>
									<div className="flex items-center gap-2">
										<div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
										<span>Free consultation</span>
									</div>
								</motion.div>
							</div>
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



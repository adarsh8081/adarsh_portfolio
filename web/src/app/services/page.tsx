"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollytellingSection, RevealOnScroll } from "@/components/scrollytelling-section";
import { ParallaxText } from "@/components/scrollytelling-section";
import { Code, Brain, Palette, Zap, MessageSquare, ArrowRight, CheckCircle } from "lucide-react";
import { Background3DWrapper } from "@/components/background-3d-wrapper";

const services = [
	{
		title: "Web Development",
		description: "Full-stack web applications using modern frameworks like React, Next.js, Node.js, and more. From concept to deployment.",
		icon: Code,
		image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=400&fit=crop&crop=center",
		features: [
			"Responsive & Mobile-First Design",
			"Performance Optimization",
			"SEO & Accessibility",
			"API Development & Integration"
		],
		price: "Starting at $500",
		delivery: "2-4 weeks",
		popular: true
	},
	{
		title: "AI/ML Solutions",
		description: "Custom AI and machine learning solutions including model development, training, and deployment for real-world applications.",
		icon: Brain,
		image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=400&fit=crop&crop=center",
		features: [
			"Custom ML Model Development",
			"Data Analysis & Processing",
			"Model Training & Optimization",
			"AI Integration & Deployment"
		],
		price: "Starting at $800",
		delivery: "3-6 weeks",
		popular: false
	},
	{
		title: "UI/UX Design",
		description: "Creative and user-centered design solutions that enhance user experience and drive engagement across all platforms.",
		icon: Palette,
		image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=500&h=400&fit=crop&crop=center",
		features: [
			"User Research & Analysis",
			"Wireframing & Prototyping",
			"Visual Design & Branding",
			"Design System Creation"
		],
		price: "Starting at $300",
		delivery: "1-3 weeks",
		popular: false
	},
	{
		title: "Performance Optimization",
		description: "Optimize your existing applications for better speed, scalability, and user experience with advanced techniques.",
		icon: Zap,
		image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=400&fit=crop&crop=center",
		features: [
			"Code Review & Refactoring",
			"Database Optimization",
			"CDN & Caching Strategies",
			"Monitoring & Analytics Setup"
		],
		price: "Starting at $400",
		delivery: "1-2 weeks",
		popular: false
	},
	{
		title: "Technical Writing",
		description: "High-quality technical documentation, tutorials, and content that makes complex topics accessible to everyone.",
		icon: MessageSquare,
		image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=400&fit=crop&crop=center",
		features: [
			"Technical Documentation",
			"API Documentation",
			"Tutorial & Guide Creation",
			"Content Strategy & Planning"
		],
		price: "Starting at $200",
		delivery: "1-2 weeks",
		popular: false
	}
];

const processSteps = [
	{
		step: "01",
		title: "Discovery & Planning",
		description: "We start by understanding your requirements, goals, and constraints to create a comprehensive project plan.",
		icon: "🔍"
	},
	{
		step: "02",
		title: "Design & Development",
		description: "Based on the plan, we design and develop your solution using the latest technologies and best practices.",
		icon: "⚡"
	},
	{
		step: "03",
		title: "Testing & Optimization",
		description: "Thorough testing ensures your solution works perfectly across all devices and platforms.",
		icon: "🧪"
	},
	{
		step: "04",
		title: "Launch & Support",
		description: "We deploy your solution and provide ongoing support to ensure continued success.",
		icon: "🚀"
	}
];

const testimonials = [
	{
		name: "Sarah Johnson",
		role: "Startup Founder",
		content: "Adarsh delivered an exceptional AI-powered web application that exceeded our expectations. His technical expertise and attention to detail are outstanding.",
		rating: 5
	},
	{
		name: "Michael Chen",
		role: "Product Manager",
		content: "The performance optimization work Adarsh did on our platform resulted in 40% faster load times. Highly recommended!",
		rating: 5
	},
	{
		name: "Emily Rodriguez",
		role: "Design Director",
		content: "Working with Adarsh was a pleasure. He understood our vision and brought it to life with beautiful, functional designs.",
		rating: 5
	}
];

export default function ServicesPage() {
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
								Services
							</motion.h1>
							<motion.p 
								className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								Comprehensive solutions for your digital needs, from web development to AI integration and beyond.
							</motion.p>
						</div>
					</RevealOnScroll>
				</div>
			</section>

			{/* Services Grid - Enhanced */}
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
								What I Offer
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								Comprehensive solutions tailored to your specific needs and goals
							</motion.p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{services.map((service, index) => (
								<motion.div
									key={service.title}
									className="group relative"
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.15 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.02 }}
								>
									{/* Card Background */}
									<div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden h-full">
										{/* Gradient overlay */}
										<div className="absolute inset-0 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20 dark:to-transparent" />
										
										{/* Popular badge */}
										{service.popular && (
											<div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
												<span className="px-6 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-accent-500 to-blue-500 text-white shadow-lg">
													Most Popular
												</span>
											</div>
										)}

										{/* Content */}
										<div className="relative z-10">
											{/* Service Icon and Image */}
											<div className="relative mb-6">
												<div className="relative aspect-[16/10] mb-4 rounded-2xl overflow-hidden">
													<Image 
														src={service.image} 
														alt={service.title} 
														fill
														className="object-cover transition-transform duration-500 group-hover:scale-105" 
														priority
														sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
													/>
													<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
													<div className="absolute inset-0 flex items-center justify-center">
														<div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
															<service.icon className="w-10 h-10 text-white" />
														</div>
													</div>
												</div>
												<h3 className="text-2xl font-bold mb-3 text-center text-slate-800 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
													{service.title}
												</h3>
												<p className="text-muted-foreground mb-6 text-center leading-relaxed">
													{service.description}
												</p>
											</div>
											
											{/* Features */}
											<div className="space-y-3 mb-6">
												{service.features.map((feature, idx) => (
													<div key={idx} className="flex items-center gap-3 p-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">
														<CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
														<span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature}</span>
													</div>
												))}
											</div>
											
											{/* Pricing and CTA */}
											<div className="border-t border-white/10 pt-6">
												<div className="flex justify-between items-center mb-6">
													<span className="text-2xl font-bold text-accent-600 dark:text-accent-400">{service.price}</span>
													<span className="text-sm text-muted-foreground font-medium">{service.delivery}</span>
												</div>
												<button className="w-full group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
													style={{ 
														background: "var(--gradient-1)", 
														color: "white" 
													}}
												>
													Get Started
													<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
												</button>
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

			{/* Process - Enhanced */}
			<ScrollytellingSection className="py-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-transparent dark:from-slate-900 dark:via-purple-900/20 dark:to-transparent relative overflow-hidden">
				{/* Background Effects */}
				<div className="absolute inset-0">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" />
					<div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-accent-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
								My Process
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								A proven methodology that ensures exceptional results for every project
							</motion.p>
						</div>

						{/* Process Steps */}
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{processSteps.map((step, index) => (
								<motion.div
									key={step.step}
									className="group relative"
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.15 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.05 }}
								>
									{/* Card Background */}
									<div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 h-full text-center overflow-hidden">
										{/* Gradient overlay */}
										<div className="absolute inset-0 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20 dark:to-transparent" />
										
										{/* Content */}
										<div className="relative z-10">
											{/* Step Number */}
											<div className="text-5xl font-bold text-accent-600 dark:text-accent-400 mb-4 group-hover:scale-110 transition-transform duration-300">
												{step.step}
											</div>
											
											{/* Icon */}
											<div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-3xl shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
												{step.icon}
											</div>
											
											{/* Title */}
											<h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-300">
												{step.title}
											</h3>
											
											{/* Description */}
											<p className="text-muted-foreground leading-relaxed">
												{step.description}
											</p>
										</div>

										{/* Card shadow */}
										<div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Testimonials - Enhanced */}
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
								What Clients Say
							</motion.h2>
							<motion.p 
								className="text-lg text-muted-foreground max-w-3xl mx-auto"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.2 }}
								viewport={{ once: true }}
							>
								Real feedback from clients who have experienced exceptional results
							</motion.p>
						</div>

						{/* Testimonials Grid */}
						<div className="grid md:grid-cols-3 gap-8">
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={testimonial.name}
									className="group relative"
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: index * 0.15 }}
									viewport={{ once: true }}
									whileHover={{ y: -10, scale: 1.02 }}
								>
									{/* Card Background */}
									<div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-white/10 h-full overflow-hidden">
										{/* Gradient overlay */}
										<div className="absolute inset-0 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20 dark:to-transparent" />
										
										{/* Content */}
										<div className="relative z-10 h-full flex flex-col">
											{/* Quote Icon */}
											<div className="text-4xl text-accent-500 dark:text-accent-400 mb-4 opacity-20">
												&ldquo;
											</div>
											
											{/* Rating */}
											<div className="flex items-center gap-1 mb-6">
												{[...Array(testimonial.rating)].map((_, i) => (
													<span key={i} className="text-yellow-400 text-lg">★</span>
												))}
											</div>
											
											{/* Testimonial Text */}
											<p className="text-muted-foreground mb-6 italic leading-relaxed flex-grow">
												&quot;{testimonial.content}&quot;
											</p>
											
											{/* Client Info */}
											<div className="mt-auto">
												<div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-white font-bold text-lg mb-3">
													{testimonial.name.split(' ').map(n => n[0]).join('')}
												</div>
												<p className="font-bold text-slate-800 dark:text-white mb-1">{testimonial.name}</p>
												<p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
									💬
								</div>
								
								{/* Title */}
								<motion.h2 
									className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-[linear-gradient(135deg,#8b5cf6,#ec4899,#06b6d4)]"
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8 }}
									viewport={{ once: true }}
								>
									Let&apos;s Create Something Amazing
								</motion.h2>
								
								{/* Description */}
								<motion.p 
									className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, delay: 0.2 }}
									viewport={{ once: true }}
								>
									Ready to transform your ideas into reality? Let&apos;s discuss your project requirements and build something extraordinary together. I&apos;m here to help you achieve your goals with cutting-edge solutions.
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
										href="/contact"
										className="group relative inline-flex items-center justify-center gap-3 rounded-full px-10 py-5 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
										style={{ 
											background: "linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4)",
											boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)"
										}}
									>
										<span className="relative z-10">Start a Project</span>
										<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
										<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
									</a>
									
									<a
										href="mailto:adarsh.kumar.808168@gmail.com"
										className="group relative inline-flex items-center justify-center gap-3 rounded-full px-10 py-5 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 border-purple-500/30 hover:border-purple-500/60"
										style={{ 
											background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))",
											backdropFilter: "blur(10px)",
											color: "var(--foreground)"
										}}
									>
										<span className="relative z-10">Get a Quote</span>
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
						EXCELLENCE
					</h2>
				</div>
			</ParallaxText>
		</main>
	);
}



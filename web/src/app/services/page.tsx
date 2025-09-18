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
		image: "/images/web-development.jpg",
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
		image: "/images/ai-ml-solutions.jpg",
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
		image: "/images/ui-ux-design.jpg",
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
		image: "/images/performance-optimization.jpg",
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
		image: "/images/technical-writing.jpg",
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

			{/* Services Grid */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-7xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							What I Offer
						</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{services.map((service, index) => (
								<motion.div
									key={service.title}
									className={`glass rounded-3xl p-8 border border-white/20 dark:border-white/10 hover:border-accent-500/30 transition-all duration-300 relative ${
										service.popular ? 'ring-2 ring-accent-500/50' : ''
									}`}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ scale: 1.02, y: -5 }}
								>
									{service.popular && (
										<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
											<span className="px-4 py-1 rounded-full text-sm font-medium bg-accent-500 text-white">
												Most Popular
											</span>
										</div>
									)}
									
									<div className="relative mb-6">
										<div className="relative aspect-[16/10] mb-4 rounded-2xl overflow-hidden">
											<img 
												src={service.image} 
												alt={service.title} 
												className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
											/>
											<div className="absolute inset-0 bg-black/20 flex items-center justify-center">
												<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center">
											<service.icon className="w-8 h-8 text-white" />
												</div>
											</div>
										</div>
										<h3 className="text-2xl font-bold mb-2 text-center">{service.title}</h3>
										<p className="text-muted-foreground mb-4 text-center">{service.description}</p>
									</div>
									
									<div className="space-y-3 mb-6">
										{service.features.map((feature, idx) => (
											<div key={idx} className="flex items-center gap-3">
												<CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
												<span className="text-sm">{feature}</span>
											</div>
										))}
									</div>
									
									<div className="border-t border-white/10 pt-6">
										<div className="flex justify-between items-center mb-4">
											<span className="text-2xl font-bold text-accent-600">{service.price}</span>
											<span className="text-sm text-muted-foreground">{service.delivery}</span>
										</div>
										<button className="w-full group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
											style={{ 
												background: "var(--gradient-1)", 
												color: "white" 
											}}
										>
											Get Started
											<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
										</button>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Process */}
			<ScrollytellingSection className="py-16 bg-gradient-to-br from-accent-50/50 to-transparent dark:from-accent-900/20">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							My Process
						</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{processSteps.map((step, index) => (
								<motion.div
									key={step.step}
									className="text-center"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center text-2xl">
										{step.icon}
									</div>
									<div className="text-4xl font-bold text-accent-600 mb-2">{step.step}</div>
									<h3 className="text-lg font-semibold mb-2">{step.title}</h3>
									<p className="text-sm text-muted-foreground">{step.description}</p>
								</motion.div>
							))}
						</div>
					</div>
				</RevealOnScroll>
			</ScrollytellingSection>

			{/* Testimonials */}
			<ScrollytellingSection className="py-16">
				<RevealOnScroll>
					<div className="max-w-6xl mx-auto">
						<h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-[linear-gradient(90deg,var(--accent-600),var(--accent-400))]">
							What Clients Say
						</h2>
						<div className="grid md:grid-cols-3 gap-8">
							{testimonials.map((testimonial, index) => (
								<motion.div
									key={testimonial.name}
									className="glass rounded-2xl p-6 border border-white/20 dark:border-white/10"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: index * 0.1 }}
									viewport={{ once: true }}
								>
									<div className="flex items-center gap-1 mb-4">
										{[...Array(testimonial.rating)].map((_, i) => (
											<span key={i} className="text-yellow-400">★</span>
										))}
									</div>
									<p className="text-muted-foreground mb-4 italic">&quot;{testimonial.content}&quot;</p>
									<div>
										<p className="font-semibold">{testimonial.name}</p>
										<p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
							Ready to Start Your Project?
						</h2>
						<p className="text-xl text-muted-foreground mb-8">
							Let&apos;s discuss your requirements and create something amazing together. I&apos;m here to help bring your ideas to life.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="/contact"
								className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
								style={{ 
									background: "linear-gradient(135deg, var(--accent-600), var(--accent-400))",
									boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)"
								}}
							>
								Start a Project
								<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
							</a>
							<a
								href="mailto:adarsh.kumar.808168@gmail.com"
								className="inline-flex items-center justify-center rounded-full px-8 py-4 text-lg font-semibold border-2 border-accent-500/30 transition-all duration-300 hover:border-accent-500 hover:bg-accent-500/10 hover:scale-105"
								style={{ 
									background: "color-mix(in srgb, var(--foreground) 6%, transparent)",
									backdropFilter: "blur(10px)"
								}}
							>
								Get a Quote
							</a>
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



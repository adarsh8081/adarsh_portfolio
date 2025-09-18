export type Project = {
	id: string;
	title: string;
	description: string;
	image: string;
	tech: string[];
	links?: { live?: string; repo?: string };
	tags: string[];
	featured?: boolean;
	impact?: string;
};

export const allTags = [
	"Web Development",
	"AI/ML",
	"UI/UX",
	"Full-Stack",
	"Mobile",
	"Data Science",
	"DevOps",
	"Performance",
];

export const projects: Project[] = [
	{
		id: "ai-summarization",
		title: "AI Summarization System",
		description: "Chrome extension + web app that summarizes PDFs, videos, images, and text using AI (Whisper, BART, T5, OCR). Features real-time processing, multi-format support, and intelligent content extraction with 95% accuracy.",
		image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center&auto=format&q=80&fm=jpg",
		tech: ["React", "Flask", "AWS", "Whisper", "T5", "OCR", "TensorFlow", "Python"],
		links: { live: "#", repo: "https://github.com/adarsh8081/ai-summarization" },
		tags: ["AI/ML", "Web Development", "Chrome Extension", "Multi-format"],
		featured: true,
		impact: "Multi-format intelligent summarizer reducing reading time by 70% for 1000+ users"
	},
	{
		id: "spotify-clone",
		title: "Spotify Clone",
		description: "End-to-end Spotify clone including frontend, backend, admin panel, recommendation system, and Wrapped-style analytics. Features real-time music streaming, playlist management, and intelligent recommendations.",
		image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop&crop=center&auto=format&q=80&fm=jpg",
		tech: ["React", "Node.js", "TensorFlow", "PostgreSQL", "AWS", "Express", "Web Audio API"],
		links: { live: "#", repo: "https://github.com/adarsh8081/spotify-clone" },
		tags: ["Web Development", "Full-Stack", "AI/ML", "Recommendation System"],
		featured: true,
		impact: "Full-scale replication of Spotify experience with ML-powered recommendations"
	},
	{
		id: "e-waste-management",
		title: "E-Waste Management Prototype",
		description: "Prototype combining website, machine learning, and roadmap for sustainable e-waste management. Features intelligent waste categorization, recycling optimization, and environmental impact tracking.",
		image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&crop=center&auto=format&q=80&fm=jpg",
		tech: ["Node.js", "ML models", "Data analytics", "Python", "TensorFlow", "OpenCV"],
		links: { live: "https://ekachra.vercel.app/", repo: "https://github.com/adarsh8081/e-waste-management" },
		tags: ["AI/ML", "Social Impact", "Data Science", "Sustainability"],
		featured: true,
		impact: "Social impact project with 90% accuracy in waste categorization"
	},
	{
		id: "lstm-energy-predictor",
		title: "LSTM Energy Predictor",
		description: "Advanced energy demand forecasting system using LSTM neural networks with historical data analysis and real-time predictions.",
		image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center",
		tech: ["Python", "TensorFlow", "Keras", "Pandas", "NumPy", "Matplotlib"],
		links: { live: "#", repo: "https://github.com/adarsh8081/lstm-energy-predictor" },
		tags: ["AI/ML", "Data Science", "Deep Learning"],
		impact: "85% accuracy in energy demand prediction"
	},
	{
		id: "cnn-image-classifier",
		title: "CNN Image Classifier",
		description: "Multi-class image recognition system using Convolutional Neural Networks with TensorFlow/Keras for real-time classification.",
		image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&crop=center",
		tech: ["Python", "TensorFlow", "Keras", "OpenCV", "PIL", "NumPy"],
		links: { live: "#", repo: "https://github.com/adarsh8081/cnn-image-classifier" },
		tags: ["AI/ML", "Computer Vision", "Deep Learning"],
		impact: "92% accuracy across 10+ image categories"
	},
	{
		id: "nlp-sentiment-analysis",
		title: "NLP Sentiment Analysis",
		description: "Real-time sentiment detection system using NLTK and TextBlob for social media monitoring and customer feedback analysis.",
		image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center",
		tech: ["Python", "NLTK", "TextBlob", "Pandas", "Scikit-learn", "Flask"],
		links: { live: "#", repo: "https://github.com/adarsh8081/nlp-sentiment-analysis" },
		tags: ["AI/ML", "NLP", "Data Science"],
		impact: "Real-time processing of 1000+ texts per minute"
	},
	{
		id: "portfolio-3d",
		title: "3D Interactive Portfolio",
		description: "Next-level interactive portfolio with 3D visuals, particle effects, and smooth animations built with Next.js 15 and Three.js.",
		image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&crop=center",
		tech: ["Next.js", "React", "Three.js", "Framer Motion", "TypeScript", "TailwindCSS"],
		links: { live: "#", repo: "https://github.com/adarsh8081/portfolio-3d" },
		tags: ["Web Development", "UI/UX", "3D"],
		featured: true,
		impact: "Immersive user experience with 60fps animations"
	},
	{
		id: "tagsindia-ecommerce",
		title: "TagsIndia E-commerce Platform",
		description: "Full-stack e-commerce platform for professional printing services with advanced features including multi-user system, order management, payment integration, and comprehensive admin panel. Built with modern React/TypeScript stack and PostgreSQL database.",
		image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center&auto=format&q=80&fm=jpg",
		tech: ["React 18", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Drizzle ORM", "Tailwind CSS", "Framer Motion", "JWT", "Docker"],
		links: { live: "https://tagsindia.com", repo: "https://github.com/adarsh8081/TagsIndia" },
		tags: ["Web Development", "Full-Stack", "E-commerce", "TypeScript"],
		featured: true,
		impact: "Complete e-commerce solution with 98.7% TypeScript codebase and comprehensive business features"
	},
	{
		id: "quantum-computing-workshop",
		title: "Quantum Computing Workshop",
		description: "Conducted comprehensive quantum computing workshop covering quantum algorithms, quantum gates, and practical implementations.",
		image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop&crop=center",
		tech: ["Qiskit", "Python", "Jupyter", "Quantum Algorithms", "Linear Algebra"],
		links: { live: "#", repo: "https://github.com/adarsh8081/quantum-computing-workshop" },
		tags: ["AI/ML", "Education", "Research"],
		impact: "Trained 50+ students in quantum computing fundamentals"
	}
];



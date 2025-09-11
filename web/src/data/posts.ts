export type Post = {
	slug: string;
	title: string;
	date: string; // ISO
	summary: string;
	tags: string[];
	content: string; // markdown
	coverImage: string;
	readingTime: number; // in minutes
	author: string;
	featured?: boolean;
};

export const postTags = ["AI/ML", "Web Development", "Design", "Performance", "Tutorial", "Case Study", "Technology"] as const;

export const posts: Post[] = [
	{
		slug: "the-future-of-ai-in-everyday-life",
		title: "The Future of AI in Everyday Life",
		date: "2024-12-15",
		summary: "Exploring how artificial intelligence is transforming our daily routines and what we can expect in the coming years.",
		tags: ["AI/ML", "Technology", "Case Study"],
		coverImage: "/images/blog/ai-future.jpg",
		readingTime: 8,
		author: "Adarsh Kumar",
		featured: true,
		content: `# The Future of AI in Everyday Life\n\nArtificial Intelligence is no longer a distant concept but an integral part of our daily lives...`
	},
	{
		slug: "building-a-spotify-clone-from-scratch",
		title: "Building a Spotify Clone from Scratch",
		date: "2024-11-28",
		summary: "A comprehensive guide to creating a full-featured music streaming platform using modern web technologies.",
		tags: ["Web Development", "Tutorial", "Case Study"],
		coverImage: "/images/blog/spotify-clone.jpg",
		readingTime: 12,
		author: "Adarsh Kumar",
		featured: true,
		content: `# Building a Spotify Clone from Scratch\n\nCreating a music streaming platform involves complex challenges...`
	},
	{
		slug: "ai-for-social-good-e-waste-management",
		title: "AI for Social Good: E-Waste Management Case Study",
		date: "2024-11-10",
		summary: "How machine learning can help solve environmental challenges through intelligent waste categorization and recycling optimization.",
		tags: ["AI/ML", "Case Study", "Technology"],
		coverImage: "/images/blog/e-waste-ai.jpg",
		readingTime: 10,
		author: "Adarsh Kumar",
		featured: true,
		content: `# AI for Social Good: E-Waste Management\n\nEnvironmental challenges require innovative solutions...`
	},
	{
		slug: "from-hackathons-to-production-lessons-learned",
		title: "From Hackathons to Production: Lessons Learned",
		date: "2024-10-22",
		summary: "Key insights from participating in 10+ hackathons and transitioning projects from prototypes to production-ready applications.",
		tags: ["Web Development", "AI/ML", "Case Study"],
		coverImage: "/images/blog/hackathon-production.jpg",
		readingTime: 6,
		author: "Adarsh Kumar",
		content: `# From Hackathons to Production\n\nHackathons are great for rapid prototyping, but production requires different thinking...`
	},
	{
		slug: "optimizing-react-performance-best-practices",
		title: "Optimizing React Performance: Best Practices",
		date: "2024-10-05",
		summary: "Essential techniques for building fast, responsive React applications that provide excellent user experiences.",
		tags: ["Web Development", "Performance", "Tutorial"],
		coverImage: "/images/blog/react-performance.jpg",
		readingTime: 9,
		author: "Adarsh Kumar",
		content: `# Optimizing React Performance\n\nPerformance optimization is crucial for user experience...`
	},
	{
		slug: "deep-learning-fundamentals-cnn-architecture",
		title: "Deep Learning Fundamentals: CNN Architecture Explained",
		date: "2024-09-18",
		summary: "Understanding Convolutional Neural Networks from the ground up, with practical examples and implementation details.",
		tags: ["AI/ML", "Tutorial", "Technology"],
		coverImage: "/images/blog/cnn-architecture.jpg",
		readingTime: 11,
		author: "Adarsh Kumar",
		content: `# Deep Learning Fundamentals: CNN Architecture\n\nConvolutional Neural Networks revolutionized computer vision...`
	},
	{
		slug: "modern-web-design-trends-2024",
		title: "Modern Web Design Trends 2024",
		date: "2024-09-01",
		summary: "Exploring the latest design trends shaping the web in 2024, from glassmorphism to micro-interactions.",
		tags: ["Design", "Web Development", "Technology"],
		coverImage: "/images/blog/web-design-trends.jpg",
		readingTime: 7,
		author: "Adarsh Kumar",
		content: `# Modern Web Design Trends 2024\n\nWeb design continues to evolve rapidly...`
	},
	{
		slug: "quantum-computing-basics-for-developers",
		title: "Quantum Computing Basics for Developers",
		date: "2024-08-15",
		summary: "An introduction to quantum computing concepts and how developers can start exploring this revolutionary technology.",
		tags: ["Technology", "Tutorial", "AI/ML"],
		coverImage: "/images/blog/quantum-computing.jpg",
		readingTime: 13,
		author: "Adarsh Kumar",
		content: `# Quantum Computing Basics for Developers\n\nQuantum computing represents a paradigm shift...`
	}
];



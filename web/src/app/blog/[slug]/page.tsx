import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import { BlogPostClient } from "./blog-post-client";

type Params = { params: { slug: string } };

export function generateStaticParams() {
	return posts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: Params) {
	const post = posts.find((p) => p.slug === params.slug);
	if (!post) return notFound();

	return <BlogPostClient post={post} />;
}



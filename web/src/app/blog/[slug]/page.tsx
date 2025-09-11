import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

type Params = { params: { slug: string } };

export function generateStaticParams() {
	return posts.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage({ params }: Params) {
	const post = posts.find((p) => p.slug === params.slug);
	if (!post) return notFound();

	return (
		<main className="container-safe py-12">
			<article className="prose prose-zinc dark:prose-invert max-w-3xl">
				<h1>{post.title}</h1>
				<p className="text-sm text-muted-foreground">{new Date(post.date).toDateString()}</p>
				<ReactMarkdown rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}>
					{post.content}
				</ReactMarkdown>
			</article>
		</main>
	);
}



import { BlogList } from "@/components/blog-list";

export default function BlogPage() {
	return (
		<main className="container-safe py-12">
			<h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
			<p className="mt-4 text-muted-foreground">Clean reading interface with tags and animations.</p>
			<div className="mt-8">
				<BlogList />
			</div>
		</main>
	);
}



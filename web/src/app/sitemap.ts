import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
	const pages = [
		"/",
		"/about",
		"/experience",
		"/projects",
		"/skills",
		"/education",
		"/blog",
		"/services",
		"/contact",
	];
	return pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly", priority: p === "/" ? 1 : 0.6 }));
}



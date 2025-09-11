"use client";

import useSWR from "swr";
import { api } from "@/lib/api";

export type ProjectDto = {
	id: number;
	slug: string;
	title: string;
	description: string;
	image?: string | null;
	tech: unknown;
	tags: unknown;
	createdAt: string;
};

const fetcher = (url: string) => api.get(url).then((r) => r.data as ProjectDto[]);

export function useProjects() {
	const { data, error, isLoading, mutate } = useSWR<ProjectDto[]>("/projects", fetcher);
	return { projects: data ?? [], error, isLoading, mutate };
}



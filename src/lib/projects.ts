import type { Picture } from '@sveltejs/enhanced-img';
import type { Component } from 'svelte';

type Meta = {
	title: string;
	date: string;
	summary: string;
	tags: string[];
	role?: string;
	featured?: boolean;
	order?: number;
	cover?: string;
	links?: { label: string; href: string }[];
};

export type Project = Omit<Meta, 'cover'> & {
	slug: string;
	content: Component;
	images: Picture[];
	cover?: Picture;
};

const docs = import.meta.glob<{ default: Component; metadata: Meta }>(
	'/src/content/projects/*.md',
	{
		eager: true
	}
);

const pictures = import.meta.glob<{ default: Picture }>(
	'/src/content/projects/*/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,AVIF,GIF,HEIF,JPEG,JPG,PNG,TIFF,WEBP}',
	{ eager: true, query: { enhanced: true } }
);

export const tags = ['software', 'finance', 'robotics', 'leadership', 'awards'];

export const projects: Project[] = Object.entries(docs)
	.map(([path, doc]) => {
		const slug = path.split('/').pop()!.replace(/\.md$/, '');
		const own = Object.keys(pictures)
			.filter((p) => p.startsWith(`/src/content/projects/${slug}/`))
			.sort();
		const coverPath = own.find((p) => p.endsWith(`/${doc.metadata.cover}`)) ?? own[0];
		return {
			...doc.metadata,
			slug,
			content: doc.default,
			images: own.map((p) => pictures[p].default),
			cover: coverPath ? pictures[coverPath].default : undefined
		};
	})
	.sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity) || b.date.localeCompare(a.date));

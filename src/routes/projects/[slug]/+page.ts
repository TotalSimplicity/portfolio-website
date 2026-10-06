import { error } from '@sveltejs/kit';
import { projects } from '#lib/projects.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const project = projects.find((p) => p.slug === params.slug);
	if (!project) error(404, 'Project not found');
	return { project };
};

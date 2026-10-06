import { projects } from '#lib/projects.ts';
import { site } from '#lib/site.ts';

export const prerender = true;

export const GET = () => {
	const paths = ['/', '/projects', '/resume', ...projects.map((p) => `/projects/${p.slug}`)];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `\t<url><loc>${new URL(p, site.url).href}</loc></url>`).join('\n')}
</urlset>`;
	return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};

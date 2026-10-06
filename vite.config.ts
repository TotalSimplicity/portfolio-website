import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		enhancedImages(),
		tailwindcss(),
		sveltekit({
			extensions: ['.svelte', '.md'],
			preprocess: [mdsvex({ extensions: ['.md'] })],
			compilerOptions: {
				// Force runes mode for the project, except for libraries and mdsvex output. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') || filename.endsWith('.md')
						? undefined
						: true,
				experimental: { async: true }
			},
			adapter: adapter(),
			experimental: { remoteFunctions: true }
		})
	]
});

<script lang="ts">
	import ProjectCard from '#lib/ProjectCard.svelte';
	import { projects } from '#lib/projects.ts';
	import { site } from '#lib/site.ts';

	const featured = projects.filter((p) => p.featured).slice(0, 4);
</script>

<svelte:head>
	<title>{site.name}</title>
</svelte:head>

<section class="max-w-xl">
	<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Hi, I'm {site.name}.</h1>
	<p class="mt-4 text-lg text-muted">{site.tagline}</p>
	<p class="mt-4 leading-relaxed">
	Prospective Finance & CS Student. Interested in software development & algorithmic trading.
	</p>
</section>

{#if featured.length}
	<section class="mt-16">
		<div class="flex items-baseline justify-between">
			<h2 class="text-lg font-semibold tracking-tight">Featured work</h2>
			<a href="/projects" class="text-sm text-muted hover:text-fg">All projects →</a>
		</div>
		<div class="mt-5 grid gap-5 sm:grid-cols-2">
			{#each featured as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	</section>
{/if}

<script lang="ts">
	import ProjectCard from '#lib/ProjectCard.svelte';
	import { projects, tags } from '#lib/projects.ts';
	import { site } from '#lib/site.ts';

	let active = $state<string | null>(null);
	const shown = $derived(active ? projects.filter((p) => p.tags.includes(active!)) : projects);
</script>

<svelte:head>
	<title>Projects · {site.name}</title>
</svelte:head>

<h1 class="text-3xl font-semibold tracking-tight">Projects</h1>

<div class="mt-6 flex flex-wrap gap-2 text-sm" role="group" aria-label="Filter by tag">
	{#each [null, ...tags] as tag (tag)}
		<button
			type="button"
			aria-pressed={active === tag}
			onclick={() => (active = tag)}
			class="rounded-full border border-line px-3 py-1 text-muted capitalize hover:text-fg aria-pressed:border-fg aria-pressed:text-fg"
		>
			{tag ?? 'all'}
		</button>
	{/each}
</div>

<div class="mt-8 grid gap-5 sm:grid-cols-2">
	{#each shown as project (project.slug)}
		<ProjectCard {project} />
	{:else}
		<p class="text-muted">Nothing here yet.</p>
	{/each}
</div>

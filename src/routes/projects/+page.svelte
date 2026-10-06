<script lang="ts">
	import { tick } from 'svelte';
	import Meta from '#lib/Meta.svelte';
	import ProjectRow from '#lib/ProjectRow.svelte';
	import { projects, tags } from '#lib/projects.ts';

	let active = $state<string | null>(null);
	let sorting = $state(false);
	const shown = $derived(active ? projects.filter((p) => p.tags.includes(active!)) : projects);

	async function pick(tag: string | null) {
		if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) {
			active = tag;
			return;
		}
		sorting = true;
		await tick();
		await document.startViewTransition(async () => {
			active = tag;
			await tick();
		}).finished;
		sorting = false;
	}
</script>

<Meta
	title="Projects"
	description="Finance, software, and robotics projects by Leonardo Kulon, from a futures backtesting platform to Robolyst and FTC Worlds."
/>

<h1 class="text-[clamp(2.75rem,9vw,6rem)] font-display">
	<span class="rise"><span>Projects</span></span>
</h1>

<div class="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
	{#each [null, ...tags] as tag (tag)}
		<button
			type="button"
			aria-pressed={active === tag}
			onclick={() => pick(tag)}
			class="border border-line px-3.5 py-1.5 capitalize transition-colors hover:border-fg aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
		>
			{tag ?? 'all'}<span class="ml-1.5 text-sm tabular-nums opacity-60"
				>{tag ? projects.filter((p) => p.tags.includes(tag)).length : projects.length}</span
			>
		</button>
	{/each}
</div>

<ul class="mt-10">
	{#each shown as project (project.slug)}
		<li style:view-transition-name={sorting ? `row-${project.slug}` : undefined}>
			<ProjectRow {project} level="h2" />
		</li>
	{:else}
		<li class="py-6 text-muted">Nothing here yet.</li>
	{/each}
</ul>

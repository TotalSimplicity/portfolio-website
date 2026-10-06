<script lang="ts">
	import type { Project } from '#lib/projects.ts';

	let { project, level = 'h3' }: { project: Project; level?: 'h2' | 'h3' } = $props();
</script>

<a
	href="/projects/{project.slug}"
	class="group grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line py-6 sm:grid-cols-[4.5rem_1fr_11rem] sm:gap-x-8 sm:py-8"
>
	<time datetime={project.date} class="pt-1.5 text-sm text-muted tabular-nums"
		>{project.date.slice(0, 4)}</time
	>
	<div class="min-w-0">
		<svelte:element
			this={level}
			class="text-xl font-bold tracking-[-0.01em] text-balance [font-stretch:115%] transition-colors group-hover:text-accent sm:text-2xl"
		>
			{project.title}<span
				aria-hidden="true"
				class="ml-2 inline-block -translate-x-1 opacity-0 transition duration-300 ease-(--ease-expo) group-hover:translate-x-0 group-hover:opacity-100"
				>→</span
			>
		</svelte:element>
		<p class="mt-2 max-w-[60ch] text-muted">{project.summary}</p>
		<p class="mt-3 text-sm">
			{#if project.role}{project.role}<span class="text-muted">&ensp;·&ensp;</span>{/if}<span
				class="text-muted">{project.tags.join(' / ')}</span
			>
		</p>
	</div>
	{#if project.cover}
		<div
			class="col-start-2 mt-4 aspect-[16/10] w-44 overflow-hidden bg-line sm:col-start-3 sm:row-start-1 sm:mt-1 sm:w-full"
			style:view-transition-name="cover-{project.slug}"
		>
			<enhanced:img
				src={project.cover}
				alt=""
				sizes="(min-width: 640px) 176px, 176px"
				class="size-full object-cover transition-transform duration-500 ease-(--ease-expo) group-hover:scale-[1.04]"
			/>
		</div>
	{/if}
</a>

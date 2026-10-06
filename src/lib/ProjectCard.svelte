<script lang="ts">
	import type { Project } from '#lib/projects.ts';

	let { project }: { project: Project } = $props();
</script>

<a
	href="/projects/{project.slug}"
	class="group block overflow-hidden rounded-lg border border-line bg-card transition-colors hover:border-muted"
>
	<div class="aspect-[16/10] overflow-hidden bg-line">
		{#if project.cover}
			<enhanced:img
				src={project.cover}
				alt=""
				sizes="(min-width: 768px) 360px, 100vw"
				class="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
			/>
		{/if}
	</div>
	<div class="p-4">
		<h3 class="font-semibold tracking-tight">{project.title}</h3>
		<p class="mt-1 text-sm text-muted">{project.summary}</p>
		<ul class="mt-3 flex flex-wrap gap-1.5 text-xs text-muted">
			{#each project.tags as tag (tag)}
				<li class="rounded-full border border-line px-2 py-0.5">{tag}</li>
			{/each}
		</ul>
	</div>
</a>

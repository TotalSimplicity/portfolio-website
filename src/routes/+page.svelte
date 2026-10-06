<script lang="ts">
	import FieldTrace from '#lib/FieldTrace.svelte';
	import Meta from '#lib/Meta.svelte';
	import ProjectRow from '#lib/ProjectRow.svelte';
	import { projects } from '#lib/projects.ts';
	import { site } from '#lib/site.ts';

	const featured = projects.filter((p) => p.featured);
</script>

<Meta />

<section class="grid items-end gap-x-12 gap-y-6 md:grid-cols-[1fr_minmax(0,22rem)]">
	<h1 class="text-[clamp(2.75rem,9vw,6rem)] font-display">
		<span class="rise"><span>Leonardo</span></span>
		<span class="rise"><span>Kulon</span></span>
	</h1>
	<div class="md:pb-2">
		<p class="text-xl leading-snug font-medium text-balance">
			I build trading research tools, fund robotics teams, and write the software 160+ of them run
			on.
		</p>
		<p class="mt-2 text-muted">{site.tagline}</p>
	</div>
</section>

<p class="mt-10 max-w-[60ch] text-lg leading-relaxed text-pretty sm:mt-20 sm:text-xl">
	I'm applying to study finance with a minor in computer science. I built a
	<a href="/projects/sio2" class="underline decoration-accent decoration-2 underline-offset-4"
		>backtesting platform</a
	>
	for intraday silver futures, founded a nonprofit that has raised over $14,000 for robotics teams, and
	am the sole developer of
	<a href="/projects/robolyst" class="underline decoration-accent decoration-2 underline-offset-4"
		>Robolyst</a
	>, which runs purchasing, budgets, and fiscal sponsorship for 160+ teams in 19 countries.
</p>

{#if featured.length}
	<section class="mt-20 sm:mt-28">
		<div class="flex items-baseline justify-between gap-4 pb-6">
			<h2 class="text-[clamp(1.75rem,4vw,2.5rem)] font-display">Selected work</h2>
			<a href="/projects" class="shrink-0 text-muted hover:text-fg"
				>All {projects.length} projects →</a
			>
		</div>
		<ul>
			{#each featured as project (project.slug)}
				<li><ProjectRow {project} /></li>
			{/each}
		</ul>
	</section>
{/if}

<section class="mt-20 sm:mt-28">
	<h2 class="pb-6 text-[clamp(1.75rem,4vw,2.5rem)] font-display">The robots I program</h2>
	<FieldTrace />
</section>

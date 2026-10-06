<script lang="ts">
	import Gallery from '#lib/Gallery.svelte';
	import { site } from '#lib/site.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const project = $derived(data.project);
</script>

<svelte:head>
	<title>{project.title} · {site.name}</title>
	<meta name="description" content={project.summary} />
</svelte:head>

<a href="/projects" class="text-sm text-muted hover:text-fg">← Projects</a>

<header class="mt-6">
	<h1 class="text-3xl font-semibold tracking-tight">{project.title}</h1>
	<p class="mt-3 text-lg text-muted">{project.summary}</p>
	<dl class="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
		{#if project.role}
			<div>
				<dt class="text-muted">Role</dt>
				<dd>{project.role}</dd>
			</div>
		{/if}
		<div>
			<dt class="text-muted">Date</dt>
			<dd>
				<time datetime={project.date}>
					{new Date(project.date).toLocaleDateString('en-US', {
						month: 'long',
						year: 'numeric',
						timeZone: 'UTC'
					})}
				</time>
			</dd>
		</div>
		{#if project.links?.length}
			<div>
				<dt class="text-muted">Links</dt>
				<dd class="flex gap-3">
					{#each project.links as link (link.href)}
						<a href={link.href} class="text-accent underline underline-offset-2">{link.label}</a>
					{/each}
				</dd>
			</div>
		{/if}
	</dl>
</header>

{#if project.cover}
	<enhanced:img
		src={project.cover}
		alt=""
		sizes="(min-width: 768px) 768px, 100vw"
		fetchpriority="high"
		class="mt-8 w-full rounded-lg border border-line"
	/>
{/if}

<article class="prose mt-10">
	<project.content />
</article>

{#if project.images.length > 1}
	<Gallery images={project.images} title={project.title} />
{/if}

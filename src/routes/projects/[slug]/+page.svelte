<script lang="ts">
	import Gallery from '#lib/Gallery.svelte';
	import Meta from '#lib/Meta.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const project = $derived(data.project);
</script>

<Meta title={project.title} description={project.summary} image={project.cover?.img.src} />

<a href="/projects" class="text-muted hover:text-fg">← Projects</a>

<header class="mt-8">
	<h1 class="max-w-[16ch] text-[clamp(2rem,6.5vw,4.5rem)] font-display [overflow-wrap:break-word]">
		{project.title}
	</h1>
	<p class="mt-6 max-w-[48ch] text-xl leading-snug text-pretty text-muted">{project.summary}</p>
	<dl
		class="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-y border-line py-5 sm:flex sm:flex-wrap sm:gap-x-14"
	>
		{#if project.role}
			<div>
				<dt class="text-sm text-muted">Role</dt>
				<dd class="mt-1">{project.role}</dd>
			</div>
		{/if}
		<div>
			<dt class="text-sm text-muted">Date</dt>
			<dd class="mt-1">
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
			<div class="col-span-2">
				<dt class="text-sm text-muted">Links</dt>
				<dd class="mt-1 flex flex-wrap gap-x-5 gap-y-1">
					{#each project.links as link (link.href)}
						<a
							href={link.href}
							class="text-accent underline decoration-1 underline-offset-3 hover:decoration-2"
							>{link.label} ↗</a
						>
					{/each}
				</dd>
			</div>
		{/if}
	</dl>
</header>

{#if project.cover}
	<div class="mt-10 overflow-hidden bg-line" style:view-transition-name="cover-{project.slug}">
		<enhanced:img
			src={project.cover}
			alt=""
			sizes="(min-width: 1024px) 960px, 100vw"
			fetchpriority="high"
			class="block w-full"
		/>
	</div>
{/if}

<article class="prose mt-12">
	<project.content />
</article>

{#if project.images.length > 1}
	<Gallery images={project.images} title={project.title} />
{/if}

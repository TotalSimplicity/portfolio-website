<script lang="ts">
	import { site } from '#lib/site.ts';
</script>

<svelte:head>
	<title>Resume · {site.name}</title>
</svelte:head>

<h1 class="text-3xl font-semibold tracking-tight">Resume</h1>

<p class="mt-4 max-w-xl leading-relaxed text-muted">
	The full version is a one-page PDF. The best way to reach me is email.
</p>

<div class="mt-8 flex flex-wrap gap-3">
	<a
		href="/resume.pdf"
		download
		class="rounded-md bg-fg px-4 py-2 text-sm font-medium text-bg hover:opacity-90">Download PDF</a
	>
	<a
		href="mailto:{site.email}"
		class="rounded-md border border-line px-4 py-2 text-sm font-medium hover:border-muted"
		>{site.email}</a
	>
</div>

<iframe
	src="/resume.pdf#view=FitH"
	title="Resume PDF"
	class="mt-8 aspect-[8.5/11] w-full rounded-md border border-line"
></iframe>

<ul class="mt-10 space-y-2 text-sm">
	{#each site.links as link (link.href)}
		<li>
			<a href={link.href} class="text-accent underline underline-offset-2" rel="me noopener"
				>{link.label}</a
			>
		</li>
	{/each}
</ul>

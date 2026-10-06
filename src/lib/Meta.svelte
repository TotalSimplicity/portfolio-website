<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/site.ts';

	let {
		title,
		description = site.description,
		image
	}: { title?: string; description?: string; image?: string } = $props();

	const fullTitle = $derived(title ? `${title} · ${site.name}` : site.name);
	const url = $derived(new URL(page.url.pathname, site.url).href);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title ?? site.name} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	{#if image}
		<meta property="og:image" content={new URL(image, site.url).href} />
		<meta name="twitter:card" content="summary_large_image" />
	{:else}
		<meta name="twitter:card" content="summary" />
	{/if}
</svelte:head>

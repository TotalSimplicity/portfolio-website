<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { site } from '#lib/site.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const nav = [
		{ href: '/', label: 'Home' },
		{ href: '/projects', label: 'Projects' },
		{ href: '/resume', label: 'Resume' }
	];

	function toggleTheme() {
		const root = document.documentElement;
		const dark = root.style.colorScheme
			? root.style.colorScheme === 'dark'
			: matchMedia('(prefers-color-scheme: dark)').matches;
		const next = dark ? 'light' : 'dark';
		root.style.colorScheme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {
			// storage blocked; theme still applies for this visit
		}
	}

	function current(href: string) {
		return href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="mx-auto flex min-h-dvh max-w-3xl flex-col px-5">
	<header class="flex items-center justify-between gap-4 py-6">
		<a href="/" class="font-semibold tracking-tight">{site.name}</a>
		<nav class="flex items-center gap-5 text-sm">
			{#each nav as item (item.href)}
				<a
					href={item.href}
					aria-current={current(item.href) ? 'page' : undefined}
					class="text-muted hover:text-fg aria-[current=page]:text-fg">{item.label}</a
				>
			{/each}
			<button
				type="button"
				onclick={toggleTheme}
				aria-label="Toggle dark mode"
				class="text-muted hover:text-fg"
			>
				<svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
					<path d="M12 2a10 10 0 1 0 0 20V2Z" />
					<circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" stroke-width="1.5" />
				</svg>
			</button>
		</nav>
	</header>

	<main class="flex-1 py-8">
		{@render children()}
	</main>

	<footer class="flex flex-wrap gap-x-5 gap-y-2 border-t border-line py-6 text-sm text-muted">
		<a href="mailto:{site.email}" class="hover:text-fg">{site.email}</a>
		{#each site.links as link (link.href)}
			<a href={link.href} class="hover:text-fg" rel="me noopener">{link.label}</a>
		{/each}
	</footer>
</div>

<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { site } from '#lib/site.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const nav = [
		{ href: '/projects', label: 'Projects' },
		{ href: '/resume', label: 'Resume' }
	];

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

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
		return page.url.pathname.startsWith(href);
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="mx-auto flex min-h-dvh max-w-5xl flex-col px-4 sm:px-8">
	<header
		class="flex items-center justify-between gap-4 py-6"
		style:view-transition-name="site-header"
	>
		<a href="/" class="text-[0.95rem] font-display tracking-normal hover:text-accent">{site.name}</a
		>
		<nav class="flex items-center gap-6 text-[0.95rem]">
			{#each nav as item (item.href)}
				<a
					href={item.href}
					aria-current={current(item.href) ? 'page' : undefined}
					class="text-muted underline-offset-6 hover:text-fg aria-[current=page]:text-fg aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-2"
					>{item.label}</a
				>
			{/each}
			<button
				type="button"
				onclick={toggleTheme}
				aria-label="Toggle dark mode"
				class="-m-2 p-2 text-muted hover:text-fg"
			>
				<svg viewBox="0 0 24 24" class="size-4" fill="currentColor" aria-hidden="true">
					<path d="M12 2a10 10 0 1 0 0 20V2Z" />
					<circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" stroke-width="1.5" />
				</svg>
			</button>
		</nav>
	</header>

	<main class="flex-1 pt-6 pb-20 sm:pt-10">
		{@render children()}
	</main>

	<footer class="border-t border-line pt-10 pb-12">
		<p class="text-muted">The best way to reach me is email.</p>
		<a
			href="mailto:{site.email}"
			class="mt-2 inline-block text-[clamp(1.25rem,4vw,2rem)] font-display [overflow-wrap:anywhere] decoration-accent decoration-3 underline-offset-8 hover:underline"
			>{site.email}</a
		>
		<ul class="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-muted">
			{#each site.links as link (link.href)}
				<li><a href={link.href} class="hover:text-fg" rel="me noopener">{link.label}</a></li>
			{/each}
			<li><a href="/resume.pdf" class="hover:text-fg">Resume (PDF)</a></li>
		</ul>
	</footer>
</div>

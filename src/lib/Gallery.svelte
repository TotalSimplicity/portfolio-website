<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';

	let { images, title }: { images: Picture[]; title: string } = $props();

	let dialog: HTMLDialogElement;
	let index = $state(0);

	function open(i: number) {
		index = i;
		dialog.showModal();
	}

	function step(by: number) {
		index = (index + by + images.length) % images.length;
	}

	function onkeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') step(1);
		if (e.key === 'ArrowLeft') step(-1);
	}
</script>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Gallery</h2>
	<div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
		{#each images as image, i (image.img.src)}
			<button
				type="button"
				onclick={() => open(i)}
				class="aspect-square overflow-hidden rounded-md border border-line"
				aria-label="Open image {i + 1} of {images.length}"
			>
				<enhanced:img
					src={image}
					alt=""
					sizes="(min-width: 640px) 240px, 50vw"
					loading="lazy"
					class="size-full object-cover"
				/>
			</button>
		{/each}
	</div>
</section>

<dialog
	bind:this={dialog}
	{onkeydown}
	onclick={(e) => e.target === dialog && dialog.close()}
	aria-label="{title} gallery"
	class="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/85"
>
	<div class="flex h-dvh w-screen items-center justify-center p-4 text-white">
		<enhanced:img
			src={images[index]}
			alt="{title}, image {index + 1} of {images.length}"
			class="max-h-full max-w-full rounded-md object-contain"
		/>
		<button
			type="button"
			onclick={() => step(-1)}
			class="absolute left-3 rounded-full bg-black/50 px-3 py-2"
			aria-label="Previous image">←</button
		>
		<button
			type="button"
			onclick={() => step(1)}
			class="absolute right-3 rounded-full bg-black/50 px-3 py-2"
			aria-label="Next image">→</button
		>
		<button
			type="button"
			onclick={() => dialog.close()}
			class="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-2"
			aria-label="Close">✕</button
		>
	</div>
</dialog>

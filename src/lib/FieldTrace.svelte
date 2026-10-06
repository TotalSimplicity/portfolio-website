<script lang="ts">
	import { onMount } from 'svelte';

	type P = { x: number; y: number };

	const STEP = 1 / 120;
	const ROBOT = 'oklch(0.2 0.012 33)';

	let field: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let telemetry = $state({ x: '+0.0', y: '+0.0', h: '000', v: '0' });

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const css = getComputedStyle(canvas);
		const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

		let W = 0;
		let H = 0;
		let T = 0;
		let t = 0;
		let rand = Math.random;
		let lastInput = -Infinity;
		let settledAt = 0;
		let path: P[] = [];
		let trail: P[] = [];
		let look: P | null = null;
		const bot = { x: 0, y: 0, vx: 0, vy: 0, h: 0, w: 0 };

		const dist = (a: P, b: P) => Math.hypot(a.x - b.x, a.y - b.y);
		const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
		const inside = (p: P): P => ({
			x: clamp(p.x, T * 0.5, W - T * 0.5),
			y: clamp(p.y, T * 0.5, H - T * 0.5)
		});

		function extend(p: P) {
			const from = path.at(-1) ?? bot;
			const gap = T * 0.14;
			const n = Math.floor(dist(from, p) / gap);
			for (let i = 1; i <= n; i++) {
				path.push({ x: from.x + ((p.x - from.x) * i) / n, y: from.y + ((p.y - from.y) * i) / n });
			}
			if (path.length > 260) path.splice(0, path.length - 260);
		}

		function autopilot() {
			let to: P;
			do {
				to = inside({ x: rand() * W, y: rand() * H });
			} while (dist(to, bot) < T * 2 && W > T * 4);
			const mx = (bot.x + to.x) / 2;
			const my = (bot.y + to.y) / 2;
			const d = dist(to, bot);
			const bend = (rand() - 0.5) * 1.4;
			const c = inside({
				x: mx - ((to.y - bot.y) / d) * d * bend,
				y: my + ((to.x - bot.x) / d) * d * bend
			});
			const n = Math.max(2, Math.ceil(d / (T * 0.14)));
			for (let i = 1; i <= n; i++) {
				const s = i / n;
				const a = (1 - s) * (1 - s);
				const b = 2 * (1 - s) * s;
				path.push({ x: a * bot.x + b * c.x + s * s * to.x, y: a * bot.y + b * c.y + s * s * to.y });
			}
		}

		function step(dt: number) {
			t += dt;
			const speed = Math.hypot(bot.vx, bot.vy);

			if (!path.length && t - lastInput > 2.5) {
				if (speed > T * 0.05) settledAt = t;
				else if (t - settledAt > 0.7) autopilot();
			}

			let closest = 0;
			for (let i = 1; i < Math.min(path.length, 40); i++) {
				if (dist(path[i], bot) < dist(path[closest], bot)) closest = i;
			}
			if (closest) path.splice(0, closest);

			let tx = 0;
			let ty = 0;
			look = null;
			if (path.length) {
				const reach = T * 0.7;
				look = path.find((p) => dist(p, bot) >= reach) ?? path[path.length - 1];
				let remaining = dist(bot, path[0]);
				for (let i = 1; i < path.length; i++) remaining += dist(path[i - 1], path[i]);
				if (remaining < T * 0.03) {
					path = [];
					look = null;
				} else {
					const dx = look.x - bot.x;
					const dy = look.y - bot.y;
					const d = Math.hypot(dx, dy) || 1;
					const v = Math.min(T * 2.6, 3 * remaining);
					tx = (dx / d) * v;
					ty = (dy / d) * v;
				}
			}

			const ax = tx - bot.vx;
			const ay = ty - bot.vy;
			const a = Math.hypot(ax, ay);
			const k = a > T * 5 * dt ? (T * 5 * dt) / a : 1;
			bot.vx += ax * k;
			bot.vy += ay * k;
			bot.x += bot.vx * dt;
			bot.y += bot.vy * dt;

			if (speed > T * 0.3) {
				const goal = look ? Math.atan2(look.y - bot.y, look.x - bot.x) : Math.atan2(bot.vy, bot.vx);
				const err = Math.atan2(Math.sin(goal - bot.h), Math.cos(goal - bot.h));
				bot.w += clamp(14 * err - 7 * bot.w, -40, 40) * dt;
			} else {
				bot.w *= 1 - Math.min(1, 8 * dt);
			}
			bot.h += bot.w * dt;

			const last = trail.at(-1);
			if (!last || dist(last, bot) > 2) {
				trail.push({ x: bot.x, y: bot.y });
				if (trail.length > 420) trail.shift();
			}
		}

		function draw() {
			const ink = css.color;
			ctx!.clearRect(0, 0, W, H);
			ctx!.strokeStyle = ink;
			ctx!.fillStyle = ink;
			ctx!.lineCap = 'round';
			ctx!.lineJoin = 'round';

			ctx!.lineWidth = 2;
			for (let i = 1; i < trail.length; i++) {
				ctx!.globalAlpha = (i / trail.length) * 0.7;
				ctx!.beginPath();
				ctx!.moveTo(trail[i - 1].x, trail[i - 1].y);
				ctx!.lineTo(trail[i].x, trail[i].y);
				ctx!.stroke();
			}

			ctx!.globalAlpha = 0.9;
			ctx!.beginPath();
			for (const p of path) {
				ctx!.moveTo(p.x + 1.75, p.y);
				ctx!.arc(p.x, p.y, 1.75, 0, Math.PI * 2);
			}
			ctx!.fill();

			if (look) {
				ctx!.lineWidth = 1.25;
				ctx!.globalAlpha = 0.28;
				ctx!.beginPath();
				ctx!.arc(bot.x, bot.y, T * 0.7, 0, Math.PI * 2);
				ctx!.stroke();
				ctx!.globalAlpha = 0.9;
				ctx!.setLineDash([3, 4]);
				ctx!.beginPath();
				ctx!.moveTo(bot.x, bot.y);
				ctx!.lineTo(look.x, look.y);
				ctx!.stroke();
				ctx!.setLineDash([]);
				ctx!.beginPath();
				ctx!.arc(look.x, look.y, 4, 0, Math.PI * 2);
				ctx!.stroke();
			}

			const s = T * 0.75;
			ctx!.save();
			ctx!.translate(bot.x, bot.y);
			ctx!.rotate(bot.h);
			ctx!.globalAlpha = 1;
			ctx!.shadowColor = 'rgb(0 0 0 / 0.28)';
			ctx!.shadowBlur = 14;
			ctx!.shadowOffsetY = 4;
			ctx!.fillStyle = ROBOT;
			ctx!.beginPath();
			ctx!.roundRect(-s / 2, -s / 2, s, s, s * 0.08);
			ctx!.fill();
			ctx!.shadowColor = 'transparent';

			ctx!.fillStyle = ink;
			ctx!.globalAlpha = 0.3;
			for (const [x, y] of [
				[-1, -1],
				[1, -1],
				[-1, 1],
				[1, 1]
			]) {
				ctx!.fillRect(x * s * 0.3 - s * 0.14, y * s * 0.36 - s * 0.06, s * 0.28, s * 0.12);
			}
			ctx!.globalAlpha = 1;
			ctx!.fillRect(s / 2 - s * 0.1, -s * 0.28, s * 0.06, s * 0.56);
			ctx!.beginPath();
			ctx!.arc(0, 0, s * 0.06, 0, Math.PI * 2);
			ctx!.fill();
			ctx!.restore();
		}

		function report() {
			const sign = (n: number) => (n < 0 ? '−' : '+') + Math.abs(n).toFixed(1);
			const deg = Math.round(((((-bot.h * 180) / Math.PI) % 360) + 360) % 360);
			telemetry = {
				x: sign(((bot.x - W / 2) / T) * 24),
				y: sign((-(bot.y - H / 2) / T) * 24),
				h: String(deg).padStart(3, '0'),
				v: String(Math.round((Math.hypot(bot.vx, bot.vy) / T) * 24))
			};
		}

		function resize() {
			const r = field.getBoundingClientRect();
			const dpr = Math.min(devicePixelRatio, 2);
			const first = !W;
			W = r.width;
			H = r.height;
			T = H / 4;
			canvas.width = Math.round(W * dpr);
			canvas.height = Math.round(H * dpr);
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			path = [];
			trail = [];
			if (first || still) {
				Object.assign(bot, { x: -T, y: H * 0.62, vx: 0, vy: 0, h: 0, w: 0 });
				t = 0;
				lastInput = -Infinity;
				extend(inside({ x: W * 0.28, y: H * 0.42 }));
			} else {
				Object.assign(bot, inside(bot));
			}
			if (still) {
				let seed = 7034;
				rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
				for (let i = 0; i < 1500 || (path.length < 12 && i < 4000); i++) step(1 / 60);
				draw();
				report();
			}
		}

		const ro = new ResizeObserver(resize);
		ro.observe(field);
		resize();
		if (still) return () => ro.disconnect();

		function input(e: PointerEvent) {
			if (e.type === 'pointermove' && e.pointerType === 'touch') return;
			const r = field.getBoundingClientRect();
			lastInput = t;
			extend(inside({ x: e.clientX - r.left, y: e.clientY - r.top }));
		}
		field.addEventListener('pointermove', input);
		field.addEventListener('pointerdown', input);

		let raf = 0;
		let prev = 0;
		let acc = 0;
		let frame = 0;
		function tick(now: number) {
			raf = requestAnimationFrame(tick);
			acc += Math.min((now - prev) / 1000, 0.05);
			prev = now;
			while (acc >= STEP) {
				step(STEP);
				acc -= STEP;
			}
			draw();
			if (++frame % 6 === 0) report();
		}
		const io = new IntersectionObserver(([entry]) => {
			cancelAnimationFrame(raf);
			if (entry.isIntersecting) {
				prev = performance.now();
				raf = requestAnimationFrame(tick);
			}
		});
		io.observe(field);

		return () => {
			cancelAnimationFrame(raf);
			io.disconnect();
			ro.disconnect();
			field.removeEventListener('pointermove', input);
			field.removeEventListener('pointerdown', input);
		};
	});
</script>

<figure>
	<div
		bind:this={field}
		class="field relative h-[clamp(240px,46svh,420px)] cursor-crosshair touch-pan-y overflow-hidden bg-field"
	>
		<canvas bind:this={canvas} aria-hidden="true" class="absolute inset-0 size-full text-field-ink"
		></canvas>
	</div>
	<figcaption
		class="mt-3 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 text-sm text-muted"
	>
		<span class="flex gap-4 tabular-nums" aria-hidden="true">
			<span>x <span class="text-fg">{telemetry.x}</span> in</span>
			<span>y <span class="text-fg">{telemetry.y}</span> in</span>
			<span>θ <span class="text-fg">{telemetry.h}°</span></span>
			<span class="max-sm:hidden">v <span class="text-fg">{telemetry.v}</span> in/s</span>
		</span>
		<span>
			An 18″ robot running odometry and PID pathing, like the ones I program.
			<span class="text-fg motion-reduce:hidden [@media(hover:none)]:hidden"
				>Draw it a path with your cursor.</span
			>
			<span class="text-fg motion-reduce:hidden [@media(hover:hover)]:hidden">Tap the field.</span>
		</span>
	</figcaption>
</figure>

<style>
	.field {
		--tile: calc(clamp(240px, 46svh, 420px) / 4);
		background-image:
			linear-gradient(to right, var(--color-seam) 1.5px, transparent 1.5px),
			linear-gradient(to bottom, var(--color-seam) 1.5px, transparent 1.5px);
		background-size: var(--tile) var(--tile);
		background-position: center;
		animation: wipe 1.3s var(--ease-expo) 0.15s both;
	}
</style>

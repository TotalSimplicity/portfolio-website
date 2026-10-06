<script lang="ts">
	import Meta from '#lib/Meta.svelte';
	import { site } from '#lib/site.ts';

	type Entry = { when: string; title: string; role: string; href?: string; points: string[] };

	const sections: { heading: string; entries: Entry[] }[] = [
		{
			heading: 'Education',
			entries: [
				{
					when: '2023–27',
					title: 'Wilton High School',
					role: 'Class of 2027',
					points: [
						'Applying to study finance with a minor in computer science',
						'SAT 1500 (770 Math, 730 Reading and Writing)',
						'AP Computer Science A, AP Chemistry, AP English Language, AP US History, Honors Precalculus',
						'Senior year: AP Economics, AP Calculus, AP Physics, AP Literature',
						'Completed Kane’s Data Science Course in R'
					]
				}
			]
		},
		{
			heading: 'Experience',
			entries: [
				{
					when: '2026',
					title: 'Algorithmic Trading Platform',
					role: 'Developer',
					href: '/projects/sio2',
					points: [
						'Genetic-algorithm optimizer and neural-net models for an intraday CME silver futures strategy on 1‑minute bars',
						'Backtests on real tick data, modeling commission, limit-order fills, 150ms latency, and order-book depth',
						'Holdout protocol keeps strategy selection and final evaluation on separate data'
					]
				},
				{
					when: '2026',
					title: 'Novus Insight',
					role: 'Intern',
					href: '/projects/novus-insight',
					points: [
						'Built an inventory tool for Wilton Public Schools unifying 9,277 assets across Snipe-IT, PowerSchool, and Google Admin',
						'Migrated the district’s phone system from Avaya to Yeastar'
					]
				},
				{
					when: '2026',
					title: 'Robolyst',
					role: 'Sole developer',
					href: '/projects/robolyst',
					points: [
						'Team platform used by 700+ users on 160+ robotics teams in 19 countries',
						'Purchasing workflow with approvals and budget-line tracking; fiscal sponsorship with Stripe card issuing and tax-deductible donations',
						'Rankings and original scouting metrics across 25,000+ teams and 190,000+ matches'
					]
				},
				{
					when: '2025',
					title: 'StockSim',
					role: 'Solo developer',
					href: '/projects/stocksim',
					points: [
						'Multiplayer paper-trading simulator for stocks and crypto using Finnhub and Alpaca market data',
						'Technical indicators (Stochastic, Bull & Bear, RedK Everex) implemented in Rust'
					]
				},
				{
					when: '2024',
					title: 'Melanoma Classifier',
					role: 'Solo developer',
					href: '/projects/skin-cancer-detector',
					points: [
						'CNN trained on 10,000 dermatoscopic images, 86% accuracy',
						'1st Place in Engineering, Connecticut Science Fair'
					]
				}
			]
		},
		{
			heading: 'Leadership',
			entries: [
				{
					when: '2025–',
					title: 'Robotics Catalyst Foundation',
					role: 'Founder & executive director',
					href: '/projects/robotics-catalyst-foundation',
					points: [
						'Incorporated a 501(c)(3) that has raised over $14,000 for youth robotics teams',
						'Funded 5 teams reaching 1,500+ students; provides fiscal sponsorship with an automated donation portal'
					]
				},
				{
					when: '2023–',
					title: 'FTC Team 7034',
					role: 'Co-captain & programming lead',
					href: '/projects/competition-robot',
					points: [
						'Qualified for the 2025 FTC World Championship and a 2026 Premier Event; 5 Inspire Awards',
						'Maintain open-source control libraries used by 250+ teams'
					]
				},
				{
					when: '2024–',
					title: 'WHS VEX Robotics',
					role: 'Founder & captain',
					href: '/projects/vex-robotics',
					points: [
						'Founded the school’s first robotics club, now a 13-member team that hosted the Connecticut state championship'
					]
				},
				{
					when: '',
					title: 'Sea Scouts Ship #84',
					role: 'Elected youth leader',
					points: ['Lead a crew of 7 in sailing operations; certified American Red Cross lifeguard']
				}
			]
		},
		{
			heading: 'Skills',
			entries: [
				{
					when: '',
					title: 'Languages',
					role: 'Python, TypeScript, Java, SQL, R, Rust',
					points: []
				},
				{
					when: '',
					title: 'Tools',
					role: 'PyTorch, pandas, SvelteKit, PostgreSQL, Docker, Linux',
					points: []
				}
			]
		}
	];
</script>

<Meta
	title="Resume"
	description="Resume for Leonardo Kulon: education, trading and software experience, and leadership."
/>

<div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
	<h1 class="text-[clamp(2.75rem,9vw,6rem)] font-display">
		<span class="rise"><span>Resume</span></span>
	</h1>
	<div class="flex flex-wrap gap-3 pb-2">
		<a href="/resume.pdf" download class="bg-fg px-5 py-2.5 font-medium text-bg hover:bg-accent"
			>Download PDF</a
		>
		<a href="mailto:{site.email}" class="border border-line px-5 py-2.5 font-medium hover:border-fg"
			>Email me</a
		>
	</div>
</div>

{#each sections as section (section.heading)}
	<section class="mt-16 sm:mt-20">
		<h2 class="pb-4 text-[clamp(1.5rem,3vw,2rem)] font-display">{section.heading}</h2>
		<ul>
			{#each section.entries as entry (entry.title)}
				<li
					class="grid grid-cols-[3.75rem_1fr] gap-x-4 border-t border-line py-5 sm:grid-cols-[4.5rem_1fr] sm:gap-x-8"
				>
					<span class="pt-0.5 text-sm text-muted tabular-nums">{entry.when}</span>
					<div class="min-w-0">
						<h3 class="font-bold [font-stretch:115%]">
							{#if entry.href}
								<a href={entry.href} class="hover:text-accent">{entry.title}</a>
							{:else}
								{entry.title}
							{/if}
							<span class="font-normal text-muted [font-stretch:100%]">&ensp;{entry.role}</span>
						</h3>
						{#if entry.points.length}
							<ul class="mt-2 max-w-[68ch] list-disc space-y-1 pl-5 text-pretty marker:text-accent">
								{#each entry.points as point (point)}
									<li>{point}</li>
								{/each}
							</ul>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	</section>
{/each}

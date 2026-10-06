---
title: Robolyst
date: 2026-09-01
summary: The Team HQ for 160+ robotics teams and 700+ users across 19 countries, built solo.
tags: [software, finance, robotics]
role: Sole developer
featured: true
order: 1
cover: robolyst.webp
links:
  - label: Robolyst
    href: https://robolyst.org
  - label: Features
    href: https://robolyst.org/team-management/features
---

## Why I built it

FTC teams juggle tasks, budgets, documentation, outreach, and scouting across a dozen scattered tools. Robolyst puts all of it in one place, free for every team. I built and run it on my own, with design help from a college student.

## Team HQ

Team HQ is the core of Robolyst. The hard part was not any single feature, it was making them all work as one system:

- **Tasks, schedule, and checklists** link together: due dates show on the calendar, competition events come in from the official FTC database, and pre-match checklists start 15 minutes before each match
- **Engineering notebook** entries cite tasks and teammates, pull from a shared photo and file library, and map to award requirements
- **Finance** runs parts requests through approval, ordering, and receipt, tagged by budget line and subsystem
- **Fiscal sponsorship** lets teams operate under the Robotics Catalyst Foundation's 501(c)(3), with debit cards, automatic receipt chasing, and tax-deductible donation pages
- **Discord bot** mirrors tasks, meetings, orders, and checklists, and every change syncs back to the portal
- **Public team websites** draw from the same photos, awards, sponsors, and outreach records
- **58 permission switches** and notification routing for 70 event types

## Scouting and stats

- Directory and world rankings for 25,000+ teams across 10,000+ events
- Live match results from FIRST's Events API, with 190,000+ matches recorded
- Original [metrics](https://robolyst.org/ftc/scouting-metrics) for every team: **Strength** (penalty-free OPR adjusted for how hard a team's opponents were), **Schedule Luck**, and **Partner Luck**
- Match predictions

## Tech stack

- SvelteKit and PostgreSQL in Docker
- Resend for email, Stripe for card issuing and donations
- Gemini for auto-tagging team entries

## Results

700+ users and 160+ teams, with 161 teams running their season in Team HQ within two months of launch.

# personal-site

```sh
npm run dev
npm run build
```

## Editing

- Name, tagline, email, socials: `src/lib/site.ts`
- Bio: `src/routes/+page.svelte`
- Resume: replace `static/resume.pdf`
- Projects: one file per project in `src/content/projects/<slug>.md`

```yaml
---
title: Competition Robot
date: 2026-03-15
summary: One sentence for the card.
tags: [robotics, leadership] # robotics | software | leadership | awards
role: Mechanical lead
featured: true # show on home page
cover: cover.jpg # optional, defaults to first image
links:
  - label: GitHub
    href: https://github.com/...
---
```

Images go in `src/content/projects/<slug>/`. All of them show in the gallery.

## Deploy (Dokploy)

Build type: Dockerfile. Container port: 80.

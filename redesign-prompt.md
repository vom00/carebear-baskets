# Carebear Baskets redesign: build prompt

Written with prompt-master after the research pass. Target: Claude Code (Opus 5.5).
Revised after two decisions during the build: switch to React (Next.js, for hosting on Vercel and
to use Ruixen and RareUI components), and split the one long page into separate pages.

```
## Objective
Redesign the Carebear Baskets site (a student nonprofit that makes care baskets for kids in the
PICU) as a multi-page Next.js app in C:\dev\carebear-site, so it reads as a crafted site and not an
AI template. The site has one job: get visitors to shop the Amazon wishlist or DM @carebearbaskets
on Instagram.

## Context (carry forward)
- Before: one static index.html, deployed by dragging the folder onto Netlify. Photos live in
  uploads/ (gitignored, 19 files: bash_*.webp x5, pb_*.png x7, team_*.png x7).
- Now: Next.js 16 (App Router, Turbopack, cacheComponents), React 19, Tailwind 4, TypeScript,
  hosted on Vercel. This Next.js ships its own docs in node_modules/next/dist/docs/; read the
  relevant guide before writing code (AGENTS.md).
- The old look was full of template tells: pastel pink everywhere, Baloo 2, tiny all-caps section
  labels, pill badges, wave dividers, filler stat cards, an emoji in a label, the same fade-up on
  every element.
- Research findings to apply:
  - Opus 5.5 + three.js posts (Sep-Nov 2026): the sites people shared used ONE real 3D object as
    the centrepiece; real assets beat placeholders; scroll can tell a story.
  - Most-liked advice on X this month: simple purpose, simple design; cut taglines, helper text and
    secondary labels.
  - Slop tells to avoid: small body text, tight leading, scattered bold, beige page, italic accent
    word in the headline, dot + tiny caps labels, fade-up on everything.
  - ashenoneport.com: real photo as the backdrop, frosted cards, tilted polaroid photo with a caption.
  - Ruixen (MIT) and RareUI (MIT + Commons Clause + attribution: visible rareui.com link, credit
    kept in source, no selling): install with the shadcn CLI, read each component before use, and
    only use ones whose content we can fill truthfully.
  - Kenney "Cube Pets" (CC0): GLB animals sharing Textures/colormap.png, clips include idle and
    dance (dance is 0.5s). No brown bear; the panda is the bear.
- Facts (do not change or invent): goal 75 baskets, 70+ funded; events total $2,000 raised, 70+
  baskets, 80+ people. Back to School Bash, Aug 31, park pavilion, 5 stations: henna, face painting,
  slime, bracelets, Beyblades. Pickleball: 30 teams, 60 players, $565, 30+ baskets, champions Donda4L.
  Team: Jyotsna (President), Gauri (VP), Jasmine (Logistics Director), Masooma (Marketing Lead),
  Vivia (Events Director), Arjun (Treasurer), Vyom (Tech Lead). Wishlist
  https://www.amazon.com/hz/wishlist/ls/2AF6Q3IDQTKDJ, Instagram https://www.instagram.com/carebearbaskets/.

## Art direction: "Nightlight"
Kids in the PICU have long nights. Every page opens at night (deep navy, a warm lamp glow); the
content sits in daylight. The story page goes from night through a sunrise into day, from worry
to comfort. Hope, not pity.
- Colour: night #141a33, night-2 #222b55, lamp #ffcf6e, sunrise peach #ffb38a, coral #e8505b
  (hearts, highlights, the goal grid), ink #1a1f36, day paper #fffdf9, sky tint #edf2ff.
  Text contrast at least 4.5:1, including over the sunrise gradient.
- Type: Fraunces (opsz, SOFT axes) for headings, Figtree for body, both via next/font.
  Body 18px or more, line-height 1.6, measure about 65ch. No italic accent words, no all-caps labels.
- Photos: polaroid frames (white border, short caption).

## Target State
Shared layout: fixed night nav (logo, Ruixen magnetic tabs as page links, Wishlist button; on
phones the tabs take a second row) and a night footer on every page with "Say hello",
@carebearbaskets, both CTAs, and credits (Kenney CC0, Ruixen, RareUI link).
1. / (home): H1 "Care baskets for kids in the PICU", one supporting sentence, CTAs "Shop the
   wishlist" and "Follow on Instagram", a "70+ of 75 baskets funded" meter. Beside it a three.js
   canvas: the panda in a voxel basket with a solid arched handle, idle, turning toward the pointer,
   dancing on click or a "Make the panda dance" button (Ruixen confetti button). Below: the goal,
   big "70+ of 75" and a 75-cell grid that fills with a staggered spring.
2. /story: why we started (night), a sunrise band, the quote revealed word by word as you scroll
   (Ruixen scroll-text-rise, driven by page scroll), then what's in a basket (6 items, SVG icons).
3. /events: totals with rolling counters (RareUI animated counter); Back to School Bash with its
   five station photos as a card fan (Ruixen image-card-fan, polaroid frames); pickleball with its
   stats, the Donda4L callout and a polaroid grid.
4. /help: wishlist card, the 9 most-needed items, 3 Instagram drop-off steps.
5. /team: 7 photos, names, roles.
- Copy edits: tighten, cut filler; keep every fact above; no new claims.

## Scope
- Work in the repo root: Next.js app files, src/, public/models (the Kenney panda), public/uploads
  (moved from uploads/), README.md, .gitignore. The old index.html is replaced (it stays in git history).
- Do NOT commit, push or deploy.

## Constraints
- Dependencies: next, react, tailwind, motion, three, cn (shadcn's class merger). Nothing else
  without asking. No react-three-fiber: one effect in a client component is enough.
- three.js: DPR capped at 2, render only while the stage is on screen and the tab is visible,
  dispose everything on unmount (pages now unmount). If WebGL or the GLB fails, keep a drawn
  basket fallback and a fully usable page.
- Vendor component edits stay small and are marked "Carebear edit". Turn off their click sounds,
  keep visible focus rings, use the Nightlight colours.
- prefers-reduced-motion: no idle bob, no stagger, no rolling numbers; show final states.
- Keep: semantic landmarks, skip link, visible focus rings, 44px touch targets, alt text on every
  photo, no horizontal scroll at 375px.

## Acceptance Criteria
- [ ] `npm run build` passes and every page prerenders as static; `eslint src` has no errors.
- [ ] Each page loads with zero console errors; the panda renders and idles; every click dances,
      including mid-dance.
- [ ] Changing `funded` in src/lib/site.ts updates the grid, meter, counters and text with no other edits.
- [ ] At 375px and 1440px: no horizontal scroll, nav works, photos readable, CTAs above the fold on desktop.
- [ ] With reduced motion on, every number and the grid show final values immediately.
- [ ] Every fact in the Context block appears unchanged; nothing invented.
- [ ] README explains the stack, pages, goal update, photos, Vercel deploy and credits in the README's voice.

## Action Boundaries
- Proceed with reversible, in-scope edits and local verification (dev server + browser pane).
- Stop and ask before adding dependencies beyond the list, committing, pushing or deploying.

## Progress Evidence
Back every "works" claim with a screenshot, console output or build output.
```

🎯 Target: Claude Code (Opus 5.5). 💡 Folds the research into a fixed art direction, a hard facts
list and binary checks, now for the multi-page Next.js build, so there's no room to drift into
template looks or invented copy.

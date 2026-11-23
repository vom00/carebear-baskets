# carebear-baskets

The website for Carebear Baskets: https://carebearbaskets.vercel.app

Carebear Baskets is a student-led nonprofit at Coppell High School. We make care baskets for kids in the Pediatric Intensive Care Unit (PICU). Our goal is 75 baskets, and we have funded 70+ so far. I'm the Tech Lead, and I built this site.

## What's on the site

- **Home** (`/`): a 3D panda sitting in a care basket, the links to our wishlist and Instagram, and a goal tracker with one square per basket out of 75
- **Story** (`/story`): why we started, and what goes in each basket
- **Events** (`/events`): totals across all our events ($2,000 raised, 70+ baskets funded, 80+ people), plus
  - Back to School Bash (Aug 31): a kids' fair under a park pavilion with henna, face painting, slime, bracelet making and Beyblades
  - Our first pickleball tournament: 30 teams and 60 players raised $565 and funded 30+ baskets. Donda4L won.
- **Help** (`/help`): our Amazon wishlist, the items we need most, and how to drop things off
- **Team** (`/team`): the seven of us

Every page ends with how to reach us on Instagram at @carebearbaskets.

## How it's built

The site is a [Next.js](https://nextjs.org) app (React, TypeScript, Tailwind). Every page is static, so it builds to plain HTML.

- `src/app/` has one folder per page, plus `layout.tsx` (the nav and footer every page shares) and `globals.css` (colours, fonts and most of the styling)
- `src/components/panda-stage.tsx` is the 3D panda, made with [three.js](https://threejs.org). The basket is built out of blocks in code. Click the panda or the button under it and it dances.
- `src/components/ruixen/` and `src/components/ui/animated-counter.tsx` are components I added with the shadcn CLI. Where I changed one, there's a comment starting with `Carebear edit`.
- Animations use [Motion](https://motion.dev). If your device is set to reduce motion, they turn off.

### Updating the goal

Change `funded` in [`src/lib/site.ts`](src/lib/site.ts). The goal tracker, the meter on the home page and the events totals all read from there. The wishlist and Instagram links live in the same file.

## Photos

The photos are in `public/uploads/` on my computer but not in this repo, because I keep media files out of git. If you clone the repo and run it, the layout works and the photos show up blank.

## Running and deploying

You need [Node.js](https://nodejs.org) 20 or newer.

```
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` checks everything compiles the way it will when it's live.

The site is hosted on [Vercel](https://vercel.com) (it used to be on Netlify). Because the photos aren't in git, deploy from my computer with the Vercel CLI (`npx vercel --prod`) instead of letting Vercel build from GitHub. That way `public/uploads/` gets uploaded too.

## Credits

- 3D panda: [Cube Pets by Kenney](https://kenney.nl/assets/cube-pets) (CC0). The model and its licence are in `public/models/`.
- Components: [Ruixen](https://ruixen.com) (MIT) and [RareUI](https://rareui.com). RareUI's licence asks for a visible link to rareui.com, which is in the footer, and the credit has to stay in the component's source.

## Related

[carebear-pickleball-bracket](https://github.com/vom00/carebear-pickleball-bracket) is a live single-elimination bracket for our pickleball tournament.

## AI help

AI (Claude) wrote the October 2026 update to the site (the Back to School Bash section, the event totals and the new goal numbers). In November 2026 it also redesigned the site, moved it to Next.js with separate pages, added the 3D panda and rewrote this README.

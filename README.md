# carebear-baskets

The website for Carebear Baskets: https://carebearbaskets.netlify.app

Carebear Baskets is a student-led nonprofit at Coppell High School. We make care baskets for kids in the Pediatric Intensive Care Unit (PICU). Our goal is 75 baskets, and we have funded 70+ so far. I'm the Tech Lead, and I built this site.

## What's on the site

- Why we started, and what goes in each basket
- A goal tracker showing baskets funded out of 75
- Our events, with totals across all of them: $2,000 raised, 70+ baskets funded and 80+ people at our events
  - Back to School Bash (Aug 31): a kids' fair under a park pavilion with henna, face painting, slime, bracelet making and Beyblades
  - Our first pickleball tournament: 30 teams and 60 players raised $565 and funded 30+ baskets. Donda4L won.
- The items we need most, with a link to our Amazon wishlist
- The team, and how to reach us on Instagram at @carebearbaskets

## How it's built

The whole site is one file, [`index.html`](index.html). The CSS sits in a `<style>` tag at the top and the JavaScript is at the bottom. There is no framework or build step. Fonts load from Google Fonts.

The script handles the mobile menu, fades sections in as you scroll, and fills the goal bar. The bar's width comes from `aria-valuenow` and `aria-valuemax` on the progress bar, so updating the goal means changing the number in `.goal-count` and in `aria-valuenow`. The script works out the rest.

## Photos

The photos are in `uploads/` on the live site but not in this repo, because I keep media files out of git. If you clone the repo and open `index.html`, the layout works and the photos show up blank.

## Running and deploying

To look at it locally, open `index.html` in a browser.

The site is hosted on Netlify. To update it, drag the site folder (`index.html` plus `uploads/`) onto the Deploys page of the Netlify site.

## Related

[carebear-pickleball-bracket](https://github.com/vom00/carebear-pickleball-bracket) is a live single-elimination bracket for our pickleball tournament.

## AI help

AI (Claude) wrote the October 2026 update to the site (the Back to School Bash section, the event totals and the new goal numbers) and this README.

import type { Metadata } from "next";
import Image from "next/image";
import { CountUp } from "@/components/count-up";
import { ImageCardFan } from "@/components/ruixen/image-card-fan";
import { goal } from "@/lib/site";

export const metadata: Metadata = { title: "Our events" };

const bash = [
  { id: "henna", src: "/uploads/bash_henna.webp", title: "Henna", description: "Henna station: a volunteer draws a henna design on a child's hand" },
  { id: "facepaint", src: "/uploads/bash_facepaint.webp", title: "Face painting", description: "Face painting station: a volunteer paints a design on a child's face" },
  { id: "slime", src: "/uploads/bash_slime.webp", title: "Slime", description: "Slime station: a volunteer and a child mix slime at a picnic table" },
  { id: "bracelets", src: "/uploads/bash_bracelets.webp", title: "Bracelets", description: "Bracelet making station: a volunteer picks beads with a child" },
  { id: "beyblades", src: "/uploads/bash_beyblades.webp", title: "Beyblades", description: "Beyblades station: spinning tops battle in a clear arena" },
];

// [file, width, height, alt, caption, tilt, layout]
const pickleball = [
  ["pb_biggroup.png", 837, 639, "Team and players gathered at the Carebear Baskets pickleball tournament", "Everyone who came out", 1.5, "is-big"],
  ["pb_group_clean.png", 378, 251, "Group of six attendees at the tournament", "Six of our players", -3, ""],
  ["pb_twocourt.png", 353, 259, "Two players on the pickleball court", "On court", 2, ""],
  ["pb_banner_two.png", 331, 231, "Two attendees by the event banner", "By the banner", -1.5, ""],
  ["pb_four.png", 811, 615, "Four attendees smiling at the tournament", "All smiles", 2.5, ""],
  ["pb_couple_wide.png", 796, 296, "Two players with a paddle at the tournament", "Paddles up", -1, "is-wide"],
  ["pb_fourguys.png", 727, 560, "Four players with paddles on the court", "Four players, one court", 1.5, "is-wide"],
] as const;

export default function Events() {
  return (
    <>
      <section className="page-head" aria-labelledby="events-title" data-theme="dark">
        <div className="stars" aria-hidden="true" />
        <div className="wrap">
          <h1 id="events-title">Our events</h1>
          <p>
            Every event we run helps fill care baskets for kids in the PICU. Here&apos;s what they
            add up to so far.
          </p>
        </div>
      </section>

      <section className="section events" aria-label="Event results and photos">
        <div className="wrap">
          <dl className="totals">
            <div>
              <dt>Raised across all events</dt>
              <dd><CountUp to={2000} prefix="$" /></dd>
            </div>
            <div>
              <dt>PICU baskets funded</dt>
              <dd><CountUp to={goal.funded} suffix="+" /></dd>
            </div>
            <div>
              <dt>People at our events</dt>
              <dd><CountUp to={80} suffix="+" /></dd>
            </div>
          </dl>

          <article className="chapter" aria-labelledby="bash-title">
            <div className="chapter-head">
              <div>
                <h2 id="bash-title">Back to School Bash</h2>
                <p className="chapter-meta">Kids&apos; fair · Fundraiser</p>
              </div>
              <div>
                <p>
                  On Aug 31 we held a kids&apos; fair under a park pavilion to raise money for our
                  baskets. Kids got henna and face painting, made slime and bracelets, and battled
                  Beyblades.
                </p>
                <dl className="mini-stats">
                  <div><dt>Event date</dt><dd>Aug 31</dd></div>
                  <div><dt>Activity stations</dt><dd>5</dd></div>
                </dl>
              </div>
            </div>
            <ImageCardFan cards={bash} className="fan" />
          </article>

          <article className="chapter" aria-labelledby="pickleball-title">
            <div className="chapter-head">
              <div>
                <h2 id="pickleball-title">Our first pickleball tournament</h2>
                <p className="chapter-meta">Pickleball · Fundraiser</p>
              </div>
              <div>
                <p>
                  Our very first fundraiser was a single-elimination pickleball tournament, and it
                  was a huge success. Players of all skill levels came out to compete, have fun and
                  support kids in the PICU. Every dollar raised goes straight into care baskets.
                </p>
                <dl className="mini-stats">
                  <div><dt>Registered teams</dt><dd><CountUp to={30} /></dd></div>
                  <div><dt>Players</dt><dd><CountUp to={60} /></dd></div>
                  <div><dt>Raised</dt><dd><CountUp to={565} prefix="$" /></dd></div>
                  <div><dt>PICU baskets funded</dt><dd><CountUp to={30} suffix="+" /></dd></div>
                </dl>
                <div className="champ">
                  <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 5h12v5a6 6 0 01-12 0V5z" />
                    <path d="M9 7H6a2 2 0 002 4" />
                    <path d="M21 7h3a2 2 0 01-2 4" />
                    <path d="M15 16v4" />
                    <path d="M11 24h8" />
                    <path d="M13 20h4l1 4h-6l1-4z" />
                  </svg>
                  <div>
                    <p className="champ-label">Champions</p>
                    <p className="champ-name">Donda4L</p>
                    <p className="champ-sub">Winners of our first-ever pickleball tournament. Congrats!</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="polaroids" role="region" aria-label="Pickleball tournament photos" tabIndex={0}>
              {pickleball.map(([file, w, h, alt, caption, tilt, layout]) => (
                <figure key={file} className={`polaroid ${layout}`} style={{ "--r": `${tilt}deg` } as React.CSSProperties}>
                  <Image
                    src={`/uploads/${file}`}
                    width={w}
                    height={h}
                    alt={alt}
                    sizes={layout ? "(max-width: 760px) 74vw, 560px" : "(max-width: 760px) 74vw, 280px"}
                  />
                  <figcaption>{caption}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Cta } from "@/components/cta";
import { INSTAGRAM, WISHLIST } from "@/lib/site";

export const metadata: Metadata = { title: "How to help" };

const needed = [
  "Journals and pens",
  "Gum and mints",
  "Lip balms",
  "Shower shoes (for kids)",
  "Hand lotion, no strong fragrance, for sensitive skin",
  "Pocket tissues",
  "Cozy socks",
  "Travel-size toiletries: shampoo, conditioner, body wash, deodorant",
  "Medium-sized teddy bears",
];

export default function Help() {
  return (
    <>
      <section className="page-head" aria-labelledby="help-title" data-theme="dark">
        <div className="stars" aria-hidden="true" />
        <div className="wrap">
          <h1 id="help-title">How to help</h1>
          <p>
            Pick something off our wishlist or drop items off in person. Every donation makes a
            real difference for a child in need.
          </p>
        </div>
      </section>

      <section className="section help" aria-label="Ways to give">
        <div className="wrap help-grid">
          <div className="wish">
            <h2 className="h3">Shop our Amazon wishlist</h2>
            <p>
              It&apos;s the easiest way to help. Items ship directly to us, and every one goes into
              a basket for a child in the PICU. It takes a few minutes and means the world to a
              family going through one of the hardest times of their lives.
            </p>
            <Cta href={WISHLIST} label="Open the wishlist" />
          </div>

          <div className="card">
            <h2 className="h3">Items we need most</h2>
            <ul className="checklist">
              {needed.map((item) => (
                <li key={item}>
                  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 9.5l3.2 3.2L14 5.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2 className="h3">Drop off in person</h2>
            <ol className="steps">
              <li>DM us on Instagram at @carebearbaskets</li>
              <li>We&apos;ll share the drop-off location</li>
              <li>We&apos;ll confirm we got it, and thank you!</li>
            </ol>
            <Cta href={INSTAGRAM} label="DM on Instagram" look="ink" />
          </div>
        </div>
      </section>
    </>
  );
}

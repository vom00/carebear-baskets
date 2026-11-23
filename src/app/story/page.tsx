import type { Metadata } from "next";
import { ScrollTextRise } from "@/components/ruixen/scroll-text-rise";

export const metadata: Metadata = { title: "Our story" };

const icon = {
  viewBox: "0 0 26 26",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const items = [
  {
    name: "Cozy socks",
    text: "Soft, warm socks to keep little feet comfortable during long stays",
    svg: (
      <svg {...icon}>
        <path d="M5 13 Q6 8 9 8 Q13 8 13 13 Q13 18 9 18 Q6 18 5 13Z" />
        <path d="M21 13 Q20 8 17 8 Q13 8 13 13 Q13 18 17 18 Q20 18 21 13Z" />
        <path d="M5 13 Q3 20 7 21" />
        <path d="M21 13 Q23 20 19 21" />
      </svg>
    ),
  },
  {
    name: "Teddy bear",
    text: "A soft companion for comfort during difficult nights",
    svg: (
      <svg {...icon}>
        <circle cx="13" cy="10" r="5" />
        <path d="M13 5 C13 5 11 2 9 3 S9 6 10 7" />
        <path d="M13 5 C13 5 15 2 17 3 S17 6 16 7" />
        <ellipse cx="13" cy="18" rx="5" ry="4" />
        <path d="M8 15 Q5 22 8 23 Q13 25 18 23 Q21 22 18 15" />
      </svg>
    ),
  },
  {
    name: "Journal & activity books",
    text: "Creative outlets for expression and entertainment",
    svg: (
      <svg {...icon}>
        <rect x="5" y="3" width="16" height="20" rx="2" />
        <line x1="9" y1="8" x2="17" y2="8" />
        <line x1="9" y1="12" x2="17" y2="12" />
        <line x1="9" y1="16" x2="14" y2="16" />
      </svg>
    ),
  },
  {
    name: "Lip balm & lotion",
    text: "Fragrance-free formulas gentle on sensitive skin",
    svg: (
      <svg {...icon}>
        <ellipse cx="13" cy="15" rx="5" ry="6" />
        <rect x="10" y="4" width="6" height="7" rx="3" />
        <path d="M10 7 Q8 7 8 10 L8 11" />
        <path d="M16 7 Q18 7 18 10 L18 11" />
      </svg>
    ),
  },
  {
    name: "Phone charger",
    text: "Stay connected to family and friends during treatment",
    svg: (
      <svg {...icon}>
        <rect x="8" y="3" width="10" height="16" rx="4" />
        <path d="M13 19 L13 23" />
        <path d="M9 23 L17 23" />
      </svg>
    ),
  },
  {
    name: "Travel toiletries",
    text: "Shampoo, conditioner, body wash and deodorant: the essentials",
    svg: (
      <svg {...icon}>
        <path d="M8 3 L18 3 L20 10 Q20 14 13 14 Q6 14 6 10 Z" />
        <path d="M6 10 L6 20 Q6 23 10 23 L16 23 Q20 23 20 20 L20 10" />
        <line x1="8" y1="17" x2="18" y2="17" />
      </svg>
    ),
  },
];

export default function Story() {
  return (
    <>
      <section className="page-head" aria-labelledby="story-title" data-theme="dark">
        <div className="stars" aria-hidden="true" />
        <div className="wrap">
          <h1 id="story-title">Why we started</h1>
          <p>
            Kids in the PICU face more than medical challenges. They face isolation, fear and
            endless days of boredom. Some stay for weeks, others for months, and a hospital room
            becomes their whole world.
          </p>
          <p>
            Students at Coppell High School started Carebear Baskets because even in the hardest
            moments, a small gesture of care can make a big difference. Not a cure. Just a
            reminder that someone out there is thinking of you.
          </p>
        </div>
      </section>

      <div className="sunrise" aria-hidden="true">
        <div className="sun" />
      </div>
      <figure className="quote">
        <blockquote>
          <ScrollTextRise
            text="“A child shouldn't have to feel alone in a hospital room. These baskets say: we see you, we care about you, and you are not forgotten.”"
            textClassName="quote-text"
          />
        </blockquote>
      </figure>

      <section className="section" id="items" aria-labelledby="items-title">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="items-title">What&apos;s in a basket</h2>
            <p className="lead">
              Every basket is packed to bring comfort, beat boredom and make a hospital room feel
              a little more like home.
            </p>
          </div>
          <ul className="items">
            {items.map((item) => (
              <li key={item.name}>
                <span className="icon">{item.svg}</span>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

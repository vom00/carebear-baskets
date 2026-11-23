import Link from "next/link";
import { Cta } from "@/components/cta";
import { CountUp } from "@/components/count-up";
import { GoalGrid } from "@/components/goal-grid";
import { PandaStage } from "@/components/panda-stage";
import { goal, INSTAGRAM, WISHLIST } from "@/lib/site";

export default function Home() {
  const funded = Math.min(1, goal.funded / goal.total);
  return (
    <>
      <section className="hero" aria-labelledby="hero-title" data-theme="dark">
        <div className="stars" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1 id="hero-title">Care baskets for kids in the PICU</h1>
            <p className="hero-sub">
              We&apos;re students at Coppell High School. We fill baskets with cozy socks, teddy
              bears, journals and other comforts for kids spending weeks or months in the
              Pediatric Intensive Care Unit.
            </p>
            <div className="hero-ctas">
              <Cta href={WISHLIST} label="Shop the wishlist" />
              <Cta href={INSTAGRAM} label="Follow on Instagram" look="glass" />
            </div>
            <div className="meter">
              <p className="meter-text">
                <strong>
                  {goal.funded}+ of {goal.total} baskets funded
                </strong>
                <span>Almost there</span>
              </p>
              <div className="meter-track" aria-hidden="true">
                <div className="meter-fill" style={{ width: `${funded * 100}%` }} />
              </div>
            </div>
          </div>
          <PandaStage />
        </div>
      </section>

      <section className="section" aria-labelledby="goal-title">
        <div className="wrap goal-grid">
          <div>
            <h2 id="goal-title">One basket for every kid in the unit</h2>
            <p className="lead">
              Our goal is {goal.total} care baskets, enough for every child in the PICU. Each one
              is filled with comfort items and things to do, so a hospital stay feels a little
              easier and a little more normal.
            </p>
            <p>
              No child should feel like they&apos;re just a patient. Every basket is a reminder
              that they&apos;re a kid first, and kids deserve to feel cozy, loved and cared for.
            </p>
            <p>
              <Link className="text-link" href="/story#items">
                See what goes in a basket
              </Link>
            </p>
          </div>
          <div className="goal-card">
            <p className="goal-big">
              <CountUp to={goal.funded} suffix="+" />
              <small>of {goal.total}</small>
            </p>
            <p className="goal-label">baskets funded so far</p>
            <GoalGrid />
          </div>
        </div>
      </section>
    </>
  );
}

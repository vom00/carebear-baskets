import { Cta } from "@/components/cta";
import { INSTAGRAM, WISHLIST } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="footer" aria-labelledby="contact-title" data-theme="dark">
      <div className="stars" aria-hidden="true" />
      <div className="wrap relative">
        <h2 id="contact-title">Say hello</h2>
        <p className="lead">
          Questions, an in-person donation, or want to get involved? DM us on Instagram. We love
          meeting people who care.
        </p>
        <a className="handle" href={INSTAGRAM} target="_blank" rel="noopener">
          @carebearbaskets
        </a>
        <div className="foot-ctas">
          <Cta href={INSTAGRAM} label="Follow & DM us" />
          <Cta href={WISHLIST} label="Shop the wishlist" look="glass" />
        </div>
        <p className="tagline">“Every basket is a reminder: you are not alone.”</p>
        <div className="foot-bottom">
          <p>
            Carebear Baskets &copy; 2026–2027 · A student-led nonprofit at Coppell High School,
            Texas
          </p>
          <p>
            3D panda from{" "}
            <a href="https://kenney.nl/assets/cube-pets" target="_blank" rel="noopener">
              Cube Pets by Kenney
            </a>{" "}
            (CC0) · Components from{" "}
            <a href="https://ruixen.com" target="_blank" rel="noopener">
              Ruixen
            </a>{" "}
            and{" "}
            <a href="https://rareui.com" target="_blank" rel="noopener">
              RareUI
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

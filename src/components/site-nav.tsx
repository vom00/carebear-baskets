"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MagneticTabs } from "@/components/ruixen/magnetic-tabs";
import { Cta } from "@/components/cta";
import { pages, WISHLIST } from "@/lib/site";

export function SiteNav() {
  const path = usePathname();
  return (
    <header className="nav" data-theme="dark">
      <nav className="wrap" aria-label="Main navigation">
        <Link href="/" className="logo">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <rect x="3" y="3" width="9" height="9" rx="2.5" fill="currentColor" />
            <rect x="20" y="3" width="9" height="9" rx="2.5" fill="currentColor" />
            <rect x="4" y="7" width="24" height="22" rx="6" fill="currentColor" />
            <rect x="10" y="15" width="3" height="4" rx="1.5" fill="#141a33" />
            <rect x="19" y="15" width="3" height="4" rx="1.5" fill="#141a33" />
            <rect x="13.5" y="21" width="5" height="3" rx="1.5" fill="#141a33" />
          </svg>
          Carebear Baskets
        </Link>
        <MagneticTabs className="nav-tabs" items={pages} value={path} />
        <span className="nav-cta">
          <Cta href={WISHLIST} label="Wishlist" small />
        </span>
      </nav>
    </header>
  );
}

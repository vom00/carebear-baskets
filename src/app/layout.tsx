import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata: Metadata = {
  title: {
    default: "Carebear Baskets: care baskets for kids in the PICU",
    template: "%s · Carebear Baskets",
  },
  description:
    "Carebear Baskets is a student-led nonprofit at Coppell High School creating care baskets for children in the PICU.",
};

export const viewport: Viewport = { themeColor: "#141a33" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Providers>
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}

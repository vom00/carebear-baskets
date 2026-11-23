import type { CSSProperties } from "react";
import GlowLinkButton from "@/components/ruixen/glow-link-button";

// Ruixen's glow link in the Nightlight colours. "glass" takes its colours from a
// data-theme="dark" ancestor, so use it on night backgrounds only.
const looks = {
  lamp: {
    background: "var(--lamp)",
    color: "var(--ink)",
    border: 0,
    boxShadow: "0 12px 32px -12px rgba(255, 207, 110, .75)",
    "--gl-dim": "rgba(26, 31, 54, .6)",
    "--gl-glow": "rgba(255, 255, 255, .6)",
  },
  glass: {},
  ink: {
    background: "var(--ink)",
    color: "#fff",
    border: 0,
    "--gl-dim": "rgba(255, 255, 255, .6)",
    "--gl-glow": "rgba(255, 255, 255, .14)",
  },
};

export function Cta({
  href,
  label,
  look = "lamp",
  small = false,
}: {
  href: string;
  label: string;
  look?: keyof typeof looks;
  small?: boolean;
}) {
  const size = small
    ? { padding: "11px 18px", fontSize: 15 }
    : { padding: "15px 24px", fontSize: 17 };
  return (
    <GlowLinkButton
      href={href}
      label={label}
      style={{ ...size, fontWeight: 700, ...looks[look] } as CSSProperties}
    />
  );
}

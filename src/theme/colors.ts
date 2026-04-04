/** @format */

/**
 * Single source of truth for app colors. Use via Tailwind (`bg-brand`, `text-navy`, …)
 * or import this object when inline styles are required.
 *
 * Homepage cohesion: pair `cream`, `homerunInk`, `homerunBlue`, `homerunMuted`,
 * `homerunSecondaryBtn` with `src/theme/homepageSections.ts` class tokens so
 * sections below the hero share the same palette and rhythm as the framed hero.
 */
export const colors = {
	primary: "#2563EB",
	primaryLight: "#EFF6FF",
	primaryDark: "#1D4ED8",
	accent: "#14B8A6",
	accentLight: "#CCFBF1",
	textPrimary: "#111827",
	textSecondary: "#4B5563",
	surface: "#FFFFFF",
	/** Primary brand accent (deep purple) */
	brand: "#382260",
	/** Deep navy — hero background, text on brand buttons */
	navy: "#0b132e",
	/** Soft off-white — hero intro copy */
	blush: "#fef3f3",
	/** Near-black — light section headings */
	charcoal: "#1a1a1a",
	figmaPurple: "#5846fb",
	cardDark: "#1f2123",
	/** Full-bleed dark sections (e.g. services list) */
	surfaceDark: "#0c0727",
	/** Hairline rules between rows on dark UI (soft white) */
	dividerLight: "rgba(255, 255, 255, 0.22)",
	/** Hairline rules between rows on light UI */
	dividerOnLight: "rgba(0, 0, 0, 0.1)",
	/** Homerun-style marketing hero (Figma reference) */
	cream: "#f4eee4",
	homerunBlue: "#4B73FF",
	homerunInk: "#2D2926",
	homerunMuted: "#4A4A4A",
	homerunSecondaryBtn: "#e8e6e1",
} as const;

export type AppColorKey = keyof typeof colors;

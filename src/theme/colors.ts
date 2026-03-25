/** @format */

/**
 * Single source of truth for app colors. Use via Tailwind (`bg-brand`, `text-navy`, …)
 * or import this object when inline styles are required.
 */
export const colors = {
	primary: '#2563EB',
	primaryLight: '#EFF6FF',
	primaryDark: '#1D4ED8',
	accent: '#14B8A6',
	accentLight: '#CCFBF1',
	textPrimary: '#111827',
	textSecondary: '#4B5563',
	surface: '#FFFFFF',
	/** Lime / logo & accents (Marketly brand) */
	brand: '#b5ed3d',
	/** Deep navy — hero background, text on brand buttons */
	navy: '#0b132e',
	/** Soft off-white — hero intro copy */
	blush: '#fef3f3',
	/** Near-black — light section headings */
	charcoal: '#1a1a1a',
	figmaPurple: '#5846fb',
	cardDark: '#1f2123',
	/** Full-bleed dark sections (e.g. services list) */
	surfaceDark: '#0c0727',
	/** Hairline rules between rows on dark UI (soft white) */
	dividerLight: 'rgba(255, 255, 255, 0.22)',
	/** Hairline rules between rows on light UI */
	dividerOnLight: 'rgba(0, 0, 0, 0.1)',
} as const;

export type AppColorKey = keyof typeof colors;

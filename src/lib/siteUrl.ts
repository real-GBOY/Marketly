/** @format */

/** Default Open Graph image path (served from `public/` or matched in `index.html`). */
export const DEFAULT_OG_IMAGE_PATH = "/assets/hero-office-check.png";

/**
 * Public site origin for canonical URLs and absolute `og:image`.
 * Set `VITE_SITE_URL` in production (e.g. `https://marketly.agency`) so crawlers and
 * previews get correct links even before client navigation.
 */
export function getSiteOrigin(): string {
	const fromEnv = import.meta.env.VITE_SITE_URL;
	if (typeof fromEnv === "string" && fromEnv.trim()) {
		return fromEnv.replace(/\/$/, "");
	}
	if (typeof window !== "undefined") {
		return window.location.origin;
	}
	return "";
}

export function absoluteUrl(pathOrUrl: string): string {
	if (!pathOrUrl) return getSiteOrigin();
	if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
	const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
	const origin = getSiteOrigin();
	return origin ? `${origin}${path}` : path;
}

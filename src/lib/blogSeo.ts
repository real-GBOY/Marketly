/** @format */

/**
 * ISO 8601 timestamps for structured data (align with visible dates in locales).
 * Length is the blog post count — keep in sync with `blogs.items` in locales.
 */
export const BLOG_POST_PUBLISHED_ISO = [
	"2026-03-20T09:00:00.000Z",
	"2026-03-14T09:00:00.000Z",
	"2026-04-30T09:00:00.000Z",
] as const;

export const BLOG_POST_COUNT = BLOG_POST_PUBLISHED_ISO.length;

export function blogPostPath(index: number): string {
	return `/blogs/${index}`;
}

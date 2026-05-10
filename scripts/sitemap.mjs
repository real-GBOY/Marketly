/**
 * Writes `public/sitemap.xml` before `vite build` so crawlers get absolute URLs.
 * Set `VITE_SITE_URL` (no trailing slash), e.g. https://marketly.agency
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const base = (process.env.VITE_SITE_URL || "https://marketly.agency").replace(
	/\/$/,
	"",
);

/** Keep blog URL count in sync with `BLOG_POST_PUBLISHED_ISO.length` in `src/lib/blogSeo.ts`. */
const BLOG_POST_COUNT = 4;

const paths = [
	"/",
	"/team",
	"/portfolio",
	"/contact",
	"/blogs",
	...Array.from({ length: BLOG_POST_COUNT }, (_, i) => `/blogs/${i}`),
];

function priority(path) {
	if (path === "/") return "1.0";
	if (path.startsWith("/blogs/")) return "0.85";
	if (path === "/blogs") return "0.9";
	return "0.75";
}

const urls = paths
	.map(
		(p) => `  <url>
    <loc>${base}${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority(p)}</priority>
  </url>`,
	)
	.join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(join(root, "public", "sitemap.xml"), xml, "utf8");

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
writeFileSync(join(root, "public", "robots.txt"), robots, "utf8");

console.log("sitemap: wrote public/sitemap.xml and public/robots.txt for", base);

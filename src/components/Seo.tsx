/** @format */

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { absoluteUrl, DEFAULT_OG_IMAGE_PATH } from "@/lib/siteUrl";

export type SeoProps = {
	title: string;
	description: string;
	/** Pathname + optional search (e.g. `/blogs/2`). Defaults to current location. */
	path?: string;
	/** Path under site root for OG image, or absolute URL. */
	imagePath?: string;
	ogType?: "website" | "article";
	/** ISO 8601 — sets `article:published_time` when `ogType` is `article`. */
	articlePublishedTime?: string;
	/** ISO 8601 — sets `article:modified_time` when `ogType` is `article`. */
	articleModifiedTime?: string;
	/** One or more JSON-LD objects (BlogPosting, ItemList, etc.). */
	jsonLd?: Record<string, unknown> | Record<string, unknown>[];
	noindex?: boolean;
};

export function Seo({
	title,
	description,
	path,
	imagePath = DEFAULT_OG_IMAGE_PATH,
	ogType = "website",
	articlePublishedTime,
	articleModifiedTime,
	jsonLd,
	noindex,
}: SeoProps) {
	const { i18n } = useTranslation();
	const location = useLocation();
	const pathname = path ?? `${location.pathname}${location.search}`;
	const canonical = absoluteUrl(pathname);
	const ogImage = absoluteUrl(imagePath);
	const ogLocale = i18n.resolvedLanguage === "ar" ? "ar_AR" : "en_US";
	const jsonLdBlocks = jsonLd
		? Array.isArray(jsonLd)
			? jsonLd
			: [jsonLd]
		: [];

	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			{noindex ? (
				<meta name='robots' content='noindex,nofollow' />
			) : (
				<meta name='robots' content='index,follow' />
			)}
			<link rel='canonical' href={canonical} />

			<meta property='og:type' content={ogType} />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta property='og:url' content={canonical} />
			<meta property='og:image' content={ogImage} />
			<meta property='og:locale' content={ogLocale} />
			<meta property='og:site_name' content={i18n.t("seo.siteName")} />
			{ogType === "article" && articlePublishedTime ? (
				<meta property='article:published_time' content={articlePublishedTime} />
			) : null}
			{ogType === "article" && articleModifiedTime ? (
				<meta property='article:modified_time' content={articleModifiedTime} />
			) : null}

			<meta name='twitter:card' content='summary_large_image' />
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={description} />
			<meta name='twitter:image' content={ogImage} />

			{jsonLdBlocks.map((block, i) => (
				<script
					key={`jsonld-${String(block["@type"] ?? "Thing")}-${i}`}
					type='application/ld+json'>
					{JSON.stringify(block)}
				</script>
			))}
		</Helmet>
	);
}

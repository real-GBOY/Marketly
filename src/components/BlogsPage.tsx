/** @format */

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BLOG_POST_COUNT, blogPostPath } from "../lib/blogSeo";
import { absoluteUrl } from "../lib/siteUrl";
import { Blogs } from "./Blogs";
import { Footer } from "./Footer";
import { FramedPageShell } from "./FramedPageShell";
import { Seo } from "./Seo";

export function BlogsPage() {
	const { t } = useTranslation();

	const blogIndexJsonLd = useMemo(() => {
		const itemListElement = Array.from({ length: BLOG_POST_COUNT }, (_, i) => ({
			"@type": "ListItem",
			position: i + 1,
			item: {
				"@type": "BlogPosting",
				"@id": absoluteUrl(blogPostPath(i)),
				url: absoluteUrl(blogPostPath(i)),
				headline: t(`blogs.items.${i}.title`),
				description: t(`blogs.items.${i}.excerpt`),
			},
		}));
		return {
			"@context": "https://schema.org",
			"@type": "ItemList",
			name: t("seo.blogs.title"),
			description: t("seo.blogs.description"),
			numberOfItems: BLOG_POST_COUNT,
			itemListElement,
		};
	}, [t]);

	return (
		<FramedPageShell>
			<Seo
				title={t("seo.blogs.title")}
				description={t("seo.blogs.description")}
				path='/blogs'
				jsonLd={blogIndexJsonLd}
			/>
			<div className='text-charcoal'>
				<Blogs />
				<Footer />
			</div>
		</FramedPageShell>
	);
}

/** @format */

import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { absoluteUrl, DEFAULT_OG_IMAGE_PATH } from "@/lib/siteUrl";

/** JSON-LD `Organization` for the home page (helps rich results and brand panels). */
export function OrganizationJsonLd() {
	const { t } = useTranslation();
	const url = absoluteUrl("/");
	const logo = absoluteUrl(DEFAULT_OG_IMAGE_PATH);

	const data = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: t("seo.siteName"),
		description: t("seo.home.description"),
		url,
		logo,
	};

	return (
		<Helmet>
			<script type='application/ld+json'>{JSON.stringify(data)}</script>
		</Helmet>
	);
}

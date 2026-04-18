/** @format */

import { useTranslation } from "react-i18next";
import { Blogs } from "./Blogs";
import { Footer } from "./Footer";
import { FramedPageShell } from "./FramedPageShell";
import { Seo } from "./Seo";

export function BlogsPage() {
	const { t } = useTranslation();
	return (
		<FramedPageShell>
			<Seo
				title={t("seo.blogs.title")}
				description={t("seo.blogs.description")}
				path='/blogs'
			/>
			<div className='text-charcoal'>
				<Blogs />
				<Footer />
			</div>
		</FramedPageShell>
	);
}

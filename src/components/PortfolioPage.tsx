/** @format */

import { useTranslation } from "react-i18next";
import { Footer } from "./Footer";
import { FramedPageShell } from "./FramedPageShell";
import { Portfolio } from "./Portfolio";
import { Seo } from "./Seo";

export function PortfolioPage() {
	const { t } = useTranslation();
	return (
		<FramedPageShell>
			<Seo
				title={t("seo.portfolio.title")}
				description={t("seo.portfolio.description")}
				path='/portfolio'
			/>
			<div className='text-charcoal'>
				<Portfolio />
				<Footer />
			</div>
		</FramedPageShell>
	);
}


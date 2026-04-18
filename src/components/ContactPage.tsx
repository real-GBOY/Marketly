/** @format */

import { useTranslation } from "react-i18next";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { FramedPageShell } from "./FramedPageShell";
import { Seo } from "./Seo";

export function ContactPage() {
	const { t } = useTranslation();
	return (
		<FramedPageShell>
			<Seo
				title={t("seo.contact.title")}
				description={t("seo.contact.description")}
				path='/contact'
			/>
			<div className='text-charcoal'>
				<Contact />
				<Footer />
			</div>
		</FramedPageShell>
	);
}

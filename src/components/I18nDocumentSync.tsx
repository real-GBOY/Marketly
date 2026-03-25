/** @format */

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/** Keeps <html lang> and dir in sync with i18n (RTL for Arabic). */
export function I18nDocumentSync() {
	const { i18n } = useTranslation();

	useEffect(() => {
		const update = () => {
			document.documentElement.lang = i18n.resolvedLanguage ?? i18n.language;
			document.documentElement.dir = i18n.dir();
		};

		update();
		i18n.on('languageChanged', update);
		return () => {
			i18n.off('languageChanged', update);
		};
	}, [i18n]);

	return null;
}

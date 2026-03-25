/** @format */

import { useTranslation } from "react-i18next";
import { About } from "./components/About";
import { Blogs } from "./components/Blogs";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { I18nDocumentSync } from "./components/I18nDocumentSync";
import { Portfolio } from "./components/Portfolio";
import { WhyMarketlyStickyStack } from "./components/WhyMarketlyStickyStack";

function App() {
	useTranslation();

	return (
		<div className='min-h-screen'>
			<I18nDocumentSync />
			<Hero />
			<WhyMarketlyStickyStack />
			<About />
			<Portfolio />
			<Blogs />
			<Contact />
			<Footer />
		</div>
	);
}

export default App;

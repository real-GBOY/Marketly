/** @format */

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLenis } from "lenis/react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { About } from "./components/About";
import { Blogs } from "./components/Blogs";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { I18nDocumentSync } from "./components/I18nDocumentSync";
import { BlogsPage } from "./components/BlogsPage";
import { BlogDetailPage } from "./components/BlogDetailPage";
import { PortfolioPage } from "./components/PortfolioPage";
import { Portfolio } from "./components/Portfolio";
import { TeamPage } from "./components/TeamPage";
import { WhyMarketlyStickyStack } from "./components/WhyMarketlyStickyStack";

function HomePage() {
	const location = useLocation();
	const lenis = useLenis();

	useEffect(() => {
		const id = location.hash.replace(/^#/, "");
		if (!id) return;
		const el = document.getElementById(id);
		if (!el) return;
		const frame = requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				if (lenis) {
					lenis.scrollTo(el, { duration: 1.2 });
				} else {
					el.scrollIntoView({ behavior: "smooth", block: "start" });
				}
			});
		});
		return () => cancelAnimationFrame(frame);
	}, [location.pathname, location.hash, lenis]);

	return (
		<>
			<Hero />
			<WhyMarketlyStickyStack />
			<About />
			<Portfolio />
			<Blogs />
			<Contact />
			<Footer />
		</>
	);
}

function App() {
	const { i18n } = useTranslation();

	return (
		<div className='min-h-screen' key={i18n.resolvedLanguage}>
			<I18nDocumentSync />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/team' element={<TeamPage />} />
				<Route path='/portfolio' element={<PortfolioPage />} />
				<Route path='/blogs' element={<BlogsPage />} />
				<Route path='/blogs/:id' element={<BlogDetailPage />} />
				<Route
					path='/about'
					element={<Navigate to={{ pathname: "/", hash: "about" }} replace />}
				/>
			</Routes>
		</div>
	);
}

export default App;


/** @format */

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLenis } from "lenis/react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { About } from "./components/About";
import { Blogs } from "./components/Blogs";
import { Contact } from "./components/Contact";
import { ContactPage } from "./components/ContactPage";
import { PreContactCta } from "./components/PreContactCta";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HomerunHeroNav } from "./components/HomerunHeroNav";
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
		<div className='min-h-screen bg-cream px-3 pb-4 pt-6 sm:px-4 sm:pb-5 sm:pt-8 md:px-6 md:pb-8 md:pt-10 lg:px-10 lg:pt-12'>
			<div className='relative mx-auto w-full max-w-[1920px] rounded-[1.75rem] border border-black/[0.06] bg-white shadow-[0_16px_80px_rgba(0,0,0,0.09)] sm:rounded-[2.25rem] md:rounded-[3rem]'>
				<HomerunHeroNav />
				<Hero />
				<WhyMarketlyStickyStack />
				<About />
				<Portfolio />
				<Blogs />
				<PreContactCta />
				<Contact />
				<Footer />
			</div>
		</div>
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
				<Route path='/contact' element={<ContactPage />} />
				<Route
					path='/about'
					element={<Navigate to={{ pathname: "/", hash: "about" }} replace />}
				/>
			</Routes>
		</div>
	);
}

export default App;


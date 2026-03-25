/** @format */

import { Menu } from "lucide-react";
import { useLenis } from "lenis/react";
import type { MouseEvent } from "react";
import { useTranslation } from "react-i18next";

const navLinks = [
	{ href: "#home", key: "nav.home" },
	{ href: "#about", key: "nav.about" },
	{ href: "#team", key: "nav.team" },
	{ href: "#services", key: "nav.services" },
	{ href: "#portfolio", key: "nav.portfolio" },
	{ href: "#blog", key: "nav.blog" },
	{ href: "#contact", key: "nav.contact" },
] as const;

export function Header() {
	const { t, i18n } = useTranslation();
	const lenis = useLenis();

	const handleSmoothNav = (
		event: MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		if (!href.startsWith("#")) return;
		const targetId = href.slice(1);
		const target = document.getElementById(targetId);
		if (!target) return;

		event.preventDefault();
		if (lenis) {
			lenis.scrollTo(target, { duration: 1.2 });
			return;
		}

		target.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<header className='font-manrope flex items-center justify-between gap-4 px-6 py-4 md:px-9 md:py-5'>
			<a
				href='#home'
				onClick={(event) => handleSmoothNav(event, "#home")}
				className='shrink-0 text-[22px] font-medium md:text-[30px]'>
				<span className='text-brand'>Market</span>
				<span className='text-white'>ly</span>
				<span className='text-brand'>.</span>
			</a>

			<nav
				className='hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-white/90 lg:flex xl:gap-10 xl:text-[15px]'
				aria-label={t("nav.ariaMain")}>
				{navLinks.map(({ href, key }) => (
					<a
						key={href}
						href={href}
						onClick={(event) => handleSmoothNav(event, href)}
						className="relative inline-block text-white/90 transition-colors hover:text-white after:pointer-events-none after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 after:ease-out after:content-[''] ltr:after:origin-right rtl:after:origin-left hover:after:scale-x-100">
						{t(key)}
					</a>
				))}
			</nav>

			<div className='flex shrink-0 items-center gap-2 md:gap-4 lg:gap-6'>
				<div
					className='flex items-center rounded-full border border-white/30 p-0.5 text-xs font-semibold text-white md:text-sm'
					role='group'
					aria-label={t("lang.switchTo")}>
					<button
						type='button'
						onClick={() => void i18n.changeLanguage("en")}
						className={`rounded-full px-2 py-1 transition md:px-3 ${
							i18n.language.startsWith("en") ?
								"bg-white text-navy"
							:	"text-white/80 hover:text-white"
						}`}>
						EN
					</button>
					<button
						type='button'
						onClick={() => void i18n.changeLanguage("ar")}
						className={`rounded-full px-2 py-1 transition md:px-3 ${
							i18n.language.startsWith("ar") ?
								"bg-white text-navy"
							:	"text-white/80 hover:text-white"
						}`}>
						ع
					</button>
				</div>
				<a
					href='#contact'
					onClick={(event) => handleSmoothNav(event, "#contact")}
					className='flex h-12 items-center justify-center rounded-[31px] border-2 border-white px-4 font-semibold text-white transition hover:bg-white/10 md:h-[60px] md:px-6 md:text-lg'>
					{t("cta.startProject")}
				</a>
				<button
					type='button'
					className='p-2 text-white lg:hidden'
					aria-label={t("a11y.openMenu")}>
					<Menu className='h-5 w-5' strokeWidth={2} />
				</button>
			</div>
		</header>
	);
}

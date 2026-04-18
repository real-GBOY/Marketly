/** @format */

import { useLenis } from "lenis/react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StaggeredMenu from "./StaggeredMenu";

const navLinks = [
	{ kind: "hash" as const, href: "#home", key: "nav.home" },
	{ kind: "hash" as const, href: "#about", key: "nav.about" },
	{ kind: "route" as const, href: "/team", key: "nav.team" },
	{ kind: "hash" as const, href: "#services", key: "nav.services" },
	{ kind: "route" as const, href: "/portfolio", key: "nav.portfolio" },
	{ kind: "route" as const, href: "/blogs", key: "nav.blog" },
	{ kind: "route" as const, href: "/contact", key: "nav.contact" },
] as const;

export function Header() {
	const { t, i18n } = useTranslation();
	const lenis = useLenis();
	const location = useLocation();
	const navigate = useNavigate();
	const [isHeaderHidden, setIsHeaderHidden] = useState(false);
	const lastScrollY = useRef(0);
	const isHomePage = location.pathname === "/";
	const mobileMenuItems = navLinks.map((item) => ({
		label: t(item.key),
		ariaLabel: t(item.key),
		link:
			item.kind === "route" ? item.href
			: isHomePage ? item.href
			: `/${item.href}`,
	}));
	const socialItems = [
		{
			label: t("contact.social.instagram"),
			link: t("contact.social.instagramHref"),
		},
		{
			label: t("contact.social.linkedin"),
			link: t("contact.social.linkedinHref"),
		},
		{
			label: t("contact.social.facebook"),
			link: t("contact.social.facebookHref"),
		},
	];

	const handleLanguageSwitch = async (lang: "en" | "ar") => {
		if (i18n.language.startsWith(lang)) return;

		document.documentElement.classList.add("lang-refresh");
		window.scrollTo({ top: 0, behavior: "auto" });
		await i18n.changeLanguage(lang);

		window.setTimeout(() => {
			document.documentElement.classList.remove("lang-refresh");
		}, 720);
	};

	const handleSmoothNav = (
		event: MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		if (!href.startsWith("#")) return;

		// If not on the homepage, navigate to homepage with hash
		if (!isHomePage) {
			event.preventDefault();
			navigate("/" + href);
			return;
		}

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

	useEffect(() => {
		lastScrollY.current = window.scrollY;

		const handleScroll = () => {
			const currentY = window.scrollY;
			const delta = currentY - lastScrollY.current;

			// Keep the header visible at the top and avoid jitter.
			if (currentY < 24) {
				setIsHeaderHidden(false);
			} else if (delta > 6) {
				setIsHeaderHidden(true);
			} else if (delta < -6) {
				setIsHeaderHidden(false);
			}

			lastScrollY.current = currentY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			{createPortal(
				<header
					className={`font-manrope fixed top-0 left-0 right-0 z-[9997] flex items-center justify-between gap-4 border-b border-white/10 bg-navy/70 px-6 py-4 backdrop-blur-md transition-transform duration-300 supports-[backdrop-filter]:bg-navy/45 md:px-9 md:py-5 ${
						isHeaderHidden ? "-translate-y-full" : "translate-y-0"
					}`}>
					<Link
						to='/'
						className='shrink-0 text-[22px] font-medium md:text-[30px]'>
						<span className='inline-flex items-center' dir='ltr'>
							<span className='text-brand'>Market</span>
							<span className='text-white'>ly</span>
							<span className='text-brand'>.</span>
						</span>
					</Link>

					<nav
						className='hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-white/90 lg:flex lg:gap-10 lg:text-[15px]'
						aria-label={t("nav.ariaMain")}>
						{navLinks.map((item) =>
							item.kind === "route" ?
								<Link
									key={item.href}
									to={item.href}
									className="relative inline-block text-white/90 transition-colors hover:text-white after:pointer-events-none after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 after:ease-out after:content-[''] ltr:after:origin-right rtl:after:origin-left hover:after:scale-x-100">
									{t(item.key)}
								</Link>
							:	<a
									key={item.href}
									href={isHomePage ? item.href : `/${item.href}`}
									onClick={(event) => handleSmoothNav(event, item.href)}
									className="relative inline-block text-white/90 transition-colors hover:text-white after:pointer-events-none after:absolute after:bottom-[-6px] after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 after:ease-out after:content-[''] ltr:after:origin-right rtl:after:origin-left hover:after:scale-x-100">
									{t(item.key)}
								</a>,
						)}
					</nav>

					<div className='flex shrink-0 items-center gap-2 md:gap-4 lg:gap-6'>
						<div
							className='hidden lg:flex items-center rounded-full border border-white/30 p-0.5 text-xs font-semibold text-white md:text-sm'
							role='group'
							aria-label={t("lang.switchTo")}>
							<button
								type='button'
								onClick={() => void handleLanguageSwitch("en")}
								className={`rounded-full px-2 py-1 transition md:px-3 ${
									i18n.language.startsWith("en") ?
										"bg-white text-navy"
									:	"text-white/80 hover:text-white"
								}`}>
								EN
							</button>
							<button
								type='button'
								onClick={() => void handleLanguageSwitch("ar")}
								className={`rounded-full px-2 py-1 transition md:px-3 ${
									i18n.language.startsWith("ar") ?
										"bg-white text-navy"
									:	"text-white/80 hover:text-white"
								}`}>
								ع
							</button>
						</div>
						<Link
							to='/contact'
							className='hidden lg:flex h-12 items-center justify-center rounded-[31px] border-2 border-white px-4 font-semibold text-white transition hover:bg-white/10 md:h-[60px] md:px-6 md:text-lg'>
							{t("cta.startProject")}
						</Link>
					</div>
				</header>,
				document.getElementById("overlay-root") ?? document.body,
			)}

			{/* Render menu button via portal so position:fixed isn't broken by parent transforms */}
			{createPortal(
				<div
					className={`fixed top-0 right-0 z-[9998] flex items-center px-6 py-4 font-manrope transition-transform duration-300 md:px-9 md:py-5 lg:hidden ${
						isHeaderHidden ? "-translate-y-full" : "translate-y-0"
					}`}>
					<StaggeredMenu
						className='lg:hidden'
						isFixed
						position='right'
						items={mobileMenuItems}
						socialItems={socialItems}
						displaySocials
						displayItemNumbering
						menuButtonColor='#ffffff'
						openMenuButtonColor='#ffffff'
						changeMenuColorOnOpen
						colors={["#131b3a", "#0b132e"]}
						showLogo={false}
						accentColor='#382260'
						footerContent={
							<div className='flex flex-col gap-4'>
								<div
									className='flex items-center rounded-full border border-white/20 p-0.5 text-sm font-semibold w-fit'
									role='group'
									aria-label={t("lang.switchTo")}>
									<button
										type='button'
										onClick={() => void handleLanguageSwitch("en")}
										className={`rounded-full px-4 py-1.5 transition ${
											i18n.language.startsWith("en") ?
												"bg-brand text-white"
											:	"text-white/60 hover:text-white"
										}`}>
										EN
									</button>
									<button
										type='button'
										onClick={() => void handleLanguageSwitch("ar")}
										className={`rounded-full px-4 py-1.5 transition ${
											i18n.language.startsWith("ar") ?
												"bg-brand text-white"
											:	"text-white/60 hover:text-white"
										}`}>
										ع
									</button>
								</div>
								<Link
									to='/contact'
									className='flex h-12 items-center justify-center rounded-[31px] bg-brand px-6 font-semibold text-white transition hover:brightness-110 text-base'>
									{t("cta.startProject")}
								</Link>
							</div>
						}
					/>
				</div>,
				document.getElementById("overlay-root") ?? document.body,
			)}
		</>
	);
}

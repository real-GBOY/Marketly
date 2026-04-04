/** @format */

import { useLenis } from "lenis/react";
import { useState, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

function ChevronDown({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			width='10'
			height='6'
			viewBox='0 0 10 6'
			fill='none'
			aria-hidden>
			<path
				d='M1 1L5 5L9 1'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

const DROPDOWN_LINKS = [
	{ key: "homerunNav.product", href: "#services", kind: "hash" as const },
	{ key: "homerunNav.team", href: "/team", kind: "route" as const },
	{ key: "homerunNav.useCases", href: "#portfolio", kind: "hash" as const },
	{ key: "homerunNav.learn", href: "/blogs", kind: "route" as const },
	{ key: "homerunNav.pricing", href: "#contact", kind: "hash" as const },
] as const;

/** Nav pill: vertical center on the top edge of the framed shell (`relative` parent in App). */
export function HomerunHeroNav() {
	const { t } = useTranslation();
	const lenis = useLenis();
	const location = useLocation();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = useState(false);
	const isHomePage = location.pathname === "/";

	const handleSmoothNav = (
		event: MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		setMobileOpen(false);
		if (!href.startsWith("#")) return;

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

	return (
		<header
			className={`pointer-events-none absolute inset-x-0 z-50 flex justify-center px-3 sm:px-5 ${
				mobileOpen ?
					"top-[max(0.5rem,env(safe-area-inset-top,0px))] translate-y-0 lg:top-0 lg:-translate-y-1/2"
				:	"top-0 -translate-y-1/2"
			}`}>
			<div
				className={`pointer-events-auto w-full min-w-0 max-w-[min(100%,44rem)] sm:max-w-[min(100%,52rem)] lg:max-w-[min(100%,64rem)] ${
					mobileOpen ? "relative z-[100] lg:z-auto" : ""
				}`}>
				<div
					className={`relative isolate w-full min-w-0 border border-black/[0.06] bg-white px-3 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-[border-radius,box-shadow] duration-200 sm:px-4 md:px-5 md:py-3 ${
						mobileOpen ?
							"rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.14)] sm:rounded-3xl"
						:	"rounded-full"
					}`}>
					<div className='grid w-full min-w-0 grid-cols-[1fr_auto_1fr] items-center gap-2 md:gap-3'>
						<div className='flex min-w-0 justify-self-start overflow-hidden'>
							<Link
								to='/'
								className='min-w-0 shrink font-sans text-base font-bold italic tracking-tight text-homerunInk md:text-lg'>
								<span className='block truncate border-b-[3px] border-homerunInk pb-0.5'>
									{t("homerunNav.logo")}
								</span>
							</Link>
						</div>

						<nav
							className='font-manrope hidden items-center justify-center gap-4 text-[14px] font-medium text-homerunMuted lg:flex xl:gap-6 xl:text-[15px]'
							aria-label={t("homerunNav.ariaMain")}>
							{DROPDOWN_LINKS.map((item) =>
								item.kind === "route" ?
									<Link
										key={item.key}
										to={item.href}
										className='inline-flex items-center gap-1 transition hover:text-homerunInk'>
										{t(item.key)}
										<ChevronDown className='opacity-70' />
									</Link>
								:	<a
										key={item.key}
										href={isHomePage ? item.href : `/${item.href}`}
										onClick={(e) => handleSmoothNav(e, item.href)}
										className='inline-flex items-center gap-1 transition hover:text-homerunInk'>
										{t(item.key)}
										<ChevronDown className='opacity-70' />
									</a>,
							)}
						</nav>

						<div className='flex shrink-0 items-center justify-end justify-self-end gap-2 md:gap-3'>
							<a
								href='#contact'
								onClick={(e) => handleSmoothNav(e, "#contact")}
								className='font-manrope hidden text-sm font-semibold text-homerunMuted transition hover:text-homerunInk md:inline'>
								{t("homerunNav.logIn")}
							</a>
							<a
								href='#contact'
								onClick={(e) => handleSmoothNav(e, "#contact")}
								className='font-manrope hidden h-10 items-center justify-center rounded-full bg-homerunBlue px-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-105 sm:inline-flex md:h-11 md:px-5'>
								{t("homerunNav.startFree")}
							</a>

							<button
								type='button'
								className='inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-homerunInk lg:hidden'
								onClick={() => setMobileOpen((o) => !o)}
								aria-expanded={mobileOpen}
								aria-label={
									mobileOpen ?
										t("homerunNav.closeMenu")
									:	t("homerunNav.openMenu")
								}>
								<span className='sr-only'>
									{mobileOpen ?
										t("homerunNav.closeMenu")
									:	t("homerunNav.openMenu")}
								</span>
								{mobileOpen ?
									<span className='text-xl leading-none'>×</span>
								:	<span className='flex flex-col gap-1'>
										<span className='block h-0.5 w-5 bg-homerunInk' />
										<span className='block h-0.5 w-5 bg-homerunInk' />
										<span className='block h-0.5 w-5 bg-homerunInk' />
									</span>
								}
							</button>
						</div>
					</div>

					{mobileOpen ?
						<nav
							className='font-manrope mt-2 flex w-full min-w-0 flex-col border-t border-black/10 pt-2 sm:mt-3 sm:pt-3 lg:hidden'
							aria-label={t("homerunNav.ariaMain")}>
							<div
								className='max-h-[min(52dvh,20rem)] min-h-0 w-full overflow-x-hidden overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch] sm:max-h-[min(50dvh,18rem)]'>
								<div className='flex flex-col gap-0.5 pb-1 sm:gap-1'>
									{DROPDOWN_LINKS.map((item) =>
										item.kind === "route" ?
											<Link
												key={item.key}
												to={item.href}
												onClick={() => setMobileOpen(false)}
												className='block w-full break-words rounded-xl px-3 py-3 text-center text-[15px] font-medium leading-snug text-homerunMuted transition active:bg-cream/80 hover:bg-cream hover:text-homerunInk sm:py-2.5 sm:text-base'>
												{t(item.key)}
											</Link>
										:	<a
												key={item.key}
												href={isHomePage ? item.href : `/${item.href}`}
												onClick={(e) => handleSmoothNav(e, item.href)}
												className='block w-full break-words rounded-xl px-3 py-3 text-center text-[15px] font-medium leading-snug text-homerunMuted transition active:bg-cream/80 hover:bg-cream hover:text-homerunInk sm:py-2.5 sm:text-base'>
												{t(item.key)}
											</a>,
									)}
								</div>
							</div>
							<a
								href='#contact'
								onClick={(e) => handleSmoothNav(e, "#contact")}
								className='mb-[max(0.25rem,env(safe-area-inset-bottom,0px))] mt-2 flex min-h-11 w-full shrink-0 items-center justify-center rounded-full bg-homerunBlue px-4 py-3 text-center text-[15px] font-semibold leading-tight text-white transition hover:brightness-105 active:brightness-95 sm:mt-3 sm:min-h-0 sm:h-11 sm:py-0 sm:text-base'>
								{t("homerunNav.startFree")}
							</a>
						</nav>
					:	null}
				</div>
			</div>
		</header>
	);
}

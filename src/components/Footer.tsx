/** @format */

import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import FooterTopEdgeSvg from "./FooterTopEdgeSvg";

const footerLinks = [
	{ href: "#home", key: "nav.home" },
	{ href: "#about", key: "nav.about" },
	{ href: "#services", key: "nav.services" },
	{ href: "#portfolio", key: "nav.portfolio" },
	{ href: "#blog", key: "nav.blog" },
	{ href: "#contact", key: "nav.contact" },
] as const;

const socialLinks = [
	{ href: "https://twitter.com/", icon: Twitter, label: "Twitter" },
	{ href: "https://linkedin.com/", icon: Linkedin, label: "LinkedIn" },
	{ href: "https://github.com/", icon: Github, label: "GitHub" },
	{ href: "https://facebook.com/", icon: Facebook, label: "Facebook" },
	{ href: "https://instagram.com/", icon: Instagram, label: "Instagram" },
] as const;

export function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	return (
		<footer className='bg-white' aria-label={t("footer.aria")}>
			<div className='relative mx-auto max-w-[1920px] px-5 pt-14 pb-0 md:px-9 md:pt-16 lg:px-[137px]'>
				<FooterTopEdgeSvg
					aria-hidden
					className='pointer-events-none absolute inset-x-0 top-14 z-10 h-20 w-full -translate-y-full md:top-16 md:h-24'
				/>
				<div className='rounded-t-[2.25rem] border-x border-t border-dividerOnLight bg-surface px-6 py-10 md:px-10 md:py-12'>
					<div className='grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end'>
						<div>
							<a
								href='#home'
								className='inline-flex items-center text-2xl font-medium md:text-[30px]'>
								<span className='text-brand'>Market</span>
								<span className='text-navy'>ly</span>
								<span className='text-brand'>.</span>
							</a>

							<nav
								className='mt-6 flex flex-wrap gap-x-5 gap-y-2 font-manrope text-sm text-textSecondary md:text-[15px]'
								aria-label={t("nav.ariaMain")}>
								{footerLinks.map(({ href, key }) => (
									<a
										key={href}
										href={href}
										className='relative inline-flex py-1 transition-colors duration-300 ease-out hover:text-textPrimary after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100'>
										{t(key)}
									</a>
								))}
							</nav>
						</div>

						<div className='flex flex-wrap items-center gap-3'>
							{socialLinks.map(({ href, icon: Icon, label }) => (
								<a
									key={label}
									href={href}
									target='_blank'
									rel='noreferrer'
									aria-label={label}
									className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-dividerOnLight text-textSecondary transition hover:border-brand/50 hover:text-textPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'>
									<Icon className='size-4' aria-hidden />
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className='relative isolate w-full border-b border-dividerOnLight bg-navy'>
				<div className='mx-auto max-w-[1920px] px-5 py-4 text-center font-manrope text-xs text-white/70 md:px-9 md:text-sm lg:px-[137px]'>
					{t("footer.rights", { year, agency: t("footer.agency") })}
				</div>
			</div>
		</footer>
	);
}

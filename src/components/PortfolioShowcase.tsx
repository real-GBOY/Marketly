/** @format */

import { ArrowDownRight, Play } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
	homeBodyText,
	homeCardBorder,
	homeH2,
	homeKickerIcon,
	homeKickerText,
	homeSectionPad,
} from "../theme/homepageSections";
import { BoxReveal } from "./BoxReveal";

/** Google Drive file id from share link (embed uses `/preview`). */
const SHOWCASE_VIDEO_FILE_ID = "1yuo7GpxHEqiF6rsmzv7sV561veQvTlyH";

const socialPillClass =
	"inline-flex h-10 items-center justify-center rounded-full border border-homerunMuted/25 bg-homerunSecondaryBtn px-4 font-manrope text-sm font-semibold text-homerunInk transition hover:bg-[#dedbd6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-homerunBlue/40";

type ShowcaseCard = {
	tag: string;
	title: string;
	desc: string;
};

export function PortfolioShowcase() {
	const { t } = useTranslation();

	const cards = useMemo<ShowcaseCard[]>(() => {
		const raw = t("portfolioPage.cards", { returnObjects: true });
		return Array.isArray(raw) ? (raw as ShowcaseCard[]) : [];
	}, [t]);

	const previewSrc = `https://drive.google.com/file/d/${SHOWCASE_VIDEO_FILE_ID}/preview`;

	return (
		<section
			className='scroll-mt-24 border-b border-black/[0.06] bg-gradient-to-b from-cream/50 to-white pb-16 pt-12 md:pb-24 md:pt-16'
			aria-label={t("sections.portfolioShowcase")}>
			<div className={homeSectionPad}>
				<div className='mx-auto max-w-[820px] text-center rtl:text-right md:mx-0 md:text-start'>
					<div className='flex items-center justify-center gap-2 md:justify-start rtl:flex-row'>
						<ArrowDownRight
							className={homeKickerIcon}
							strokeWidth={2}
							aria-hidden
						/>
						<p className={homeKickerText}>{t("portfolioPage.kicker")}</p>
					</div>
					<BoxReveal boxColor='#382260' duration={0.55}>
						<h1
							className={`mt-4 ${homeH2} leading-[1.15] md:leading-[1.12]`}>
							{t("portfolioPage.heading")}
						</h1>
					</BoxReveal>
					<p className={`mx-auto mt-5 max-w-[62ch] md:mx-0 ${homeBodyText}`}>
						{t("portfolioPage.body")}
					</p>
				</div>

				<div className='mx-auto mt-12 max-w-[960px] md:mt-14'>
					<div
						className={`relative overflow-hidden ${homeCardBorder} bg-navy/5 ring-1 ring-black/[0.04]`}>
						<div className='absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 font-manrope text-xs font-semibold text-white backdrop-blur-sm md:left-5 md:top-5'>
							<Play className='size-3.5 shrink-0 fill-current' aria-hidden />
							{t("portfolioPage.videoBadge")}
						</div>
						<div className='aspect-video w-full bg-navy/90'>
							<iframe
								src={previewSrc}
								title={t("portfolioPage.videoAria")}
								allow='autoplay; fullscreen; encrypted-media; picture-in-picture'
								allowFullScreen
								className='h-full w-full border-0'
								referrerPolicy='strict-origin-when-cross-origin'
							/>
						</div>
					</div>
					<p className='mt-4 text-center font-manrope text-sm text-homerunMuted md:text-start'>
						{t("portfolioPage.videoCaption")}
					</p>
				</div>

				<div className='mt-16 md:mt-20'>
					<h2 className={`text-center font-dynapuff text-2xl font-bold tracking-tight text-homerunInk md:text-start md:text-3xl`}>
						{t("portfolioPage.cardsHeading")}
					</h2>
					<ul
						className='mt-8 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6'
						role='list'>
						{cards.map((card) => (
							<li key={card.title} role='listitem'>
								<article
									className={`group relative h-full overflow-hidden ${homeCardBorder} bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/25 hover:shadow-[0_20px_48px_rgba(56,34,96,0.12)] md:p-7`}>
									<div
										className='pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-brand/[0.07] transition duration-500 group-hover:scale-110'
										aria-hidden
									/>
									<span className='relative inline-flex rounded-full bg-brand/10 px-3 py-1 font-manrope text-xs font-semibold uppercase tracking-[0.15em] text-brand'>
										{card.tag}
									</span>
									<h3 className='relative mt-4 font-dynapuff text-xl font-bold tracking-tight text-homerunInk transition-colors group-hover:text-homerunBlue md:text-2xl'>
										{card.title}
									</h3>
									<p className='relative mt-3 font-manrope text-sm leading-relaxed text-textSecondary md:text-[15px]'>
										{card.desc}
									</p>
								</article>
							</li>
						))}
					</ul>
				</div>

				<div
					className={`mt-14 md:mt-16 ${homeCardBorder} bg-gradient-to-br from-cream/40 to-white p-6 md:p-8`}
					aria-labelledby='portfolio-social-heading'>
					<h2
						id='portfolio-social-heading'
						className='font-dynapuff text-xl font-bold tracking-tight text-homerunInk md:text-2xl'>
						{t("contact.social.heading")}
					</h2>
					<p className={`mt-2 max-w-[56ch] ${homeBodyText}`}>
						{t("portfolioPage.socialLead")}
					</p>
					<nav
						className='mt-5 flex flex-wrap gap-3'
						aria-label={t("portfolioPage.socialNavAria")}>
						<a
							href={t("contact.social.tiktokHref")}
							target='_blank'
							rel='noreferrer'
							className={socialPillClass}>
							{t("contact.social.tiktok")}
						</a>
						<a
							href={t("contact.social.instagramHref")}
							target='_blank'
							rel='noreferrer'
							className={socialPillClass}>
							{t("contact.social.instagram")}
						</a>
						<a
							href={t("contact.social.facebookHref")}
							target='_blank'
							rel='noreferrer'
							className={socialPillClass}>
							{t("contact.social.facebook")}
						</a>
					</nav>
				</div>
			</div>
		</section>
	);
}

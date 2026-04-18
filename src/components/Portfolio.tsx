/** @format */
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
	homeBodyText,
	homeCardBorder,
	homeH2,
	homeKickerIcon,
	homeKickerText,
	homeSecondaryCta,
	homeSectionPad,
} from "../theme/homepageSections";
import { BoxReveal } from "./BoxReveal";

// Use one office image for all mock items
const OFFICE_IMG = new URL(
	"../../assets/9caf5948-a733-47de-9d1d-70809876d17e.jpg",
	import.meta.url,
).href;

type PortfolioItem = {
	title: string;
	tag: string;
	excerpt: string;
	imageUrl: string;
};

const ITEMS_COUNT = 6;

export function Portfolio() {
	const { t } = useTranslation();

	const items = useMemo<PortfolioItem[]>(
		() =>
			Array.from({ length: ITEMS_COUNT }, (_, i) => ({
				tag: t(`portfolio.items.${i}.tag`),
				title: t(`portfolio.items.${i}.title`),
				excerpt: t(`portfolio.items.${i}.excerpt`),
				imageUrl: OFFICE_IMG,
			})),
		[t],
	);

	return (
		<section
			id='portfolio'
			className='scroll-mt-24 bg-white'
			aria-label={t("sections.portfolio")}>
			<div className={homeSectionPad}>
				<div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
					<div className='max-w-[760px] rtl:text-right'>
						<div className='flex items-center gap-2 rtl:flex-row'>
							<ArrowDownRight
								className={homeKickerIcon}
								strokeWidth={2}
								aria-hidden
							/>
							<p className={homeKickerText}>{t("portfolio.kicker")}</p>
						</div>
						<BoxReveal boxColor='#382260' duration={0.55}>
							<h2 className={`mt-4 ${homeH2}`}>{t("portfolio.heading")}</h2>
						</BoxReveal>
						<p className={`mt-5 max-w-[70ch] ${homeBodyText}`}>
							{t("portfolio.body")}
						</p>
					</div>

					<Link to='/contact' className={`${homeSecondaryCta} rtl:flex-row-reverse`}>
						<span>{t("portfolio.cta")}</span>
						<ArrowRight
							className='size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5'
							aria-hidden
						/>
					</Link>
				</div>

				<div
					className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
					role='list'>
					{items.map((item, index) => (
						<article
							key={`${item.title}-${index}`}
							role='listitem'
							className={`group relative overflow-hidden ${homeCardBorder} p-5 transition hover:-translate-y-0.5`}>
							<div className='relative overflow-hidden rounded-xl bg-surface'>
								<img
									src={item.imageUrl}
									alt={item.title}
									loading={index < 3 ? "eager" : "lazy"}
									decoding='async'
									className='h-full w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.04]'
								/>
								<div
									className='pointer-events-none absolute inset-0 bg-gradient-to-t from-homerunInk/10 via-transparent to-transparent'
									aria-hidden
								/>
							</div>

							<div className='mt-4 flex items-center justify-between gap-4'>
								<span className='inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand'>
									{item.tag}
								</span>
							</div>

							<h3 className='mt-4 font-dynapuff text-xl font-bold tracking-tight text-homerunInk transition-colors group-hover:text-homerunBlue md:text-2xl'>
								{item.title}
							</h3>

							<p className={`mt-3 ${homeBodyText}`}>{item.excerpt}</p>

							<div className='mt-5 flex items-center justify-between gap-4'>
								<Link
									to={`/portfolio/${index}`}
									className='inline-flex items-center gap-2 text-sm font-semibold text-homerunInk transition-colors group-hover:text-homerunBlue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-homerunBlue/40'>
									{t("portfolio.view")}
									<ArrowRight
										className='size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5'
										aria-hidden
									/>
								</Link>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}

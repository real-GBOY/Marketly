/** @format */
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useId, useMemo, useState } from "react";
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

type BlogItem = {
	tag: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
	imageUrl: string;
};

const ITEMS_COUNT = 6;
const DEFAULT_VISIBLE_COUNT = 3;

export function Blogs() {
	const { t } = useTranslation();
	const uid = useId();
	const [showAll, setShowAll] = useState(false);

	const items = useMemo<BlogItem[]>(
		() =>
			Array.from({ length: ITEMS_COUNT }, (_, i) => ({
				tag: t(`blogs.items.${i}.tag`),
				title: t(`blogs.items.${i}.title`),
				excerpt: t(`blogs.items.${i}.excerpt`),
				date: t(`blogs.items.${i}.date`),
				readTime: t(`blogs.items.${i}.readTime`),
				imageUrl: OFFICE_IMG,
			})),
		[t],
	);

	const visibleItems = showAll ? items : items.slice(0, DEFAULT_VISIBLE_COUNT);

	return (
		<section
			id='blog'
			className='scroll-mt-24 bg-cream/35'
			aria-label={t("sections.blog")}>
			<div className={homeSectionPad}>
				<div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
					<div className='max-w-[720px]'>
						<div className='flex items-center gap-2'>
							<ArrowDownRight
								className={homeKickerIcon}
								strokeWidth={2}
								aria-hidden
							/>
							<p className={homeKickerText}>{t("blogs.kicker")}</p>
						</div>
						<BoxReveal boxColor='#382260' duration={0.55}>
							<h2
								className={`mt-4 ${homeH2} leading-[1.22] md:leading-[1.2] lg:leading-[1.2]`}>
								{t("blogs.heading")}
							</h2>
						</BoxReveal>
					</div>

					<button
						type='button'
						onClick={() => setShowAll((v) => !v)}
						aria-expanded={showAll}
						aria-controls={`${uid}-grid`}
						className={`${homeSecondaryCta} rtl:flex-row-reverse`}>
						<span>{showAll ? t("blogs.showLess") : t("blogs.showAll")}</span>
						<ArrowRight
							className='size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5'
							aria-hidden
						/>
					</button>
				</div>

				<div
					id={`${uid}-grid`}
					className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
					role='list'>
					{visibleItems.map((item, index) => (
						<article
							key={`${item.title}-${index}`}
							role='listitem'
							className={`group relative overflow-hidden ${homeCardBorder} p-5 transition hover:-translate-y-0.5`}>
							<div className='relative overflow-hidden rounded-xl bg-surface'>
								<img
									src={item.imageUrl}
									alt={item.title}
									loading={index < DEFAULT_VISIBLE_COUNT ? "eager" : "lazy"}
									decoding='async'
									className='h-full w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.04]'
								/>
							</div>

							<div className='mt-4 flex items-center justify-between gap-4'>
								<span className='inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand'>
									{item.tag}
								</span>
								<time className='text-xs font-manrope text-homerunMuted'>{item.date}</time>
							</div>

							<h3 className='mt-4 font-dynapuff text-xl font-bold tracking-tight text-homerunInk transition-colors group-hover:text-homerunBlue md:text-2xl'>
								{item.title}
							</h3>

							<p className={`mt-3 ${homeBodyText}`}>{item.excerpt}</p>

							<div className='mt-5 flex items-center justify-between gap-4'>
								<p className='text-xs font-manrope text-homerunMuted'>{item.readTime}</p>
									<Link
										to={`/blogs/${index}`}
										className='inline-flex items-center gap-2 text-sm font-semibold text-homerunInk transition-colors group-hover:text-homerunBlue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-homerunBlue/40'>
									{t("blogs.readMore")}
									<ArrowRight className='size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5' aria-hidden />
									</Link>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}


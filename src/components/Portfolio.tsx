/** @format */
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
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
			<div className='mx-auto max-w-[1920px] px-5 py-16 md:px-9 md:py-24 lg:px-[137px]'>
				<div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
					<div className='max-w-[760px]'>
						<div className='flex items-center gap-2 text-textSecondary'>
							<ArrowDownRight
								className='size-8 shrink-0 text-brand'
								strokeWidth={2}
								aria-hidden
							/>
							<p className='font-manrope text-sm font-semibold uppercase tracking-[0.2em] text-textSecondary'>
								{t("portfolio.kicker")}
							</p>
						</div>
						<BoxReveal boxColor='#b5ed3d' duration={0.55}>
							<h2 className='mt-4 font-raleway text-3xl font-semibold tracking-tight text-textPrimary md:text-4xl lg:text-5xl'>
								{t("portfolio.heading")}
							</h2>
						</BoxReveal>
						<p className='mt-5 max-w-[70ch] font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
							{t("portfolio.body")}
						</p>
					</div>

					<a
						href='#contact'
						className='group inline-flex h-12 items-center justify-center gap-3 rounded-full border border-dividerOnLight bg-white px-5 font-manrope text-sm font-semibold text-textPrimary transition hover:border-brand/50 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'>
						<span>{t("portfolio.cta")}</span>
						<ArrowRight
							className='size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5'
							aria-hidden
						/>
					</a>
				</div>

				<div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3' role='list'>
					{items.map((item, index) => (
						<article
							key={`${item.title}-${index}`}
							role='listitem'
							className='group relative overflow-hidden rounded-2xl border border-dividerOnLight bg-surface p-5 shadow-[0_6px_28px_rgba(2,6,23,0.04)] transition hover:-translate-y-0.5 hover:border-brand/40 focus-within:ring-2 focus-within:ring-brand/70'>
							<div className='relative overflow-hidden rounded-xl bg-surface'>
								<img
									src={item.imageUrl}
									alt={item.title}
									loading={index < 3 ? "eager" : "lazy"}
									decoding='async'
									className='h-full w-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-[1.04]'
								/>
								<div
									className='pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/10 via-slate-950/0 to-slate-950/0'
									aria-hidden
								/>
							</div>

							<div className='mt-4 flex items-center justify-between gap-4'>
								<span className='inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand'>
									{item.tag}
								</span>
							</div>

							<h3 className='mt-4 font-raleway text-xl font-semibold tracking-tight text-textPrimary transition-colors group-hover:text-brand md:text-2xl'>
								{item.title}
							</h3>

							<p className='mt-3 font-manrope text-sm leading-relaxed text-textSecondary'>
								{item.excerpt}
							</p>

							<div className='mt-5 flex items-center justify-between gap-4'>
								<a
									href='#contact'
									className='inline-flex items-center gap-2 text-sm font-semibold text-textPrimary transition-colors group-hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'>
									{t("portfolio.view")}
									<ArrowRight
										className='size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5'
										aria-hidden
									/>
								</a>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}


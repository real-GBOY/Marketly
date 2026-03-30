/** @format */

import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

const OFFICE_IMG = new URL(
	"../../assets/9caf5948-a733-47de-9d1d-70809876d17e.jpg",
	import.meta.url,
).href;

const ITEMS_COUNT = 6;

export function BlogDetailPage() {
	const { t } = useTranslation();
	const params = useParams();

	const index = useMemo(() => {
		const raw = params.id;
		const n = raw ? Number(raw) : 0;
		if (!Number.isFinite(n)) return 0;
		return Math.min(Math.max(n, 0), ITEMS_COUNT - 1);
	}, [params.id]);

	const data = useMemo(() => {
		return {
			tag: t(`blogs.items.${index}.tag`),
			title: t(`blogs.items.${index}.title`),
			excerpt: t(`blogs.items.${index}.excerpt`),
			date: t(`blogs.items.${index}.date`),
			readTime: t(`blogs.items.${index}.readTime`),
		};
	}, [index, t]);

	return (
		<div className='min-h-screen bg-white text-charcoal'>
			<section className='bg-navy pb-6'>
				<div className='relative mx-auto max-w-[1920px] px-5 pt-6 md:px-9 lg:px-[137px]'>
					<Header />
				</div>
			</section>

			<main className='mx-auto max-w-[1920px] px-5 py-10 md:px-9 md:py-14 lg:px-[137px]'>
				<div className='mb-6 flex items-center gap-3'>
					<Link
						to='/blogs'
						className='inline-flex items-center gap-2 text-sm font-semibold text-textPrimary transition hover:text-brand'>
						<ArrowLeft className='size-4' aria-hidden />
						<span>{t("blogs.readMore")}</span>
					</Link>
				</div>

				<article className='overflow-hidden rounded-2xl border border-dividerOnLight bg-surface shadow-[0_6px_28px_rgba(2,6,23,0.04)]'>
					<div className='relative'>
						<img
							src={OFFICE_IMG}
							alt={data.title}
							className='h-[260px] w-full object-cover'
						/>
						<div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/20 to-slate-950/0' />
						<div className='absolute left-0 top-0 flex h-full w-full items-end p-5 md:p-7'>
							<div>
								<p className='inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white'>
									{data.tag}
								</p>
								<h1 className='mt-3 font-raleway text-3xl font-semibold tracking-tight text-white md:text-4xl'>
									{data.title}
								</h1>
								<p className='mt-2 text-sm font-manrope text-white/80'>
									{data.date} · {data.readTime}
								</p>
							</div>
						</div>
					</div>

					<div className='p-5 md:p-8'>
						<p className='font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
							{data.excerpt}
						</p>
					</div>
				</article>
			</main>

			<Footer />
		</div>
	);
}

/** @format */

import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export function CtaSection() {
	const { t } = useTranslation();

	return (
		<section
			aria-label={t("ctaSection.aria")}
			className='relative overflow-hidden bg-slate-950 text-white'>
			<div
				className='pointer-events-none absolute inset-0 opacity-80'
				aria-hidden>
				<div className='absolute -top-24 start-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl' />
				<div className='absolute -bottom-40 start-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl' />
			</div>

			<div className='relative mx-auto max-w-[1920px] px-5 py-16 md:px-9 md:py-24 lg:px-[137px]'>
				<div className='grid items-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-md md:grid-cols-[1fr_auto] md:gap-10 md:p-10'>
					<div className='max-w-[720px]'>
						<p className='font-manrope text-sm uppercase tracking-[0.22em] text-brand/85'>
							{t("ctaSection.kicker")}
						</p>
						<h2 className='mt-4 font-raleway text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl'>
							{t("ctaSection.heading")}
						</h2>
						<p className='mt-5 font-manrope text-sm leading-relaxed text-white/75 md:text-base'>
							{t("ctaSection.body")}
						</p>
					</div>

					<div className='flex flex-col gap-3 sm:flex-row md:justify-end'>
						<a
							href='#contact'
							className='group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-brand px-6 font-manrope text-sm font-semibold text-navy transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 md:h-[54px] md:px-8 md:text-base'>
							{t("ctaSection.primary")}
							<ArrowRight
								className='size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5'
								aria-hidden
							/>
						</a>
						<a
							href='#services'
							className='inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-transparent px-6 font-manrope text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 md:h-[54px] md:px-8 md:text-base'>
							{t("ctaSection.secondary")}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}


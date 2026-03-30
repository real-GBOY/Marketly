/** @format */

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { BoxReveal } from "./BoxReveal";
import CardSwap, { Card } from "./CardSwap";
import ScrollReveal from "./ScrollReveal";
import { Services } from "./Services";
import { WHY_MARKETLY_ID } from "./SmoothScroll";

/** Grid overlay; mask can be disabled per section. */
function StackGridOverlay({
	className = "",
	disableMask = false,
}: {
	className?: string;
	disableMask?: boolean;
}) {
	return (
		<div
			className={`pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] [background-size:54px_54px] ${
				disableMask ? "" : (
					"[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
				)
			} ${className}`}
			aria-hidden
		/>
	);
}

export function WhyMarketlyStickyStack() {
	const { t } = useTranslation();

	return (
		<article className='relative z-30 w-full' aria-label={t("subHero.title")}>
			{/* Panel 1 — Why Marketly (white, primary copy) */}
			<section
				id={WHY_MARKETLY_ID}
				className='font-raleway grid min-h-[100dvh] h-screen w-full place-content-center overflow-hidden bg-white sticky top-0'>
				<StackGridOverlay className='opacity-70' />
				<motion.div
					className='relative z-10 mx-auto flex max-h-[min(100dvh,100%)] w-full max-w-[1920px] flex-col justify-center px-5 py-16 md:px-9 md:py-20 lg:px-[137px]'
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.35 }}
					transition={{ duration: 0.55, ease: "easeOut" }}>
					<div className='min-h-0 max-h-full overflow-y-auto overflow-x-hidden hide-scrollbar'>
						<h2 className='mb-6 text-2xl font-normal tracking-[0.3px] text-black md:text-[30px]'>
							<span className='text-charcoal'>
								{t("subHero.heading_prefix")}
							</span>
							<span className='inline-block align-baseline font-bold text-charcoal'>
								{t("subHero.heading_highlight")}
							</span>
						</h2>
						<ScrollReveal
							baseOpacity={0.1}
							enableBlur
							baseRotation={3}
							blurStrength={4}
							containerClassName='text-black'
							textClassName='font-raleway tracking-[0.02em] text-charcoal'>
							{t("subHero.body")}
						</ScrollReveal>
					</div>
				</motion.div>
			</section>

			{/* Panel 2 — Our Services (rounded top, scrolls inside viewport) */}
			<section className='flex min-h-[100dvh] h-screen w-full flex-col overflow-hidden sticky top-0 rounded-tr-2xl rounded-tl-2xl'>
				<StackGridOverlay className='z-[1]' />
				<div className='relative z-[2] flex h-full min-h-0 w-full flex-1 flex-col'>
					<Services stickyPanel />
				</div>
			</section>

			{/* Panel 3 — dark stack cap */}
			<section className='relative z-20 flex min-h-[72vh] w-full items-center overflow-hidden bg-slate-950 text-white'>
				<StackGridOverlay disableMask />
				<motion.div
					className='relative z-10 mx-auto flex w-full max-w-[1920px] flex-col items-start gap-10 px-5 py-14 md:grid md:grid-cols-2 md:items-center md:gap-10 md:px-9 md:py-16 lg:px-[137px] lg:py-20'
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.45 }}
					transition={{ duration: 0.5, ease: "easeOut" }}>
					<div className='max-w-[560px] text-left'>
						<BoxReveal boxColor='#b5ed3d' duration={0.5}>
							<p className='font-manrope text-sm uppercase tracking-[0.22em] text-brand/85'>
								{t("servicesPreview.kicker")}
							</p>
						</BoxReveal>
						<BoxReveal boxColor='#b5ed3d' duration={0.55}>
							<h3 className='mt-4 font-raleway text-3xl font-semibold leading-[1.12] tracking-tight md:text-4xl lg:text-5xl'>
								{t("whyMarketlyStack.panel3Line1")}
								<br />
								<span className='text-brand'>
									{t("whyMarketlyStack.panel3Line2")}
								</span>
							</h3>
						</BoxReveal>
						<BoxReveal boxColor='#b5ed3d' duration={0.6}>
							<p className='mt-6 max-w-[52ch] font-manrope text-sm leading-relaxed text-white/75 md:text-base'>
								{t("subHero.body")}
							</p>
						</BoxReveal>
					</div>
					<div className='relative flex h-[340px] w-full min-w-0 items-center justify-center sm:h-[390px] md:h-[520px]'>
						<CardSwap
							width='min(82vw, 560px)'
							height='220px'
							cardDistance={55}
							verticalDistance={56}
							delay={5000}
							pauseOnHover={false}
							containerClassName='md:translate-y-[8px] md:translate-x-[2%] md:scale-95'
							easing='elastic'>
							<Card customClass='bg-navy text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]'>
								<div className='flex h-full flex-col justify-between rounded-xl border border-white/10 p-6 md:p-8'>
									<p className='font-manrope text-sm uppercase tracking-[0.2em] text-brand/90'>
										{t("servicesPreview.kicker")}
									</p>
									<div>
										<h3 className='font-raleway text-2xl font-semibold md:text-3xl'>
											{t("servicesPreview.social.title")}
										</h3>
										<p className='mt-3 font-manrope text-sm leading-relaxed text-white/75 md:text-base'>
											{t("servicesPreview.social.desc")}
										</p>
									</div>
								</div>
							</Card>
							<Card customClass='bg-[#12193a] text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]'>
								<div className='flex h-full flex-col justify-between rounded-xl border border-white/10 p-6 md:p-8'>
									<p className='font-manrope text-sm uppercase tracking-[0.2em] text-brand/90'>
										{t("servicesPreview.kicker")}
									</p>
									<div>
										<h3 className='font-raleway text-2xl font-semibold md:text-3xl'>
											{t("servicesPreview.content.title")}
										</h3>
										<p className='mt-3 font-manrope text-sm leading-relaxed text-white/75 md:text-base'>
											{t("servicesPreview.content.desc")}
										</p>
									</div>
								</div>
							</Card>
							<Card customClass='bg-[#1a2350] text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]'>
								<div className='flex h-full flex-col justify-between rounded-xl border border-white/10 p-6 md:p-8'>
									<p className='font-manrope text-sm uppercase tracking-[0.2em] text-brand/90'>
										{t("servicesPreview.kicker")}
									</p>
									<div>
										<h3 className='font-raleway text-2xl font-semibold md:text-3xl'>
											{t("servicesPreview.strategy.title")}
										</h3>
										<p className='mt-3 font-manrope text-sm leading-relaxed text-white/75 md:text-base'>
											{t("servicesPreview.strategy.desc")}
										</p>
									</div>
								</div>
							</Card>
						</CardSwap>
					</div>
				</motion.div>
			</section>
		</article>
	);
}

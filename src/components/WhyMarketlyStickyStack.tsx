/** @format */

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal";
import { Services } from "./Services";
import { WHY_MARKETLY_ID } from "./SmoothScroll";

export function WhyMarketlyStickyStack() {
	const { t } = useTranslation();

	return (
		<article className='relative z-30 w-full' aria-label={t("subHero.title")}>
			{/* Panel 1 — Why Marketly (white, primary copy) */}
			<section
				id={WHY_MARKETLY_ID}
				className='grid min-h-[100dvh] h-screen w-full place-content-center overflow-hidden bg-cream/25 sticky top-0'>
				<motion.div
					className='relative z-10 mx-auto flex max-h-[min(100dvh,100%)] w-full max-w-[1920px] flex-col justify-center px-5 py-16 md:px-9 md:py-20 lg:px-[137px]'
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.35 }}
					transition={{ duration: 0.55, ease: "easeOut" }}>
					<div className='min-h-0 max-h-full overflow-y-auto overflow-x-hidden hide-scrollbar'>
						<h2 className='font-dynapuff mb-6 text-2xl font-bold tracking-tight text-homerunInk md:text-[30px]'>
							<span className='text-homerunMuted'>
								{t("subHero.heading_prefix")}
							</span>
							<span className='inline-block align-baseline text-homerunBlue'>
								{t("subHero.heading_highlight")}
							</span>
						</h2>
						<ScrollReveal
							baseOpacity={0.1}
							enableBlur
							baseRotation={3}
							blurStrength={4}
							containerClassName='text-homerunInk'
							textClassName='font-manrope tracking-[0.02em] text-homerunMuted'>
							{t("subHero.body")}
						</ScrollReveal>
					</div>
				</motion.div>
			</section>

			{/* Panel 2 — Our Services (rounded top, scrolls inside viewport) */}
			<section className='flex min-h-[100dvh] h-screen w-full flex-col overflow-hidden sticky top-0 rounded-tr-2xl rounded-tl-2xl'>
				<div className='relative flex h-full min-h-0 w-full flex-1 flex-col'>
					<Services stickyPanel />
				</div>
			</section>
		</article>
	);
}

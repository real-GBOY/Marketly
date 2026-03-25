/** @format */

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useTranslation } from "react-i18next";
import { WHY_MARKETLY_ID } from "./SmoothScroll";
import { Header } from "./Header";

// Local assets (replaces Figma-hosted image URLs)
const IMG_GRADIENT = new URL(
	"../../assets/eb591f92-257d-4ea2-b5b2-5e059598dc04.png",
	import.meta.url,
).href;
const IMG_OFFICE = new URL(
	"../../assets/9caf5948-a733-47de-9d1d-70809876d17e.jpg",
	import.meta.url,
).href;

export function Hero() {
	const { t } = useTranslation();
	const lenis = useLenis();

	const scrollToNext = () => {
		const target = document.getElementById(WHY_MARKETLY_ID);
		if (!target) return;

		if (lenis) {
			lenis.scrollTo(target, { duration: 1.2 });
		} else {
			target.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<motion.section
			id='home'
			className='relative min-h-screen scroll-mt-0 bg-navy'
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.7, ease: "easeOut" }}>
			{/* Gradient background layer */}
			<div className='absolute inset-0 flex items-center justify-center overflow-hidden'>
				<div className='h-full w-full scale-y-[-1] rotate-180'>
					<img
						src={IMG_GRADIENT}
						alt=''
						className='h-[106%] w-[107%] max-w-none object-cover object-[center_-3%] pointer-events-none select-none'
					/>
				</div>
			</div>

			{/* Header inside hero */}
			<div className='relative z-10 mx-auto max-w-[1920px] px-5 pt-6 md:px-9 lg:px-[137px]'>
				<Header />
			</div>

			{/* Hero content */}
			<div className='relative z-10 mx-auto max-w-[1920px] px-5 pt-10 pb-0 md:px-9 md:pt-16 lg:px-[137px]'>
				{/* Headline + intro row */}
				<div className='grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-10'>
					<motion.div
						className='pt-2 md:pt-4'
						initial={{ opacity: 0, x: 60 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.6 }}
						transition={{ duration: 0.6, ease: "easeOut" }}>
						<h1 className='font-raleway text-[clamp(2.5rem,6.5vw,88px)] font-bold leading-[0.95] tracking-[-0.05em] text-white'>
							<span className='block'>{t("hero.line1")}</span>
							<span className='block ps-6 md:ps-16'>{t("hero.line2")}</span>
							<span className='block pt-1 md:pt-2'>
								{t("hero.line3Prefix")}{" "}
								<span className='text-brand'>{t("hero.line3Brand")}</span>.
							</span>
						</h1>
					</motion.div>
					<motion.div
						className='font-manrope flex flex-col items-start gap-4 lg:max-w-[280px] lg:pt-24 xl:pt-32'
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.6 }}
						transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}>
						<p className='text-lg leading-[30px] text-blush md:text-xl'>
							{t("hero.intro")}
						</p>
						<button
							type='button'
							className='h-px w-full bg-blush transition hover:opacity-90'
							onClick={scrollToNext}
							aria-label={t("hero.scrollDown")}
						/>
					</motion.div>
				</div>

				{/* Office image + scroll indicator */}
				<div className='relative z-20 mt-8 md:mt-12 lg:mt-16'>
					<motion.div
						className='relative h-[280px] w-full overflow-hidden rounded-2xl md:h-[400px] lg:h-[500px] xl:h-[560px]'
						initial={{ opacity: 0, y: 40, scale: 0.96 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.7, ease: "easeOut" }}>
						<div className='absolute inset-0 bg-black/15' />
						<img
							src={IMG_OFFICE}
							alt={t("hero.officeAlt")}
							className='h-full w-full object-cover object-center'
						/>
					</motion.div>
				</div>
			</div>
		</motion.section>
	);
}

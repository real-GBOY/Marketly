/** @format */

import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useTranslation } from "react-i18next";
import BlueCharIcon from "../icons/blueChar";
import Blue2Icon from "../icons/blue2";
import Blue3Icon from "../icons/blue3";
import { WHY_MARKETLY_ID } from "./SmoothScroll";

export function Hero() {
	const { t } = useTranslation();
	const lenis = useLenis();

	const scrollToId = (id: string) => {
		const target = document.getElementById(id);
		if (!target) return;

		if (lenis) {
			lenis.scrollTo(target, { duration: 1.2 });
		} else {
			target.scrollIntoView({ behavior: "smooth" });
		}
	};

	const scrollToServices = () => scrollToId("services");
	const scrollToNext = () => scrollToId(WHY_MARKETLY_ID);

	return (
		<motion.section
			id='home'
			className='relative z-30 isolate scroll-mt-0 bg-transparent pb-8 pt-8 md:pb-12 md:pt-11'
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.65, ease: "easeOut" }}>
			<div className='mx-auto max-w-[1920px] px-5 md:px-9 lg:px-[137px]'>
				<div className='mx-auto max-w-[min(100%,90rem)] px-5 pb-12 pt-[4.5rem] text-center sm:px-8 sm:pb-14 sm:pt-[5.25rem] md:px-12 md:pb-16 md:pt-28 lg:px-16'>
					<motion.h1
						className='font-dynapuff text-[clamp(2.375rem,6.5vw,4.75rem)] font-bold leading-[1.06] tracking-tight text-homerunInk'
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.55, ease: "easeOut" }}>
						<span className='flex flex-wrap items-end justify-center gap-x-4 gap-y-2 sm:gap-x-5'>
							<BlueCharIcon
								className='h-[4rem] w-auto shrink-0 sm:h-[5rem] md:h-[5.5rem] lg:h-24'
								aria-hidden
							/>
							<span className='pb-1 sm:pb-1.5'>{t("homerunHero.line1")}</span>
							<Blue2Icon
								className='h-[4rem] w-auto shrink-0 sm:h-[5rem] md:h-[5.5rem] lg:h-24'
								aria-hidden
							/>
						</span>
						<span className='mt-2 block sm:mt-2.5'>{t("homerunHero.line2")}</span>
						<span className='mt-2 flex flex-wrap items-end justify-center gap-x-4 gap-y-2 sm:mt-2.5 sm:gap-x-5'>
							<span className='pb-1 sm:pb-1.5'>{t("homerunHero.line3")}</span>
							<Blue3Icon
								className='h-[4rem] w-auto shrink-0 sm:h-[5rem] md:h-[5.5rem] lg:h-24'
								aria-hidden
							/>
						</span>
					</motion.h1>

					<motion.p
						className='font-manrope mx-auto mt-8 max-w-[40rem] text-lg leading-relaxed text-homerunMuted md:mt-10 md:text-xl md:leading-[1.55]'
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}>
						{t("homerunHero.subhead")}
					</motion.p>

					<motion.div
						className='mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row sm:gap-5'
						initial={{ opacity: 0, y: 16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.5 }}
						transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}>
						<button
							type='button'
							onClick={scrollToServices}
							className='font-manrope inline-flex h-14 w-full max-w-[min(100%,20rem)] items-center justify-center rounded-full bg-homerunSecondaryBtn px-8 text-base font-semibold text-homerunInk transition hover:bg-[#dedbd6] sm:w-auto sm:max-w-none md:h-[3.75rem] md:px-10 md:text-lg'>
							{t("homerunHero.demoVideo")}
						</button>
						<button
							type='button'
							onClick={scrollToNext}
							className='font-manrope h-14 w-full max-w-[min(100%,22rem)] rounded-full bg-homerunBlue px-8 text-base font-semibold text-white shadow-sm transition hover:brightness-105 sm:w-auto sm:max-w-none md:h-[3.75rem] md:px-10 md:text-lg'>
							{t("homerunHero.startHiring")}
						</button>
					</motion.div>
				</div>
			</div>
		</motion.section>
	);
}

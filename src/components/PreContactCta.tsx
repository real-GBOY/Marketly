/** @format */

import { useLenis } from "lenis/react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Blue2Icon from "../icons/blue2";
import Blue3Icon from "../icons/blue3";
import BlueCharIcon from "../icons/blueChar";
import BlueMain from "../icons/blueMain";
import Snickey from "../icons/snickey";
import { homePrimaryCta } from "../theme/homepageSections";

/** Same horizontal inset as `homeSectionPad` so the band aligns with section content. */
const layoutInset =
	"mx-auto w-full max-w-[1920px] px-5 md:px-9 lg:px-[137px]";

const iconClass =
	"h-[3.25rem] w-auto shrink-0 sm:h-14 md:h-[3.75rem] drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]";

export function PreContactCta() {
	const { t } = useTranslation();
	const lenis = useLenis();
	const href = t("trialCta.ctaHref");
	const isHash = href.startsWith("#");
	const isInternalRoute = href.startsWith("/") && !href.startsWith("//");
	const targetId = isHash ? href.slice(1) : "";

	const goContact = () => {
		if (!targetId) return;
		const el = document.getElementById(targetId);
		if (!el) return;
		if (lenis) lenis.scrollTo(el, { duration: 1.2 });
		else el.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<section className='bg-transparent' aria-label={t("trialCta.aria")}>
			<div className={`${layoutInset} py-4 md:py-6 lg:py-8`}>
				<div className='relative pt-10 sm:pt-11 md:pt-12'>
					<Snickey
						className='pointer-events-none absolute start-2 top-0 z-10 h-[4rem] w-auto -translate-y-[22%] sm:start-4 sm:h-[4.5rem] md:h-[5rem] md:-translate-y-[18%] drop-shadow-[0_4px_14px_rgba(45,41,38,0.28)]'
						aria-hidden
					/>
					<div
						className='overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-homerunInk text-white shadow-[0_12px_48px_rgba(45,41,38,0.2)] sm:rounded-2xl md:rounded-[2rem]'>
						<div className='px-5 py-14 md:px-8 md:py-16 lg:px-10 lg:py-20'>
							<div className='mx-auto flex max-w-[36rem] flex-col items-center text-center'>
								<div
									className='mb-8 flex items-end justify-center gap-1.5 sm:gap-2 md:gap-3'
									aria-hidden>
									<BlueCharIcon
										className={`${iconClass} translate-y-0`}
									/>
									<Blue2Icon
										className={`${iconClass} translate-y-2 sm:translate-y-2.5`}
									/>
									<Blue3Icon
										className={`${iconClass} -translate-y-1 sm:-translate-y-1.5`}
									/>
									<div
										className='flex h-[3.25rem] w-[3.25rem] shrink-0 translate-y-2.5 items-center justify-center overflow-hidden rounded-2xl bg-white/[0.07] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:h-14 sm:w-14 sm:translate-y-3 md:h-[3.75rem] md:w-[3.75rem]'>
										<BlueMain
											className='h-[42%] w-auto min-w-[120%] max-w-none -translate-x-[8%]'
											aria-hidden
										/>
									</div>
								</div>

								<h2 className='font-dynapuff text-[clamp(1.65rem,5vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-white'>
									{t("trialCta.heading")}
								</h2>

								{isHash ?
									<button
										type='button'
										onClick={goContact}
										className={`mt-8 ${homePrimaryCta}`}>
										{t("trialCta.cta")}
									</button>
								: isInternalRoute ?
									<Link to={href} className={`mt-8 ${homePrimaryCta}`}>
										{t("trialCta.cta")}
									</Link>
								:	<a
										href={href}
										target='_blank'
										rel='noopener noreferrer'
										className={`mt-8 ${homePrimaryCta}`}>
										{t("trialCta.cta")}
									</a>}

								<p className='mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-manrope text-sm text-white/65 md:text-base'>
									<span className='inline-flex items-center gap-1.5'>
										<span className='text-white/80' aria-hidden>
											✓
										</span>
										{t("trialCta.trust1")}
									</span>
									<span className='inline-flex items-center gap-1.5'>
										<span className='text-white/80' aria-hidden>
											✓
										</span>
										{t("trialCta.trust2")}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

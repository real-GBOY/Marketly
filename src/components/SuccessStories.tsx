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

type StoryItem = {
	tag: string;
	title: string;
	lead: string;
	situation: string;
	action: string;
	outcome: string;
};

const STORY_COUNT = 3;

export function SuccessStories() {
	const { t } = useTranslation();

	const items = useMemo<StoryItem[]>(
		() =>
			Array.from({ length: STORY_COUNT }, (_, i) => ({
				tag: t(`successStories.items.${i}.tag`),
				title: t(`successStories.items.${i}.title`),
				lead: t(`successStories.items.${i}.lead`),
				situation: t(`successStories.items.${i}.situation`),
				action: t(`successStories.items.${i}.action`),
				outcome: t(`successStories.items.${i}.outcome`),
			})),
		[t],
	);

	return (
		<section
			id='success-stories'
			className='scroll-mt-24 bg-cream/40'
			aria-label={t("sections.successStories")}>
			<div className={homeSectionPad}>
				<div className='flex flex-col gap-6 md:flex-row md:items-end md:justify-between'>
					<div className='max-w-[760px] rtl:text-right'>
						<div className='flex items-center gap-2 rtl:flex-row'>
							<ArrowDownRight
								className={homeKickerIcon}
								strokeWidth={2}
								aria-hidden
							/>
							<p className={homeKickerText}>{t("successStories.kicker")}</p>
						</div>
						<BoxReveal boxColor='#382260' duration={0.55}>
							<h2 className={`mt-4 ${homeH2}`}>{t("successStories.heading")}</h2>
						</BoxReveal>
						<p className={`mt-5 max-w-[70ch] ${homeBodyText}`}>
							{t("successStories.body")}
						</p>
					</div>

					<div className='flex flex-col gap-3 sm:flex-row sm:items-center md:flex-col md:items-stretch lg:flex-row'>
						<Link
							to='/team'
							className={`${homeSecondaryCta} justify-center rtl:flex-row-reverse`}>
							<span>{t("successStories.ctaTeam")}</span>
							<ArrowRight
								className='size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5'
								aria-hidden
							/>
						</Link>
						<Link
							to='/contact'
							className={`${homeSecondaryCta} justify-center rtl:flex-row-reverse`}>
							<span>{t("successStories.ctaProject")}</span>
							<ArrowRight
								className='size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5'
								aria-hidden
							/>
						</Link>
					</div>
				</div>

				<ol className='mt-14 list-none space-y-10 md:space-y-14' role='list'>
					{items.map((item, storyIndex) => (
						<li key={item.title}>
							<article
								className={`${homeCardBorder} overflow-hidden p-6 md:p-8 lg:p-10`}>
								<div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10'>
									<div className='flex shrink-0 items-baseline gap-3 lg:flex-col lg:gap-1'>
										<span
											className='font-raleway text-4xl font-semibold tabular-nums text-brand/90 md:text-5xl'
											aria-hidden>
											{String(storyIndex + 1).padStart(2, "0")}
										</span>
										<span className='inline-flex w-fit rounded-full bg-brand/10 px-3 py-1 font-manrope text-xs font-semibold uppercase tracking-[0.15em] text-brand'>
											{item.tag}
										</span>
									</div>
									<div className='min-w-0 flex-1 border-t border-dividerOnLight pt-6 lg:border-l lg:border-t-0 lg:ps-10 lg:pt-0 rtl:lg:border-l-0 rtl:lg:border-r rtl:lg:ps-0 rtl:lg:pe-10'>
										<h3 className='font-dynapuff text-2xl font-bold tracking-tight text-homerunInk md:text-3xl'>
											{item.title}
										</h3>
										<p className='mt-4 font-manrope text-base font-medium leading-relaxed text-homerunInk md:text-lg'>
											{item.lead}
										</p>

										<div className='mt-8 grid gap-6 md:gap-8'>
											<div>
												<p className='font-manrope text-xs font-semibold uppercase tracking-[0.12em] text-homerunMuted'>
													{t("successStories.blockSituation")}
												</p>
												<p className='mt-2 font-manrope text-sm leading-relaxed text-textSecondary md:text-[15px]'>
													{item.situation}
												</p>
											</div>
											<div>
												<p className='font-manrope text-xs font-semibold uppercase tracking-[0.12em] text-homerunMuted'>
													{t("successStories.blockAction")}
												</p>
												<p className='mt-2 font-manrope text-sm leading-relaxed text-textSecondary md:text-[15px]'>
													{item.action}
												</p>
											</div>
											<div className='rounded-2xl border border-brand/20 bg-brand/5 p-5 md:p-6'>
												<p className='font-manrope text-xs font-semibold uppercase tracking-[0.12em] text-brand'>
													{t("successStories.blockOutcome")}
												</p>
												<p className='mt-2 font-manrope text-sm font-medium leading-relaxed text-textPrimary md:text-base'>
													{item.outcome}
												</p>
											</div>
										</div>
									</div>
								</div>
							</article>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}

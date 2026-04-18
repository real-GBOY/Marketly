/** @format */

import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
	motion,
	useScroll,
	useTransform,
	type MotionValue,
} from "framer-motion";
import {
	homeBodyText,
	homeCardBorder,
	homeSectionPadAboutIntro,
} from "../theme/homepageSections";
import { BoxReveal } from "./BoxReveal";

// Local assets (replaces remote image URLs)
const IMG_A = new URL(
	"../../assets/9caf5948-a733-47de-9d1d-70809876d17e.jpg",
	import.meta.url,
).href;

type StackCardData = {
	title: string;
	role: string;
	description: string;
	imageUrl: string;
	colorClass: string;
};

function StackCard({
	i,
	title,
	role,
	description,
	imageUrl,
	colorClass,
	progress,
	range,
	targetScale,
	ctaLabel,
}: {
	i: number;
	title: string;
	role: string;
	description: string;
	imageUrl: string;
	colorClass: string;
	progress: MotionValue<number>;
	range: [number, number];
	targetScale: number;
	ctaLabel: string;
}) {
	const container = useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start end", "start start"],
	});

	const imageScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
	const scale = useTransform(progress, range, [1, targetScale]);

	return (
		<div
			ref={container}
			className='sticky top-0 h-[100svh]'
			style={{ zIndex: i }}>
			<div className='mx-auto flex h-full max-w-[1920px] items-center px-5 md:px-9 lg:px-[137px]'>
				<motion.div
					style={{
						scale,
						top: `calc(-5vh + ${i * 22}px)`,
					}}
					className={`relative -top-[18%] w-full origin-top overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_60px_rgba(45,41,38,0.18)] ${colorClass}`}>
					<div className='grid gap-6 p-5 md:grid-cols-[1.1fr_1.2fr] md:items-stretch md:gap-10 md:p-8 lg:grid-cols-[1.2fr_1.35fr]'>
						<div className='relative z-10 flex min-h-0 min-w-0 flex-col justify-between gap-6'>
							<div>
								<p className='font-manrope text-xs font-semibold uppercase tracking-[0.22em] text-white/85'>
									{role}
								</p>
								<h3 className='mt-3 font-raleway text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl'>
									{title}
								</h3>
								<p className='mt-4 max-w-[64ch] font-manrope text-sm leading-relaxed text-white/85 md:text-base lg:text-lg lg:leading-relaxed'>
									{description}
								</p>
							</div>

							<Link
								to='/contact'
								className='inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-manrope text-sm font-semibold text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40'>
								{ctaLabel}
								<span aria-hidden>→</span>
							</Link>
						</div>

						<div className='relative min-h-[220px] overflow-hidden rounded-xl ring-1 ring-white/20 md:min-h-0'>
							<motion.div
								style={{ scale: imageScale }}
								className='h-full min-h-[260px] w-full md:min-h-[320px]'>
								<img
									src={imageUrl}
									alt={title}
									loading='lazy'
									decoding='async'
									className='h-[260px] w-full object-cover md:h-full md:min-h-[320px]'
								/>
							</motion.div>
							{/* Tint ties photo to the same hue as the text column (opaque card bg reads as one block). */}
							<div
								className='pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent'
								aria-hidden
							/>
							<div
								className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10'
								aria-hidden
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}

export function About() {
	const { t } = useTranslation();
	const container = useRef<HTMLElement | null>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ["start start", "end end"],
	});

	const stackCards = useMemo<StackCardData[]>(
		() => [
			{
				title: t("about.team.0.name"),
				role: t("about.team.0.role"),
				description: t("about.team.0.bio"),
				imageUrl: IMG_A,
				colorClass: "bg-[#5a82ff]",
			},
			{
				title: t("about.team.1.name"),
				role: t("about.team.1.role"),
				description: t("about.team.1.bio"),
				imageUrl: IMG_A,
				colorClass: "bg-[#4B73FF]",
			},
			{
				title: t("about.team.2.name"),
				role: t("about.team.2.role"),
				description: t("about.team.2.bio"),
				imageUrl: IMG_A,
				colorClass: "bg-[#382260]",
			},
			{
				title: t("about.team.3.name"),
				role: t("about.team.3.role"),
				description: t("about.team.3.bio"),
				imageUrl: IMG_A,
				colorClass: "bg-[#2D2926]",
			},
		],
		[t],
	);

	return (
		<section
			id='about'
			ref={container}
			className='scroll-mt-24 bg-cream/35 text-charcoal'
			aria-label={t("nav.about")}>
			<div className={homeSectionPadAboutIntro}>
				<BoxReveal boxColor='#382260' duration={0.5}>
					<h2 className='font-dynapuff text-4xl font-bold leading-[1.22] tracking-tight text-homerunInk md:text-5xl md:leading-[1.2] lg:text-6xl lg:leading-[1.2]'>
						<span className='text-homerunBlue'>{t("about.kicker")}</span>
						<span className='mt-4 block text-homerunInk'>
							{t("about.heading")}
						</span>
					</h2>
				</BoxReveal>
				<BoxReveal boxColor='#382260' duration={0.6}>
					<p className={`mt-6 max-w-[68ch] ${homeBodyText}`}>
						{t("about.intro")}
					</p>
				</BoxReveal>

				{/* Requirements.md: Story / Vision / Mission + Our Team container */}
				<div className='mt-10 grid gap-6 lg:grid-cols-3'>
					<div
						className={`${homeCardBorder} p-6 transition-all duration-300 hover:-translate-y-1 hover:border-homerunBlue/25 hover:shadow-[0_16px_40px_rgba(45,41,38,0.1)]`}>
						<h3 className='font-dynapuff text-xl font-bold tracking-tight text-homerunInk md:text-2xl'>
							{t("about.storyTitle")}
						</h3>
						<p className={`mt-3 ${homeBodyText}`}>{t("about.story")}</p>
					</div>
					<div
						className={`${homeCardBorder} p-6 transition-all duration-300 hover:-translate-y-1 hover:border-homerunBlue/25 hover:shadow-[0_16px_40px_rgba(45,41,38,0.1)]`}>
						<h3 className='font-dynapuff text-xl font-bold tracking-tight text-homerunInk md:text-2xl'>
							{t("about.visionTitle")}
						</h3>
						<p className={`mt-3 ${homeBodyText}`}>{t("about.visionBody")}</p>
					</div>
					<div
						className={`${homeCardBorder} p-6 transition-all duration-300 hover:-translate-y-1 hover:border-homerunBlue/25 hover:shadow-[0_16px_40px_rgba(45,41,38,0.1)]`}>
						<h3 className='font-dynapuff text-xl font-bold tracking-tight text-homerunInk md:text-2xl'>
							{t("about.missionTitle")}
						</h3>
						<p className={`mt-3 ${homeBodyText}`}>{t("about.missionBody")}</p>
					</div>
				</div>
			</div>

			<div
				id='team'
				className='relative isolate scroll-mt-24 bg-cream/40 pb-12'>
				{stackCards.map((c, i) => {
					const targetScale = 1 - (stackCards.length - i) * 0.06;
					return (
						<StackCard
							key={i}
							i={i}
							title={c.title}
							role={c.role}
							description={c.description}
							imageUrl={c.imageUrl}
							colorClass={c.colorClass}
							progress={scrollYProgress}
							range={[i * 0.22, 1]}
							targetScale={targetScale}
							ctaLabel={t("contact.kicker")}
						/>
					);
				})}
			</div>
		</section>
	);
}

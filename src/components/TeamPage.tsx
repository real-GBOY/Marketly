/** @format */

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";
import { Footer } from "./Footer";
import { FramedPageShell } from "./FramedPageShell";

type TeamMemberCategory =
	| "strategy"
	| "social"
	| "design"
	| "development"
	| "leadership";

type TeamMember = {
	id: string;
	category: TeamMemberCategory;
	name: string;
	role: string;
	bio: string;
	/** Public URL (`/team/name.jpg`) or absolute image URL */
	photo?: string;
	email?: string;
};

const FILTER_ORDER = [
	"all",
	"leadership",
	"strategy",
	"social",
	"design",
	"development",
] as const;

type FilterId = (typeof FILTER_ORDER)[number];

/** Used when `photo` is missing or fails to load (same keys as locale `id`) */
const TEAM_PHOTO_FALLBACK: Record<string, string> = {

	shrouk: "https://i.postimg.cc/PJPYw0My/sh.jpg",
	amira: "https://i.postimg.cc/5yCj1Jgz/Whats-App-Image-2026-04-04-at-22-30-54.jpg",
	salma: "https://i.postimg.cc/ZR1DskqK/Whats-App-Image-2026-04-04-at-22-30-58.jpg",
	nesma: "https://i.postimg.cc/c4c8XQDQ/Whats-App-Image-2026-04-04-at-22-30-59.jpg",
	ola: "https://i.postimg.cc/WpHytk6v/Whats-App-Image-2026-04-04-at-22-30-59-(1).jpg",
	esraa: "https://i.postimg.cc/VkjZ7Hyw/Whats-App-Image-2026-04-04-at-22-31-00.jpg",
	asmaa: "https://i.postimg.cc/fWcKQS2q/Whats-App-Image-2026-04-04-at-22-31-10.jpg",
	roqaya: "https://i.postimg.cc/SQHp35Ps/Whats-App-Image-2026-04-04-at-22-31-16.jpg",
	sanaa: "https://i.postimg.cc/QMNLcrFP/Whats-App-Image-2026-04-04-at-22-31-17.jpg",
	maibel: "https://i.postimg.cc/FRq2tdTQ/Whats-App-Image-2026-04-04-at-23-13-37.jpg",


};

function teamMemberPhotoSrc(member: TeamMember): string {
	if (member.photo?.trim()) return member.photo.trim();
	return TEAM_PHOTO_FALLBACK[member.id] ?? TEAM_PHOTO_FALLBACK.jordan;
}

export function TeamPage() {
	const { t } = useTranslation();
	const [active, setActive] = useState<FilterId>("all");

	const members = useMemo(() => {
		const list = t("teamPage.members", {
			returnObjects: true,
		}) as TeamMember[];
		return Array.isArray(list) ? list : [];
	}, [t]);

	const filtered =
		active === "all" ?
			members
		:	members.filter((m) => m.category === active);

	return (
		<FramedPageShell>
			<div className='text-charcoal'>
			<section className='relative overflow-hidden rounded-b-3xl bg-navy pb-10 md:rounded-b-[2rem] md:pb-14'>
				<div className='absolute inset-0 flex items-center justify-center overflow-hidden opacity-90'>
					<div className='h-full w-full scale-y-[-1] rotate-180 blur-[1px]'>
						<img
							src={new URL(
								"../../assets/eb591f92-257d-4ea2-b5b2-5e059598dc04.png",
								import.meta.url,
							).href}
							alt=''
							className='h-[106%] w-[107%] max-w-none object-cover object-[center_-3%] pointer-events-none select-none'
						/>
					</div>
				</div>
				<div className='relative z-10 mx-auto max-w-[1920px] px-5 pb-2 pt-16 text-center sm:pt-[4.5rem] md:px-9 md:pb-4 md:pt-[5.25rem] lg:px-[137px]'>
					<p className='font-manrope text-xs font-semibold uppercase tracking-[0.22em] text-brand'>
						{t("teamPage.kicker")}
					</p>
					<h1 className='mt-3 font-raleway text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl'>
						{t("teamPage.heading")}
					</h1>
					<p className='mx-auto mt-4 max-w-[68ch] font-manrope text-base leading-relaxed text-white/80 md:text-lg'>
						{t("teamPage.subtitle")}
					</p>
				</div>
			</section>

			<main
				className='relative mx-auto max-w-[1920px] px-5 py-12 md:px-9 md:py-16 lg:px-[137px]'
				aria-label={t("teamPage.mainAria")}>
				<div
					className='flex flex-wrap items-center justify-center gap-2 md:gap-3'
					role='tablist'
					aria-label={t("teamPage.filterAria")}>
					{FILTER_ORDER.map((id) => {
						const isOn = active === id;
						const labelKey =
							id === "all" ? "teamPage.filters.all" : (
								`teamPage.filters.${id}`
							);
						return (
						<></>
						);
					})}
				</div>


				<ul className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3'>
					{filtered.map((member) => (
						<motion.li
							key={member.id}
							layout
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.35, ease: "easeOut" }}>
							<article className='group flex h-full flex-col overflow-hidden rounded-2xl border border-dividerOnLight bg-surface shadow-[0_6px_28px_rgba(2,6,23,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-[0_16px_40px_rgba(2,6,23,0.1)]'>
								<div className='relative aspect-square w-full overflow-hidden bg-navy/10'>
									<img
										src={teamMemberPhotoSrc(member)}
										alt={member.name}
										onError={(event) => {
											const fallback =
												TEAM_PHOTO_FALLBACK[member.id] ??
												TEAM_PHOTO_FALLBACK.jordan;
											if (event.currentTarget.src !== fallback) {
												event.currentTarget.src = fallback;
											}
										}}
										className='h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]'
									/>
								</div>
								<div className='flex flex-1 flex-col gap-4 p-5 md:p-6'>
									<div>
									
										<h2 className='mt-1 font-raleway text-lg font-semibold leading-tight tracking-tight text-textPrimary md:text-xl lg:text-2xl'>
											{member.name}
										</h2>
										<p className='mt-1 font-manrope text-sm font-medium text-textSecondary'>
											{member.role}
										</p>
									</div>
									<p className='flex-1 font-manrope text-sm leading-relaxed text-textSecondary md:text-[15px]'>
										{member.bio}
									</p>
								
								</div>
							</article>
						</motion.li>
					))}
				</ul>
			</main>

			<Footer />
			</div>
		</FramedPageShell>
	);
}

/** @format */

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail } from "lucide-react";
import { Footer } from "./Footer";
import { Header } from "./Header";

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
	jordan:
		"https://i.postimg.cc/t4TDRqmd/gb.jpg",
	sam: "https://i.postimg.cc/t4TDRqmd/gb.jpg",
	morgan: "https://i.postimg.cc/t4TDRqmd/gb.jpg",
	casey: "https://i.postimg.cc/t4TDRqmd/gb.jpg",
	riley: "https://i.postimg.cc/t4TDRqmd/gb.jpg",
	taylor: "https://i.postimg.cc/t4TDRqmd/gb.jpg",
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
		<div className='min-h-screen bg-white text-charcoal'>
			<section className='relative bg-navy pb-10 md:pb-14'>
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
				<div className='relative z-10 mx-auto max-w-[1920px] px-5 pt-6 md:px-9 lg:px-[137px]'>
					<Header />
				</div>
				<div className='relative z-10 mx-auto max-w-[1920px] px-5 pt-10 text-center md:px-9 md:pt-14 lg:px-[137px]'>
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
							<button
								key={id}
								type='button'
								role='tab'
								aria-selected={isOn}
								onClick={() => setActive(id)}
								className={`rounded-full border px-4 py-2 font-manrope text-sm font-semibold transition md:px-5 md:text-[15px] ${
									isOn ?
										"border-brand bg-brand text-navy shadow-sm"
									:	"border-dividerOnLight bg-surface text-textSecondary hover:border-brand/40 hover:text-textPrimary"
								}`}>
								{t(labelKey)}
							</button>
						);
					})}
				</div>

				<p className='mt-8 font-manrope text-sm text-textSecondary'>
					{t("teamPage.resultsCount", { count: filtered.length })}
				</p>

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
										<p className='font-manrope text-xs font-semibold uppercase tracking-wider text-brand'>
											{t(`teamPage.filters.${member.category}`)}
										</p>
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
									{member.email ?
										<a
											href={`mailto:${member.email}`}
											className='inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-dividerOnLight px-3 py-2 font-manrope text-sm font-semibold text-textPrimary transition hover:border-brand/50 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50'>
											<Mail className='size-4 shrink-0' aria-hidden />
											<span className='truncate'>{member.email}</span>
										</a>
									:	null}
								</div>
							</article>
						</motion.li>
					))}
				</ul>
			</main>

			<Footer />
		</div>
	);
}

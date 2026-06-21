/** @format */

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Footer } from "./Footer";
import { FramedPageShell } from "./FramedPageShell";
import { Seo } from "./Seo";

type TeamMember = {
	id: string;
	category: string;
	name: string;
	role: string;
	bio: string;
	/** Public URL (`/team/name.jpg`) or absolute image URL */
	photo?: string;
	email?: string;
};

/** Used when `photo` is missing or fails to load (same keys as locale `id`) */
const TEAM_PHOTO_FALLBACK: Record<string, string> = {
	shrouk:
		"https://i.postimg.cc/cLFnSN1J/Whats-App-Image-2026-05-08-at-10-48-51.jpg",
	amira:
		"https://i.postimg.cc/ZnWfrL7z/Whats-App-Image-2026-05-08-at-10-19-10-(1).jpg",
	salma:
		"https://i.postimg.cc/66ZCF37T/Whats-App-Image-2026-05-11-at-02-41-34.jpg",
	nesma:
		"https://i.postimg.cc/mZSZqygw/Whats-App-Image-2026-05-08-at-10-19-09-(1).jpg",
	ola: "https://i.postimg.cc/Dztmvv9F/Whats-App-Image-2026-05-08-at-10-48-52.jpg",
	esraa:
		"https://i.postimg.cc/hPFw9kBX/Whats-App-Image-2026-05-08-at-10-48-50.jpg",
	asmaa:
		"https://i.postimg.cc/mDJnpq15/Whats-App-Image-2026-05-08-at-10-19-10-(2).jpg",
	roqaya:
		"https://i.postimg.cc/PqGkNC5V/Whats-App-Image-2026-05-08-at-10-19-09.jpg",
	sanaa:
		"https://i.postimg.cc/vHqY8891/Whats-App-Image-2026-05-08-at-10-19-10.jpg",
	maibel:
		"https://i.postimg.cc/gjcpd12P/Whats-App-Image-2026-05-08-at-10-18-55.jpg",
};

function teamMemberPhotoSrc(member: TeamMember): string {
	if (member.photo?.trim()) return member.photo.trim();
	return TEAM_PHOTO_FALLBACK[member.id] ?? TEAM_PHOTO_FALLBACK.jordan;
}

export function TeamPage() {
	const { t } = useTranslation();

	const members = useMemo(() => {
		const list = t("teamPage.members", {
			returnObjects: true,
		}) as TeamMember[];
		return Array.isArray(list) ? list : [];
	}, [t]);

	return (
		<FramedPageShell>
			<Seo
				title={t("seo.team.title")}
				description={t("seo.team.description")}
				path='/team'
			/>
			<div className='text-charcoal'>
				<section className='relative overflow-hidden rounded-b-3xl bg-navy pb-10 md:rounded-b-[2rem] md:pb-14'>
					<div className='absolute inset-0 flex items-center justify-center overflow-hidden opacity-90'>
						<div className='h-full w-full scale-y-[-1] rotate-180 blur-[1px]'>
							<img
								src={
									new URL(
										"../../assets/eb591f92-257d-4ea2-b5b2-5e059598dc04.png",
										import.meta.url,
									).href
								}
								alt=''
								className='h-[106%] w-[107%] max-w-none object-cover object-[center_-3%] pointer-events-none select-none'
							/>
						</div>
					</div>
					<div className='relative z-10 mx-auto max-w-[1920px] px-5 pb-2 pt-16 text-center sm:pt-[4.5rem] md:px-9 md:pb-4 md:pt-[5.25rem] lg:px-[137px]'>
						<h1 className='font-raleway text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl'>
							{t("teamPage.heading")}
						</h1>
						<p className='mx-auto mt-4 max-w-[68ch] font-manrope text-base leading-relaxed text-white md:text-lg'>
							{t("teamPage.subtitle")}
						</p>
					</div>
				</section>

npm				<section
					className='relative mx-auto max-w-[1920px] px-5 py-12 md:px-9 md:py-16 lg:px-[137px]'
					aria-label={t("teamPage.mainAria")}>
					<ul className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
						{members.map((member) => (
							<motion.li
								key={member.id}
								layout
								initial={{ opacity: 0, y: 16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35, ease: "easeOut" }}>
								<article className='group relative aspect-square w-full overflow-hidden rounded-2xl border border-dividerOnLight bg-navy/10 shadow-[0_6px_28px_rgba(2,6,23,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-[0_16px_40px_rgba(2,6,23,0.1)]'>
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
										className='absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]'
									/>
									<div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-3 pt-10'>
										<h2 className='font-raleway text-sm font-semibold leading-tight tracking-tight text-white md:text-base'>
											{member.name}
										</h2>
										<p className='mt-0.5 font-manrope text-xs font-medium text-white'>
											{member.role}
										</p>
									</div>
								</article>
							</motion.li>
						))}
					</ul>
				</section>

				<Footer />
			</div>
		</FramedPageShell>
	);
}

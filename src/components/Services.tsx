/** @format */

import { motion } from "framer-motion";
import {
	ArrowDownRight,
	Palette,
	PenLine,
	Plus,
	Search,
	Share2,
	Target,
	type LucideIcon,
} from "lucide-react";
import { useId, useState } from "react";
import { useTranslation } from "react-i18next";

type ServiceKey = "social" | "content" | "branding" | "seo" | "strategy";

const serviceConfig: {
	key: ServiceKey;
	icon: LucideIcon;
	pillClass: string;
}[] = [
	{
		key: "social",
		icon: Share2,
		pillClass:
			"bg-gradient-to-br from-slate-700 via-indigo-900/80 to-slate-900",
	},
	{
		key: "content",
		icon: PenLine,
		pillClass:
			"bg-gradient-to-br from-emerald-900/80 via-teal-800/60 to-slate-900",
	},
	{
		key: "branding",
		icon: Palette,
		pillClass:
			"bg-gradient-to-br from-fuchsia-900/50 via-violet-900/70 to-slate-900",
	},
	{
		key: "seo",
		icon: Search,
		pillClass:
			"bg-gradient-to-br from-rose-900/60 via-orange-900/40 to-slate-900",
	},
	{
		key: "strategy",
		icon: Target,
		pillClass: "bg-gradient-to-br from-cyan-900/50 via-sky-900/50 to-slate-900",
	},
];

type ServicesProps = {
	/** When true, section fills a sticky stack panel and scrolls internally. */
	stickyPanel?: boolean;
};

export function Services({ stickyPanel = false }: ServicesProps) {
	const { t } = useTranslation();
	const uid = useId();
	const [openKey, setOpenKey] = useState<ServiceKey | null>(null);

	const toggle = (key: ServiceKey) => {
		setOpenKey((prev) => (prev === key ? null : key));
	};

	const inner = (
			<div
				className={`mx-auto max-w-[1920px] px-5 md:px-9 lg:px-[137px] ${
					stickyPanel ?
						"pb-12 pt-10 md:pb-16 md:pt-12 lg:pb-20 lg:pt-14"
					:	"pb-20 pt-16 md:pb-24 md:pt-20 lg:pb-28 lg:pt-24"
				}`}>
				<motion.div
					className='mb-10 flex flex-col gap-2 md:mb-14'
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.4 }}
					transition={{ duration: 0.5, ease: "easeOut" }}>
					<div className='flex items-center gap-2 text-textSecondary'>
						<ArrowDownRight
							className='size-8 shrink-0 text-brand'
							strokeWidth={2}
							aria-hidden
						/>
						<p className='font-manrope text-sm font-semibold uppercase tracking-[0.2em] text-textSecondary'>
							{t("servicesPreview.kicker")}
						</p>
					</div>
					<div className='flex flex-wrap items-end gap-3'>
						<h2
							id='services-heading'
							className='font-raleway text-3xl font-semibold tracking-tight text-textPrimary md:text-4xl lg:text-[2.75rem] lg:leading-tight'>
							{t("servicesPreview.heading")}
						</h2>
					</div>
				</motion.div>

				<ul className='flex flex-col'>
					{serviceConfig.map(({ key, icon: Icon, pillClass }, index) => {
						const isOpen = openKey === key;
						const title = t(`servicesPreview.${key}.title`);

						return (
							<motion.li
								key={key}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, amount: 0.35 }}
								transition={{
									duration: 0.45,
									ease: "easeOut",
									delay: index * 0.05,
								}}
								className='border-b-[0.5px] border-dividerOnLight py-8 first:pt-2 md:py-10'>
								<button
									type='button'
									id={`${uid}-trigger-${key}`}
									aria-expanded={isOpen}
									aria-controls={`${uid}-panel-${key}`}
									aria-label={
										isOpen ?
											t("servicesPreview.collapseLabel", { name: title })
										:	t("servicesPreview.expandLabel", { name: title })
									}
									onClick={() => toggle(key)}
									className='flex w-full cursor-pointer flex-col gap-5 text-left [-webkit-tap-highlight-color:transparent] sm:flex-row sm:items-center sm:justify-between sm:gap-8'>
									<div className='flex min-w-0 flex-1 flex-row items-start gap-4 sm:items-center sm:gap-8'>
										<div
											className={`relative flex h-11 w-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl ring-1 ring-black/5 sm:h-10 ${pillClass}`}>
											<Icon
												className='size-5 text-white/95'
												strokeWidth={2}
												aria-hidden
											/>
										</div>
										<div className='min-w-0 flex-1'>
											<h3 className='font-raleway text-2xl font-semibold tracking-tight text-textPrimary md:text-[1.75rem] md:leading-tight lg:text-[2.125rem]'>
												{title}
											</h3>
										</div>
									</div>
									<div className='flex shrink-0 items-center justify-center self-start pt-1 sm:self-center'>
										<Plus
											className={`size-9 text-textPrimary transition-transform duration-300 ease-out sm:size-10 ${
												isOpen ? "rotate-45" : ""
											}`}
											strokeWidth={1.25}
											aria-hidden
										/>
									</div>
								</button>

								<motion.div
									id={`${uid}-panel-${key}`}
									role='region'
									aria-labelledby={`${uid}-trigger-${key}`}
									aria-hidden={!isOpen}
									initial={false}
									animate={{
										height: isOpen ? "auto" : 0,
										opacity: isOpen ? 1 : 0,
									}}
									transition={{
										duration: 0.35,
										ease: [0.4, 0, 0.2, 1],
									}}
									className='overflow-hidden'>
									<div className='pt-4 sm:ps-[10rem]'>
										<p className='font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
											{t(`servicesPreview.${key}.desc`)}
										</p>
										<p className='mt-3 font-manrope text-sm leading-relaxed text-textSecondary/80 md:text-base'>
											{t(`servicesPreview.${key}.detail`)}
										</p>
									</div>
								</motion.div>
							</motion.li>
						);
					})}
				</ul>
			</div>
	);

	if (stickyPanel) {
		return (
			<section
				id='services'
				className='relative flex h-full min-h-0 flex-col scroll-mt-24 bg-surface'
				aria-labelledby='services-heading'>
				<div className='min-h-0 flex-1 overflow-y-auto overscroll-y-contain [scrollbar-gutter:stable]'>
					{inner}
				</div>
			</section>
		);
	}

	return (
		<section
			id='services'
			className='scroll-mt-24 bg-surface'
			aria-labelledby='services-heading'>
			{inner}
		</section>
	);
}

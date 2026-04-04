/** @format */

import {
	ArrowDownRight,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
} from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
	homeBodyText,
	homeH2,
	homeKickerIcon,
	homeKickerText,
	homeSectionPad,
} from "../theme/homepageSections";
import { BoxReveal } from "./BoxReveal";
import { ContactForm } from "./ContactForm";

export function Contact() {
	const { t } = useTranslation();

	const emailHref = useMemo(() => {
		const email = t("contact.info.emailValue");
		return email ? `mailto:${email}` : "mailto:";
	}, [t]);

	const phoneHref = useMemo(() => {
		const phone = t("contact.info.phoneValue");
		return phone ? `tel:${phone.replace(/\s+/g, "")}` : "tel:";
	}, [t]);

	const whatsappHref = useMemo(() => {
		const whatsapp = t("contact.info.whatsappValue");
		return whatsapp ?
				`https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`
			:	"https://wa.me/";
	}, [t]);

	return (
		<section
			id='contact'
			className='scroll-mt-24 bg-white'
			aria-label={t("nav.contact")}>
			<div className={homeSectionPad}>
				<div className='grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start'>
					<div className='max-w-[860px]'>
						<div className='flex items-center gap-2'>
							<ArrowDownRight
								className={homeKickerIcon}
								strokeWidth={2}
								aria-hidden
							/>
							<p className={homeKickerText}>{t("contact.kicker")}</p>
						</div>
						<BoxReveal boxColor='#382260' duration={0.55}>
							<h2 className={`mt-4 ${homeH2}`}>{t("contact.heading")}</h2>
						</BoxReveal>
						<p className={`mt-6 ${homeBodyText}`}>{t("contact.body")}</p>

						<ContactForm />
					</div>

					<aside className='space-y-6'>
						<div className='rounded-3xl border border-black/[0.06] bg-cream/25 p-6 shadow-[0_12px_36px_rgba(45,41,38,0.06)]'>
							<h3 className='font-dynapuff text-xl font-bold tracking-tight text-homerunInk'>
								{t("contact.info.heading")}
							</h3>

							<ul className='mt-5 space-y-4'>
								<li className='flex items-start gap-3 rounded-xl bg-white/80 p-3'>
									<Mail
										className='mt-0.5 size-5 shrink-0 text-homerunBlue'
										aria-hidden
									/>
									<div className='min-w-0'>
										<p className='font-manrope text-sm font-semibold text-textPrimary'>
											{t("contact.info.email")}
										</p>
										<a
											href={emailHref}
											className='font-manrope text-sm text-textSecondary underline-offset-4 hover:underline'>
											{t("contact.info.emailValue")}
										</a>
									</div>
								</li>
								<li className='flex items-start gap-3 rounded-xl bg-white/80 p-3'>
									<Phone
										className='mt-0.5 size-5 shrink-0 text-homerunBlue'
										aria-hidden
									/>
									<div className='min-w-0'>
										<p className='font-manrope text-sm font-semibold text-textPrimary'>
											{t("contact.info.phone")}
										</p>
										<a
											href={phoneHref}
											className='font-manrope text-sm text-textSecondary underline-offset-4 hover:underline'>
											{t("contact.info.phoneValue")}
										</a>
									</div>
								</li>
								<li className='flex items-start gap-3 rounded-xl bg-white/80 p-3'>
									<MessageCircle
										className='mt-0.5 size-5 shrink-0 text-homerunBlue'
										aria-hidden
									/>
									<div className='min-w-0'>
										<p className='font-manrope text-sm font-semibold text-textPrimary'>
											{t("contact.info.whatsapp")}
										</p>
										<a
											href={whatsappHref}
											target='_blank'
											rel='noreferrer'
											className='font-manrope text-sm text-textSecondary underline-offset-4 hover:underline'>
											{t("contact.info.whatsappValue")}
										</a>
									</div>
								</li>
								<li className='flex items-start gap-3 rounded-xl bg-white/80 p-3'>
									<MapPin
										className='mt-0.5 size-5 shrink-0 text-homerunBlue'
										aria-hidden
									/>
									<div className='min-w-0'>
										<p className='font-manrope text-sm font-semibold text-textPrimary'>
											{t("contact.info.location")}
										</p>
										<p className='font-manrope text-sm text-textSecondary'>
											{t("contact.info.locationValue")}
										</p>
									</div>
								</li>
							</ul>
						</div>

						<div className='rounded-3xl border border-black/[0.06] bg-cream/25 p-6 shadow-[0_12px_36px_rgba(45,41,38,0.06)]'>
							<h3 className='font-dynapuff text-xl font-bold tracking-tight text-homerunInk'>
								{t("contact.social.heading")}
							</h3>
							<div className='mt-5 flex flex-wrap gap-3'>
								<a
									href={t("contact.social.instagramHref")}
									target='_blank'
									rel='noreferrer'
									className='inline-flex h-10 items-center justify-center rounded-full border border-homerunMuted/25 bg-homerunSecondaryBtn px-4 font-manrope text-sm font-semibold text-homerunInk transition hover:bg-[#dedbd6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-homerunBlue/40'>
									{t("contact.social.instagram")}
								</a>
								<a
									href={t("contact.social.linkedinHref")}
									target='_blank'
									rel='noreferrer'
									className='inline-flex h-10 items-center justify-center rounded-full border border-homerunMuted/25 bg-homerunSecondaryBtn px-4 font-manrope text-sm font-semibold text-homerunInk transition hover:bg-[#dedbd6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-homerunBlue/40'>
									{t("contact.social.linkedin")}
								</a>
								<a
									href={t("contact.social.facebookHref")}
									target='_blank'
									rel='noreferrer'
									className='inline-flex h-10 items-center justify-center rounded-full border border-homerunMuted/25 bg-homerunSecondaryBtn px-4 font-manrope text-sm font-semibold text-homerunInk transition hover:bg-[#dedbd6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-homerunBlue/40'>
									{t("contact.social.facebook")}
								</a>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
}

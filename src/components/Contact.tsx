/** @format */

import {
	ArrowDownRight,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BoxReveal } from "./BoxReveal";

export function Contact() {
	const { t } = useTranslation();
	const [status, setStatus] = useState<"idle" | "success">("idle");
	const [form, setForm] = useState({ name: "", email: "", message: "" });

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
			<div className='mx-auto max-w-[1920px] px-5 py-16 md:px-9 md:py-24 lg:px-[137px]'>
				<div className='grid gap-10 lg:grid-cols-[1fr_420px] lg:items-start'>
					<div className='max-w-[860px]'>
						<div className='flex items-center gap-2 text-textSecondary'>
							<ArrowDownRight
								className='size-8 shrink-0 text-brand'
								strokeWidth={2}
								aria-hidden
							/>
							<p className='font-manrope text-sm font-semibold uppercase tracking-[0.2em] text-textSecondary'>
								{t("contact.kicker")}
							</p>
						</div>
						<BoxReveal boxColor='#b5ed3d' duration={0.55}>
							<h2 className='mt-4 font-raleway text-3xl font-semibold tracking-tight text-textPrimary md:text-4xl lg:text-5xl'>
								{t("contact.heading")}
							</h2>
						</BoxReveal>
						<p className='mt-6 font-manrope text-sm leading-relaxed text-textSecondary md:text-base'>
							{t("contact.body")}
						</p>

						<form
							className='mt-10 grid gap-5 rounded-3xl border border-dividerOnLight bg-gradient-to-b from-white to-slate-50/60 p-6 shadow-[0_14px_44px_rgba(2,6,23,0.08)] md:p-8'
							onSubmit={(e) => {
								e.preventDefault();
								setStatus("success");
							}}>
							<div className='grid gap-4 md:grid-cols-2'>
								<label className='grid gap-2'>
									<span className='font-manrope text-sm font-semibold text-textPrimary/90'>
										{t("contact.form.name")}
									</span>
									<input
										value={form.name}
										onChange={(e) => {
											setStatus("idle");
											setForm((p) => ({ ...p, name: e.target.value }));
										}}
										required
										autoComplete='name'
										placeholder={t("contact.form.name")}
										className='h-12 rounded-xl border border-dividerOnLight bg-white px-4 font-manrope text-sm text-textPrimary shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition placeholder:text-textSecondary/50 hover:border-black/20 focus:border-brand/60 focus:ring-4 focus:ring-brand/20'
									/>
								</label>
								<label className='grid gap-2'>
									<span className='font-manrope text-sm font-semibold text-textPrimary/90'>
										{t("contact.form.email")}
									</span>
									<input
										type='email'
										value={form.email}
										onChange={(e) => {
											setStatus("idle");
											setForm((p) => ({ ...p, email: e.target.value }));
										}}
										required
										autoComplete='email'
										placeholder='name@company.com'
										className='h-12 rounded-xl border border-dividerOnLight bg-white px-4 font-manrope text-sm text-textPrimary shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition placeholder:text-textSecondary/50 hover:border-black/20 focus:border-brand/60 focus:ring-4 focus:ring-brand/20'
									/>
								</label>
							</div>

							<label className='grid gap-2'>
								<span className='font-manrope text-sm font-semibold text-textPrimary/90'>
									{t("contact.form.message")}
								</span>
								<textarea
									value={form.message}
									onChange={(e) => {
										setStatus("idle");
										setForm((p) => ({ ...p, message: e.target.value }));
									}}
									required
									rows={5}
									placeholder={t("contact.form.message")}
									className='min-h-[150px] resize-y rounded-xl border border-dividerOnLight bg-white px-4 py-3 font-manrope text-sm text-textPrimary shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition placeholder:text-textSecondary/50 hover:border-black/20 focus:border-brand/60 focus:ring-4 focus:ring-brand/20'
								/>
							</label>

							<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
								{status === "success" && (
									<p
										role='status'
										className='rounded-full bg-brand/10 px-4 py-2 font-manrope text-sm font-medium text-textPrimary'>
										{t("contact.form.success")}
									</p>
								)}
								<button
									type='submit'
									className='inline-flex h-12 items-center justify-center rounded-full bg-navy px-6 font-manrope text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#111a3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/70 sm:ms-auto'>
									{t("contact.form.submit")}
								</button>
							</div>
						</form>
					</div>

					<aside className='space-y-6'>
						<div className='rounded-3xl border border-dividerOnLight bg-surface p-6 shadow-[0_12px_36px_rgba(2,6,23,0.06)]'>
							<h3 className='font-raleway text-xl font-semibold tracking-tight text-textPrimary'>
								{t("contact.info.heading")}
							</h3>

							<ul className='mt-5 space-y-4'>
								<li className='flex items-start gap-3 rounded-xl bg-slate-50/70 p-3'>
									<Mail
										className='mt-0.5 size-5 text-brand shrink-0'
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
								<li className='flex items-start gap-3 rounded-xl bg-slate-50/70 p-3'>
									<Phone
										className='mt-0.5 size-5 text-brand shrink-0'
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
								<li className='flex items-start gap-3 rounded-xl bg-slate-50/70 p-3'>
									<MessageCircle
										className='mt-0.5 size-5 text-brand shrink-0'
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
								<li className='flex items-start gap-3 rounded-xl bg-slate-50/70 p-3'>
									<MapPin
										className='mt-0.5 size-5 text-brand shrink-0'
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

						<div className='rounded-3xl border border-dividerOnLight bg-surface p-6 shadow-[0_12px_36px_rgba(2,6,23,0.06)]'>
							<h3 className='font-raleway text-xl font-semibold tracking-tight text-textPrimary'>
								{t("contact.social.heading")}
							</h3>
							<div className='mt-5 flex flex-wrap gap-3'>
								<a
									href={t("contact.social.instagramHref")}
									target='_blank'
									rel='noreferrer'
									className='inline-flex h-10 items-center justify-center rounded-full border border-dividerOnLight bg-white px-4 font-manrope text-sm font-semibold text-textPrimary transition hover:border-brand/50 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'>
									{t("contact.social.instagram")}
								</a>
								<a
									href={t("contact.social.linkedinHref")}
									target='_blank'
									rel='noreferrer'
									className='inline-flex h-10 items-center justify-center rounded-full border border-dividerOnLight bg-white px-4 font-manrope text-sm font-semibold text-textPrimary transition hover:border-brand/50 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'>
									{t("contact.social.linkedin")}
								</a>
								<a
									href={t("contact.social.facebookHref")}
									target='_blank'
									rel='noreferrer'
									className='inline-flex h-10 items-center justify-center rounded-full border border-dividerOnLight bg-white px-4 font-manrope text-sm font-semibold text-textPrimary transition hover:border-brand/50 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60'>
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

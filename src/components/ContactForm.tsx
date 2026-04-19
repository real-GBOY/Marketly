/** @format */

import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { homePrimaryCta } from "../theme/homepageSections";
import { BorderBeam } from "./ui/border-beam";

export function ContactForm() {
	const { t } = useTranslation();
	const [status, setStatus] = useState<
		"idle" | "submitting" | "success" | "error"
	>("idle");
	const [form, setForm] = useState({ name: "", email: "", message: "" });
	const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("submitting");

		if (!accessKey) {
			setStatus("error");
			return;
		}

		const payload = new FormData();
		payload.append("access_key", accessKey);
		payload.append("name", form.name);
		payload.append("email", form.email);
		payload.append("message", form.message);
		payload.append("subject", "New contact message from Marketly website");
		payload.append("from_name", "Marketly Website");
		// Honeypot field. If a bot fills this, Web3Forms rejects it.
		payload.append("botcheck", "");

		try {
			const response = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				body: payload,
			});
			const data: { success?: boolean } = await response.json();

			if (response.ok && data.success) {
				setStatus("success");
				setForm({ name: "", email: "", message: "" });
				return;
			}
		} catch {
			// handled below by setting generic error state
		}

		setStatus("error");
	};

	return (
		<form
			className='relative mt-10 grid gap-5 overflow-hidden rounded-3xl border border-black/[0.06] bg-gradient-to-b from-white to-cream/40 p-6 shadow-[0_14px_44px_rgba(45,41,38,0.08)] md:p-8'
			onSubmit={onSubmit}>
			<div className='relative z-10 grid gap-5'>
				<input
					type='checkbox'
					name='botcheck'
					className='hidden'
					tabIndex={-1}
					autoComplete='off'
				/>
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
					{status === "error" && (
						<p
							role='status'
							className='rounded-full bg-red-500/10 px-4 py-2 font-manrope text-sm font-medium text-red-700'>
							{t("contact.form.error")}
						</p>
					)}
					<button
						type='submit'
						disabled={status === "submitting"}
						className={`${homePrimaryCta} sm:ms-auto`}>
						{status === "submitting"
							? t("contact.form.submitting")
							: t("contact.form.submit")}
					</button>
				</div>
			</div>

			<BorderBeam
				duration={8}
				size={100}
				className='z-0'
				initialOffset={-10}
				colorFrom='#382260'
				colorTo='#14B8A6'
			/>
		</form>
	);
}

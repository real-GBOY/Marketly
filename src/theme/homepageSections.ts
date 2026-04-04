/** @format */

/**
 * Homepage-only layout + typography tokens so sections match the Homerun-style hero
 * (cream shell, homerunInk/Blue, DynaPuff headlines, rounded CTAs).
 */
export const homeSectionPad =
	"mx-auto max-w-[1920px] px-5 py-16 md:px-9 md:py-24 lg:px-[137px] lg:py-28";

export const homeSectionPadAboutIntro =
	"relative mx-auto max-w-[1920px] px-5 pb-16 pt-16 md:px-9 md:pb-24 md:pt-24 lg:px-[137px]";

export const homeH2 = "font-dynapuff text-3xl font-bold tracking-tight text-homerunInk md:text-4xl lg:text-5xl";

export const homeKickerIcon = "size-8 shrink-0 text-homerunBlue";

export const homeKickerText =
	"font-manrope text-sm font-semibold uppercase tracking-[0.2em] text-homerunMuted";

export const homeBodyText =
	"font-manrope text-sm leading-relaxed text-homerunMuted md:text-base";

/** Matches Hero secondary CTA (outline / neutral pill). */
export const homeSecondaryCta =
	"group inline-flex h-12 min-h-12 items-center justify-center gap-3 rounded-full border border-homerunMuted/25 bg-homerunSecondaryBtn px-5 font-manrope text-sm font-semibold text-homerunInk transition hover:bg-[#dedbd6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-homerunBlue/40";

/** Matches Hero primary CTA. */
export const homePrimaryCta =
	"inline-flex h-12 min-h-12 items-center justify-center rounded-full bg-homerunBlue px-6 font-manrope text-sm font-semibold text-white shadow-sm transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-homerunBlue/50";

export const homeCardBorder =
	"rounded-2xl border border-black/[0.06] bg-white shadow-[0_6px_28px_rgba(45,41,38,0.06)]";

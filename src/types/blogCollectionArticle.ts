/** @format */

export type ShoroukStat = { label: string; value: string };
export type ShoroukTrigger = { title: string; body: string };

export type ShoroukArticleSlice = {
	anchor: string;
	category: string;
	title: string;
	metaLine: string;
	intro: string;
	stats: ShoroukStat[];
	triggersHeading?: string;
	triggers?: ShoroukTrigger[];
	whyHeading?: string;
	whyBody?: string;
	winHeading?: string;
	winBody?: string;
	stepsHeading?: string;
	steps?: ShoroukTrigger[];
	pickHeading?: string;
	pickBody?: string;
	formulaHeading?: string;
	formulaLead?: string;
	platformsHeading?: string;
	platforms?: ShoroukTrigger[];
	checklistHeading?: string;
	checklist?: string[];
	ctaNote?: string;
	faqs?: { question: string; answer: string }[];
};

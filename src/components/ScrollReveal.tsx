/** @format */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, {
	useEffect,
	useMemo,
	useRef,
	type ReactNode,
	type RefObject,
} from "react";
import { Highlighter } from "./ui/highlighter";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
	children: ReactNode;
	scrollContainerRef?: RefObject<HTMLElement>;
	enableBlur?: boolean;
	baseOpacity?: number;
	baseRotation?: number;
	blurStrength?: number;
	containerClassName?: string;
	textClassName?: string;
	rotationEnd?: string;
	wordAnimationEnd?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
	children,
	scrollContainerRef,
	enableBlur = true,
	baseOpacity = 0.1,
	baseRotation = 3,
	blurStrength = 4,
	containerClassName = "",
	textClassName = "",
	rotationEnd = "bottom bottom",
	wordAnimationEnd = "bottom bottom",
}) => {
	const containerRef = useRef<HTMLHeadingElement>(null);

	const splitText = useMemo(() => {
		const raw = typeof children === "string" ? children : "";
		/** Support `<mark>…</mark>` in JSON; normalize legacy `[[…]]` so brackets never leak. */
		const text = raw.replace(
			/\[\[([\s\S]*?)\]\]/g,
			(_full, inner: string) =>
				`<mark>${String(inner).trim()}</mark>`,
		);
		const highlightedChunks = text
			.split(/(<mark>[\s\S]*?<\/mark>)/gi)
			.filter(Boolean);
		const nodes: ReactNode[] = [];
		let tokenIndex = 0;

		highlightedChunks.forEach((chunk) => {
			const highlightMatch = chunk.match(/^<mark>([\s\S]*?)<\/mark>$/i);
			if (highlightMatch) {
				const phrase = highlightMatch[1].trim();
				nodes.push(
					<span className='word inline-block' key={`highlight-${tokenIndex++}`}>
						<Highlighter
							action='highlight'
							color='#382260'
							strokeWidth={1.4}
							iterations={1}
							animationDuration={800}
							padding={-2}>
							<span className='text-white'>{phrase}</span>
						</Highlighter>
					</span>,
				);
				return;
			}

			chunk.split(/(\s+)/).forEach((word) => {
				if (word.length === 0) return;
				if (/^\s+$/.test(word)) {
					nodes.push(word);
					return;
				}
				nodes.push(
					<span className='word inline-block' key={`word-${tokenIndex++}`}>
						{word}
					</span>,
				);
			});
		});

		return nodes;
	}, [children]);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const scroller =
			scrollContainerRef && scrollContainerRef.current ?
				scrollContainerRef.current
			:	window;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				el,
				{ transformOrigin: "0% 50%", rotate: baseRotation },
				{
					ease: "none",
					rotate: 0,
					scrollTrigger: {
						trigger: el,
						scroller,
						start: "top bottom",
						end: rotationEnd,
						scrub: true,
					},
				},
			);

			const wordElements = el.querySelectorAll<HTMLElement>(".word");

			gsap.fromTo(
				wordElements,
				{ opacity: baseOpacity, willChange: "opacity" },
				{
					ease: "none",
					opacity: 1,
					stagger: 0.05,
					scrollTrigger: {
						trigger: el,
						scroller,
						start: "top bottom-=20%",
						end: wordAnimationEnd,
						scrub: true,
					},
				},
			);

			if (enableBlur) {
				gsap.fromTo(
					wordElements,
					{ filter: `blur(${blurStrength}px)` },
					{
						ease: "none",
						filter: "blur(0px)",
						stagger: 0.05,
						scrollTrigger: {
							trigger: el,
							scroller,
							start: "top bottom-=20%",
							end: wordAnimationEnd,
							scrub: true,
						},
					},
				);
			}
		}, el);

		return () => {
			ctx.revert();
		};
	}, [
		scrollContainerRef,
		enableBlur,
		baseRotation,
		baseOpacity,
		rotationEnd,
		wordAnimationEnd,
		blurStrength,
	]);

	return (
		<h2 ref={containerRef} className={`my-5 ${containerClassName}`}>
			<p
				className={`text-[clamp(1.6rem,4vw,3rem)] font-semibold leading-[1.5] ${textClassName}`}>
				{splitText}
			</p>
		</h2>
	);
};

export default ScrollReveal;

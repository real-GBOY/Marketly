/** @format */

import { useEffect, useRef } from "react";
import type React from "react";
import { useInView } from "framer-motion";
import { annotate } from "rough-notation";
import { type RoughAnnotation } from "rough-notation/lib/model";

type AnnotationAction =
	| "highlight"
	| "underline"
	| "box"
	| "circle"
	| "strike-through"
	| "crossed-off"
	| "bracket";

interface HighlighterProps {
	children: React.ReactNode;
	action?: AnnotationAction;
	color?: string;
	strokeWidth?: number;
	animationDuration?: number;
	iterations?: number;
	padding?: number;
	multiline?: boolean;
	isView?: boolean;
}

export function Highlighter({
	children,
	action = "highlight",
	color = "#ffd1dc",
	strokeWidth = 1.5,
	animationDuration = 600,
	iterations = 2,
	padding = 2,
	multiline = true,
	isView = false,
}: HighlighterProps) {
	const elementRef = useRef<HTMLSpanElement>(null);

	const isInView = useInView(elementRef, {
		once: true,
		margin: "-10%",
	});

	// If isView is false, always show. If isView is true, wait for inView
	const shouldShow = !isView || isInView;

	useEffect(() => {
		const element = elementRef.current;
		let annotation: RoughAnnotation | null = null;
		let resizeObserver: ResizeObserver | null = null;
		let cancelled = false;
		let resizeTimer: ReturnType<typeof setTimeout> | null = null;

		const mountAnnotation = () => {
			annotation?.remove();
			annotation = null;
			if (!shouldShow || !element || cancelled) return;

			const rtl = document.documentElement.dir === "rtl";
			const next = annotate(element, {
				type: action,
				color,
				strokeWidth,
				animationDuration,
				iterations,
				padding,
				multiline,
				rtl,
			});
			annotation = next;
			next.show();
		};

		if (shouldShow && element) {
			mountAnnotation();

			// Let layout/fonts settle after language or direction changes (stroke uses rect height).
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					if (!cancelled) mountAnnotation();
				});
			});

			document.fonts?.ready.then(() => {
				if (!cancelled) {
					requestAnimationFrame(() => mountAnnotation());
				}
			});

			resizeObserver = new ResizeObserver(() => {
				if (resizeTimer) clearTimeout(resizeTimer);
				resizeTimer = setTimeout(() => {
					if (!cancelled) mountAnnotation();
				}, 120);
			});
			resizeObserver.observe(element);
		}

		return () => {
			cancelled = true;
			if (resizeTimer) clearTimeout(resizeTimer);
			annotation?.remove();
			resizeObserver?.disconnect();
		};
	}, [
		children,
		shouldShow,
		action,
		color,
		strokeWidth,
		animationDuration,
		iterations,
		padding,
		multiline,
	]);

	return (
		<span
			ref={elementRef}
			className='relative inline bg-transparent leading-none align-baseline'>
			{children}
		</span>
	);
}

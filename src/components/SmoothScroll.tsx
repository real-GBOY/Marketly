/** @format */

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/** Sub-hero heading "Why Marketly" — anchor id for scroll-to. */
export const WHY_MARKETLY_ID = "why-marketly";

/**
 * Root smooth scrolling via Lenis.
 *
 * Note: We do not call `lenis.stop()` above a section boundary. Lenis blocks
 * wheel events with `preventDefault()` while stopped, which would freeze scroll
 * on the hero. Smooth scroll applies to the full page.
 */
type Props = { children: ReactNode };

export function SmoothScroll({ children }: Props) {
	return (
		<ReactLenis
			root
			options={{
				duration: 1.4,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				smoothWheel: true,
				orientation: "vertical",
			}}>
			{children}
		</ReactLenis>
	);
}

/** @format */

import type { ReactNode } from "react";
import { HomerunHeroNav } from "./HomerunHeroNav";

/**
 * Same outer cream + inner white shell as the homepage, with the pill nav on the shell top edge.
 */
export function FramedPageShell({ children }: { children: ReactNode }) {
	return (
		<div className='min-h-screen bg-cream px-3 pb-4 pt-6 sm:px-4 sm:pb-5 sm:pt-8 md:px-6 md:pb-8 md:pt-10 lg:px-10 lg:pt-12'>
			<div className='relative mx-auto w-full max-w-[1920px] rounded-[1.75rem] border border-black/[0.06] bg-white shadow-[0_16px_80px_rgba(0,0,0,0.09)] sm:rounded-[2.25rem] md:rounded-[3rem]'>
				<HomerunHeroNav />
				{children}
			</div>
		</div>
	);
}

/** @format */

import { Footer } from "./Footer";
import { FramedPageShell } from "./FramedPageShell";
import { Portfolio } from "./Portfolio";

export function PortfolioPage() {
	return (
		<FramedPageShell>
			<div className='text-charcoal'>
				<Portfolio />
				<Footer />
			</div>
		</FramedPageShell>
	);
}


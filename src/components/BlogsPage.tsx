/** @format */

import { Blogs } from "./Blogs";
import { Footer } from "./Footer";
import { FramedPageShell } from "./FramedPageShell";

export function BlogsPage() {
	return (
		<FramedPageShell>
			<div className='text-charcoal'>
				<Blogs />
				<Footer />
			</div>
		</FramedPageShell>
	);
}

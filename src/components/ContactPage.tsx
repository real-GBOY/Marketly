/** @format */

import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { FramedPageShell } from "./FramedPageShell";

export function ContactPage() {
	return (
		<FramedPageShell>
			<div className='text-charcoal'>
				<Contact />
				<Footer />
			</div>
		</FramedPageShell>
	);
}

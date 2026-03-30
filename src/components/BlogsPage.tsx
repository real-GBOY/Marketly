/** @format */

import { Footer } from "./Footer";
import { Header } from "./Header";
import { Blogs } from "./Blogs";

export function BlogsPage() {
	return (
		<div className='min-h-screen bg-white text-charcoal'>
			<section className='bg-navy pb-6'>
				<div className='relative mx-auto max-w-[1920px] px-5 pt-6 md:px-9 lg:px-[137px]'>
					<Header />
				</div>
			</section>

			<Blogs />
			<Footer />
		</div>
	);
}

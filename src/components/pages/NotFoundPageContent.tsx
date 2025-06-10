import { A } from "@solidjs/router";

/**
 * 404 page content component
 * Follows SRP by handling only 404 page specific content
 */
export default function NotFoundPageContent() {
	return (
		<div class="text-center mx-auto text-gray-700">
			<h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
				Not Found
			</h1>
			<p class="mt-8">
				Visit{" "}
				<a
					href="https://solidjs.com"
					target="_blank"
					class="text-sky-600 hover:underline"
					rel="noreferrer"
				>
					solidjs.com
				</a>{" "}
				to learn how to build Solid apps.
			</p>
			<p class="my-4">
				<A href="/" class="text-sky-600 hover:underline">
					Home
				</A>
				{" - "}
				<A href="/about" class="text-sky-600 hover:underline">
					About Page
				</A>
			</p>
		</div>
	);
}

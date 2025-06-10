import { A } from "@solidjs/router";
import PageHeader from "~/components/ui/PageHeader";
import Button from "~/components/ui/Button";

/**
 * About page description content
 * Follows SRP by handling only description content
 */
function AboutDescription() {
	return (
		<div class="bg-white rounded-lg shadow-md p-6 md:p-8 mb-8">
			<div class="max-w-3xl mx-auto">
				<h2 class="text-2xl font-bold text-gray-800 mb-4">Note</h2>
				<p class="text-gray-700 leading-relaxed mb-6">
					9c.market hopes for more active on-chain transactions using NCG. While
					we may not be able to implement the originally planned product
					purchase and sales using wallets, we hope that someone with
					determination will fork it and complete the implementation.
				</p>

				<h3 class="text-xl font-bold text-gray-800 mb-4">
					For Next Developer (feat. Game Icon)
				</h3>
				<p class="text-gray-700 leading-relaxed mb-6">
					If you are interested in continuing the development, I would like to
					leave you with considerations regarding the use of game icons. I
					personally believe that an ecosystem is sustainable when there is an
					entity that profits from it. Therefore, I hope that entities
					developing and operating services like 9c.market can generate revenue
					healthily through advertising and other means. According to the
					license for Nine Chronicles design resources, they should not be used
					as a means to generate profit. For this reason, I hope development
					will continue in a direction that does not use game icons, but that is
					your choice.
				</p>

				<h3 class="text-xl font-bold text-gray-800 mb-4">Source Code</h3>
				<p class="text-gray-700 leading-relaxed mb-4">
					9c.market is open-sourced on GitHub in AGPL-3.0 license.{" "}
					<a
						href="https://github.com/moreal/9c-market"
						target="_blank"
						rel="noopener noreferrer"
						class="text-sky-600 hover:underline"
					>
						https://github.com/moreal/9c-market
					</a>
				</p>
			</div>
		</div>
	);
}

/**
 * Navigation buttons component
 * Follows SRP by handling only navigation actions
 */
function NavigationButtons() {
	return (
		<div class="text-center">
			<A href="/">
				<Button variant="primary" class="mr-4">
					Browse On-Chain Products
				</Button>
			</A>
			<A href="/iap">
				<Button variant="secondary">Browse IAP Products</Button>
			</A>
		</div>
	);
}

/**
 * About page content component
 * Follows SRP by handling only about page specific content orchestration
 */
export default function AboutPageContent() {
	return (
		<>
			<PageHeader title="About 9c.market">
				<p class="text-lg opacity-90 max-w-3xl mx-auto text-white leading-relaxed">
					9c.market is a web service where you can check both in-app purchase
					products and on-chain marketplace items in fiat currency.
				</p>
			</PageHeader>

			<AboutDescription />
			<NavigationButtons />
		</>
	);
}

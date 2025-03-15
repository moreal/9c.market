import { A, useLocation } from "@solidjs/router";
import NetworkSelector from "./NetworkSelector";
import CurrencySelector from "./CurrencySelector";
import HeroiconsOutlineShoppingBag from "~icons/heroicons-outline/shopping-bag";
import { InformationCircleIcon } from "../ui/InformationCircleIcon";

export default function Nav() {
	const location = useLocation();
	const active = (path: string) =>
		path === location.pathname
			? "border-sky-300 text-white font-medium"
			: "border-transparent hover:border-sky-400 text-gray-200 hover:text-white";
	return (
		<nav class="bg-gradient-to-r from-sky-800 to-indigo-900 shadow-lg">
			<div class="container mx-auto flex items-center p-4 text-gray-200">
				<div class="flex items-center mr-6">
					<A href="/" class="flex items-center transition-colors duration-200">
						<HeroiconsOutlineShoppingBag
							class="stroke-2 h-8 w-8 text-sky-400 mr-3"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						/>
						<span class="font-bold text-xl text-white">9C Market</span>
					</A>
				</div>
				<ul class="flex items-center">
					<li class={`border-b-2 ${active("/")} mx-3 py-2`}>
						<a
							href="/"
							class="flex items-center transition-colors duration-200"
						>
							<HeroiconsOutlineShoppingBag
								class="stroke-2 h-4 w-4 mr-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							/>
							On-Chain Products
						</a>
					</li>
					<li class={`border-b-2 ${active("/iap")} mx-3 py-2`}>
						<a
							href="/iap"
							class="flex items-center transition-colors duration-200"
						>
							<HeroiconsOutlineShoppingBag
								class="stroke-2 h-4 w-4 mr-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							/>
							IAP Products
						</a>
					</li>
					<li class={`border-b-2 ${active("/about")} mx-3 py-2`}>
						<a
							href="/about"
							class="flex items-center transition-colors duration-200"
						>
							<InformationCircleIcon />
							About
						</a>
					</li>
				</ul>
				<div class="ml-auto flex items-center space-x-3">
					<CurrencySelector />
					<NetworkSelector />
				</div>
			</div>
		</nav>
	);
}

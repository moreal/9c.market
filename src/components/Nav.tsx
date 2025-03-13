import { useLocation } from "@solidjs/router";
import NetworkSelector from "./NetworkSelector";
import CurrencySelector from "./CurrencySelector";

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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 text-sky-400 mr-3"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
						/>
					</svg>
					<span class="font-bold text-xl text-white">9C Market</span>
				</div>
				<ul class="flex items-center">
					<li class={`border-b-2 ${active("/")} mx-3 py-2`}>
						<a
							href="/"
							class="flex items-center transition-colors duration-200"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 mr-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
							Home
						</a>
					</li>
					<li class={`border-b-2 ${active("/iap")} mx-3 py-2`}>
						<a
							href="/iap"
							class="flex items-center transition-colors duration-200"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 mr-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
								/>
							</svg>
							IAP Products
						</a>
					</li>
					<li class={`border-b-2 ${active("/about")} mx-3 py-2`}>
						<a
							href="/about"
							class="flex items-center transition-colors duration-200"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 mr-1"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
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

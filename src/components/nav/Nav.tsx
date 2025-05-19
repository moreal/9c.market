import { A, useLocation } from "@solidjs/router";
import { createSignal, Show, onMount } from "solid-js";
import NetworkSelector from "./NetworkSelector";
import CurrencySelector from "./CurrencySelector";
import HeroiconsOutlineShoppingBag from "~icons/heroicons-outline/shopping-bag";
import HeroiconsOutlineMenu from "~icons/heroicons-outline/menu";
import HeroiconsOutlineX from "~icons/heroicons-outline/x";
import { InformationCircleIcon } from "../ui/InformationCircleIcon";

export default function Nav() {
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);
	
	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen());
	};
	
	// Close menu when clicking outside
	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (mobileMenuOpen() && !target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
				setMobileMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});
	
	const active = (path: string) =>
		path === location.pathname
			? "border-sky-300 text-white font-medium"
			: "border-transparent hover:border-sky-400 text-gray-200 hover:text-white";
	return (
		<nav class="bg-gradient-to-r from-sky-800 to-indigo-900 shadow-lg">
			<div class="container mx-auto flex flex-wrap items-center p-4 text-gray-200">
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
				
				{/* Mobile menu button */}
				<button 
					type="button" 
					class="mobile-menu-button md:hidden ml-auto p-2 rounded-md text-white hover:bg-sky-700 focus:outline-none"
					onClick={toggleMobileMenu}
				>
					<Show when={mobileMenuOpen()} fallback={
						<HeroiconsOutlineMenu 
							class="stroke-2 h-6 w-6" 
							fill="none" 
							viewBox="0 0 24 24" 
							stroke="currentColor"
						/>
					}>
						<HeroiconsOutlineX 
							class="stroke-2 h-6 w-6" 
							fill="none" 
							viewBox="0 0 24 24" 
							stroke="currentColor"
						/>
					</Show>
				</button>
				
				{/* Navigation links and selectors container */}
				<div 
					class={`${
						mobileMenuOpen() ? 'block' : 'hidden'
					} md:flex md:items-center w-full md:w-auto md:ml-0 mt-4 md:mt-0 mobile-menu-transition mobile-menu-container`}
				>
					<ul class="flex flex-col md:flex-row md:items-center">
						<li class={`border-b-2 ${active("/")} mx-3 py-2`}>
							<a
								href="/"
								class="flex items-center transition-colors duration-200"
								onClick={() => setMobileMenuOpen(false)}
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
								onClick={() => setMobileMenuOpen(false)}
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
								onClick={() => setMobileMenuOpen(false)}
							>
								<InformationCircleIcon />
								About
							</a>
						</li>
					</ul>
					<div class="flex flex-col md:flex-row md:ml-auto items-start md:items-center mt-4 md:mt-0 md:space-x-3 space-y-4 md:space-y-0">
						<CurrencySelector />
						<NetworkSelector />
					</div>
				</div>
			</div>
		</nav>
	);
}

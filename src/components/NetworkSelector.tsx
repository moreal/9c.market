import { createSignal, For, Suspense } from "solid-js";
import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";
import HeroiconsOutlineChevronDown from "~icons/heroicons-outline/chevron-down";
import HeroiconsOutlineGlobe from "~icons/heroicons-outline/globe";
import HeroiconsOutlineCheck from "~icons/heroicons-outline/check";
import { config } from "~/config";

export default function NetworkSelector() {
	const { network, setNetwork } = useNetwork();
	const [isOpen, setIsOpen] = createSignal(false);

	const toggleDropdown = () => setIsOpen(!isOpen());

	const selectNetwork = (selectedNetwork: string) => {
		setNetwork(selectedNetwork as NetworkType);
		setIsOpen(false);
	};

	return (
		<div class="relative ml-auto">
			<button
				type="button"
				class="flex items-center px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
				onClick={toggleDropdown}
			>
				<HeroiconsOutlineGlobe
					class="stroke-2 h-4 w-4 mr-2 text-sky-300"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				/>
				<span class="mr-1 text-gray-200">Network:</span>
				<span class="font-medium text-white">{network()}</span>
				<HeroiconsOutlineChevronDown
					stroke="currentColor"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-2 w-4 h-4 ml-2 text-sky-300 transition-transform duration-200"
					style={{ transform: isOpen() ? "rotate(180deg)" : "rotate(0)" }}
				/>
			</button>

			<div
				class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-10 transform origin-top-right transition-all duration-200"
				style={{
					opacity: isOpen() ? 1 : 0,
					visibility: isOpen() ? "visible" : "hidden",
					transform: isOpen() ? "scale(1)" : "scale(0.95)",
				}}
			>
				<For each={config.networks.availableNetworks}>
					{(networkOption) => (
						<button
							type="button"
							class={`block px-4 py-2 text-sm w-full text-left transition-colors duration-150 ${
								network() === networkOption
									? "bg-gradient-to-r from-sky-50 to-indigo-50 text-indigo-700 font-medium"
									: "text-gray-700 hover:bg-gray-50"
							}`}
							onClick={() => selectNetwork(networkOption)}
						>
							<div class="flex items-center">
								{network() === networkOption && (
									<HeroiconsOutlineCheck
										class="stroke-2 h-4 w-4 mr-2 text-indigo-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									/>
								)}
								<span class={network() === networkOption ? "ml-0" : "ml-6"}>
									{networkOption}
								</span>
							</div>
						</button>
					)}
				</For>
			</div>
		</div>
	);
}

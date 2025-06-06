import { For, type JSX } from "solid-js";
import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";
import { Dropdown } from "~/components/ui/Dropdown";
import HeroiconsOutlineChevronDown from "~icons/heroicons-outline/chevron-down";
import HeroiconsOutlineGlobe from "~icons/heroicons-outline/globe";
import HeroiconsOutlineCheck from "~icons/heroicons-outline/check";
import { config } from "~/config";

/**
 * Props for NetworkSelector component
 */
interface NetworkSelectorProps {
	class?: string;
	variant?: "primary" | "compact";
}

/**
 * Props for network selector variant components
 */
interface NetworkSelectorVariantProps {
	class?: string;
	onNetworkSelect: (network: string) => void;
}

/**
 * Compact variant of network selector
 */
function CompactNetworkSelector(
	props: NetworkSelectorVariantProps,
): JSX.Element {
	const { network } = useNetwork();

	return (
		<Dropdown class={props.class || "ml-auto"}>
			<Dropdown.Trigger class="p-2 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200">
				<div class="flex items-center">
					<HeroiconsOutlineGlobe
						class="stroke-2 h-4 w-4 text-sky-300"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					/>
				</div>
			</Dropdown.Trigger>

			<Dropdown.Content class="py-2 w-48" align="right">
				<For each={config.networks.availableNetworks}>
					{(networkOption) => (
						<Dropdown.Item
							class="px-4 py-2 text-sm"
							onClick={() => props.onNetworkSelect(networkOption)}
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
								<span
									class={
										network() === networkOption
											? "ml-0 font-medium text-indigo-700"
											: "ml-6 text-gray-700"
									}
								>
									{networkOption}
								</span>
							</div>
						</Dropdown.Item>
					)}
				</For>
			</Dropdown.Content>
		</Dropdown>
	);
}

/**
 * Primary variant of network selector
 */
function PrimaryNetworkSelector(
	props: NetworkSelectorVariantProps,
): JSX.Element {
	const { network } = useNetwork();

	return (
		<Dropdown class={props.class || "ml-auto"}>
			<Dropdown.Trigger class="flex items-center px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200">
				<div class="flex items-center">
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
					/>
				</div>
			</Dropdown.Trigger>

			<Dropdown.Content class="py-2 w-48" align="right">
				<For each={config.networks.availableNetworks}>
					{(networkOption) => (
						<Dropdown.Item
							class="px-4 py-2 text-sm"
							onClick={() => props.onNetworkSelect(networkOption)}
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
								<span
									class={
										network() === networkOption
											? "ml-0 font-medium text-indigo-700"
											: "ml-6 text-gray-700"
									}
								>
									{networkOption}
								</span>
							</div>
						</Dropdown.Item>
					)}
				</For>
			</Dropdown.Content>
		</Dropdown>
	);
}

/**
 * Network selector component using the generic Dropdown component
 */
function NetworkSelector(props: NetworkSelectorProps = {}): JSX.Element {
	const { setNetwork } = useNetwork();
	const variant = props.variant || "primary";

	const handleNetworkSelect = (selectedNetwork: string) => {
		setNetwork(selectedNetwork as NetworkType);
	};

	if (variant === "compact") {
		return (
			<CompactNetworkSelector
				class={props.class}
				onNetworkSelect={handleNetworkSelect}
			/>
		);
	}

	return (
		<PrimaryNetworkSelector
			class={props.class}
			onNetworkSelect={handleNetworkSelect}
		/>
	);
}

/**
 * Default export for backward compatibility
 */
export default NetworkSelector;

/**
 * Named export for explicit usage
 */
export { NetworkSelector };

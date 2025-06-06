import { For, type JSX } from "solid-js";
import { type CurrencyType, useCurrency } from "~/contexts/CurrencyContext";
import { Dropdown } from "~/components/ui/Dropdown";
import HeroiconsOutlineChevronDown from "~icons/heroicons-outline/chevron-down";
import { config } from "~/config";
import { SYMBOL_BY_CURRENCY } from "~/constants";

/**
 * Props for CurrencySelector component
 */
interface CurrencySelectorProps {
	class?: string;
	variant?: "default" | "compact";
}

/**
 * Currency selector component using the generic Dropdown component
 */
function CurrencySelector(props: CurrencySelectorProps = {}): JSX.Element {
	const { currency, setCurrency } = useCurrency();

	const handleCurrencySelect = (selectedCurrency: CurrencyType) => {
		setCurrency(selectedCurrency);
	};

	if (props.variant === "compact") {
		return (
			<Dropdown class={props.class || "ml-auto"}>
				<Dropdown.Trigger class="bg-sky-700 hover:bg-sky-600 text-white px-2 py-1 rounded-lg focus:outline-none transition-colors duration-200">
					<span class="text-sm font-medium">
						{SYMBOL_BY_CURRENCY[currency()]}
					</span>
				</Dropdown.Trigger>

				<Dropdown.Content class="py-2 w-24" align="right">
					<For each={config.currency.availableCurrencies}>
						{(curr) => (
							<Dropdown.Item
								class="px-4 py-2 text-sm text-center"
								onClick={() => handleCurrencySelect(curr)}
							>
								<span
									class={
										currency() === curr
											? "text-sky-600 font-medium"
											: "text-gray-700"
									}
								>
									{SYMBOL_BY_CURRENCY[curr]} {curr}
								</span>
							</Dropdown.Item>
						)}
					</For>
				</Dropdown.Content>
			</Dropdown>
		);
	}

	return (
		<Dropdown class={props.class || "ml-auto"}>
			<Dropdown.Trigger class="flex items-center bg-sky-700 hover:bg-sky-600 text-white px-3 py-1 rounded-lg focus:outline-none transition-colors duration-200">
				<div class="flex items-center">
					<span class="mr-1">
						{SYMBOL_BY_CURRENCY[currency()]} {currency()}
					</span>
					<HeroiconsOutlineChevronDown
						stroke="currentColor"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-2 h-4 w-4"
					/>
				</div>
			</Dropdown.Trigger>

			<Dropdown.Content class="py-2 w-24" align="right">
				<For each={config.currency.availableCurrencies}>
					{(curr) => (
						<Dropdown.Item
							class="px-4 py-2 text-sm text-center"
							onClick={() => handleCurrencySelect(curr)}
						>
							<span
								class={
									currency() === curr
										? "text-sky-600 font-medium"
										: "text-gray-700"
								}
							>
								{SYMBOL_BY_CURRENCY[curr]} {curr}
							</span>
						</Dropdown.Item>
					)}
				</For>
			</Dropdown.Content>
		</Dropdown>
	);
}

/**
 * Default export for backward compatibility
 */
export default CurrencySelector;

/**
 * Named export for explicit usage
 */
export { CurrencySelector };

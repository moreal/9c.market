import { For, createSignal, onMount } from "solid-js";
import { type CurrencyType, useCurrency } from "../../contexts/CurrencyContext";
import HeroiconsOutlineChevronDown from "~icons/heroicons-outline/chevron-down";
import { config } from "~/config";
import { SYMBOL_BY_CURRENCY } from "~/constants";

export default function CurrencySelector() {
	const { currency, setCurrency } = useCurrency();
	const [isOpen, setIsOpen] = createSignal(false);

	const toggleDropdown = () => setIsOpen(!isOpen());

	// Close dropdown when clicking outside
	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(".currency-selector")) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});

	const selectCurrency = (curr: CurrencyType) => {
		setCurrency(curr);
		setIsOpen(false);
	};

	return (
		<div class="relative currency-selector w-full md:w-auto">
			<button
				type="button"
				onClick={toggleDropdown}
				class="flex items-center bg-sky-700 hover:bg-sky-600 text-white px-3 py-1 rounded-lg focus:outline-none transition-colors duration-200 w-full md:w-auto justify-between md:justify-start"
			>
				<span class="mr-1">
					{SYMBOL_BY_CURRENCY[currency()]} {currency()}
				</span>
				<HeroiconsOutlineChevronDown
					stroke="currentColor"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-2 h-4 w-4"
				/>
			</button>

			{isOpen() && (
				<ul class="absolute right-0 mt-2 py-2 w-full md:w-24 bg-white rounded-md shadow-lg z-10">
					<For each={config.currency.availableCurrencies}>
						{(curr) => (
							<li
								class={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
									currency() === curr
										? "text-sky-600 font-medium"
										: "text-gray-700"
								}`}
								onKeyPress={() => selectCurrency(curr)}
								onClick={() => selectCurrency(curr)}
							>
								{SYMBOL_BY_CURRENCY[curr]} {curr}
							</li>
						)}
					</For>
				</ul>
			)}
		</div>
	);
}

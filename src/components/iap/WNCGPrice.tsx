import { Show } from "solid-js";
import { NoHydration } from "solid-js/web";
import { DECIMALS_BY_CURRENCY, SYMBOL_BY_CURRENCY } from "~/constants";
import { useCurrency } from "~/contexts/CurrencyContext";
import { useWNCGPrice } from "~/contexts/WNCGPriceContext";

export default function WNCGPrice() {
	const { wncgPrice } = useWNCGPrice();
	const { currency } = useCurrency();
	return (
		<div class="bg-white rounded-md shadow-sm px-4 py-3 flex flex-col">
			<div class="text-center mb-1">
				<span class="font-medium text-gray-700">WNCG Price</span>
			</div>

			<div class="flex justify-between items-center">
				<div class="flex items-center">
					<img
						src="/images/wncg-icon.png"
						alt="WNCG"
						class="w-5 h-5 mr-1"
						onError={(e) => {
							// Fallback if image doesn't exist
							e.currentTarget.style.display = "none";
						}}
					/>
					<span class="text-sm text-gray-600">WNCG</span>
				</div>

				<Show
					when={!wncgPrice.loading && wncgPrice()}
					fallback={
						<NoHydration>
							<div class="text-center py-1">
								<div class="animate-pulse bg-gray-200 h-4 w-20 mx-auto rounded" />
							</div>
						</NoHydration>
					}
				>
					<div class="text-right">
						<div class="text-semibold text-gray-900">
							{SYMBOL_BY_CURRENCY[currency()]}
							{wncgPrice()?.toFixed(DECIMALS_BY_CURRENCY[currency()])}{" "}
							{currency()}
						</div>
					</div>
				</Show>
			</div>
		</div>
	);
}

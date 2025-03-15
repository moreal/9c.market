import { For, createMemo, Show } from "solid-js";
import { type CurrencyType, useCurrency } from "../contexts/CurrencyContext";
import { useWNCGPrice } from "~/contexts/WNCGPriceContext";
import { useProducts } from "~/contexts/ProductsContext";
import type { Product } from "~/types/iap";
import { NoHydration } from "solid-js/web";
import {
	DECIMALS_BY_CURRENCY,
	EXCHANGE_RATE_BY_CURRENCY,
	SYMBOL_BY_CURRENCY,
} from "~/constants";

// Item types that we want to calculate average price for
const ITEM_TYPES = [
	{ key: "AP Potion", label: "AP Potion" },
	{ key: "Hourglass", label: "Hourglass" },
	{ key: "Golden Dust", label: "Golden Dust" },
];

// Calculate average price per unit for specific item types
function calculateAveragePrice(
	products: Product[],
	itemName: string,
): { averagePrice: number; amount: number } | null {
	// let productWithHighestAmount: Product | null = null;

	const filtered = products.filter((p) => p.name.includes(itemName));
	const sorted = filtered.toSorted(
		(a, b) => a.fungible_item_list[0].amount - b.fungible_item_list[0].amount,
	);
	if (sorted.length === 0) return null;
	const productWithHighestAmount = sorted[0];

	if (productWithHighestAmount?.networkPrice?.KRW) {
		const amount = productWithHighestAmount.fungible_item_list[0].amount || 0;
		if (amount > 0) {
			const averagePrice = Number(
				(productWithHighestAmount.networkPrice.KRW / amount).toFixed(2),
			);
			return { averagePrice, amount };
		}
	}

	return null;
}

export default function AveragePriceStats() {
	const { currency } = useCurrency();
	const { wncgPrice } = useWNCGPrice();
	const { allProducts } = useProducts();
	// Calculate average price per item type
	const averagePrices = createMemo(() => {
		const result = ITEM_TYPES.map((itemType) => {
			const result = calculateAveragePrice(allProducts(), itemType.key);

			// If the currency is USD and we have KRW prices, convert them
			if (result === null) return null;
			const adjustedPrice =
				result.averagePrice / EXCHANGE_RATE_BY_CURRENCY[currency()];

			return {
				...itemType,
				...result,
				averagePrice: adjustedPrice,
			};
		})
			.filter((item) => item !== null)
			.filter((item) => item.averagePrice !== undefined);
		return result;
	});

	// Calculate NCG price equivalent
	const calculateNCGPrice = (price: number | undefined) => {
		if (!price) return null;
		const currentWNCGPrice = wncgPrice();
		if (!currentWNCGPrice) return null;
		return (price / currentWNCGPrice).toFixed(2);
	};

	return (
		<Show when={allProducts() && allProducts().length > 0}>
			<div class="bg-white rounded-lg shadow-sm p-4 mb-6">
				<h3 class="text-lg font-semibold text-gray-800 mb-3">
					Average Prices (per unit)
				</h3>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<For each={averagePrices()}>
						{(item) => (
							<div class="bg-gray-50 p-3 rounded-md border border-gray-100">
								<div class="flex justify-between items-center">
									<span class="text-gray-700">{item.label}</span>
									<span class="font-semibold text-indigo-600">
										{SYMBOL_BY_CURRENCY[currency()]}
										{item.averagePrice.toFixed(
											DECIMALS_BY_CURRENCY[currency()],
										)}{" "}
										{currency()}
									</span>
								</div>
								<Show
									when={!wncgPrice.loading && wncgPrice() && item.averagePrice}
									fallback={
										<NoHydration>
											<div class="text-xs text-gray-500 mt-1 flex justify-between">
												<span>Based on {item.amount} units</span>
												<span class="text-gray-400 animate-pulse">Loading</span>
											</div>
										</NoHydration>
									}
								>
									<div class="text-xs text-gray-500 mt-1 flex justify-between">
										<span>Based on {item.amount} units</span>
										<span class="text-blue-600">
											≈ {calculateNCGPrice(item.averagePrice)} NCG
										</span>
									</div>
								</Show>
							</div>
						)}
					</For>
				</div>
			</div>
		</Show>
	);
}

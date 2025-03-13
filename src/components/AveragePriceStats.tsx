import { For, createMemo, createResource, Show } from "solid-js";
import { Product } from "../types/iap";
import { calculateAveragePrice } from "../utils/iap-utils";
import { fetchCryptoPrice } from "../utils/crypto-utils";
import { currency } from "../contexts/CurrencyContext";

type MarketProduct = {
	id: string;
	name: string;
	unitPrice: number;
	price: {
		ticker: string;
		decimalPlaces: number;
	};
	itemType: string;
	itemCount: number;
};

type AveragePriceStatsProps = {
	products: Product[];
};

// Item types that we want to calculate average price for
const ITEM_TYPES = [
	{ key: "AP Potion", label: "AP Potion" },
	{ key: "Hourglass", label: "Hourglass" },
	{ key: "Golden Dust", label: "Golden Dust" },
];

export default function AveragePriceStats(props: AveragePriceStatsProps) {
	// Fetch WNCG price data
	const [wncgPrice, { refetch }] = createResource(currency, async () => {
		const resp = await fetchCryptoPrice("WNCG", currency());
		return resp;
	});

	// Set up automatic refresh every 20 minutes
	setInterval(
		() => {
			refetch();
		},
		20 * 60 * 1000,
	);

	// Calculate average price per item type
	const averagePrices = createMemo(() => {
		return ITEM_TYPES.map((itemType) => {
			const result = calculateAveragePrice(props.products, itemType.key);

			// If the currency is USD and we have KRW prices, convert them
			let adjustedPrice = result.averagePrice;
			if (currency() === "USD" && adjustedPrice) {
				adjustedPrice = adjustedPrice / 1450;
			}

			return {
				...itemType,
				...result,
				averagePrice: adjustedPrice,
			};
		}).filter((item) => item.averagePrice !== undefined);
	});

	// Calculate NCG price equivalent
	const calculateNCGPrice = (price: number | undefined) => {
		if (!price) return null;
		const currentWNCGPrice = wncgPrice();
		if (!currentWNCGPrice) return null;
		return (price / currentWNCGPrice).toFixed(2);
	};

	// Get currency symbol
	const getCurrencySymbol = () => {
		return currency() === "USD" ? "$" : "₩";
	};

	return (
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
									{getCurrencySymbol()}
									{item.averagePrice} {currency()}
								</span>
							</div>
							<Show
								when={!wncgPrice.loading && wncgPrice() && item.averagePrice}
								fallback={
									<div class="text-xs text-gray-500 mt-1 flex justify-between">
										<span>Based on {item.amount} units</span>
										<span class="text-gray-400 animate-pulse">
											Loading NCG price...
										</span>
									</div>
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
	);
}

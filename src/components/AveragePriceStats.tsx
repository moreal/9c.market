import { For, createMemo, Show, Suspense } from "solid-js";
import { useCurrency } from "../contexts/CurrencyContext";
import { useWNCGPrice } from "~/contexts/WNCGPriceContext";
import { useProducts } from "~/contexts/ProductsContext";
import { NoHydration } from "solid-js/web";
import { DECIMALS_BY_CURRENCY, SYMBOL_BY_CURRENCY } from "~/constants";
import { SHEET_ID_MAP } from "~/utils/sheet_ids";

const ITEM_TYPES = [
	{ label: SHEET_ID_MAP[500000], itemId: 500000 },
	{ label: SHEET_ID_MAP[400000], itemId: 400000 },
	{ label: SHEET_ID_MAP[600201], itemId: 600201 },
];

export default function AveragePriceStats() {
	const { currency } = useCurrency();
	const { wncgPrice } = useWNCGPrice();
	const { getAveragePrice } = useProducts();
	// Calculate average price per item type
	const averagePrices = createMemo(() => {
		return ITEM_TYPES.map((item) =>
			getAveragePrice(item.itemId, currency()),
		).filter((r) => r !== null);
	});

	// Calculate NCG price equivalent
	const calculateNCGPrice = (price: number | undefined) => {
		if (!price) return null;
		const currentWNCGPrice = wncgPrice();
		if (!currentWNCGPrice) return null;
		return (price / currentWNCGPrice).toFixed(2);
	};

	return (
		<Suspense>
			<div class="bg-white rounded-lg shadow-sm p-4 mb-6">
				<h3 class="text-lg font-semibold text-gray-800 mb-3">
					Average Prices (per unit)
				</h3>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
					<For each={averagePrices()}>
						{(item) => (
							<div class="bg-gray-50 p-3 rounded-md border border-gray-100">
								<div class="flex justify-between items-center">
									<span class="text-gray-700">
										{SHEET_ID_MAP[item.sheetId]}
									</span>
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
		</Suspense>
	);
}

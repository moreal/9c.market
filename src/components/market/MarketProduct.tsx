import { createMemo, Show } from "solid-js";
import { useCurrency } from "~/contexts/CurrencyContext";
import { useWNCGPrice } from "~/contexts/WNCGPriceContext";
import type { ItemProduct } from "~/types/market.zod";
import { SHEET_ID_MAP } from "~/utils/sheet_ids";
import HeroiconsOutlineCurrencyDollar from "~icons/heroicons-outline/currency-dollar";
import HeroiconsOutlineTag from "~icons/heroicons-outline/tag";
import HeroiconsOutlineExternalLink from "~icons/heroicons-outline/external-link";
import HeroiconsOutlineTrendingDown from "~icons/heroicons-outline/trending-down";
import HeroiconsOutlineTrendingUp from "~icons/heroicons-outline/trending-up";
import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";
import { useProducts } from "~/contexts/ProductsContext";
import { DECIMALS_BY_CURRENCY, EXCHANGE_RATE_BY_CURRENCY } from "~/constants";

const NCSCAN_BY_NETWORK: Readonly<Record<NetworkType, string>> = {
	heimdall: "https://heimdall.9cscan.com",
	odin: "https://9cscan.com",
};

export function MarketProduct(props: {
	product: ItemProduct;
}) {
	const { network } = useNetwork();
	const { currency } = useCurrency();
	const { wncgPrice } = useWNCGPrice();
	const { getAveragePrice } = useProducts();

	const iapPriceComparison = createMemo(() => {
		const result = getAveragePrice(props.product.itemId, currency());
		if (result === null) return null;

		const price = wncgPrice();
		if (price === null || price === undefined) return null;

		const percent =
			100 - (props.product.unitPrice / (result.averagePrice / price)) * 100;

		if (percent < 0) {
			return {
				percent: Math.abs(percent),
				cheaper: false,
			};
		}

		return {
			percent,
			cheaper: true,
		};
	});

	return (
		<Show when={!wncgPrice.error && !wncgPrice.loading && wncgPrice()}>
			<div class="bg-white border rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden mb-3 animate-[fadeIn_0.3s_ease-in-out]">
				<div class="p-3">
					<div class="flex justify-between items-center mb-2">
						<div class="flex items-center">
							<span class="ml-2 font-semibold text-gray-800">
								{SHEET_ID_MAP[props.product.itemId] || props.product.itemId}
							</span>
							<span class="font-light text-indigo-800 pl-1 pr-1 py-0.5 rounded-full text-sm">
								x
							</span>
							<span class="font-bold text-indigo-800 py-0.5 rounded-full text-sm">
								{props.product.quantity}
							</span>
						</div>
						<div class="flex items-center gap-2">
							<a
								href={`${NCSCAN_BY_NETWORK[network()]}/address/0x${props.product.sellerAgentAddress}`}
								class="text-gray-500 hover:text-gray-700 text-xs hover:underline flex items-center"
								target="_blank"
								rel="noopener noreferrer"
							>
								<HeroiconsOutlineExternalLink class="stroke-2 h-3 w-3 mr-0.5" />
								Agent (0x{props.product.sellerAgentAddress.substring(0, 6)})
							</a>
							<a
								href={`${NCSCAN_BY_NETWORK[network()]}/avatar/0x${props.product.sellerAvatarAddress}`}
								class="text-gray-500 hover:text-gray-700 text-xs hover:underline flex items-center"
								target="_blank"
								rel="noopener noreferrer"
							>
								<HeroiconsOutlineExternalLink class="stroke-2 h-3 w-3 mr-0.5" />
								Avatar (0x{props.product.sellerAvatarAddress.substring(0, 6)})
							</a>
						</div>
					</div>
					<div class="grid grid-cols-3 gap-2 bg-gray-50 rounded-md p-2">
						<div class="flex items-center">
							<HeroiconsOutlineCurrencyDollar class="stroke-2 h-4 w-4 text-amber-500 mr-1.5" />
							<div>
								<span class="text-xs text-gray-500">Price</span>
								<div class="font-bold text-gray-900 text-sm">
									{(props.product.price * wncgPrice()).toFixed(
										DECIMALS_BY_CURRENCY[currency()],
									)}{" "}
									{currency()}{" "}
									<span class="font-medium text-xs text-gray-700">
										({props.product.price} NCG)
									</span>
								</div>
							</div>
						</div>

						<div class="flex items-center">
							<HeroiconsOutlineTag class="stroke-2 h-4 w-4 text-sky-500 mr-1.5" />
							<div>
								<span class="text-xs text-gray-500">Unit Price</span>
								<div class="font-bold text-gray-900 text-sm">
									{(props.product.unitPrice * wncgPrice()).toFixed(
										DECIMALS_BY_CURRENCY[currency()] + 2,
									)}{" "}
									{currency()}{" "}
									<span class="font-medium text-xs text-gray-700">
										({props.product.unitPrice} NCG)
									</span>
								</div>
							</div>
						</div>
						<Show when={iapPriceComparison()}>
							<div class="flex items-center">
								{iapPriceComparison()?.cheaper ? (
									<HeroiconsOutlineTrendingDown class="stroke-2 h-4 w-4 text-green-500 mr-1.5" />
								) : (
									<HeroiconsOutlineTrendingUp class="stroke-2 h-4 w-4 text-orange-500 mr-1.5" />
								)}
								<div>
									<span class="text-xs text-gray-500">Compare with IAP</span>
									<div
										class={`font-semibold ${iapPriceComparison()?.cheaper ? "text-green-600" : "text-orange-600"} text-sm transition-all duration-300`}
									>
										{iapPriceComparison()?.percent.toFixed(2)}%{" "}
										{iapPriceComparison()?.cheaper ? "cheaper" : "expensive"}{" "}
										than IAP
									</div>
								</div>
							</div>
						</Show>
					</div>
				</div>
			</div>
		</Show>
	);
}

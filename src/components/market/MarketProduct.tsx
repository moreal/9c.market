import { createMemo, Show } from "solid-js";

import { useCurrency, type CurrencyType } from "~/contexts/CurrencyContext";
import { useWNCGPrice } from "~/contexts/WNCGPriceContext";
import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";
import { useProducts } from "~/contexts/ProductsContext";
import { DECIMALS_BY_CURRENCY } from "~/constants";
import type { ItemProduct } from "~/types/market";
import { SHEET_ID_MAP } from "~/constants";

import HeroiconsOutlineCurrencyDollar from "~icons/heroicons-outline/currency-dollar";
import HeroiconsOutlineTag from "~icons/heroicons-outline/tag";
import HeroiconsOutlineExternalLink from "~icons/heroicons-outline/external-link";
import HeroiconsOutlineTrendingDown from "~icons/heroicons-outline/trending-down";
import HeroiconsOutlineTrendingUp from "~icons/heroicons-outline/trending-up";

// Constants
const NCSCAN_BY_NETWORK: Readonly<Record<NetworkType, string>> = {
	heimdall: "https://heimdall.9cscan.com",
	odin: "https://9cscan.com",
};

const ADDRESS_SHORT_LENGTH = 6;
const PRICE_DECIMAL_OFFSET = 2;

// Price Display Component
function PriceDisplay(props: {
	label: string;
	price: number;
	unitPrice: number;
	currency: CurrencyType;
	wncgPrice: number;
	icon: any;
	iconColor: string;
}) {
	return (
		<div class="flex items-center">
			<props.icon class={`stroke-2 h-4 w-4 ${props.iconColor} mr-1.5`} />
			<div>
				<span class="text-xs text-gray-500">{props.label}</span>
				<div class="font-bold text-gray-900 text-sm">
					{(props.price * props.wncgPrice).toFixed(
						DECIMALS_BY_CURRENCY[props.currency],
					)}{" "}
					{props.currency}{" "}
					<span class="font-medium text-xs text-gray-700">
						({props.price} NCG)
					</span>
				</div>
			</div>
		</div>
	);
}

// IAP Comparison Component
function IAPComparison(props: {
	comparison: { percent: number; cheaper: boolean } | null;
}) {
	return (
		<Show when={props.comparison}>
			{(comparison) => (
				<div class="flex items-center">
					{comparison().cheaper ? (
						<HeroiconsOutlineTrendingDown class="stroke-2 h-4 w-4 text-green-500 mr-1.5" />
					) : (
						<HeroiconsOutlineTrendingUp class="stroke-2 h-4 w-4 text-orange-500 mr-1.5" />
					)}
					<div>
						<span class="text-xs text-gray-500">Compare with IAP</span>
						<div
							class={`font-semibold ${comparison().cheaper ? "text-green-600" : "text-orange-600"} text-sm transition-all duration-300`}
						>
							{comparison().percent.toFixed(2)}%{" "}
							{comparison().cheaper ? "cheaper" : "expensive"} than IAP
						</div>
					</div>
				</div>
			)}
		</Show>
	);
}

// Address Link Component
function AddressLink(props: {
	network: NetworkType;
	address: string;
	label: string;
}) {
	return (
		<a
			href={`${NCSCAN_BY_NETWORK[props.network]}/address/0x${props.address}`}
			class="text-gray-500 hover:text-gray-700 text-xs hover:underline flex items-center"
			target="_blank"
			rel="noopener noreferrer"
		>
			<HeroiconsOutlineExternalLink class="stroke-2 h-3 w-3 mr-0.5" />
			{props.label} (0x{props.address.substring(0, ADDRESS_SHORT_LENGTH)})
		</a>
	);
}

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
		<Show when={wncgPrice()}>
			{(wncgPrice) => (
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
								<AddressLink
									network={network()}
									address={props.product.sellerAgentAddress}
									label="Agent"
								/>
								<AddressLink
									network={network()}
									address={props.product.sellerAvatarAddress}
									label="Avatar"
								/>
							</div>
						</div>
						<div class="grid grid-cols-3 gap-2 bg-gray-50 rounded-md p-2">
							<PriceDisplay
								label="Price"
								price={props.product.price}
								unitPrice={props.product.unitPrice}
								currency={currency()}
								wncgPrice={wncgPrice()}
								icon={HeroiconsOutlineCurrencyDollar}
								iconColor="text-amber-500"
							/>
							<PriceDisplay
								label="Unit Price"
								price={props.product.unitPrice}
								unitPrice={props.product.unitPrice}
								currency={currency()}
								wncgPrice={wncgPrice()}
								icon={HeroiconsOutlineTag}
								iconColor="text-sky-500"
							/>
							<IAPComparison comparison={iapPriceComparison()} />
						</div>
					</div>
				</div>
			)}
		</Show>
	);
}

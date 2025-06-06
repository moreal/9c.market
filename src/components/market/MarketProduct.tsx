import { createMemo, Show } from "solid-js";

import { useCurrency } from "~/contexts/CurrencyContext";
import { useWNCGPrice } from "~/contexts/WNCGPriceContext";
import { useNetwork } from "~/contexts/NetworkContext";
import { useProducts } from "~/contexts/ProductsContext";
import { SHEET_ID_MAP } from "~/constants";
import type { ItemProduct } from "~/types/market";
import { PriceFormatter } from "~/utils/PriceFormatter";
import { PriceDisplay } from "~/components/market/PriceDisplay";
import { IAPComparison } from "~/components/market/IAPComparison";
import { AddressLink } from "~/components/market/AddressLink";

import HeroiconsOutlineCurrencyDollar from "~icons/heroicons-outline/currency-dollar";
import HeroiconsOutlineTag from "~icons/heroicons-outline/tag";

/**
 * Market product component
 * Follows SRP by focusing only on displaying market product information
 */
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

		return PriceFormatter.calculatePriceComparison(
			props.product.unitPrice,
			result.averagePrice,
			price,
		);
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

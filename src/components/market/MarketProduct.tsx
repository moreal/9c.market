import { createMemo, Show } from "solid-js";

import { useCurrency } from "~/contexts/CurrencyContext";
import { useWNCGPrice } from "~/contexts/WNCGPriceContext";
import { useNetwork } from "~/contexts/NetworkContext";
import { useProducts } from "~/contexts/ProductsContext";
import type { ItemProduct } from "~/types/market";
import { PriceFormatter } from "~/utils/PriceFormatter";
import { MoneyFactory } from "~/types/Money";
import { ProductHeader } from "./ProductHeader";
import { ProductPriceGrid } from "./ProductPriceGrid";

/**
 * Props for MarketProduct component
 */
interface MarketProductProps {
	product: ItemProduct;
}

/**
 * Market product component
 * Follows SRP by focusing only on displaying market product information
 */
export function MarketProduct(props: MarketProductProps) {
	const { network } = useNetwork();
	const { currency } = useCurrency();
	const { wncgPrice } = useWNCGPrice();
	const { getAveragePrice } = useProducts();

	/**
	 * Calculates IAP price comparison for the product
	 */
	const iapPriceComparison = createMemo(() => {
		const result = getAveragePrice(props.product.itemId, currency());
		if (result === null) return null;

		const price = wncgPrice();
		if (price === null || price === undefined) return null;

		// Convert to Money types for the new API
		const averagePriceMoney = MoneyFactory.create(
			result.averagePrice,
			currency(),
		);
		const wncgPriceMoney = MoneyFactory.create(price, currency());

		return PriceFormatter.calculateMoneyPriceComparison(
			props.product.unitPrice,
			averagePriceMoney,
			wncgPriceMoney,
		);
	});

	return (
		<Show when={wncgPrice()}>
			{(wncgPrice) => (
				<div class="bg-white border rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden mb-3 animate-[fadeIn_0.3s_ease-in-out]">
					<div class="p-3">
						<ProductHeader
							itemId={props.product.itemId}
							quantity={props.product.quantity}
							network={network()}
							sellerAgentAddress={props.product.sellerAgentAddress}
							sellerAvatarAddress={props.product.sellerAvatarAddress}
						/>
						<ProductPriceGrid
							product={props.product}
							currency={currency()}
							wncgPrice={wncgPrice()}
							iapComparison={iapPriceComparison()}
						/>
					</div>
				</div>
			)}
		</Show>
	);
}

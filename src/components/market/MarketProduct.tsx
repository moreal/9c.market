import { createMemo, Show } from "solid-js";

import { useCurrency, type CurrencyTicker } from "~/contexts/CurrencyContext";
import { useWNCGPrice } from "~/contexts/WNCGPriceContext";
import { useNetwork, type NetworkType } from "~/contexts/NetworkContext";
import { useProducts } from "~/contexts/ProductsContext";
import { SHEET_ID_MAP } from "~/constants";
import type { ItemProduct } from "~/types/market";
import { PriceFormatter } from "~/utils/PriceFormatter";
import { MoneyFactory } from "~/types/Money";
import { PriceDisplay } from "~/components/market/PriceDisplay";
import { IAPComparison } from "~/components/market/IAPComparison";
import { AddressLink } from "~/components/market/AddressLink";

import HeroiconsOutlineCurrencyDollar from "~icons/heroicons-outline/currency-dollar";
import HeroiconsOutlineTag from "~icons/heroicons-outline/tag";

/**
 * Props for MarketProduct component
 */
interface MarketProductProps {
	product: ItemProduct;
}

/**
 * Props for ProductHeader component
 */
interface ProductHeaderProps {
	itemId: number;
	quantity: number;
	network: NetworkType;
	sellerAgentAddress: string;
	sellerAvatarAddress: string;
}

/**
 * Props for ProductPriceGrid component
 */
interface ProductPriceGridProps {
	product: ItemProduct;
	currency: CurrencyTicker;
	wncgPrice: number;
	iapComparison: ReturnType<
		typeof PriceFormatter.calculateMoneyPriceComparison
	> | null;
}

/**
 * Product header component showing item name, quantity and seller addresses
 */
function ProductHeader(props: ProductHeaderProps) {
	return (
		<div class="flex justify-between items-center mb-2">
			<div class="flex items-center">
				<span class="ml-2 font-semibold text-gray-800">
					{SHEET_ID_MAP[props.itemId] || props.itemId}
				</span>
				<span class="font-light text-indigo-800 pl-1 pr-1 py-0.5 rounded-full text-sm">
					x
				</span>
				<span class="font-bold text-indigo-800 py-0.5 rounded-full text-sm">
					{props.quantity}
				</span>
			</div>
			<div class="flex items-center gap-2">
				<AddressLink
					network={props.network}
					address={props.sellerAgentAddress}
					label="Agent"
				/>
				<AddressLink
					network={props.network}
					address={props.sellerAvatarAddress}
					label="Avatar"
				/>
			</div>
		</div>
	);
}

/**
 * Product price grid showing price, unit price and IAP comparison
 */
function ProductPriceGrid(props: ProductPriceGridProps) {
	return (
		<div class="grid grid-cols-3 gap-2 bg-gray-50 rounded-md p-2">
			<PriceDisplay
				label="Price"
				price={props.product.price}
				unitPrice={props.product.unitPrice}
				currency={props.currency}
				wncgPrice={props.wncgPrice}
				icon={HeroiconsOutlineCurrencyDollar}
				iconColor="text-amber-500"
			/>
			<PriceDisplay
				label="Unit Price"
				price={props.product.unitPrice}
				unitPrice={props.product.unitPrice}
				currency={props.currency}
				wncgPrice={props.wncgPrice}
				icon={HeroiconsOutlineTag}
				iconColor="text-sky-500"
			/>
			<IAPComparison comparison={props.iapComparison} />
		</div>
	);
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

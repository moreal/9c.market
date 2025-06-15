import type { CurrencyTicker } from "~/contexts/CurrencyContext";
import type { ItemProduct } from "~/types/market";
import type { PriceFormatter } from "~/utils/PriceFormatter";
import { PriceDisplay } from "./PriceDisplay";
import { IAPComparison } from "./IAPComparison";

import HeroiconsOutlineCurrencyDollar from "~icons/heroicons-outline/currency-dollar";
import HeroiconsOutlineTag from "~icons/heroicons-outline/tag";

/**
 * Props for ProductPriceGrid component
 */
export interface ProductPriceGridProps {
	product: ItemProduct;
	currency: CurrencyTicker;
	wncgPrice: number;
	iapComparison: ReturnType<
		typeof PriceFormatter.calculateMoneyPriceComparison
	> | null;
}

/**
 * Product price grid showing price, unit price and IAP comparison
 * Follows SRP by handling only price display layout
 */
export function ProductPriceGrid(props: ProductPriceGridProps) {
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

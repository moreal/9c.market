import type { Product } from "../../types/iap";
import { useCurrency } from "~/contexts/CurrencyContext";

type ProductPriceProps = {
	product: Product;
};

// KRW to some currencies.
const KRW_EXCHANGE_RATE_MAP: Record<string, number> = {
	USD: 0.00069,
};

export default function ProductPrice(props: ProductPriceProps) {
	const { product } = props;
	const { currency } = useCurrency();

	const definePriceMessage = () => {
		if (product.product_type === "MILEAGE") {
			if (product.mileage_price !== null) {
				return `${product.mileage_price} Mileage`;
			}

			return `${product.mileage} Mileage`;
		}

		if (product.product_type === "FREE") {
			return "FREE";
		}

		if (product.product_type === "IAP") {
			if (product.networkPrice === undefined) {
				return "Unknown Price";
			}
			if (
				product.networkPrice[currency()] === undefined &&
				product.networkPrice.KRW !== undefined &&
				KRW_EXCHANGE_RATE_MAP[currency()] !== undefined
			) {
				return `${product.networkPrice.KRW * KRW_EXCHANGE_RATE_MAP[currency()]} ${currency()}`;
			}

			return `${product.networkPrice[currency()]} ${currency()}`;
		}
	};

	return (
		<div class="flex items-center">
			<div class="text-right">
				<div class="text-lg font-bold text-gray-900">
					{definePriceMessage()}
				</div>
			</div>
		</div>
	);
}

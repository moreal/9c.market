import { DECIMALS_BY_CURRENCY, EXCHANGE_RATE_BY_CURRENCY } from "~/constants";
import type { Product } from "~/types/iap";
import { useCurrency } from "~/contexts/CurrencyContext";

type IAPProductPriceProps = {
	product: Product;
};

export default function IAPProductPrice(props: IAPProductPriceProps) {
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
				EXCHANGE_RATE_BY_CURRENCY[currency()] !== undefined
			) {
				return `(Guessed from KRW) ${(product.networkPrice.KRW / EXCHANGE_RATE_BY_CURRENCY[currency()]).toFixed(DECIMALS_BY_CURRENCY[currency()])} ${currency()}`;
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

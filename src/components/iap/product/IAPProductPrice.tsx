import { DECIMALS_BY_CURRENCY, EXCHANGE_RATE_BY_CURRENCY, SYMBOL_BY_CURRENCY } from "~/constants";
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
			if (product.usdPrice === undefined) {
				return "Unknown Price";
			}
			
			// If current currency is USD, show USD price directly
			if (currency() === "USD") {
				return `${SYMBOL_BY_CURRENCY.USD}${product.usdPrice.toFixed(DECIMALS_BY_CURRENCY.USD)} USD`;
			}
			
			// Convert USD to other currencies using exchange rate
			const convertedPrice = product.usdPrice * EXCHANGE_RATE_BY_CURRENCY.USD / EXCHANGE_RATE_BY_CURRENCY[currency()];
			return `(Guessed from USD) ${SYMBOL_BY_CURRENCY[currency()]}${convertedPrice.toFixed(DECIMALS_BY_CURRENCY[currency()])} ${currency()}`;
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

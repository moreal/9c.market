import { DECIMALS_BY_CURRENCY, SYMBOL_BY_CURRENCY } from "~/constants";
import type { Product } from "~/types/iap";
import { useCurrency } from "~/contexts/CurrencyContext";
import { getDIContainer } from "~/utils/DIContainer";
import { MoneyFactory } from "~/types/Money";

type IAPProductPriceProps = {
	product: Product;
};

export default function IAPProductPrice(props: IAPProductPriceProps) {
	const { product } = props;
	const { currency } = useCurrency();
	const { currencyConverter } = getDIContainer();

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

			// Convert USD to other currencies using the currency converter
			const usdMoney = MoneyFactory.createUSD(product.usdPrice);
			const convertedMoney = currencyConverter.convertFromUSD(
				usdMoney,
				currency(),
			);

			return (
				<span
					class="flex items-center gap-1 border-b border-dotted border-gray-400 cursor-help"
					title={`Guessed from USD, ${SYMBOL_BY_CURRENCY.USD}${product.usdPrice.toFixed(DECIMALS_BY_CURRENCY.USD)} USD`}
				>
					<span>🤔</span>
					<span>
						{SYMBOL_BY_CURRENCY[currency()]}
						{convertedMoney.decimal.toFixed(DECIMALS_BY_CURRENCY[currency()])}{" "}
						{currency()}
					</span>
				</span>
			);
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

import type { CurrencyTicker } from "~/types/Currency";
import type { Money, USDMoney } from "~/types/Money";
import { MoneyFactory } from "~/types/Money";

/**
 * Currency converter service for converting USD prices to other currencies
 *
 * This class handles currency conversion using exchange rates provided in the constructor.
 * It follows the Single Responsibility Principle by focusing solely on currency conversion logic.
 */
export class CurrencyConverter {
	private readonly exchangeRates: Readonly<Record<CurrencyTicker, number>>;

	/**
	 * Creates a new CurrencyConverter instance
	 *
	 * @param exchangeRates - Mapping of currency types to their exchange rates relative to USD
	 */
	constructor(exchangeRates: Readonly<Record<CurrencyTicker, number>>) {
		this.exchangeRates = exchangeRates;
	}

	/**
	 * Converts a USD price to the specified target currency
	 *
	 * @param usdMoney - The price in USD to convert
	 * @param targetCurrency - The target currency to convert to
	 * @returns A Money instance in the target currency
	 * @throws Error if the target currency is not supported
	 */
	convertFromUSD<TCurrency extends CurrencyTicker>(
		usdMoney: USDMoney,
		targetCurrency: TCurrency,
	): Money<TCurrency> {
		if (targetCurrency === "USD") {
			return usdMoney as Money<TCurrency>;
		}

		const exchangeRate = this.exchangeRates[targetCurrency];
		if (exchangeRate === undefined) {
			throw new Error(`Unsupported currency: ${targetCurrency}`);
		}

		const convertedAmount = usdMoney.decimal * exchangeRate;
		return MoneyFactory.create(convertedAmount, targetCurrency);
	}

	/**
	 * Legacy method for backward compatibility
	 * @deprecated Use convertFromUSD with Money type instead
	 *
	 * @param usdPrice - The price in USD to convert
	 * @param targetCurrency - The target currency to convert to
	 * @returns The converted price in the target currency
	 */
	convertFromUSDLegacy(
		usdPrice: number,
		targetCurrency: CurrencyTicker,
	): number {
		const usdMoney = MoneyFactory.createUSD(usdPrice);
		const convertedMoney = this.convertFromUSD(usdMoney, targetCurrency);
		return convertedMoney.decimal;
	}

	/**
	 * Checks if a currency is supported by this converter
	 *
	 * @param currency - The currency to check
	 * @returns True if the currency is supported, false otherwise
	 */
	isSupportedCurrency(currency: CurrencyTicker): boolean {
		return currency in this.exchangeRates;
	}

	/**
	 * Gets all supported currencies
	 *
	 * @returns Array of supported currency types
	 */
	getSupportedCurrencies(): CurrencyTicker[] {
		return Object.keys(this.exchangeRates) as CurrencyTicker[];
	}
}

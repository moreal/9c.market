import type { Money, USDMoney } from "~/types/Money";
import type { CurrencyTicker } from "~/types/Currency";
import { MoneyUtils } from "~/types/Money";
import { DECIMALS_BY_CURRENCY } from "~/constants";

/**
 * Type for price comparison result
 */
export interface PriceComparisonResult {
	percent: number;
	cheaper: boolean;
}

/**
 * Price formatting utilities
 * Follows SRP by handling only price formatting logic
 * Provides consistent price formatting across the application
 */
export const PriceFormatter = {
	/**
	 * Formats a Money instance with appropriate decimal places
	 * @param money - The Money instance to format
	 * @returns Formatted price string with proper decimal places
	 * @example
	 * formatMoney(MoneyFactory.createUSD(123.456)) // returns "123.4560"
	 * formatMoney(MoneyFactory.create(123.456, "KRW")) // returns "123"
	 */
	formatMoney<T extends CurrencyTicker>(money: Money<T>): string {
		if (typeof money.decimal !== "number" || !Number.isFinite(money.decimal)) {
			return "0";
		}
		return money.decimal.toFixed(money.currency.decimalPlaces);
	},

	/**
	 * Formats a Money instance with currency symbol
	 * @param money - The Money instance to format
	 * @returns Formatted price string with currency symbol and ticker
	 * @example
	 * formatMoneyWithSymbol(MoneyFactory.createUSD(123.456)) // returns "$123.4560 USD"
	 */
	formatMoneyWithSymbol<T extends CurrencyTicker>(money: Money<T>): string {
		return `${money.currency.symbol}${this.formatMoney(money)} ${money.currency.ticker}`;
	},

	/**
	 * Legacy method: Formats price with appropriate decimal places for the given currency
	 * @deprecated Use formatMoney instead for better type safety
	 * @param price - The price value to format
	 * @param currency - The currency type for formatting
	 * @returns Formatted price string with proper decimal places
	 * @example
	 * formatPrice(123.456, "USD") // returns "123.4560"
	 * formatPrice(123.456, "KRW") // returns "123"
	 */
	formatPrice(price: number, currency: CurrencyTicker): string {
		if (typeof price !== "number" || !Number.isFinite(price)) {
			return "0";
		}
		return price.toFixed(DECIMALS_BY_CURRENCY[currency]);
	},

	/**
	 * Formats Money instance with WNCG conversion to the target currency
	 * @param wncgAmount - The amount in WNCG as number
	 * @param wncgPrice - The current WNCG price as Money instance
	 * @returns Formatted Money instance in target currency
	 * @example
	 * formatMoneyWithWNCG(10, MoneyFactory.createUSD(1.5)) // returns Money<"USD"> with 15.0
	 */
	formatMoneyWithWNCG<T extends CurrencyTicker>(
		wncgAmount: number,
		wncgPrice: Money<T>,
	): Money<T> {
		if (
			typeof wncgAmount !== "number" ||
			!Number.isFinite(wncgAmount) ||
			typeof wncgPrice.decimal !== "number" ||
			!Number.isFinite(wncgPrice.decimal)
		) {
			return {
				decimal: 0,
				currency: wncgPrice.currency,
			};
		}

		const convertedAmount = wncgAmount * wncgPrice.decimal;
		return {
			decimal: convertedAmount,
			currency: wncgPrice.currency,
		};
	},

	/**
	 * Legacy method: Formats price with WNCG conversion to the target currency
	 * @deprecated Use formatMoneyWithWNCG instead for better type safety
	 * @param price - The price in WNCG
	 * @param wncgPrice - The current WNCG price in target currency
	 * @param currency - The target currency type
	 * @returns Formatted price string in target currency
	 * @example
	 * formatPriceWithWNCG(10, 1.5, "USD") // returns "15.0000"
	 */
	formatPriceWithWNCG(
		price: number,
		wncgPrice: number,
		currency: CurrencyTicker,
	): string {
		if (
			typeof price !== "number" ||
			typeof wncgPrice !== "number" ||
			!Number.isFinite(price) ||
			!Number.isFinite(wncgPrice)
		) {
			return this.formatPrice(0, currency);
		}

		const convertedPrice = price * wncgPrice;
		return this.formatPrice(convertedPrice, currency);
	},

	/**
	 * Calculates price comparison percentage between current and average prices using Money instances
	 * @param currentWNCGAmount - The current price in WNCG as number
	 * @param averagePrice - The average price as Money instance
	 * @param wncgPrice - The current WNCG price as Money instance (same currency as averagePrice)
	 * @returns Comparison result with percentage and cheaper flag, or null if calculation fails
	 * @example
	 * calculateMoneyPriceComparison(10, avgPrice, wncgPrice) // returns { percent: 25, cheaper: true }
	 */
	calculateMoneyPriceComparison<T extends CurrencyTicker>(
		currentWNCGAmount: number,
		averagePrice: Money<T>,
		wncgPrice: Money<T>,
	): PriceComparisonResult | null {
		// Validate inputs
		if (
			!this.isValidPrice(currentWNCGAmount) ||
			!this.isValidPrice(averagePrice.decimal) ||
			!this.isValidPrice(wncgPrice.decimal)
		) {
			return null;
		}

		// Ensure currencies match
		if (averagePrice.currency.ticker !== wncgPrice.currency.ticker) {
			return null;
		}

		// Avoid division by zero
		if (averagePrice.decimal === 0 || wncgPrice.decimal === 0) {
			return null;
		}

		const currentPriceInCurrency = currentWNCGAmount * wncgPrice.decimal;
		const percent = 100 - (currentPriceInCurrency / averagePrice.decimal) * 100;

		return {
			percent: Math.abs(percent),
			cheaper: percent >= 0,
		};
	},

	/**
	 * Legacy method: Calculates price comparison percentage between current and average price
	 * @deprecated Use calculateMoneyPriceComparison instead for better type safety
	 * @param currentPrice - The current price in WNCG
	 * @param averagePrice - The average price in target currency
	 * @param wncgPrice - The current WNCG price in target currency
	 * @returns Comparison result with percentage and cheaper flag, or null if calculation fails
	 * @example
	 * calculatePriceComparison(10, 20, 1.5) // returns { percent: 25, cheaper: true }
	 */
	calculatePriceComparison(
		currentPrice: number,
		averagePrice: number,
		wncgPrice: number,
	): PriceComparisonResult | null {
		// Validate inputs
		if (
			!this.isValidPrice(currentPrice) ||
			!this.isValidPrice(averagePrice) ||
			!this.isValidPrice(wncgPrice)
		) {
			return null;
		}

		// Avoid division by zero
		if (averagePrice === 0 || wncgPrice === 0) {
			return null;
		}

		const currentPriceInCurrency = currentPrice * wncgPrice;
		const percent = 100 - (currentPriceInCurrency / averagePrice) * 100;

		return {
			percent: Math.abs(percent),
			cheaper: percent >= 0,
		};
	},

	/**
	 * Validates if a Money instance is valid for calculations
	 * @param money - The Money instance to validate
	 * @returns True if Money instance is valid with finite positive decimal amount
	 */
	isValidMoney<T extends CurrencyTicker>(money: Money<T>): boolean {
		return (
			money?.currency &&
			typeof money.decimal === "number" &&
			Number.isFinite(money.decimal) &&
			money.decimal >= 0
		);
	},

	/**
	 * Validates if a price value is valid for calculations
	 * @param price - The price value to validate
	 * @returns True if price is a valid, finite number
	 */
	isValidPrice(price: number): boolean {
		return typeof price === "number" && Number.isFinite(price) && price >= 0;
	},

	/**
	 * Formats percentage with appropriate precision
	 * @param percentage - The percentage value to format
	 * @param decimalPlaces - Number of decimal places (default: 1)
	 * @returns Formatted percentage string
	 * @example
	 * formatPercentage(25.678) // returns "25.7%"
	 */
	formatPercentage(percentage: number, decimalPlaces = 1): string {
		if (!this.isValidPrice(percentage)) {
			return "0%";
		}
		return `${percentage.toFixed(decimalPlaces)}%`;
	},
} as const;

import type { Money, USDMoney } from "~/types/Money";
import type { CurrencyTicker } from "~/types/Currency";
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
	 * Validates if a price value is valid for calculations
	 * @param price - The price value to validate
	 * @returns True if price is a valid, finite number
	 */
	isValidPrice(price: number): boolean {
		return typeof price === "number" && Number.isFinite(price) && price >= 0;
	},
} as const;

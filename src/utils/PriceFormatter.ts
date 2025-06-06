import type { CurrencyType } from "~/contexts/CurrencyContext";
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
	 * Formats price with appropriate decimal places for the given currency
	 * @param price - The price value to format
	 * @param currency - The currency type for formatting
	 * @returns Formatted price string with proper decimal places
	 * @example
	 * formatPrice(123.456, "USD") // returns "123.46"
	 * formatPrice(123.456, "KRW") // returns "123"
	 */
	formatPrice(price: number, currency: CurrencyType): string {
		if (typeof price !== "number" || !Number.isFinite(price)) {
			return "0";
		}
		return price.toFixed(DECIMALS_BY_CURRENCY[currency]);
	},

	/**
	 * Formats price with WNCG conversion to the target currency
	 * @param price - The price in WNCG
	 * @param wncgPrice - The current WNCG price in target currency
	 * @param currency - The target currency type
	 * @returns Formatted price string in target currency
	 * @example
	 * formatPriceWithWNCG(10, 1.5, "USD") // returns "15.00"
	 */
	formatPriceWithWNCG(
		price: number,
		wncgPrice: number,
		currency: CurrencyType,
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
	 * Calculates price comparison percentage between current and average price
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

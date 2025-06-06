import type { CurrencyType } from "~/contexts/CurrencyContext";
import { DECIMALS_BY_CURRENCY } from "~/constants";

/**
 * Price formatting utilities
 * Follows SRP by handling only price formatting logic
 */
export const PriceFormatter = {
	/**
	 * Formats price with currency and decimal places
	 */
	formatPrice(price: number, currency: CurrencyType): string {
		return price.toFixed(DECIMALS_BY_CURRENCY[currency]);
	},

	/**
	 * Formats price with WNCG conversion
	 */
	formatPriceWithWNCG(
		price: number,
		wncgPrice: number,
		currency: CurrencyType,
	): string {
		const convertedPrice = price * wncgPrice;
		return this.formatPrice(convertedPrice, currency);
	},

	/**
	 * Calculates price comparison percentage
	 */
	calculatePriceComparison(
		currentPrice: number,
		averagePrice: number,
		wncgPrice: number,
	): { percent: number; cheaper: boolean } | null {
		if (!averagePrice || !wncgPrice) return null;

		const percent = 100 - (currentPrice / (averagePrice / wncgPrice)) * 100;

		return {
			percent: Math.abs(percent),
			cheaper: percent >= 0,
		};
	},
} as const;

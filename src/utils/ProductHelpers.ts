import type { Product } from "~/types/iap";
import type { CurrencyTicker } from "~/types/Currency";
import { EXCHANGE_RATE_BY_CURRENCY } from "~/constants";

// Constants for average price calculation
const SINGLE_FUNGIBLE_ITEM_COUNT = 1;
const MINIMUM_AMOUNT = 0;

/**
 * Result type for average price calculation
 */
export interface AveragePriceResult {
	averagePrice: number;
	amount: number;
	sheetId: number;
}

/**
 * Helper functions for product filtering and price calculation
 * Follows SRP by focusing only on product-related utility functions
 *
 * @example
 * ```typescript
 * // Filter products for price calculation
 * const eligibleProducts = ProductHelpers.getEligibleProducts(products, 12345);
 *
 * // Calculate average price
 * const result = ProductHelpers.calculateAveragePrice(product, 'USD', 12345);
 * ```
 */
export const ProductHelpers = {
	/**
	 * Checks if product has single fungible item
	 * @param product - The product to check
	 * @returns true if product has exactly one fungible item
	 */
	isSingleFungibleItem(product: Product): boolean {
		return product.fungible_item_list.length === SINGLE_FUNGIBLE_ITEM_COUNT;
	},

	/**
	 * Checks if product has valid USD price
	 * @param product - The product to check
	 * @returns true if product has a valid USD price greater than 0
	 */
	hasValidPrice(product: Product): boolean {
		return product.usdPrice !== undefined && product.usdPrice > 0;
	},

	/**
	 * Checks if product matches the given sheet ID
	 * @param product - The product to check
	 * @param sheetId - The sheet ID to match against
	 * @returns true if the first fungible item matches the sheet ID
	 */
	hasMatchingSheetId(product: Product, sheetId: number): boolean {
		return product.fungible_item_list[0]?.sheet_item_id === sheetId;
	},

	/**
	 * Filters products eligible for average price calculation
	 * @param products - Array of products to filter
	 * @param sheetId - Sheet ID to match against
	 * @returns Array of products that meet all eligibility criteria
	 */
	getEligibleProducts(products: Product[], sheetId: number): Product[] {
		return products.filter(
			(product) =>
				this.isSingleFungibleItem(product) &&
				this.hasValidPrice(product) &&
				this.hasMatchingSheetId(product, sheetId),
		);
	},

	/**
	 * Calculates average price for a product in the specified currency
	 * @param product - The product to calculate price for
	 * @param currency - Target currency for price calculation
	 * @param sheetId - Sheet ID for the result
	 * @returns Average price result or null if calculation fails
	 */
	calculateAveragePrice(
		product: Product,
		currency: CurrencyTicker,
		sheetId: number,
	): AveragePriceResult | null {
		const amount = product.fungible_item_list[0]?.amount || MINIMUM_AMOUNT;
		const usdPrice = product.usdPrice;

		if (amount <= MINIMUM_AMOUNT || !usdPrice) {
			return null;
		}

		const exchangeRate = EXCHANGE_RATE_BY_CURRENCY[currency];
		const averagePrice = (usdPrice * exchangeRate) / amount;

		return {
			averagePrice,
			sheetId,
			amount,
		};
	},
};

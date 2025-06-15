import type { IProductSortService } from "~/interfaces/IMarketProductService";
import type { ItemProduct } from "~/types/market";
import {
	ProductSorter,
	type IProductSortStrategy,
} from "~/utils/ProductSorter";
import { SortServiceError, ErrorHandler } from "~/utils/ErrorHandler";

/**
 * Concrete implementation of product sort service
 * Follows SRP by handling only sorting concerns
 * Follows OCP by using strategy pattern for extensibility
 * Includes comprehensive error handling
 */
export class ProductSortService implements IProductSortService {
	constructor(private readonly strategy: IProductSortStrategy) {
		if (!strategy) {
			throw new SortServiceError("Sort strategy is required");
		}
	}

	sort(products: ItemProduct[]): ItemProduct[] {
		try {
			if (!Array.isArray(products)) {
				throw new SortServiceError("Products must be an array");
			}

			if (products.length === 0) {
				return products;
			}

			return this.strategy.sort(products);
		} catch (error) {
			if (error instanceof SortServiceError) {
				throw error;
			}

			throw new SortServiceError(
				`Failed to sort products: ${ErrorHandler.getUserFriendlyMessage(error)}`,
			);
		}
	}
}

/**
 * Factory for creating sort services with different strategies
 * Follows OCP by allowing new strategies without modification
 */
export const ProductSortServiceFactory = {
	createUnitPriceSorter: (): ProductSortService => {
		return new ProductSortService(ProductSorter.getStrategy("unitPrice"));
	},

	createPriceSorter: (): ProductSortService => {
		return new ProductSortService(ProductSorter.getStrategy("price"));
	},

	createQuantitySorter: (): ProductSortService => {
		return new ProductSortService(ProductSorter.getStrategy("quantity"));
	},
};

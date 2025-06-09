import type { ItemProduct } from "~/types/market";

/**
 * Interface for product sorting strategies
 * Follows OCP by allowing extension without modification
 */
export interface IProductSortStrategy {
	sort(products: ItemProduct[]): ItemProduct[];
}

/**
 * Sort by unit price strategy
 */
export class SortByUnitPriceStrategy implements IProductSortStrategy {
	sort(products: ItemProduct[]): ItemProduct[] {
		return products.toSorted((a, b) => a.unitPrice - b.unitPrice);
	}
}

/**
 * Sort by price strategy
 */
export class SortByPriceStrategy implements IProductSortStrategy {
	sort(products: ItemProduct[]): ItemProduct[] {
		return products.toSorted((a, b) => a.price - b.price);
	}
}

/**
 * Sort by quantity strategy
 */
export class SortByQuantityStrategy implements IProductSortStrategy {
	sort(products: ItemProduct[]): ItemProduct[] {
		return products.toSorted((a, b) => b.quantity - a.quantity);
	}
}

const STRATEGIES = {
	unitPrice: new SortByUnitPriceStrategy(),
	price: new SortByPriceStrategy(),
	quantity: new SortByQuantityStrategy(),
} as const;

/**
 * Product sorting utilities
 * Follows SRP by handling only product sorting logic
 * Follows OCP by using strategy pattern for extensibility
 */
export const ProductSorter = {
	/**
	 * Sorts products using the specified strategy
	 */
	sort(
		products: ItemProduct[],
		sortBy: keyof typeof STRATEGIES,
	): ItemProduct[] {
		const strategy = STRATEGIES[sortBy];
		return strategy.sort(products);
	},

	/**
	 * Gets a specific sorting strategy
	 * Follows OCP by allowing access to strategies for composition
	 */
	getStrategy(sortBy: keyof typeof STRATEGIES): IProductSortStrategy {
		return STRATEGIES[sortBy];
	},
} as const;

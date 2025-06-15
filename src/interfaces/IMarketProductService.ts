import type { Accessor, Component } from "solid-js";
import type { ItemProduct, MarketItemProductsResponse } from "~/types/market";
import type { NetworkType } from "~/contexts/NetworkContext";
import type { ItemSubType } from "~/types/item";

/**
 * Interface for market product data service
 * Follows DIP by defining abstraction instead of depending on concrete implementation
 */
export interface IMarketProductService {
	/**
	 * Fetches market products for given network and item subtype
	 */
	fetchProducts(
		network: NetworkType,
		itemSubType: ItemSubType,
	): Promise<MarketItemProductsResponse>;
}

/**
 * Interface for product sorting service
 * Follows OCP by allowing new sorting strategies without modifying existing code
 */
export interface IProductSortService {
	/**
	 * Sorts products using the configured strategy
	 */
	sort(products: ItemProduct[]): ItemProduct[];
}

/**
 * Interface for product list renderer component
 * Follows SRP by focusing only on rendering concerns
 */
export type IProductListRenderer = Component<{
	products: Accessor<ItemProduct[]>;
}>;

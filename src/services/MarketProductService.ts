import type { IMarketProductService } from "~/interfaces/IMarketProductService";
import type { MarketItemProductsResponse } from "~/types/market";
import type { NetworkType } from "~/contexts/NetworkContext";
import type { ItemSubType } from "~/types/item";
import { fetchItemProductsQuery } from "~/queries/MarketQueries";

/**
 * Concrete implementation of market product service
 * Follows SRP by handling only data fetching concerns
 */
export class MarketProductService implements IMarketProductService {
	async fetchProducts(
		network: NetworkType,
		itemSubType: ItemSubType,
	): Promise<MarketItemProductsResponse> {
		return await fetchItemProductsQuery(network, itemSubType);
	}
}

/**
 * Singleton instance for dependency injection
 */
export const marketProductService = new MarketProductService();

import type { NetworkType } from "~/contexts/NetworkContext";
import type { ItemSubType } from "~/types/item";
import type { MarketItemProductsResponse } from "~/types/market";
import { MarketServiceClient } from "~/utils/MarketServiceClient";
import { config } from "~/config";

/**
 * Market service responsible for handling market operations
 * Follows SRP by focusing only on market-related business logic
 */
export class MarketService {
	private readonly clientsByNetwork: Readonly<
		Record<NetworkType, MarketServiceClient>
	>;

	constructor() {
		this.clientsByNetwork = {
			heimdall: new MarketServiceClient(
				`${config.api.marketApi}/marketProviderHeimdall`,
			),
			odin: new MarketServiceClient(
				`${config.api.marketApi}/marketProviderOdin`,
			),
		};
	}

	/**
	 * Fetches item products for a specific network and item subtype
	 */
	async fetchItemProducts(
		network: NetworkType,
		itemSubType: ItemSubType,
	): Promise<MarketItemProductsResponse> {
		const client = this.clientsByNetwork[network];
		return await client.fetchItemProducts(
			config.market.defaultPage,
			config.market.defaultPageSize,
			itemSubType,
		);
	}
}

// Singleton instance
export const marketService = new MarketService();

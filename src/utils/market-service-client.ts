import {
	type MarketItemProductsResponse,
	safeValidateMarketItemProductsResponse,
} from "../types/market.zod";

export const AVAILABLE_ITEM_SUB_TYPE = [
	"HOURGLASS",
	"AP_STONE",
	"SCROLL",
	"CIRCLE",
] as const;
export type ItemSubType = (typeof AVAILABLE_ITEM_SUB_TYPE)[number];

const ITEM_SUB_TYPE_VALUES: Record<ItemSubType, number> = {
	HOURGLASS: 15,
	AP_STONE: 16,
	SCROLL: 21,
	CIRCLE: 22,
};

export class MarketServiceClient {
	constructor(private readonly baseUrl: string) {}

	async fetchItemProducts(
		offset: number,
		limit: number,
		itemSubType: ItemSubType,
	): Promise<MarketItemProductsResponse> {
		const response = await fetch(
			`${this.baseUrl}/Market/products/items/${ITEM_SUB_TYPE_VALUES[itemSubType]}?offset=${offset}&limit=${limit}&order=unit_price_asc`,
		);
		const data = await response.json();

		// Validate the response data against our schema
		const validationResult = safeValidateMarketItemProductsResponse(data);

		if (!validationResult.success) {
			// Log validation errors for debugging
			console.error(
				"Market API response validation failed:",
				validationResult.error,
			);
			throw new Error("Invalid data received from the market API");
		}

		return validationResult.data;
	}
}

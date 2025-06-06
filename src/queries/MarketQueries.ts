import { query } from "@solidjs/router";
import { marketService } from "~/services/MarketService";
import type { NetworkType } from "~/contexts/NetworkContext";
import type { ItemSubType } from "~/types/item";

/**
 * Query function for fetching market item products
 * Follows SRP by handling only data fetching concerns
 */
export const fetchItemProductsQuery = query(
	async (network: NetworkType, itemSubType: ItemSubType) => {
		"use server";
		return await marketService.fetchItemProducts(network, itemSubType);
	},
	"fetch-item-products",
);

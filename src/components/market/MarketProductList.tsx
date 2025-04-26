import { createAsync, query } from "@solidjs/router";
import { For } from "solid-js";

import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";
import { useItemSubType } from "~/contexts/ItemSubTypeContext";
import { MarketProduct } from "~/components/market/MarketProduct";
import { MarketServiceClient } from "~/utils/MarketServiceClient";
import type { ItemSubType } from "~/types/item";

// Constants
const API_BASE_URL = "https://api.9capi.com";
const DEFAULT_PAGE_SIZE = 100;
const DEFAULT_PAGE = 0;

// API Client Configuration
const CLIENT_BY_NETWORK: Readonly<Record<NetworkType, MarketServiceClient>> = {
	heimdall: new MarketServiceClient(`${API_BASE_URL}/marketProviderHeimdall`),
	odin: new MarketServiceClient(`${API_BASE_URL}/marketProviderOdin`),
};

// Server-side query function
const fetchItemProducts = query(
	async (network: NetworkType, itemSubType: ItemSubType) => {
		"use server";
		const client = CLIENT_BY_NETWORK[network];
		return await client.fetchItemProducts(
			DEFAULT_PAGE,
			DEFAULT_PAGE_SIZE,
			itemSubType,
		);
	},
	"fetch-item-products",
);

export function MarketProductList() {
	const { network } = useNetwork();
	const { itemSubType } = useItemSubType();

	const products = createAsync(async () => {
		return (
			await fetchItemProducts(network(), itemSubType())
		).itemProducts.toSorted((a, b) => a.unitPrice - b.unitPrice);
	});

	return (
		<For each={products()}>
			{(product) => <MarketProduct product={product} />}
		</For>
	);
}

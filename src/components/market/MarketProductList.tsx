import { createAsync, query } from "@solidjs/router";
import { For } from "solid-js";

import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";
import { useItemSubType } from "~/contexts/ItemSubTypeContext";
import { MarketProduct } from "~/components/market/MarketProduct";
import { MarketServiceClient } from "~/utils/MarketServiceClient";
import type { ItemSubType } from "~/types/item";
import { config } from "~/config";

// API Client Configuration  
const CLIENT_BY_NETWORK: Readonly<Record<NetworkType, MarketServiceClient>> = {
	heimdall: new MarketServiceClient(`${config.api.marketApi}/marketProviderHeimdall`),
	odin: new MarketServiceClient(`${config.api.marketApi}/marketProviderOdin`),
};

// Server-side query function
const fetchItemProducts = query(
	async (network: NetworkType, itemSubType: ItemSubType) => {
		"use server";
		const client = CLIENT_BY_NETWORK[network];
		return await client.fetchItemProducts(
			config.market.defaultPage,
			config.market.defaultPageSize,
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

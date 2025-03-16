import { createAsync, query } from "@solidjs/router";
import { For } from "solid-js";

import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";
import { useItemSubType } from "~/contexts/ItemSubTypeContext";
import { MarketProduct } from "~/components/market/MarketProduct";
import { MarketServiceClient } from "~/utils/MarketServiceClient";
import type { ItemSubType } from "~/types/item";

const CLIENT_BY_NETWORK: Readonly<Record<NetworkType, MarketServiceClient>> = {
	heimdall: new MarketServiceClient(
		"https://api.9capi.com/marketProviderHeimdall",
	),
	odin: new MarketServiceClient("https://api.9capi.com/marketProviderOdin"),
};

const fetchItemProducts = query(
	async (network: NetworkType, itemSubType: ItemSubType) => {
		"use server";
		const client = CLIENT_BY_NETWORK[network];
		return await client.fetchItemProducts(0, 100, itemSubType);
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

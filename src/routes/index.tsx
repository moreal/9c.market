import { createAsync, query } from "@solidjs/router";
import { Show, Suspense } from "solid-js";
import { MarketProductList } from "~/components/market/MarketProductList";
import LoadingSpinner from "~/components/ui/LoadingSpinner";
import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";
import {
	MarketServiceClient,
	ItemSubType,
} from "~/utils/market-service-client";

const CLIENT_BY_NETWORK: Record<NetworkType, MarketServiceClient> = {
	heimdall: new MarketServiceClient(
		"https://api.9capi.com/marketProviderHeimdall",
	),
	odin: new MarketServiceClient("https://api.9capi.com/marketProviderOdin"),
};

const fetchItemProducts = query(async (network: NetworkType) => {
	"use server";
	const client = CLIENT_BY_NETWORK[network];
	return await client.fetchItemProducts(0, 100, ItemSubType.HOURGLASS);
}, "fetch-item-products");

export default function Home() {
	const { network } = useNetwork();
	const products = createAsync(async () => {
		return fetchItemProducts(network());
	});

	return (
		<main class="container mx-auto px-4 py-8 max-w-6xl">
			<Suspense fallback={<LoadingSpinner />}>
				<Show when={products()} fallback={<LoadingSpinner />}>
					<MarketProductList products={products()!.itemProducts} />
				</Show>
			</Suspense>
		</main>
	);
}

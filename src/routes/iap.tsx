import { createResource, For, onMount, Show, createMemo } from "solid-js";
import { Category, Product } from "../types/iap";
import CategorySection from "../components/CategorySection";
import { useNetwork } from "../contexts/NetworkContext";
import PageHeader from "../components/ui/PageHeader";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";
import { attachNetworkPrices } from "../utils/iap-utils";
import AveragePriceStats from "../components/AveragePriceStats";
import WNCGPrice from "../components/WNCGPrice";

export default function IAPProducts() {
	const { network } = useNetwork();

	// Load products from local JSON files based on the selected network
	const fetchProducts = async (networkName: string): Promise<Category[]> => {
		console.log("Fetching products for network:", networkName);
		try {
			const response = await fetch(`/data/${networkName}.json`);

			if (!response.ok) {
				throw new Error(`Failed to load products: ${response.status}`);
			}

			const data = (await response.json()) as Category[];

			// Enhance products with network pricing information
			const enhancedCategories = await Promise.all(
				data.map(async (category) => {
					const enhancedProducts = await attachNetworkPrices(
						category.product_list,
						networkName,
					);

					return {
						...category,
						product_list: enhancedProducts,
					};
				}),
			);

			console.log(
				"Products loaded and enhanced with network prices:",
				enhancedCategories,
			);
			return enhancedCategories;
		} catch (error) {
			console.error("Error loading products:", error);
			return [];
		}
	};

	// The resource will automatically fetch initially and refetch when the network changes
	const [categories, { refetch }] = createResource(network, fetchProducts);

	// Extract all products from all categories for price statistics
	const allProducts = createMemo(() => {
		if (!categories()) return [];

		// Flatten all products from all categories into a single array
		return categories().reduce((acc, category) => {
			return [...acc, ...category.product_list];
		}, [] as Product[]);
	});

	onMount(() => {
		refetch();
	});

	return (
		<main class="container mx-auto p-4 max-w-6xl">
			<PageHeader title="Nine Chronicles IAP Products">
				<p class="text-gray-100">
					Currently browsing products on the{" "}
					<span class="font-semibold bg-white/20 px-3 py-1 rounded-full">
						{network()}
					</span>{" "}
					network
				</p>
			</PageHeader>

			<Show when={categories.loading}>
				<LoadingSpinner message="Loading products..." />
			</Show>

			<Show when={categories.error}>
				<ErrorMessage
					message="Error loading products. Please try again later."
					retryAction={() => refetch()}
				/>
			</Show>

			<Show when={!categories.loading && allProducts().length > 0}>
				<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
					<div class="md:col-span-3">
						<AveragePriceStats products={allProducts()} />
					</div>
					<div>
						<WNCGPrice />
					</div>
				</div>
			</Show>

			<Show
				when={categories() && categories()!.length === 0 && !categories.loading}
			>
				<EmptyState
					message="No products available at this time."
					icon="empty-box"
				/>
			</Show>

			<div class="space-y-8">
				<For each={categories()}>
					{(category) => <CategorySection category={category} />}
				</For>
			</div>
		</main>
	);
}

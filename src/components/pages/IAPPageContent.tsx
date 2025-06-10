import { For, Show, Suspense } from "solid-js";
import CategorySection from "~/components/iap/category/CategorySection";
import { useNetwork } from "~/contexts/NetworkContext";
import PageHeader from "~/components/ui/PageHeader";
import LoadingSpinner from "~/components/ui/LoadingSpinner";
import AveragePriceStats from "~/components/iap/AveragePriceStats";
import WNCGPrice from "~/components/iap/WNCGPrice";
import { useProducts } from "~/contexts/ProductsContext";

/**
 * Network status display component
 * Follows SRP by handling only network status display
 */
function NetworkStatus() {
	const { network } = useNetwork();

	return (
		<p class="text-gray-100">
			Currently browsing products on the{" "}
			<span class="font-semibold bg-white/20 px-3 py-1 rounded-full">
				<Show when={network()}>{network()}</Show>
			</span>{" "}
			network
		</p>
	);
}

/**
 * IAP dashboard component showing stats
 * Follows SRP by handling only dashboard layout
 */
function IAPDashboard() {
	return (
		<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
			<div class="md:col-span-3">
				<AveragePriceStats />
			</div>
			<div>
				<WNCGPrice />
			</div>
		</div>
	);
}

/**
 * Categories list component
 * Follows SRP by handling only categories rendering
 */
function CategoriesList() {
	const { categories } = useProducts();

	return (
		<div class="space-y-8">
			<For each={categories()}>
				{(category) => <CategorySection category={category} />}
			</For>
		</div>
	);
}

/**
 * IAP products page content component
 * Follows SRP by handling only IAP page specific content orchestration
 */
export default function IAPPageContent() {
	return (
		<>
			<PageHeader title="Nine Chronicles IAP Products">
				<NetworkStatus />
			</PageHeader>

			<Suspense fallback={<LoadingSpinner />}>
				<IAPDashboard />
				<CategoriesList />
			</Suspense>
		</>
	);
}

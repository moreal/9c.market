import { For, Show, Suspense } from "solid-js";
import CategorySection from "~/components/iap/category/CategorySection";
import { useNetwork } from "~/contexts/NetworkContext";
import PageHeader from "~/components/ui/PageHeader";
import LoadingSpinner from "~/components/ui/LoadingSpinner";
import AveragePriceStats from "~/components/iap/AveragePriceStats";
import WNCGPrice from "~/components/iap/WNCGPrice";
import { useProducts } from "~/contexts/ProductsContext";

export default function IAPProducts() {
	const { categories } = useProducts();
	const { network } = useNetwork();
	return (
		<main class="container mx-auto p-4 max-w-6xl">
			<PageHeader title="Nine Chronicles IAP Products">
				<p class="text-gray-100">
					Currently browsing products on the{" "}
					<span class="font-semibold bg-white/20 px-3 py-1 rounded-full">
						<Show when={network()}>{network()}</Show>
					</span>{" "}
					network
				</p>
			</PageHeader>

			<Suspense fallback={<LoadingSpinner />}>
				<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
					<div class="md:col-span-3">
						<AveragePriceStats />
					</div>
					<div>
						<WNCGPrice />
					</div>
				</div>

				<div class="space-y-8">
					<For each={categories()}>
						{(category) => <CategorySection category={category} />}
					</For>
				</div>
			</Suspense>
		</main>
	);
}

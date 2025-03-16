import { Show, Suspense } from "solid-js";
import ItemSubTypeSelector from "~/components/market/ItemSubTypeSelector";
import { MarketProductList } from "~/components/market/MarketProductList";
import LoadingSpinner from "~/components/ui/LoadingSpinner";
import { ItemSubTypeProvider } from "~/contexts/ItemSubTypeContext";

export default function Home() {
	return (
		<main class="container mx-auto px-4 py-8 max-w-6xl">
			<ItemSubTypeProvider>
				<div class="ml-auto flex items-center space-x-3 mb-6">
					<ItemSubTypeSelector />
				</div>
				<Suspense fallback={<LoadingSpinner />}>
					<MarketProductList />
				</Suspense>
			</ItemSubTypeProvider>
		</main>
	);
}

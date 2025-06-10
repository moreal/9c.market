import { Suspense } from "solid-js";
import { MarketProductList } from "~/components/market/MarketProductList";
import ItemSubTypeSelector from "~/components/market/ItemSubTypeSelector";
import LoadingSpinner from "~/components/ui/LoadingSpinner";

/**
 * Home page content component
 * Follows SRP by handling only home page specific content
 */
export default function HomePageContent() {
	return (
		<>
			<div class="ml-auto flex items-center space-x-3 mb-6">
				<ItemSubTypeSelector />
			</div>
			<Suspense fallback={<LoadingSpinner />}>
				<MarketProductList />
			</Suspense>
		</>
	);
}

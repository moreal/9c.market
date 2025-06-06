import { createAsync } from "@solidjs/router";
import { createMemo } from "solid-js";

import { useNetwork } from "~/contexts/NetworkContext";
import { useItemSubType } from "~/contexts/ItemSubTypeContext";
import { getDIContainer } from "~/utils/DIContainer";

/**
 * Market product list component
 * Follows SRP by focusing only on orchestrating data flow and rendering
 * Follows DIP by depending on abstractions rather than concrete implementations
 * Follows OCP by allowing different sorting strategies without modification
 */
export function MarketProductList() {
	const { network } = useNetwork();
	const { itemSubType } = useItemSubType();

	// Get dependencies from DI container
	const diContainer = getDIContainer();

	// Fetch products using injected service
	const products = createAsync(async () => {
		const response = await diContainer.marketProductService.fetchProducts(
			network(),
			itemSubType(),
		);
		return response.itemProducts;
	});

	// Sort products using injected sorting service
	const sortedProducts = createMemo(() => {
		const productList = products();
		if (!productList) return [];

		return diContainer.productSortService.sort(productList);
	});

	// Render using injected renderer
	const ProductRenderer = diContainer.productListRenderer;
	return <ProductRenderer products={sortedProducts()} />;
}

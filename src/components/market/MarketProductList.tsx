import { createAsync } from "@solidjs/router";

import { useNetwork } from "~/contexts/NetworkContext";
import { useItemSubType } from "~/contexts/ItemSubTypeContext";
import { getDIContainer } from "~/utils/DIContainer";
import { ProductListRenderer } from "~/services/ProductListRenderer";

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
    const productList = response.itemProducts;
    if (!productList) return [];
    return diContainer.productSortService.sort(productList)
	}, {
    initialValue: [],
  });

	return <ProductListRenderer products={products} />;
}

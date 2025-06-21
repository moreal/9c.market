import { type Accessor, For, splitProps, type Component } from "solid-js";
import type { ItemProduct } from "~/types/market";
import { MarketProduct } from "~/components/market/MarketProduct";
import {
	NoProductsMessage,
	ProductErrorBoundary,
} from "~/components/error/ProductErrorBoundary";

/**
 * Product list renderer component
 * Follows SRP by focusing only on rendering logic
 * Error handling is delegated to specialized error boundary components
 */
export const ProductListRenderer: Component<{
	products: Accessor<ItemProduct[]>;
}> = (props) => {
	const [local] = splitProps(props, ["products"]);

	return (
		<ProductErrorBoundary>
			<For each={local.products()} fallback={<NoProductsMessage />}>
				{(product) => <MarketProduct product={product} />}
			</For>
		</ProductErrorBoundary>
	);
};

/**
 * Singleton instance for dependency injection
 */
export const productListRenderer = ProductListRenderer;

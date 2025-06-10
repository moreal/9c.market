import { Accessor, For, splitProps, type Component } from "solid-js";
import type { ItemProduct } from "~/types/market";
import { MarketProduct } from "~/components/market/MarketProduct";
import { RenderServiceError, ErrorHandler } from "~/utils/ErrorHandler";

/**
 * Product list renderer component
 * Follows SRP by focusing only on rendering concerns
 * Includes comprehensive error handling
 */

const NoProductsErrorMessage = () => {
  return <div class="text-center text-gray-500 py-8">상품이 없습니다.</div>
};

const ProductRenderErrorMessage = ({ productId }: { productId: string }) => {
  return (
    <div class="bg-red-50 border border-red-200 rounded p-4 mb-2">
      <p class="text-red-700">상품 표시 중 오류가 발생했습니다.</p>
      <p class="text-red-500 text-sm">상품 ID: {productId}</p>
    </div>
  );
}

export const ProductListRenderer: Component<{ products: Accessor<ItemProduct[]> }> = (
  props,
) => {
  try {
    const [local] = splitProps(props, ["products"]);
    return (
      <For each={local.products()} fallback={<NoProductsErrorMessage />}>
        {(product) => {
          try {
            return <MarketProduct product={product} />;
          } catch (error) {
            return <ProductRenderErrorMessage productId={product.productId} />;
          }
        }}
      </For>
    );
  } catch (error) {
    if (error instanceof RenderServiceError) {
      throw error;
    }

    throw new RenderServiceError(
      `Failed to render product list: ${ErrorHandler.getUserFriendlyMessage(error)}`,
      { products: props.products },
    );
  }
};

/**
 * Singleton instance for dependency injection
 */
export const productListRenderer = ProductListRenderer;

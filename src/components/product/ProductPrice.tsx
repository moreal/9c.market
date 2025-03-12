import { Show } from "solid-js";
import { Product } from "../../types/iap";
import { formatPrice } from "../../utils/iap-utils";

type ProductPriceProps = {
  product: Product;
};

export default function ProductPrice(props: ProductPriceProps) {
  const { product } = props;
  
  // Helper to format mileage value
  const formatMileage = () => {
    if (product.product_type === "MILEAGE" && product.mileage_price !== null) {
      return `${product.mileage_price} Mileage`;
    }
    return `${product.mileage} Mileage`;
  };
  
  return (
    <div class="flex items-center">
      <div class="text-right">
        {/* Show KRW price first if available */}
        <Show when={product.networkPrice?.KRW} fallback={
          <span class="text-lg font-bold text-gray-900">{formatMileage()}</span>
        }>
          <span class="text-lg font-bold text-gray-900">{product.networkPrice!.KRW.toLocaleString()} KRW</span>
          <div class="text-xs text-blue-600 font-medium">
            {formatMileage()}
          </div>
        </Show>
        
        {/* Show discounted price if applicable */}
        {product.discount > 0 && (
          <div class="text-xs text-gray-500 line-through">
            {product.networkPrice?.KRW 
              ? `${Math.round(product.networkPrice.KRW * (1 / (1 - product.discount / 100))).toLocaleString()} KRW` 
              : formatMileage()}
          </div>
        )}
      </div>
    </div>
  );
}

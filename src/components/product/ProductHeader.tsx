import { Product } from "../../types/iap";
import { getRarityColorClass } from "../../utils/iap-utils";

type ProductHeaderProps = {
  product: Product;
};

export default function ProductHeader(props: ProductHeaderProps) {
  const { product } = props;
  
  return (
    <div>
      <h2 class="text-xl font-semibold text-gray-800">{product.name}</h2>
      <div class="flex items-center mt-2">
        <span class={`px-3 py-1 rounded-full text-xs font-medium ${getRarityColorClass(product.rarity)}`}>
          {product.rarity}
        </span>
        
        {product.discount > 0 && (
          <span class="ml-2 bg-red-600 px-3 py-1 rounded-full text-xs font-medium text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {product.discount}% OFF
          </span>
        )}
      </div>
    </div>
  );
}

import { Product } from "../types/iap";
import ProductHeader from "./product/ProductHeader";
import ProductPrice from "./product/ProductPrice";
import ProductDetails from "./product/ProductDetails";
import ProductContents from "./product/ProductContents";

// Component to display an individual product
export default function ProductItem(props: { product: Product }) {
  const { product } = props;
  
  return (
    <div class="bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div class="flex flex-col h-full">
        {/* Product header */}
        <div class="flex justify-between items-center p-5 border-b border-gray-100">
          <ProductHeader product={product} />
          <ProductPrice product={product} />
        </div>
        
        {/* Product details */}
        <div class="p-5 bg-gray-50">
          <ProductDetails product={product} />
          <ProductContents product={product} />
        </div>
      </div>
    </div>
  );
}

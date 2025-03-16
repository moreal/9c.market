import type { Product } from "../../../types/iap";
import IAPProductHeader from "./IAPProductHeader";
import IAPProductPrice from "./IAPProductPrice";
import IAPProductDetails from "./IAPProductDetails";
import IAPProductContents from "./IAPProductContents";

export default function IAPProductItem(props: { product: Product }) {
	const { product } = props;

	return (
		<div class="bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
			<div class="flex flex-col h-full">
				<div class="flex justify-between items-center p-5 border-b border-gray-100">
					<IAPProductHeader product={product} />
					<IAPProductPrice product={product} />
				</div>

				<div class="p-5 bg-gray-50">
					<IAPProductDetails product={product} />
					<IAPProductContents product={product} />
				</div>
			</div>
		</div>
	);
}

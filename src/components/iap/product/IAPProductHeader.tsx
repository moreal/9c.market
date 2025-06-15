import type { Product } from "~/types/iap";

type IAPProductHeaderProps = {
	product: Product;
};

function getRarityColorClass(rarity: string): string {
	switch (rarity.toLowerCase()) {
		case "legendary":
			return "bg-amber-500 text-white";
		case "epic":
			return "bg-purple-600 text-white";
		case "rare":
			return "bg-blue-600 text-white";
		case "unique":
			return "bg-green-600 text-white";
		default:
			return "bg-gray-500 text-white";
	}
}

export default function IAPProductHeader(props: IAPProductHeaderProps) {
	return (
		<div>
			<h2 class="text-xl font-semibold text-gray-800">{props.product.name}</h2>
			<div class="flex items-center mt-2">
				<span
					class={`px-3 py-1 rounded-full text-xs font-medium ${getRarityColorClass(props.product.rarity)}`}
				>
					{props.product.rarity}
				</span>

				{props.product.discount > 0 && (
					<span class="ml-2 bg-red-600 px-3 py-1 rounded-full text-xs font-medium text-white flex items-center">
						<svg
							role="img"
							aria-label="Discount"
							xmlns="http://www.w3.org/2000/svg"
							class="h-3 w-3 mr-1"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v4m0 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						{props.product.discount}% OFF
					</span>
				)}
			</div>
		</div>
	);
}

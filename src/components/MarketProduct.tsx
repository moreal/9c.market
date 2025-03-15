import { Show } from "solid-js";
import { useCurrency } from "~/contexts/CurrencyContext";
import { useWNCGPrice } from "~/contexts/WNCGPriceContext";
import type { ItemProduct } from "~/types/market.zod";
import { SHEET_ID_MAP } from "~/utils/sheet_ids";
import HeroiconsOutlineCurrencyDollar from "~icons/heroicons-outline/currency-dollar";
import HeroiconsOutlineTag from "~icons/heroicons-outline/tag";
import HeroiconsOutlineExternalLink from "~icons/heroicons-outline/external-link";
import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";

const NCSCAN_BY_NETWORK: Record<NetworkType, string> = {
	heimdall: "https://heimdall.9cscan.com",
	odin: "https://9cscan.com",
};

export function MarketProduct(props: {
	product: ItemProduct;
}) {
	const { network } = useNetwork();
	const { currency } = useCurrency();
	const { wncgPrice } = useWNCGPrice();

	return (
		<Show when={!wncgPrice.error && !wncgPrice.loading && wncgPrice()}>
			<div class="bg-white border rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden mb-3">
				<div class="p-3">
					<div class="flex justify-between items-center mb-2">
						<div class="flex items-center">
							<span class="ml-2 font-semibold text-gray-800">
								{SHEET_ID_MAP[props.product.itemId] || props.product.itemId}
							</span>
							<span class="font-light text-indigo-800 pl-1 pr-1 py-0.5 rounded-full text-sm">
								x
							</span>
							<span class="font-bold text-indigo-800 py-0.5 rounded-full text-sm">
								{props.product.quantity}
							</span>
						</div>
						<div class="flex items-center gap-2">
							<a
								href={`${NCSCAN_BY_NETWORK[network()]}/address/0x${props.product.sellerAgentAddress}`}
								class="text-gray-500 hover:text-gray-700 text-xs hover:underline flex items-center"
								target="_blank"
								rel="noopener noreferrer"
							>
								<HeroiconsOutlineExternalLink class="stroke-2 h-3 w-3 mr-0.5" />
								Agent (0x{props.product.sellerAgentAddress.substring(0, 6)})
							</a>
							<a
								href={`${NCSCAN_BY_NETWORK[network()]}/avatar/0x${props.product.sellerAvatarAddress}`}
								class="text-gray-500 hover:text-gray-700 text-xs hover:underline flex items-center"
								target="_blank"
								rel="noopener noreferrer"
							>
								<HeroiconsOutlineExternalLink class="stroke-2 h-3 w-3 mr-0.5" />
								Avatar (0x{props.product.sellerAvatarAddress.substring(0, 6)})
							</a>
						</div>
					</div>

					<div class="grid grid-cols-2 gap-2 bg-gray-50 rounded-md p-2">
						<div class="flex items-center">
							<HeroiconsOutlineCurrencyDollar class="stroke-2 h-4 w-4 text-amber-500 mr-1.5" />
							<div>
								<span class="text-xs text-gray-500">Price</span>
								<div class="font-bold text-gray-900 text-sm">
									{(props.product.price * wncgPrice()).toFixed(4)} {currency()}
								</div>
							</div>
						</div>

						<div class="flex items-center">
							<HeroiconsOutlineTag class="stroke-2 h-4 w-4 text-sky-500 mr-1.5" />
							<div>
								<span class="text-xs text-gray-500">Unit Price</span>
								<div class="font-bold text-gray-900 text-sm">
									{(props.product.unitPrice * wncgPrice()).toFixed(6)}{" "}
									{currency()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Show>
	);
}

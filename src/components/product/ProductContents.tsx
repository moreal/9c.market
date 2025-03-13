import { For } from "solid-js";
import { Product } from "../../types/iap";
import CollapsibleContent from "../CollapsibleContent";

type ProductContentsProps = {
	product: Product;
};

const SHEET_ID_MAP: Record<number, string> = {
	400000: "Hourglass",
	500000: "AP Potion",
	600201: "Golden Dust",
	600202: "Ruby Dust",
	600203: "Emerald Dust",
	800201: "Silver Dust",
	800202: "Golden Meat",
};

export default function ProductContents(props: ProductContentsProps) {
	const { product } = props;

	console.log(product.fungible_item_list);

	return (
		<CollapsibleContent title="Contents:">
			<ul class="space-y-2 text-sm mt-2">
				<For each={product.fungible_item_list}>
					{(item) => (
						<li class="flex justify-between items-center bg-white p-2 rounded border border-gray-100">
							<span class="text-gray-700">
								{SHEET_ID_MAP[item.sheet_item_id] ||
									(item.sheet_item_id > 40000000
										? `Maybe Costume (${item.sheet_item_id})`
										: undefined) ||
									item.fungible_item_id
										.replace("Item_NT_", "")
										.replace("Item_T_", "")}
							</span>
							<span class="font-semibold bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
								x{item.amount}
							</span>
						</li>
					)}
				</For>
				<For each={product.fav_list}>
					{(item) => (
						<li class="flex justify-between items-center bg-white p-2 rounded border border-gray-100">
							<span class="text-gray-700">{item.ticker}</span>
							<span class="font-semibold bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
								x{item.amount}
							</span>
						</li>
					)}
				</For>
			</ul>
		</CollapsibleContent>
	);
}

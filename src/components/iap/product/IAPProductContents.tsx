import { For } from "solid-js";
import type { Product } from "../../../types/iap";
import CollapsibleContent from "../../ui/CollapsibleContent";
import { SHEET_ID_MAP } from "~/constants";

type IAPProductContentsProps = {
	product: Product;
};

export default function IAPProductContents(props: IAPProductContentsProps) {
	const { product } = props;

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

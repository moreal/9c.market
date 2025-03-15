import { For } from "solid-js";
import type { ItemProduct } from "~/types/market.zod";
import { MarketProduct } from "~/components/market/MarketProduct";

export function MarketProductList(props: {
	products: ItemProduct[];
}) {
	return (
		<For each={props.products.toSorted((a, b) => a.unitPrice - b.unitPrice)}>
			{(product) => <MarketProduct product={product} />}
		</For>
	);
}

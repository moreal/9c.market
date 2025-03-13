import { For, Show } from "solid-js";
import { Category } from "../types/iap";
import ProductItem from "./ProductItem";
import CategoryHeader from "./category/CategoryHeader";

export default function CategorySection(props: { category: Category }) {
	const { category } = props;

	return (
		<Show
			when={
				category.active &&
				category.product_list.length > 0 &&
				category.name !== "NoShow"
			}
		>
			<div class="mb-12">
				<CategoryHeader title={category.name} />

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<For
						each={category.product_list
							.filter((product) => product.active)
							.sort((a, b) => a.order - b.order)}
					>
						{(product) => <ProductItem product={product} />}
					</For>
				</div>
			</div>
		</Show>
	);
}

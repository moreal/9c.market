import { For, Show } from "solid-js";
import type { Category } from "~/types/iap";
import IAPProductItem from "~/components/iap/product/IAPProductItem";
import CategoryHeader from "~/components/iap/category/CategoryHeader";

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
						{(product) => <IAPProductItem product={product} />}
					</For>
				</div>
			</div>
		</Show>
	);
}

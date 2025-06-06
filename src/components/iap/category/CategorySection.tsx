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

				<div class="flex flex-col md:flex-row md:flex-wrap gap-6">
					<For
						each={category.product_list
							.filter((product) => product.active)
							.sort((a, b) => a.order - b.order)}
					>
						{(product) => (
							<div class="w-full md:w-[calc(50%-0.75rem)]">
								<IAPProductItem product={product} />
							</div>
						)}
					</For>
				</div>
			</div>
		</Show>
	);
}

import { A } from "@solidjs/router";
import PageHeader from "../components/ui/PageHeader";
import FeatureCard from "../components/ui/FeatureCard";
import Button from "../components/ui/Button";
import { createResource, For, Show } from "solid-js";
import { getSdk } from "~/generated/graphql";
import { GraphQLClient } from "graphql-request";

const sdk = getSdk(
	new GraphQLClient("https://mimir.nine-chronicles.dev/odin/graphql"),
);
export default function Home() {
	const [products] = createResource(async () => await sdk.GetAPProducts());
	return (
		<main class="container mx-auto px-4 py-8 max-w-6xl">
			<Show when={products.loading}>
				<p>Loading...</p>
			</Show>
			<Show when={products.error}>
				<p>Error: {products.error.message}</p>
			</Show>
			<Show when={products()?.products?.items}>
				<For
					each={products()
						?.products?.items?.map((product) => {
							console.log(product);
							return { object: product?.object, unitPrice: product?.unitPrice };
						})
						.filter(
							(product) =>
								product.object !== null &&
								product.object?.__typename === "ItemProduct" &&
								product.unitPrice !== null,
						)}
				>
					{(product) => (
						<p>
							{product.object?.__typename === "ItemProduct" &&
								product.object.itemCount}{" "}
							{product.unitPrice}
						</p>
					)}
				</For>
			</Show>
		</main>
	);
}

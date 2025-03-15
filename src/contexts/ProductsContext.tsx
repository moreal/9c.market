import { createContext, useContext, type JSX } from "solid-js";
import type { Category, Product } from "~/types/iap";
import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";
import { createAsync, query } from "@solidjs/router";
import { marketApi } from "~/lib/api";

// Create a server action for product fetching
const fetchProducts = query((networkName: NetworkType) => {
	"use server";
	return marketApi.fetchProducts(networkName);
}, "fetch-products");

// Create the context
type ProductsContextType = {
	categories: () => Category[] | undefined;
	allProducts: () => Product[];
};

const ProductsContext = createContext<ProductsContextType>();

// Provider component
export function ProductsProvider(props: { children: JSX.Element }) {
	const { network } = useNetwork();

	const categories = createAsync(() => fetchProducts(network()), {
		initialValue: [],
	});

	const allProducts = () => {
		// console.log("owner", getOwner());
		const cate = categories();
		// Flatten all products from all categories into a single array
		return cate.reduce((acc, category) => {
			return acc.concat(category.product_list);
		}, [] as Product[]);
	};

	return (
		<ProductsContext.Provider
			value={{
				categories,
				allProducts,
			}}
		>
			{props.children}
		</ProductsContext.Provider>
	);
}

// Consumer hook
export function useProducts() {
	const context = useContext(ProductsContext);
	if (!context) {
		throw new Error("useProducts must be used within a ProductsProvider");
	}
	return context;
}

import { createContext, useContext, type JSX } from "solid-js";
import type { Category, Product } from "~/types/iap";
import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";
import { createAsync, query } from "@solidjs/router";
import { marketApi } from "~/lib/api";
import type { CurrencyType } from "./CurrencyContext";
import { EXCHANGE_RATE_BY_CURRENCY } from "~/constants";

// Create a server action for product fetching
const fetchProducts = query((networkName: NetworkType) => {
	"use server";
	return marketApi.fetchProducts(networkName);
}, "fetch-products");

// Create the context
type ProductsContextType = {
	categories: () => Category[] | undefined;
	allProducts: () => Product[];
	getAveragePrice: (
		sheetId: number,
		currency: CurrencyType,
	) => { averagePrice: number; amount: number; sheetId: number } | null;
};

const ProductsContext = createContext<ProductsContextType>();

// Provider component
export function ProductsProvider(props: { children: JSX.Element }) {
	const { network } = useNetwork();

	const categories = createAsync(() => fetchProducts(network()), {
		initialValue: [],
	});

	const allProducts = () => {
		const cate = categories();
		// Flatten all products from all categories into a single array
		return cate.reduce((acc, category) => {
			return acc.concat(category.product_list);
		}, [] as Product[]);
	};

	const getAveragePrice = (
		sheetId: number,
		currency: CurrencyType,
	): { averagePrice: number; sheetId: number; amount: number } | null => {
		const filtered = allProducts().filter(
			(p) =>
				p.fungible_item_list.length === 1 &&
        p.networkPrice !== undefined &&
				p.fungible_item_list[0].sheet_item_id === sheetId,
		);
		const sorted = filtered.toSorted(
			(a, b) => a.fungible_item_list[0].amount - b.fungible_item_list[0].amount,
		);
		if (sorted.length === 0) return null;
		const productWithHighestAmount = sorted[sorted.length - 1];

		const amount = productWithHighestAmount.fungible_item_list[0].amount || 0;
		if (amount > 0) {
			return {
				averagePrice:
					productWithHighestAmount.networkPrice.KRW /
					amount /
					EXCHANGE_RATE_BY_CURRENCY[currency],
				sheetId,
				amount,
			};
		}

		return null;
	};

	return (
		<ProductsContext.Provider
			value={{
				categories,
				allProducts,
				getAveragePrice,
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

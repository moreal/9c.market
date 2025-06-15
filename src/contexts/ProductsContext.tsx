import { createContext, useContext, type JSX, createMemo } from "solid-js";
import type { Category, Product } from "~/types/iap";
import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";
import { createAsync, query } from "@solidjs/router";
import { marketApi } from "~/lib/api";
import type { CurrencyTicker } from "~/types/Currency";
import {
	ProductHelpers,
	type AveragePriceResult,
} from "~/utils/ProductHelpers";

// Create a server action for product fetching
const fetchProducts = query((networkName: NetworkType) => {
	"use server";
	return marketApi.fetchProducts(networkName);
}, "fetch-products");

// Create the context
interface ProductsContextType {
	categories: () => Category[] | undefined;
	allProducts: () => Product[];
	getAveragePrice: (
		sheetId: number,
		currency: CurrencyTicker,
	) => AveragePriceResult | null;
}

const ProductsContext = createContext<ProductsContextType>();

// Provider component following SolidJS best practices
export function ProductsProvider(props: { children: JSX.Element }) {
	const { network } = useNetwork();

	const categories = createAsync(() => fetchProducts(network()), {
		initialValue: [],
	});

	/**
	 * Memoized computation for flattening all products from all categories
	 * Uses createMemo to prevent redundant calculations
	 */
	const allProducts = createMemo((): Product[] => {
		const categoryList = categories();
		if (!categoryList) return [];

		return categoryList.reduce((acc, category) => {
			return acc.concat(category.product_list);
		}, [] as Product[]);
	});

	/**
	 * Calculates average price for a given sheet ID and currency
	 * Returns null if no eligible products are found
	 */
	const getAveragePrice = (
		sheetId: number,
		currency: CurrencyTicker,
	): AveragePriceResult | null => {
		const products = allProducts();

		const eligibleProducts = ProductHelpers.getEligibleProducts(
			products,
			sheetId,
		);

		if (eligibleProducts.length === 0) {
			return null;
		}

		// Sort by amount to get the product with highest amount
		const sortedByAmount = eligibleProducts.toSorted(
			(a, b) => a.fungible_item_list[0].amount - b.fungible_item_list[0].amount,
		);

		const productWithHighestAmount = sortedByAmount[sortedByAmount.length - 1];

		return ProductHelpers.calculateAveragePrice(
			productWithHighestAmount,
			currency,
			sheetId,
		);
	};

	const contextValue: ProductsContextType = {
		categories,
		allProducts,
		getAveragePrice,
	};

	return (
		<ProductsContext.Provider value={contextValue}>
			{props.children}
		</ProductsContext.Provider>
	);
}

/**
 * Consumer hook for accessing products context
 * @throws {Error} When used outside of ProductsProvider
 */
export function useProducts() {
	const context = useContext(ProductsContext);
	if (!context) {
		throw new Error("useProducts must be used within a ProductsProvider");
	}
	return context;
}

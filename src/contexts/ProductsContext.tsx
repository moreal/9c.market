import { createContext, useContext, type JSX } from "solid-js";
import type { Category, Product } from "~/types/iap";
import { type NetworkType, useNetwork } from "~/contexts/NetworkContext";
import { createAsync, query } from "@solidjs/router";
import { marketApi } from "~/lib/api";
import type { CurrencyTicker } from "~/types/Currency";
import { EXCHANGE_RATE_BY_CURRENCY } from "~/constants";

// Constants for average price calculation
const SINGLE_FUNGIBLE_ITEM_COUNT = 1;
const MINIMUM_AMOUNT = 0;

/**
 * Result type for average price calculation
 */
export interface AveragePriceResult {
	averagePrice: number;
	amount: number;
	sheetId: number;
}

/**
 * Helper functions for product filtering and price calculation
 */
const ProductHelpers = {
	/**
	 * Checks if product has single fungible item
	 */
	isSingleFungibleItem(product: Product): boolean {
		return product.fungible_item_list.length === SINGLE_FUNGIBLE_ITEM_COUNT;
	},

	/**
	 * Checks if product has valid USD price
	 */
	hasValidPrice(product: Product): boolean {
		return product.usdPrice !== undefined && product.usdPrice > 0;
	},

	/**
	 * Checks if product matches the given sheet ID
	 */
	hasMatchingSheetId(product: Product, sheetId: number): boolean {
		return product.fungible_item_list[0]?.sheet_item_id === sheetId;
	},

	/**
	 * Filters products eligible for average price calculation
	 */
	getEligibleProducts(products: Product[], sheetId: number): Product[] {
		return products.filter(
			(product) =>
				this.isSingleFungibleItem(product) &&
				this.hasValidPrice(product) &&
				this.hasMatchingSheetId(product, sheetId),
		);
	},

	/**
	 * Calculates average price for a product
	 */
	calculateAveragePrice(
		product: Product,
		currency: CurrencyTicker,
		sheetId: number,
	): AveragePriceResult | null {
		const amount = product.fungible_item_list[0]?.amount || MINIMUM_AMOUNT;
		const usdPrice = product.usdPrice;

		if (amount <= MINIMUM_AMOUNT || !usdPrice) {
			return null;
		}

		const exchangeRate = EXCHANGE_RATE_BY_CURRENCY[currency];
		const averagePrice = (usdPrice * exchangeRate) / amount;

		return {
			averagePrice,
			sheetId,
			amount,
		};
	},
};

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
		currency: CurrencyTicker,
	) => AveragePriceResult | null;
};

const ProductsContext = createContext<ProductsContextType>();

// Provider component
export function ProductsProvider(props: { children: JSX.Element }) {
	const { network } = useNetwork();

	const categories = createAsync(() => fetchProducts(network()), {
		initialValue: [],
	});

	/**
	 * Flattens all products from all categories into a single array
	 */
	const allProducts = (): Product[] => {
		const categoryList = categories();
		if (!categoryList) return [];

		return categoryList.reduce((acc, category) => {
			return acc.concat(category.product_list);
		}, [] as Product[]);
	};

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

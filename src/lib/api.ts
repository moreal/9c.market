import type { NetworkType } from "~/contexts/NetworkContext";
import type {
	Category,
	CategoryData,
	NetworkPrice,
	Product,
	ProductData,
} from "~/types/iap";
import { config } from "~/config";

/**
 * API client for Nine Chronicles market
 */
export const marketApi = {
	/**
	 * Fetch products for a specific network
	 */
	async fetchProducts(networkName: NetworkType): Promise<Category[]> {
		try {
			const response = await fetch(
				`${config.api.productApi}/product?agent_addr&planet_id=${config.networks.planetIds[networkName]}`,
			);

			if (!response.ok) {
				throw new Error(`Failed to load products: ${response.status}`);
			}

			const data = (await response.json()) as CategoryData[];

			// Enhance products with network pricing information
			const enhancedCategories = await Promise.all(
				data.map(async (category) => {
					const enhancedProducts = await this.attachNetworkPrices(
						category.product_list,
						networkName,
					);

					return {
						...category,
						product_list: enhancedProducts,
					};
				}),
			);

			return enhancedCategories;
		} catch (error) {
			console.error("Error loading products:", error);
			return [];
		}
	},

	/**
	 * Fetch WNCG price from external service
	 */
	async fetchWNCGPrice(networkName: NetworkType): Promise<number | null> {
		try {
			const response = await fetch(
				`${config.api.priceApi}/${networkName.toLowerCase()}.wncg.json`,
			);

			if (!response.ok) {
				throw new Error(`Failed to fetch WNCG price for ${networkName}`);
			}

			const data = await response.json();
			return data.price || null;
		} catch (error) {
			console.error("Error fetching WNCG price:", error);
			return null;
		}
	},

	/**
	 * Attach network prices to products
	 */
	async attachNetworkPrices(
		products: ProductData[],
		network: NetworkType,
	): Promise<Product[]> {
		try {
			const response = await fetch(
				`${config.api.priceApi}/${network.toLowerCase()}.prices.json`,
			);

			if (!response.ok) {
				throw new Error(`Failed to fetch ${network} prices data`);
			}

			const pricesData: Record<string, NetworkPrice> = await response.json();

			// Enhance each product with its network price if available
			return products.map((product) => {
				const networkPrice = pricesData[product.name] || undefined;
				return {
					...product,
					networkPrice,
				};
			});
		} catch (error) {
			console.error("Error attaching network prices:", error);
			return products as Product[];
		}
	},

	/**
	 * Fetch general cryptocurrency price
	 */
	async fetchCryptoPrice(
		symbol: string,
		currency: string,
	): Promise<number | null> {
		try {
			const response = await fetch(
				`${config.api.cryptoPriceApi}/${symbol}/price?currency=${currency}`,
			);

			if (!response.ok) {
				console.error(
					`Failed to fetch price for ${symbol}: ${response.statusText}`,
				);
				return null;
			}

			return Number(await response.text());
		} catch (error) {
			console.error(`Error fetching ${symbol} price:`, error);
			return null;
		}
	},
};

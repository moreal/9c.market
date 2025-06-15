import type { NetworkType } from "./contexts/NetworkContext";

/**
 * Application configuration
 */
export const config = {
	/**
	 * API base URLs for different environments
	 */
	api: {
		/** Base URL for the product API */
		productApi:
			"https://hr6vfhdasc.execute-api.us-east-2.amazonaws.com/mainnet/api",
		/** Base URL for price data */
		priceApi: "https://9c.market/data",
		/** Base URL for crypto price API */
		cryptoPriceApi: "https://coinprice-api.9c.market/api/coins",
		/** Base URL for the market API */
		marketApi: "https://api.9capi.com",
	},

	/**
	 * Network configuration
	 */
	networks: {
		/** Network options for the application */
		availableNetworks: ["odin", "heimdall"] as readonly NetworkType[],
		/** Default network */
		defaultNetwork: "odin" as NetworkType,
		/** Network planet IDs */
		planetIds: {
			odin: "0x000000000000",
			heimdall: "0x000000000001",
		},
	},

	/**
	 * Currency configuration
	 */
	currency: {
		/** Available currency options */
		availableCurrencies: ["USD", "EUR", "JPY", "KRW", "PHP", "VND"] as const,
		/** Default currency */
		defaultCurrency: "USD" as const,
	},

	/**
	 * Refresh interval for price data (in milliseconds)
	 */
	refreshIntervals: {
		/** How often to refresh WNCG price */
		wncgPrice: 5 * 60 * 1000, // 5 minutes
	},

	/**
	 * Market API pagination defaults
	 */
	market: {
		/** Default page size for market API requests */
		defaultPageSize: 100,
		/** Default page number for market API requests */
		defaultPage: 0,
	},
};

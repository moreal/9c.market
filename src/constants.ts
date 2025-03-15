/**
 * Application constants
 */

import type { CurrencyType } from "./contexts/CurrencyContext";

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
	/** Key for storing the selected network in localStorage */
	NETWORK: "9c-market-network",
	/** Key for storing the selected currency in localStorage */
	CURRENCY: "9c-market-currency",
	/** Key for storing the user wallet in localStorage */
	WALLET: "9c-market-wallet",
} as const;

/**
 * Date formats
 */
export const DATE_FORMATS = {
	/** Standard date format */
	STANDARD: "MMM dd, yyyy",
	/** Short date format */
	SHORT: "MM/dd/yyyy",
	/** Date with time format */
	WITH_TIME: "MMM dd, yyyy HH:mm",
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
	/** Error message for failed network requests */
	NETWORK_ERROR: "Network error. Please try again later.",
	/** Error message for failed price fetching */
	PRICE_FETCH_ERROR: "Failed to fetch prices. Please try again later.",
	/** Error message for failed product fetching */
	PRODUCT_FETCH_ERROR: "Failed to fetch products. Please try again later.",
} as const;

export const DECIMALS_BY_CURRENCY: Record<CurrencyType, number> = {
	USD: 4,
	KRW: 2,
	EUR: 4,
	JPY: 2,
} as const;

export const SYMBOL_BY_CURRENCY: Record<CurrencyType, string> = {
	USD: "$",
	KRW: "₩",
	EUR: "€",
	JPY: "¥",
};

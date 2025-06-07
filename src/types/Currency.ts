/**
 * Supported currency tickers
 */
export type CurrencyTicker = "USD" | "EUR" | "JPY" | "KRW" | "PHP" | "VND";

/**
 * Currency model that includes ticker and formatting information
 */
export interface Currency<
	TCurrencyTicker extends CurrencyTicker = CurrencyTicker,
> {
	/** The currency ticker symbol */
	readonly ticker: TCurrencyTicker;
	/** Number of decimal places to display when formatting */
	readonly decimalPlaces: number;
	/** Symbol used to represent the currency (e.g., $, €, ¥) */
	readonly symbol: string;
}

/**
 * Predefined currency configurations
 */
export const CURRENCIES = {
	USD: {
		ticker: "USD" as const,
		decimalPlaces: 4,
		symbol: "$",
	},
	EUR: {
		ticker: "EUR" as const,
		decimalPlaces: 4,
		symbol: "€",
	},
	JPY: {
		ticker: "JPY" as const,
		decimalPlaces: 2,
		symbol: "¥",
	},
	KRW: {
		ticker: "KRW" as const,
		decimalPlaces: 2,
		symbol: "₩",
	},
	PHP: {
		ticker: "PHP" as const,
		decimalPlaces: 2,
		symbol: "₱",
	},
	VND: {
		ticker: "VND" as const,
		decimalPlaces: 2,
		symbol: "đ",
	},
} as const satisfies Record<CurrencyTicker, Currency>;

/**
 * Currency utility functions
 */
export const CurrencyUtils = {
	/**
	 * Gets a currency by its ticker
	 *
	 * @param ticker - The currency ticker
	 * @returns The corresponding Currency object
	 */
	getCurrency<T extends CurrencyTicker>(ticker: T): Currency<T> {
		return CURRENCIES[ticker] as Currency<T>;
	},

	/**
	 * Gets all available currencies
	 *
	 * @returns Array of all Currency objects
	 */
	getAllCurrencies(): Currency[] {
		return Object.values(CURRENCIES);
	},

	/**
	 * Gets all available currency tickers
	 *
	 * @returns Array of all CurrencyTicker values
	 */
	getAllTickers(): CurrencyTicker[] {
		return Object.keys(CURRENCIES) as CurrencyTicker[];
	},

	/**
	 * Checks if a ticker is valid
	 *
	 * @param ticker - The ticker to validate
	 * @returns True if the ticker is valid, false otherwise
	 */
	isValidTicker(ticker: string): ticker is CurrencyTicker {
		return Object.keys(CURRENCIES).includes(ticker);
	},
} as const;

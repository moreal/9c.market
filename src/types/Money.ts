import { type CurrencyTicker, type Currency, CurrencyUtils } from "./Currency";

/**
 * Represents a monetary amount with a specific currency
 *
 * This is a value object that encapsulates both the decimal amount and currency.
 * Uses generic type parameter to ensure type safety at compile time.
 *
 * @template TCurrencyTicker - The specific currency ticker (e.g., "USD", "EUR", etc.)
 */
export interface Money<
	TCurrencyTicker extends CurrencyTicker = CurrencyTicker,
> {
	/** The decimal amount of the monetary value */
	readonly decimal: number;
	/** The currency information including ticker, decimal places, and symbol */
	readonly currency: Currency<TCurrencyTicker>;
}

/**
 * Type alias for USD-specific money
 * This ensures only USD amounts can be used where USD is required
 */
export type USDMoney = Money<"USD">;

/**
 * Factory functions for creating Money instances with type safety
 */
export const MoneyFactory = {
	/**
	 * Creates a USD Money instance
	 *
	 * @param decimal - The USD amount
	 * @returns A Money instance typed as USD
	 */
	createUSD(decimal: number): USDMoney {
		return {
			decimal,
			currency: CurrencyUtils.getCurrency("USD"),
		};
	},

	/**
	 * Creates a Money instance for any supported currency
	 *
	 * @param decimal - The amount
	 * @param ticker - The currency ticker
	 * @returns A Money instance with the specified currency type
	 */
	create<TCurrency extends CurrencyTicker>(
		decimal: number,
		ticker: TCurrency,
	): Money<TCurrency> {
		return {
			decimal,
			currency: CurrencyUtils.getCurrency(ticker),
		};
	},

	/**
	 * Creates a Money instance from a Currency object
	 *
	 * @param decimal - The amount
	 * @param currency - The currency object
	 * @returns A Money instance with the specified currency
	 */
	createFromCurrency<TCurrency extends CurrencyTicker>(
		decimal: number,
		currency: Currency<TCurrency>,
	): Money<TCurrency> {
		return {
			decimal,
			currency,
		};
	},
} as const;

/**
 * Utility functions for working with Money instances
 */
export const MoneyUtils = {} as const;

/**
 * Fetches cryptocurrency price from CoinMarketCap API proxy
 * Note: This would typically call a backend proxy to avoid exposing API keys
 *
 * @param symbol - The cryptocurrency symbol (e.g., 'wncg')
 * @returns Price data for the cryptocurrency
 */
export async function fetchCryptoPrice(
	symbol: string,
	currency: string,
): Promise<number | null> {
	try {
		// In a real implementation, this would call your backend proxy
		// which would then make the authenticated request to CMC
		// For demonstration, we'll use a placeholder API endpoint
		const response = await fetch(
			`https://coinprice-api.9c.market/api/coins/${symbol}/price?currency=${currency}`,
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
}

/**
 * Formats a cryptocurrency amount with its symbol
 *
 * @param amount - The amount of cryptocurrency
 * @param symbol - The cryptocurrency symbol
 * @param currency - The currency to display the value in ('usd' or 'krw')
 * @returns Formatted price string
 */
export function formatCryptoValue(
	amount: number,
	symbol: string = "WNCG",
	currency: "usd" | "krw" = "usd",
): string {
	const symbolUpper = symbol.toUpperCase();

	if (currency === "usd") {
		return `$${amount.toFixed(2)} ${symbolUpper}`;
	} else {
		return `₩${amount.toFixed(2)} ${symbolUpper}`;
	}
}

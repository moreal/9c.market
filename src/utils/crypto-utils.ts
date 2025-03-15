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
	symbol = "WNCG",
	currency: "usd" | "krw" = "usd",
): string {
	const symbolUpper = symbol.toUpperCase();

	if (currency === "usd") {
		return `$${amount.toFixed(2)} ${symbolUpper}`;
	} else {
		return `₩${amount.toFixed(2)} ${symbolUpper}`;
	}
}

/**
 * Format a number as a decimal
 */
export function formatNumber(
	value: number | null | undefined,
	options: Intl.NumberFormatOptions = {},
): string {
	if (value === null || value === undefined) {
		return "N/A";
	}

	const formatter = new Intl.NumberFormat("en-US", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
		...options,
	});

	return formatter.format(value);
}

/**
 * Format a date
 */
export function formatDate(
	date: Date | string | number | null | undefined,
	options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "short",
		day: "numeric",
	},
): string {
	if (!date) {
		return "N/A";
	}

	const dateObj = typeof date === "object" ? date : new Date(date);
	return new Intl.DateTimeFormat("en-US", options).format(dateObj);
}

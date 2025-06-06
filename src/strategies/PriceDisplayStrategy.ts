import type { CurrencyType } from "~/contexts/CurrencyContext";

/**
 * Interface for price display strategies
 * Follows OCP by allowing extension without modification
 */
export interface IPriceDisplayStrategy {
	formatPrice(price: number, currency: CurrencyType, wncgPrice: number): string;
	getLabel(): string;
}

/**
 * Standard price display strategy
 */
export class StandardPriceStrategy implements IPriceDisplayStrategy {
	formatPrice(
		price: number,
		currency: CurrencyType,
		wncgPrice: number,
	): string {
		return `${(price * wncgPrice).toFixed(2)} ${currency} (${price} NCG)`;
	}

	getLabel(): string {
		return "Price";
	}
}

/**
 * Unit price display strategy
 */
export class UnitPriceStrategy implements IPriceDisplayStrategy {
	formatPrice(
		price: number,
		currency: CurrencyType,
		wncgPrice: number,
	): string {
		return `${(price * wncgPrice).toFixed(2)} ${currency} (${price} NCG)`;
	}

	getLabel(): string {
		return "Unit Price";
	}
}

/**
 * Compact price display strategy
 */
export class CompactPriceStrategy implements IPriceDisplayStrategy {
	formatPrice(
		price: number,
		currency: CurrencyType,
		wncgPrice: number,
	): string {
		return `${(price * wncgPrice).toFixed(0)} ${currency}`;
	}

	getLabel(): string {
		return "Price";
	}
}

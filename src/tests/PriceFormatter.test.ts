import { describe, it, expect } from "vitest";
import { PriceFormatter } from "~/utils/PriceFormatter";
import { MoneyFactory } from "~/types/Money";

describe("PriceFormatter", () => {
	describe("formatMoney", () => {
		it("should format USD money with correct decimal places", () => {
			const money = MoneyFactory.createUSD(123.456789);
			const result = PriceFormatter.formatMoney(money);
			expect(result).toBe("123.4568");
		});

		it("should format KRW money with correct decimal places", () => {
			const money = MoneyFactory.create(123.456789, "KRW");
			const result = PriceFormatter.formatMoney(money);
			expect(result).toBe("123.46");
		});

		it("should handle non-finite numbers", () => {
			const money = {
				decimal: Number.NaN,
				currency: MoneyFactory.createUSD(0).currency,
			};
			const result = PriceFormatter.formatMoney(money);
			expect(result).toBe("0");
		});

		it("should handle zero amounts", () => {
			const money = MoneyFactory.createUSD(0);
			const result = PriceFormatter.formatMoney(money);
			expect(result).toBe("0.0000");
		});
	});

	describe("formatMoneyWithSymbol", () => {
		it("should format USD money with symbol and ticker", () => {
			const money = MoneyFactory.createUSD(123.456);
			const result = PriceFormatter.formatMoneyWithSymbol(money);
			expect(result).toBe("$123.4560 USD");
		});

		it("should format EUR money with symbol and ticker", () => {
			const money = MoneyFactory.create(100.5, "EUR");
			const result = PriceFormatter.formatMoneyWithSymbol(money);
			expect(result).toBe("€100.5000 EUR");
		});

		it("should format KRW money with symbol and ticker", () => {
			const money = MoneyFactory.create(1000, "KRW");
			const result = PriceFormatter.formatMoneyWithSymbol(money);
			expect(result).toBe("₩1000.00 KRW");
		});
	});

	describe("formatMoneyWithWNCG", () => {
		it("should convert WNCG amount to target currency", () => {
			const wncgPrice = MoneyFactory.createUSD(1.5);
			const result = PriceFormatter.formatMoneyWithWNCG(10, wncgPrice);

			expect(result.decimal).toBe(15.0);
			expect(result.currency.ticker).toBe("USD");
		});

		it("should handle zero WNCG amount", () => {
			const wncgPrice = MoneyFactory.createUSD(1.5);
			const result = PriceFormatter.formatMoneyWithWNCG(0, wncgPrice);

			expect(result.decimal).toBe(0);
			expect(result.currency.ticker).toBe("USD");
		});

		it("should handle invalid WNCG amount", () => {
			const wncgPrice = MoneyFactory.createUSD(1.5);
			const result = PriceFormatter.formatMoneyWithWNCG(Number.NaN, wncgPrice);

			expect(result.decimal).toBe(0);
			expect(result.currency.ticker).toBe("USD");
		});

		it("should handle invalid WNCG price", () => {
			const wncgPrice = {
				decimal: Number.NaN,
				currency: MoneyFactory.createUSD(0).currency,
			};
			const result = PriceFormatter.formatMoneyWithWNCG(10, wncgPrice);

			expect(result.decimal).toBe(0);
			expect(result.currency.ticker).toBe("USD");
		});
	});

	describe("calculateMoneyPriceComparison", () => {
		it("should calculate price comparison when current price is cheaper", () => {
			const averagePrice = MoneyFactory.createUSD(20);
			const wncgPrice = MoneyFactory.createUSD(1.5);
			const result = PriceFormatter.calculateMoneyPriceComparison(
				10,
				averagePrice,
				wncgPrice,
			);

			expect(result).not.toBeNull();
			expect(result!.percent).toBe(25);
			expect(result!.cheaper).toBe(true);
		});

		it("should calculate price comparison when current price is more expensive", () => {
			const averagePrice = MoneyFactory.createUSD(10);
			const wncgPrice = MoneyFactory.createUSD(1.5);
			const result = PriceFormatter.calculateMoneyPriceComparison(
				10,
				averagePrice,
				wncgPrice,
			);

			expect(result).not.toBeNull();  // 
			expect(result!.percent).toBe(50);
			expect(result!.cheaper).toBe(false);
		});

		it("should return null for mismatched currencies", () => {
			const averagePrice = MoneyFactory.createUSD(20);
			const wncgPrice = MoneyFactory.create(1.5, "EUR");
			const result = PriceFormatter.calculateMoneyPriceComparison(
				10,
				averagePrice,
				wncgPrice,
			);

			expect(result).toBeNull();
		});

		it("should return null for zero average price", () => {
			const averagePrice = MoneyFactory.createUSD(0);
			const wncgPrice = MoneyFactory.createUSD(1.5);
			const result = PriceFormatter.calculateMoneyPriceComparison(
				10,
				averagePrice,
				wncgPrice,
			);

			expect(result).toBeNull();
		});

		it("should return null for zero WNCG price", () => {
			const averagePrice = MoneyFactory.createUSD(20);
			const wncgPrice = MoneyFactory.createUSD(0);
			const result = PriceFormatter.calculateMoneyPriceComparison(
				10,
				averagePrice,
				wncgPrice,
			);

			expect(result).toBeNull();
		});

		it("should return null for invalid current price", () => {
			const averagePrice = MoneyFactory.createUSD(20);
			const wncgPrice = MoneyFactory.createUSD(1.5);
			const result = PriceFormatter.calculateMoneyPriceComparison(
				Number.NaN,
				averagePrice,
				wncgPrice,
			);

			expect(result).toBeNull();
		});
	});

	describe("isValidMoney", () => {
		it("should return true for valid money", () => {
			const money = MoneyFactory.createUSD(100);
			const result = PriceFormatter.isValidMoney(money);
			expect(result).toBe(true);
		});

		it("should return false for money with invalid decimal", () => {
			const money = {
				decimal: Number.NaN,
				currency: MoneyFactory.createUSD(0).currency,
			};
			const result = PriceFormatter.isValidMoney(money);
			expect(result).toBe(false);
		});

		it("should return false for money with negative decimal", () => {
			const money = {
				decimal: -100,
				currency: MoneyFactory.createUSD(0).currency,
			};
			const result = PriceFormatter.isValidMoney(money);
			expect(result).toBe(false);
		});

		it("should return true for zero money", () => {
			const money = MoneyFactory.createUSD(0);
			const result = PriceFormatter.isValidMoney(money);
			expect(result).toBe(true);
		});
	});

	describe("legacy methods", () => {
		describe("formatPrice", () => {
			it("should format price with correct decimal places", () => {
				const result = PriceFormatter.formatPrice(123.456789, "USD");
				expect(result).toBe("123.4568");
			});

			it("should format KRW price with correct decimal places", () => {
				const result = PriceFormatter.formatPrice(123.456789, "KRW");
				expect(result).toBe("123.46");
			});
		});

		describe("formatPriceWithWNCG", () => {
			it("should convert and format price", () => {
				const result = PriceFormatter.formatPriceWithWNCG(10, 1.5, "USD");
				expect(result).toBe("15.0000");
			});
		});

		describe("calculatePriceComparison", () => {
			it("should calculate price comparison", () => {
				const result = PriceFormatter.calculatePriceComparison(10, 20, 1.5);
				expect(result).not.toBeNull();
				expect(result!.percent).toBe(25);
				expect(result!.cheaper).toBe(true);
			});
		});
	});

	describe("isValidPrice", () => {
		it("should return true for valid positive price", () => {
			expect(PriceFormatter.isValidPrice(100)).toBe(true);
		});

		it("should return true for zero price", () => {
			expect(PriceFormatter.isValidPrice(0)).toBe(true);
		});

		it("should return false for negative price", () => {
			expect(PriceFormatter.isValidPrice(-100)).toBe(false);
		});

		it("should return false for NaN", () => {
			expect(PriceFormatter.isValidPrice(Number.NaN)).toBe(false);
		});

		it("should return false for Infinity", () => {
			expect(PriceFormatter.isValidPrice(Number.POSITIVE_INFINITY)).toBe(false);
		});
	});

	describe("formatPercentage", () => {
		it("should format percentage with default precision", () => {
			const result = PriceFormatter.formatPercentage(25.678);
			expect(result).toBe("25.7%");
		});

		it("should format percentage with custom precision", () => {
			const result = PriceFormatter.formatPercentage(25.678, 2);
			expect(result).toBe("25.68%");
		});

		it("should handle invalid percentage", () => {
			const result = PriceFormatter.formatPercentage(Number.NaN);
			expect(result).toBe("0%");
		});
	});
});

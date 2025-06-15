import { describe, it, expect } from "vitest";
import { CurrencyConverter } from "~/services/CurrencyConverter";
import type { CurrencyTicker } from "~/types/Currency";
import { MoneyFactory } from "~/types/Money";

describe("CurrencyConverter", () => {
	const mockExchangeRates: Record<CurrencyTicker, number> = {
		USD: 1,
		KRW: 1300,
		EUR: 0.85,
		JPY: 150,
		PHP: 55,
		VND: 25000,
	};

	const converter = new CurrencyConverter(mockExchangeRates);

	describe("convertFromUSD", () => {
		it("should return the same money for USD", () => {
			const usdMoney = MoneyFactory.createUSD(10);
			const result = converter.convertFromUSD(usdMoney, "USD");
			expect(result.decimal).toBe(10);
			expect(result.currency.ticker).toBe("USD");
		});

		it("should convert USD to KRW correctly", () => {
			const usdMoney = MoneyFactory.createUSD(10);
			const result = converter.convertFromUSD(usdMoney, "KRW");

			expect(result.decimal).toBe(13000); // 10 * 1300
			expect(result.currency.ticker).toBe("KRW");
		});

		it("should convert USD to EUR correctly", () => {
			const usdMoney = MoneyFactory.createUSD(100);
			const result = converter.convertFromUSD(usdMoney, "EUR");

			expect(result.decimal).toBe(85); // 100 * 0.85
			expect(result.currency.ticker).toBe("EUR");
		});

		it("should convert USD to JPY correctly", () => {
			const usdMoney = MoneyFactory.createUSD(5);
			const result = converter.convertFromUSD(usdMoney, "JPY");

			expect(result.decimal).toBe(750); // 5 * 150
			expect(result.currency.ticker).toBe("JPY");
		});

		it("should handle decimal prices correctly", () => {
			const usdMoney = MoneyFactory.createUSD(9.99);
			const result = converter.convertFromUSD(usdMoney, "KRW");

			expect(result.decimal).toBeCloseTo(12987); // 9.99 * 1300
			expect(result.currency.ticker).toBe("KRW");
		});

		it("should handle zero price", () => {
			const usdMoney = MoneyFactory.createUSD(0);
			const result = converter.convertFromUSD(usdMoney, "KRW");

			expect(result.decimal).toBe(0);
			expect(result.currency.ticker).toBe("KRW");
		});
	});

	describe("edge cases", () => {
		it("should handle very large USD amounts", () => {
			const usdMoney = MoneyFactory.createUSD(1000000);
			const result = converter.convertFromUSD(usdMoney, "VND");

			expect(result.decimal).toBe(25000000000); // 1000000 * 25000
			expect(result.currency.ticker).toBe("VND");
		});

		it("should handle very small USD amounts", () => {
			const usdMoney = MoneyFactory.createUSD(0.01);
			const result = converter.convertFromUSD(usdMoney, "KRW");

			expect(result.decimal).toBeCloseTo(13); // 0.01 * 1300
			expect(result.currency.ticker).toBe("KRW");
		});
	});

	describe("Money type safety", () => {
		it("should enforce USD type parameter at compile time", () => {
			const usdMoney = MoneyFactory.createUSD(100);
			const result = converter.convertFromUSD(usdMoney, "EUR");

			// TypeScript should ensure usdMoney is of type Money<"USD">
			expect(usdMoney.currency.ticker).toBe("USD");
			expect(result.currency.ticker).toBe("EUR");
		});

		it("should work with generic Money factory", () => {
			const usdMoney = MoneyFactory.create(50, "USD" as const);
			const result = converter.convertFromUSD(usdMoney, "JPY");

			expect(result.decimal).toBe(7500); // 50 * 150
			expect(result.currency.ticker).toBe("JPY");
		});
	});
});

import { describe, it, expect } from "vitest";
import {
	MoneyFactory,
	MoneyUtils,
	type Money,
	type USDMoney,
} from "~/types/Money";
import type { CurrencyTicker } from "~/types/Currency";

describe("Money", () => {
	describe("MoneyFactory", () => {
		describe("createUSD", () => {
			it("should create USD money with correct properties", () => {
				const usdMoney = MoneyFactory.createUSD(100.5);

				expect(usdMoney.decimal).toBe(100.5);
				expect(usdMoney.currency.ticker).toBe("USD");
			});

			it("should create USD money with type safety", () => {
				const usdMoney: USDMoney = MoneyFactory.createUSD(25);

				// TypeScript should ensure this is USDMoney type
				expect(usdMoney.currency.ticker).toBe("USD");
			});
		});

		describe("create", () => {
			it("should create money for any currency", () => {
				const krwMoney = MoneyFactory.create(1300, "KRW");

				expect(krwMoney.decimal).toBe(1300);
				expect(krwMoney.currency.ticker).toBe("KRW");
			});

			it("should create money with correct type parameter", () => {
				const eurMoney = MoneyFactory.create(85.5, "EUR");

				expect(eurMoney.decimal).toBe(85.5);
				expect(eurMoney.currency.ticker).toBe("EUR");
			});

			it("should handle zero amounts", () => {
				const zeroMoney = MoneyFactory.create(0, "JPY");

				expect(zeroMoney.decimal).toBe(0);
				expect(zeroMoney.currency.ticker).toBe("JPY");
			});

			it("should handle negative amounts", () => {
				const negativeMoney = MoneyFactory.create(-50, "PHP");

				expect(negativeMoney.decimal).toBe(-50);
				expect(negativeMoney.currency.ticker).toBe("PHP");
			});
		});
	});

	describe("MoneyUtils", () => {
		describe("isUSD", () => {
			it("should return true for USD money", () => {
				const usdMoney = MoneyFactory.createUSD(100);

				expect(MoneyUtils.isUSD(usdMoney)).toBe(true);
			});

			it("should return false for non-USD money", () => {
				const krwMoney = MoneyFactory.create(1300, "KRW");

				expect(MoneyUtils.isUSD(krwMoney)).toBe(false);
			});

			it("should provide type narrowing", () => {
				const money: Money = MoneyFactory.create(100, "USD");

				if (MoneyUtils.isUSD(money)) {
					// TypeScript should know this is USDMoney now
					expect(money.currency.ticker).toBe("USD");
				}
			});
		});

		describe("format", () => {
			it("should format money with default decimals", () => {
				const money = MoneyFactory.create(123.456, "EUR");
				const formatted = MoneyUtils.format(money);

				expect(formatted).toBe("123.4560 EUR");
			});

			it("should format money with custom decimals", () => {
				const money = MoneyFactory.create(123.456789, "USD");
				const formatted = MoneyUtils.format(money, 4);

				expect(formatted).toBe("123.4568 USD");
			});

			it("should format money with zero decimals", () => {
				const money = MoneyFactory.create(1234.56, "JPY");
				const formatted = MoneyUtils.format(money, 0);

				expect(formatted).toBe("1235 JPY");
			});

			it("should handle whole numbers", () => {
				const money = MoneyFactory.create(100, "KRW");
				const formatted = MoneyUtils.format(money);

				expect(formatted).toBe("100.00 KRW");
			});
		});

		describe("hasSameCurrency", () => {
			it("should return true for same currencies", () => {
				const money1 = MoneyFactory.create(100, "USD");
				const money2 = MoneyFactory.create(200, "USD");

				expect(MoneyUtils.hasSameCurrency(money1, money2)).toBe(true);
			});

			it("should return false for different currencies", () => {
				const usdMoney = MoneyFactory.createUSD(100);
				const krwMoney = MoneyFactory.create(130000, "KRW");

				expect(MoneyUtils.hasSameCurrency(usdMoney, krwMoney)).toBe(false);
			});

			it("should work with different amounts of same currency", () => {
				const money1 = MoneyFactory.create(0.01, "EUR");
				const money2 = MoneyFactory.create(999999.99, "EUR");

				expect(MoneyUtils.hasSameCurrency(money1, money2)).toBe(true);
			});
		});
	});

	describe("Type Safety", () => {
		it("should enforce currency type parameters", () => {
			// This should compile without issues
			const usdMoney: USDMoney = MoneyFactory.createUSD(100);
			const eurMoney: Money<"EUR"> = MoneyFactory.create(85, "EUR");

			expect(usdMoney.currency.ticker).toBe("USD");
			expect(eurMoney.currency.ticker).toBe("EUR");
		});

		it("should work with generic Money type", () => {
			const createMoney = <T extends CurrencyTicker>(
				amount: number,
				currency: T,
			): Money<T> => {
				return MoneyFactory.create(amount, currency);
			};

			const customMoney = createMoney(100, "KRW");
			expect(customMoney.currency.ticker).toBe("KRW");
		});
	});

	describe("Immutability", () => {
		it("should create immutable Money objects", () => {
			const money = MoneyFactory.createUSD(100);

			// These should cause TypeScript errors if uncommented:
			// money.decimal = 200;
			// money.currency.ticker = "EUR";

			expect(money.decimal).toBe(100);
			expect(money.currency.ticker).toBe("USD");
		});
	});
});

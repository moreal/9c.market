import { describe, it, expect } from "vitest";
import { MoneyFactory, type Money, type USDMoney } from "~/types/Money";
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

import { describe, it, expect } from "vitest";
import { PriceFormatter } from "~/utils/PriceFormatter";
import { MoneyFactory } from "~/types/Money";

describe("PriceFormatter", () => {
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

			expect(result).not.toBeNull(); //
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
});

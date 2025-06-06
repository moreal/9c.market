import { describe, it, expect, beforeEach } from "vitest";
import { ProductSortServiceFactory } from "../services/ProductSortService";
import type { ItemProduct } from "../types/market";

describe("ProductSortService", () => {
	let mockProducts: ItemProduct[];

	beforeEach(() => {
		mockProducts = [
			{
				productId: "zebra-1",
				sellerAgentAddress: "seller1",
				sellerAvatarAddress: "avatar1",
				price: 1500,
				unitPrice: 300,
				quantity: 5,
				registeredBlockIndex: 1000,
				exist: true,
				legacy: false,
				itemId: 1,
				iconId: 101,
				grade: 3,
				itemType: 1,
				itemSubType: 2,
				elementalType: 0,
				tradableId: "trade1",
				setId: 10,
				combatPoint: 100,
				level: 10,
				optionCountFromCombination: 2,
				crystal: 50,
				crystalPerPrice: 0.033,
				byCustomCraft: false,
				hasRandomOnlyIcon: false,
			},
			{
				productId: "alpha-1",
				sellerAgentAddress: "seller2",
				sellerAvatarAddress: "avatar2",
				price: 1000,
				unitPrice: 100,
				quantity: 10,
				registeredBlockIndex: 1001,
				exist: true,
				legacy: false,
				itemId: 2,
				iconId: 102,
				grade: 2,
				itemType: 1,
				itemSubType: 2,
				elementalType: 1,
				tradableId: "trade2",
				setId: 11,
				combatPoint: 200,
				level: 5,
				optionCountFromCombination: 1,
				crystal: 25,
				crystalPerPrice: 0.025,
				byCustomCraft: false,
				hasRandomOnlyIcon: false,
			},
			{
				productId: "beta-1",
				sellerAgentAddress: "seller3",
				sellerAvatarAddress: "avatar3",
				price: 400,
				unitPrice: 200,
				quantity: 2,
				registeredBlockIndex: 1002,
				exist: true,
				legacy: false,
				itemId: 3,
				iconId: 103,
				grade: 1,
				itemType: 1,
				itemSubType: 2,
				elementalType: 2,
				tradableId: "trade3",
				setId: 12,
				combatPoint: 150,
				level: 1,
				optionCountFromCombination: 0,
				crystal: 10,
				crystalPerPrice: 0.025,
				byCustomCraft: false,
				hasRandomOnlyIcon: false,
			},
		];
	});

	describe("PriceSorter", () => {
		it("should sort products by price in ascending order", () => {
			const service = ProductSortServiceFactory.createPriceSorter();
			const result = service.sort(mockProducts);

			expect(result[0].price).toBe(400); // Beta Product
			expect(result[1].price).toBe(1000); // Alpha Product
			expect(result[2].price).toBe(1500); // Zebra Product
		});
	});

	describe("UnitPriceSorter", () => {
		it("should sort products by unit price in ascending order", () => {
			const service = ProductSortServiceFactory.createUnitPriceSorter();
			const result = service.sort(mockProducts);

			expect(result[0].unitPrice).toBe(100);
			expect(result[1].unitPrice).toBe(200);
			expect(result[2].unitPrice).toBe(300);
		});
	});

	describe("QuantitySorter", () => {
		it("should sort products by quantity in descending order", () => {
			const service = ProductSortServiceFactory.createQuantitySorter();
			const result = service.sort(mockProducts);

			expect(result[0].quantity).toBe(10);
			expect(result[1].quantity).toBe(5);
			expect(result[2].quantity).toBe(2);
		});
	});

	describe("Edge cases", () => {
		it("should handle empty array", () => {
			const service = ProductSortServiceFactory.createPriceSorter();
			const result = service.sort([]);
			expect(result).toEqual([]);
		});

		it("should handle single item array", () => {
			const service = ProductSortServiceFactory.createPriceSorter();
			const singleItem = [mockProducts[0]];
			const result = service.sort(singleItem);
			expect(result).toEqual(singleItem);
		});

		it("should not mutate original array", () => {
			const service = ProductSortServiceFactory.createPriceSorter();
			const originalOrder = [...mockProducts];
			service.sort(mockProducts);

			expect(mockProducts).toEqual(originalOrder);
		});
	});
});

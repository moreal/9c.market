// Mock SolidJS functions for testing
import { vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// Mock solid-js functions that might be used in tests
vi.mock("solid-js", async () => {
	const actual = await vi.importActual("solid-js");
	return {
		...actual,
		createSignal: vi.fn(() => [vi.fn(), vi.fn()]),
		createEffect: vi.fn(),
		createMemo: vi.fn(),
	};
});

// Mock MarketQueries module with proper export
vi.mock("../queries/MarketQueries", () => ({
	fetchItemProductsQuery: vi.fn(() =>
		Promise.resolve({
			totalCount: 100,
			limit: 10,
			offset: 0,
			itemProducts: [
				{
					productId: "test-product-1",
					sellerAgentAddress: "agent-address-1",
					sellerAvatarAddress: "avatar-address-1",
					price: 1000,
					unitPrice: 100,
					quantity: 10,
					registeredBlockIndex: 1000,
					exist: true,
					legacy: false,
					itemId: 1,
					iconId: 101,
					grade: 1,
					itemType: 1,
					itemSubType: 1,
					elementalType: 1,
					tradableId: "trade-1",
					setId: 10,
					combatPoint: 100,
					level: 1,
					optionCountFromCombination: 0,
					crystal: 50,
					crystalPerPrice: 0.05,
					byCustomCraft: false,
					hasRandomOnlyIcon: false,
				},
			],
			fungibleAssetValueProducts: [],
		}),
	),
}));

// Mock @solidjs/router
vi.mock("@solidjs/router", () => ({
	query: vi.fn((fn, key) => fn),
	createAsync: vi.fn(),
}));

// Mock ErrorHandler utility
vi.mock("../utils/ErrorHandler", () => ({
	ErrorHandler: {
		getUserFriendlyMessage: vi.fn((error) => error?.message || "Unknown error"),
	},
}));

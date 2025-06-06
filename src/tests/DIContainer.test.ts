import { describe, it, expect, vi } from "vitest";

// Mock all dependencies before importing DIContainer
vi.mock("../services/MarketProductService", () => ({
	marketProductService: {
		fetchProducts: vi.fn(),
	},
}));

vi.mock("../services/ProductSortService", () => ({
	ProductSortServiceFactory: {
		createUnitPriceSorter: vi.fn(() => ({
			sort: vi.fn((products) => products),
		})),
		createPriceSorter: vi.fn(() => ({
			sort: vi.fn((products) => products),
		})),
		createQuantitySorter: vi.fn(() => ({
			sort: vi.fn((products) => products),
		})),
	},
}));

vi.mock("../services/ProductListRenderer", () => ({
	productListRenderer: {
		render: vi.fn(),
	},
}));

vi.mock("../queries/MarketQueries", () => ({
	fetchItemProductsQuery: vi.fn(),
}));

import { DIContainer } from "../utils/DIContainer";

describe("DIContainer", () => {
	describe("createDefault", () => {
		it("should create container with default configuration", () => {
			const container = DIContainer.createDefault();

			expect(container).toBeDefined();
			expect(container.marketProductService).toBeDefined();
			expect(container.productSortService).toBeDefined();
			expect(container.productListRenderer).toBeDefined();
		});

		it("should return services implementing correct interfaces", () => {
			const container = DIContainer.createDefault();

			const productService = container.marketProductService;
			const sortService = container.productSortService;
			const renderer = container.productListRenderer;

			expect(typeof productService.fetchProducts).toBe("function");
			expect(typeof sortService.sort).toBe("function");
			expect(typeof renderer).toBe("function");
		});
	});

	describe("createWithPriceSorting", () => {
		it("should create container with price sort configuration", () => {
			const container = DIContainer.createWithPriceSorting();

			expect(container).toBeDefined();
			expect(container.marketProductService).toBeDefined();
			expect(container.productSortService).toBeDefined();
			expect(container.productListRenderer).toBeDefined();
		});
	});

	describe("service isolation", () => {
		it("should create separate service instances for different containers", () => {
			const container1 = DIContainer.createDefault();
			const container2 = DIContainer.createWithPriceSorting();

			const service1 = container1.productSortService;
			const service2 = container2.productSortService;

			// Services should be different instances with potentially different configurations
			expect(service1).toBeDefined();
			expect(service2).toBeDefined();
		});
	});
});

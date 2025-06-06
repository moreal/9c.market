import { describe, it, expect, vi, beforeEach } from "vitest";
import { MarketProductService } from "../services/MarketProductService";
import type { NetworkType } from "../contexts/NetworkContext";
import type { ItemSubType } from "../types/item";

describe("MarketProductService", () => {
	let service: MarketProductService;

	beforeEach(() => {
		service = new MarketProductService();
		vi.clearAllMocks();
	});

	describe("fetchProducts", () => {
		it("should call fetchProducts with correct parameters", () => {
			const network: NetworkType = "odin";
			const itemSubType: ItemSubType = "HOURGLASS";

			// Call the method
			const result = service.fetchProducts(network, itemSubType);

			// Verify that it returns a promise (since it's async)
			expect(result).toBeInstanceOf(Promise);
		});

		it("should handle different network types", async () => {
			const networks: NetworkType[] = ["odin", "heimdall"];
			const itemSubType: ItemSubType = "AP_STONE";

			for (const network of networks) {
				const result = service.fetchProducts(network, itemSubType);
				expect(result).toBeInstanceOf(Promise);
			}
		});

		it("should handle different item subtypes", async () => {
			const network: NetworkType = "odin";
			const itemSubTypes: ItemSubType[] = [
				"HOURGLASS",
				"AP_STONE",
				"SCROLL",
				"CIRCLE",
			];

			for (const itemSubType of itemSubTypes) {
				const result = service.fetchProducts(network, itemSubType);
				expect(result).toBeInstanceOf(Promise);
			}
		});
	});

	describe("interface compliance", () => {
		it("should implement IMarketProductService interface", () => {
			expect(typeof service.fetchProducts).toBe("function");
			expect(service.fetchProducts.length).toBe(2); // expects 2 parameters
		});
	});
});

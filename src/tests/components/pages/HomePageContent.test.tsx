import { describe, it, expect, vi } from "vitest";
import HomePageContent from "../../../components/pages/HomePageContent";

// Mock dependencies
vi.mock("~/components/market/ItemSubTypeSelector", () => ({
	default: () => ({ type: "ItemSubTypeSelector" }),
}));

vi.mock("~/components/market/MarketProductList", () => ({
	MarketProductList: () => ({ type: "MarketProductList" }),
}));

vi.mock("~/components/ui/LoadingSpinner", () => ({
	default: () => ({ type: "LoadingSpinner" }),
}));

describe("HomePageContent", () => {
	it("should be defined", () => {
		expect(HomePageContent).toBeDefined();
		expect(typeof HomePageContent).toBe("function");
	});

	it("should have correct component name", () => {
		expect(HomePageContent.name).toBe("HomePageContent");
	});

	// Note: Full DOM testing would require @solidjs/testing-library
	// These tests verify the component structure and exports
});

import { describe, it, expect } from "vitest";
import NotFoundPageContent from "../../../components/pages/NotFoundPageContent";

describe("NotFoundPageContent", () => {
	it("should be defined", () => {
		expect(NotFoundPageContent).toBeDefined();
		expect(typeof NotFoundPageContent).toBe("function");
	});

	it("should have correct component name", () => {
		expect(NotFoundPageContent.name).toBe("NotFoundPageContent");
	});

	// Note: Full DOM testing would require @solidjs/testing-library
	// These tests verify the component structure and exports
});

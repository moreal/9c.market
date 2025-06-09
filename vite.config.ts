import { defineConfig } from "vite";

// This file is used by Vitest for testing configuration only
// Main Vite configuration is handled by SolidStart's app.config.ts
export default defineConfig({
	test: {
		environment: "jsdom",
	},
});

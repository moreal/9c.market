import Icons from "unplugin-icons/vite";
import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	vite: {
		plugins: [
			tailwindcss(),
			Icons({
				compiler: "jsx",
				jsx: "preact",
			}),
		],
		build: {
			target: "esnext",
		},
	},
});

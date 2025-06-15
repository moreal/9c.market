import type { Component } from "solid-js";
import { A } from "@solidjs/router";

export const Nav: Component = () => {
	return (
		<nav class="bg-white dark:bg-gray-800 shadow">
			<div class="container mx-auto px-4">
				<div class="flex justify-between h-16">
					<div class="flex">
						<A
							href="/"
							class="flex items-center px-2 py-2 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
						>
							Home
						</A>
						<A
							href="/products"
							class="flex items-center px-2 py-2 text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
						>
							Products
						</A>
					</div>
				</div>
			</div>
		</nav>
	);
};

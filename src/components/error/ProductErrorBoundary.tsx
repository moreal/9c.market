import { ErrorBoundary, type ParentComponent } from "solid-js";

/**
 * Error message component for when no products are found
 * Follows SRP by handling only empty state display
 */
export const NoProductsMessage = () => {
	return (
		<div class="text-center text-gray-500 py-8">No products available.</div>
	);
};

/**
 * Error message component for individual product rendering errors
 * Follows SRP by handling only product-specific error display
 */
export const ProductRenderError = (props: { productId: string }) => {
	return (
		<div class="bg-red-50 border border-red-200 rounded p-4 mb-2">
			<p class="text-red-700">Error displaying product.</p>
			<p class="text-red-500 text-sm">Product ID: {props.productId}</p>
		</div>
	);
};

/**
 * Error boundary wrapper for product list rendering
 * Follows SRP by handling only error boundary concerns
 */
export const ProductErrorBoundary: ParentComponent = (props) => {
	return (
		<ErrorBoundary
			fallback={(err, reset) => (
				<div class="bg-red-50 border border-red-200 rounded p-4 mb-2">
					<h3 class="text-red-700 font-semibold">Product Loading Error</h3>
					<p class="text-red-600 text-sm mb-2">{err.message}</p>
					<button
						type="button"
						onClick={reset}
						class="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
					>
						Retry
					</button>
				</div>
			)}
		>
			{props.children}
		</ErrorBoundary>
	);
};

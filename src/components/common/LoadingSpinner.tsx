import type { Component } from "solid-js";

export const LoadingSpinner: Component = () => {
	return (
		<div class="loading-spinner">
			<div class="spinner" />
			<p>Loading...</p>
		</div>
	);
};

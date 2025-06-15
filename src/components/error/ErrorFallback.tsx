import type { Component } from "solid-js";

interface ErrorFallbackProps {
	error: Error;
}

export const ErrorFallback: Component<ErrorFallbackProps> = (props) => {
	return (
		<div class="error-fallback">
			<h2>Something went wrong</h2>
			<p>{props.error.message}</p>
			<button type="button" onClick={() => window.location.reload()}>
				Refresh Page
			</button>
		</div>
	);
};

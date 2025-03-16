import { NoHydration } from "solid-js/web";

export default function LoadingSpinner() {
	return (
		<NoHydration>
			<div class="flex justify-center items-center p-8">
				<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
				<span class="sr-only">Loading...</span>
			</div>
		</NoHydration>
	);
}

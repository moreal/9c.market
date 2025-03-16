type EmptyStateProps = {
	message: string;
	icon?: "empty-box" | "no-data" | "search";
};

export default function EmptyState(props: EmptyStateProps) {
	const { message, icon = "empty-box" } = props;

	const renderIcon = () => {
		switch (icon) {
			case "empty-box":
				return (
					<svg
						role="img"
						aria-label="Empty Box"
						xmlns="http://www.w3.org/2000/svg"
						class="w-12 h-12 text-amber-500 mx-auto mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
						/>
					</svg>
				);
			case "no-data":
				return (
					<svg
						role="img"
						aria-label="No Data"
						xmlns="http://www.w3.org/2000/svg"
						class="w-12 h-12 text-amber-500 mx-auto mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				);
			case "search":
				return (
					<svg
						role="img"
						aria-label="Search"
						xmlns="http://www.w3.org/2000/svg"
						class="w-12 h-12 text-amber-500 mx-auto mb-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
				);
			default:
				return null;
		}
	};

	return (
		<div class="bg-amber-50 border border-amber-200 rounded-lg p-8 text-center max-w-xl mx-auto">
			{renderIcon()}
			<p class="text-lg text-amber-800">{message}</p>
		</div>
	);
}

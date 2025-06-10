import type { JSX } from "solid-js";
import { ErrorBoundary } from "solid-js";
import { ErrorHandler } from "~/utils/ErrorHandler";

interface IErrorDisplay {
	title?: string;
	message?: string;
	showReloadButton?: boolean;
	onReload?: () => void;
}

interface PageLayoutProps {
	children: JSX.Element;
	maxWidth?: "sm" | "md" | "lg" | "xl" | "6xl";
	padding?: "sm" | "md" | "lg";
	errorConfig?: IErrorDisplay;
}

/**
 * Base layout component for all pages
 * Follows SRP by handling only layout concerns
 * Provides consistent styling and error handling across all pages
 */
export default function PageLayout(props: PageLayoutProps) {
	const maxWidthClass = {
		sm: "max-w-sm",
		md: "max-w-4xl",
		lg: "max-w-5xl",
		xl: "max-w-7xl",
		"6xl": "max-w-6xl",
	}[props.maxWidth ?? "6xl"];

	const paddingClass = {
		sm: "p-2",
		md: "p-4",
		lg: "p-8",
	}[props.padding ?? "md"];

	const errorConfig = props.errorConfig ?? {
		title: "오류가 발생했습니다",
		showReloadButton: true,
		onReload: () => window.location.reload(),
	};

	return (
		<main class={`container mx-auto ${paddingClass} ${maxWidthClass}`}>
			<ErrorBoundary
				fallback={(error) => (
					<div class="bg-red-50 border border-red-200 rounded-lg p-6 m-4">
						<h2 class="text-lg font-semibold text-red-800 mb-2">
							{errorConfig.title}
						</h2>
						<p class="text-red-600 mb-4">
							{errorConfig.message ??
								ErrorHandler.getUserFriendlyMessage(error)}
						</p>
						{errorConfig.showReloadButton && (
							<button
								type="button"
								onClick={errorConfig.onReload}
								class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
							>
								페이지 새로고침
							</button>
						)}
					</div>
				)}
			>
				{props.children}
			</ErrorBoundary>
		</main>
	);
}

/**
 * Common interface for page content components
 * Follows ISP by defining a minimal contract for page components
 */
export interface IPageContent {
	/** Optional prop to control component behavior */
	readonly?: boolean;
}

/**
 * Layout configuration interface
 * Follows ISP by providing a focused interface for layout concerns
 */
export interface ILayoutConfig {
	maxWidth?: "sm" | "md" | "lg" | "xl" | "6xl";
	padding?: "sm" | "md" | "lg";
	background?: "default" | "light" | "dark";
}

/**
 * Error display configuration
 * Follows SRP by focusing only on error display concerns
 */
export interface IErrorDisplay {
	title?: string;
	message?: string;
	showReloadButton?: boolean;
	onReload?: () => void;
}

export type { ILayoutConfig as LayoutConfig, IErrorDisplay as ErrorDisplay };

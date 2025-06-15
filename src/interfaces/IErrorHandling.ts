import type { JSX } from "solid-js";

/**
 * Interface for error handling components
 * Follows SRP by defining error-specific component contracts
 */
export interface IErrorComponent {
	message?: string;
	onRetry?: () => void;
}

/**
 * Interface for error boundary components
 * Follows OCP by allowing different error boundary implementations
 */
export interface IErrorBoundary {
	fallback: (error: Error, reset: () => void) => JSX.Element;
	children: JSX.Element;
}

/**
 * Interface for service error handling
 * Follows DIP by abstracting error handling concerns
 */
export interface IServiceErrorHandler {
	handleError(error: Error, context?: string): void;
	createErrorResponse<T>(error: Error): Promise<T>;
}

/**
 * Enhanced product service interface with error handling
 * Follows Interface Segregation Principle by extending base interface
 */
export interface IEnhancedMarketProductService {
	fetchProducts(
		network: string,
		itemSubType: string,
	): Promise<{ success: boolean; data?: unknown; error?: string }>;

	validateInput(network: string, itemSubType: string): boolean;
	getErrorMessage(error: Error): string;
}

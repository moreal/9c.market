/**
 * Custom error classes for different service types
 * Provides structured error handling with context information
 */

/**
 * Error class for market service operations
 */
export class MarketServiceError extends Error {
	constructor(
		message: string,
		public readonly code?: string,
	) {
		super(message);
		this.name = "MarketServiceError";
	}
}

/**
 * Error class for sort service operations
 */
export class SortServiceError extends Error {
	constructor(
		message: string,
		public readonly strategy?: string,
	) {
		super(message);
		this.name = "SortServiceError";
	}
}

/**
 * Error class for render service operations
 */
export class RenderServiceError extends Error {
	constructor(
		message: string,
		public readonly context?: unknown,
	) {
		super(message);
		this.name = "RenderServiceError";
	}
}

/**
 * Type guard to check if a value is an Error
 */
function isError(value: unknown): value is Error {
	return value instanceof Error;
}

/**
 * Error handling utility functions
 * Provides consistent error handling across the application
 */
export const ErrorHandler = {
	/**
	 * Executes an operation safely and returns a fallback value on error
	 * @param operation - The operation to execute
	 * @param fallback - The fallback value to return on error
	 * @param errorMessage - Optional custom error message for logging
	 * @returns The operation result or fallback value
	 */
	withFallback<T>(operation: () => T, fallback: T, errorMessage?: string): T {
		try {
			return operation();
		} catch (error) {
			console.error(errorMessage || "Operation failed:", error);
			return fallback;
		}
	},

	/**
	 * Executes an async operation safely and returns a fallback value on error
	 * @param operation - The async operation to execute
	 * @param fallback - The fallback value to return on error
	 * @param errorMessage - Optional custom error message for logging
	 * @returns Promise resolving to the operation result or fallback value
	 */
	async withAsyncFallback<T>(
		operation: () => Promise<T>,
		fallback: T,
		errorMessage?: string,
	): Promise<T> {
		try {
			return await operation();
		} catch (error) {
			console.error(errorMessage || "Async operation failed:", error);
			return fallback;
		}
	},

	/**
	 * Type guard to check if error is a MarketServiceError
	 * @param error - The error to check
	 * @returns True if error is MarketServiceError
	 */
	isMarketServiceError(error: unknown): error is MarketServiceError {
		return error instanceof MarketServiceError;
	},

	/**
	 * Type guard to check if error is a SortServiceError
	 * @param error - The error to check
	 * @returns True if error is SortServiceError
	 */
	isSortServiceError(error: unknown): error is SortServiceError {
		return error instanceof SortServiceError;
	},

	/**
	 * Type guard to check if error is a RenderServiceError
	 * @param error - The error to check
	 * @returns True if error is RenderServiceError
	 */
	isRenderServiceError(error: unknown): error is RenderServiceError {
		return error instanceof RenderServiceError;
	},

	/**
	 * Converts errors to user-friendly messages in Korean
	 * @param error - The error to convert
	 * @returns User-friendly error message
	 */
	getUserFriendlyMessage(error: unknown): string {
		if (this.isMarketServiceError(error)) {
			return `데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`;
		}

		if (this.isSortServiceError(error)) {
			return `정렬 중 오류가 발생했습니다: ${error.message}`;
		}

		if (this.isRenderServiceError(error)) {
			return `화면을 표시하는 중 오류가 발생했습니다: ${error.message}`;
		}

		if (isError(error)) {
			return `오류가 발생했습니다: ${error.message}`;
		}

		return "알 수 없는 오류가 발생했습니다.";
	},

	/**
	 * Logs error with context information
	 * @param error - The error to log
	 * @param context - Additional context information
	 */
	logError(error: unknown, context?: Record<string, unknown>): void {
		const errorInfo = {
			message: this.getUserFriendlyMessage(error),
			error: error instanceof Error ? error.stack : String(error),
			context,
			timestamp: new Date().toISOString(),
		};

		console.error("Application Error:", errorInfo);
	},
};

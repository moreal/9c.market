/**
 * 커스텀 에러 클래스들
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

export class SortServiceError extends Error {
	constructor(
		message: string,
		public readonly strategy?: string,
	) {
		super(message);
		this.name = "SortServiceError";
	}
}

export class RenderServiceError extends Error {
	constructor(
		message: string,
		public readonly context?: any,
	) {
		super(message);
		this.name = "RenderServiceError";
	}
}

/**
 * 에러 핸들링 유틸리티 함수들
 */
export const ErrorHandler = {
	/**
	 * 에러를 안전하게 로깅하고 기본값을 반환
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
	 * 비동기 작업을 안전하게 실행하고 에러를 처리
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
	 * 에러가 특정 타입인지 확인
	 */
	isMarketServiceError(error: unknown): error is MarketServiceError {
		return error instanceof MarketServiceError;
	},

	isSortServiceError(error: unknown): error is SortServiceError {
		return error instanceof SortServiceError;
	},

	isRenderServiceError(error: unknown): error is RenderServiceError {
		return error instanceof RenderServiceError;
	},

	/**
	 * 에러를 사용자 친화적인 메시지로 변환
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

		if (error instanceof Error) {
			return `오류가 발생했습니다: ${error.message}`;
		}

		return "알 수 없는 오류가 발생했습니다.";
	},
};

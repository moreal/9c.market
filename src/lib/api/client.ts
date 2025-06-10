import { createSignal } from "solid-js";
import type { ApiError, ApiResponse } from "~/types/api";

export class ApiClient {
	private baseUrl: string;
	private isLoadingSignal = createSignal(false);

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	private async request<T>(
		endpoint: string,
		options: RequestInit = {},
	): Promise<ApiResponse<T>> {
		try {
			this.setIsLoading(true);
			const response = await fetch(`${this.baseUrl}${endpoint}`, {
				...options,
				headers: {
					"Content-Type": "application/json",
					...options.headers,
				},
			});

			if (!response.ok) {
				const error: ApiError = new Error("API request failed");
				error.status = response.status;
				try {
					error.data = await response.json();
				} catch {
					error.data = await response.text();
				}
				throw error;
			}

			const data = await response.json();
			return { data, error: null };
		} catch (error) {
			const apiError = error as ApiError;
			return {
				data: null,
				error: apiError,
			};
		} finally {
			this.setIsLoading(false);
		}
	}

	public get<T>(endpoint: string, options?: RequestInit) {
		return this.request<T>(endpoint, { ...options, method: "GET" });
	}

	public post<T>(endpoint: string, data?: unknown, options?: RequestInit) {
		return this.request<T>(endpoint, {
			...options,
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	public put<T>(endpoint: string, data?: unknown, options?: RequestInit) {
		return this.request<T>(endpoint, {
			...options,
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	public delete<T>(endpoint: string, options?: RequestInit) {
		return this.request<T>(endpoint, { ...options, method: "DELETE" });
	}

	public getIsLoading() {
		return this.isLoadingSignal[0]();
	}

	private setIsLoading(value: boolean) {
		this.isLoadingSignal[1](value);
	}
}

// Create a singleton instance
export const apiClient = new ApiClient(import.meta.env.VITE_API_URL || "");

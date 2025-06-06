import type { Component, JSX } from "solid-js";

/**
 * Base interface for context providers
 * Follows LSP by ensuring all providers can be substituted
 */
export interface IContextProvider {
	/**
	 * Provides context to children components
	 */
	provide: Component<{ children: JSX.Element }>;
}

/**
 * Base interface for context values
 */
export interface IContextValue<T> {
	/**
	 * Gets the current context value
	 */
	getValue(): T;

	/**
	 * Sets a new context value
	 */
	setValue(value: T): void;
}

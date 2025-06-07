import { cookieStorage, makePersisted } from "@solid-primitives/storage";
import { createSignal, createContext, useContext, type JSX } from "solid-js";
import { config } from "~/config";
import type { CurrencyTicker } from "~/types/Currency";

// Re-export CurrencyTicker for convenience
export type { CurrencyTicker } from "~/types/Currency";

/**
 * Props interface for CurrencyProvider component
 */
interface CurrencyProviderProps {
	children: JSX.Element;
}

/**
 * Context type for currency management
 */
interface CurrencyContextType {
	currency: () => CurrencyTicker;
	setCurrency: (currency: CurrencyTicker) => void;
}

const CurrencyContext = createContext<CurrencyContextType>();

/**
 * Currency context provider component
 * Manages currency selection with persistent storage
 * Uses cookie storage to maintain currency preference across sessions
 */
export function CurrencyProvider(props: CurrencyProviderProps) {
	const [currency, setCurrency] = makePersisted(
		createSignal<CurrencyTicker>(
			config.currency.defaultCurrency as CurrencyTicker,
		),
		{
			storage: cookieStorage,
		},
	);

	return (
		<CurrencyContext.Provider
			value={{
				currency,
				setCurrency,
			}}
		>
			{props.children}
		</CurrencyContext.Provider>
	);
}

/**
 * Hook for accessing currency context
 * @throws {Error} When used outside of CurrencyProvider
 * @returns Currency context with current currency and setter function
 */
export function useCurrency() {
	const context = useContext(CurrencyContext);
	if (!context) {
		throw new Error("useCurrency must be used within a CurrencyProvider");
	}
	return context;
}

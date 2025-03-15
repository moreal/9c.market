import { cookieStorage, makePersisted } from "@solid-primitives/storage";
import { createSignal, createContext, useContext, type JSX } from "solid-js";
import { config } from "~/config";

// Define the available currency types
export type CurrencyType = "USD" | "EUR" | "JPY" | "KRW";

// Create the context
type CurrencyContextType = {
	currency: () => CurrencyType;
	setCurrency: (currency: CurrencyType) => void;
};

const CurrencyContext = createContext<CurrencyContextType>();

// Provider component
export function CurrencyProvider(props: { children: JSX.Element }) {
	// const [currency, setCurrency] = createSignal<CurrencyType>(
	// 	config.currency.defaultCurrency as CurrencyType
	// );

	const [currency, setCurrency] = makePersisted(
		createSignal<CurrencyType>(config.currency.defaultCurrency),
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

// Consumer hook
export function useCurrency() {
	const context = useContext(CurrencyContext);
	if (!context) {
		throw new Error("useCurrency must be used within a CurrencyProvider");
	}
	return context;
}

import {
	createResource,
	createContext,
	useContext,
	onMount,
	type JSX,
	type Resource,
} from "solid-js";
import { useCurrency } from "./CurrencyContext";
import { marketApi } from "~/lib/api";
import { config } from "~/config";

// Create the context
type WNCGPriceContextType = {
	wncgPrice: Resource<number | null>;
	refetchPrice: () => void;
};

const WNCGPriceContext = createContext<WNCGPriceContextType>();

/**
 * Fetches cryptocurrency price based on the selected network and currency
 */
async function fetchCryptoPrice(
	symbol: string,
	currency: string,
): Promise<number | null> {
	"use server";

	// For other currencies, use the general cryptocurrency API
	return await marketApi.fetchCryptoPrice(symbol, currency);
}

// Provider component
export function WNCGPriceProvider(props: { children: JSX.Element }) {
	const { currency } = useCurrency();

	const [wncgPrice, { refetch: refetchPrice }] = createResource(
		currency,
		async (currency) => await fetchCryptoPrice("WNCG", currency),
	);

	// Set up auto-refresh timer
	onMount(() => {
		const intervalId = setInterval(
			() => {
				refetchPrice();
			},
			config.refreshIntervals.wncgPrice, // Use the refresh interval from config
		);

		return () => clearInterval(intervalId);
	});

	return (
		<WNCGPriceContext.Provider value={{ wncgPrice, refetchPrice }}>
			{props.children}
		</WNCGPriceContext.Provider>
	);
}

// Consumer hook
export function useWNCGPrice() {
	const context = useContext(WNCGPriceContext);
	if (!context) {
		throw new Error("useWNCGPrice must be used within a WNCGPriceProvider");
	}
	return context;
}

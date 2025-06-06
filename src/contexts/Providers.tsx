import type { JSX } from "solid-js";
import { NetworkProvider } from "./NetworkContext";
import { CurrencyProvider } from "./CurrencyContext";
import { WNCGPriceProvider } from "./WNCGPriceContext";
import { ProductsProvider } from "./ProductsContext";

/**
 * Props interface for Providers component
 */
interface ProvidersProps {
	children: JSX.Element;
}

/**
 * Root providers component that wraps the application with all necessary contexts
 *
 * Provider hierarchy (outer to inner):
 * 1. NetworkProvider - Manages network selection (odin/heimdall)
 * 2. CurrencyProvider - Manages currency selection (USD, EUR, etc.)
 * 3. WNCGPriceProvider - Manages WNCG price fetching and updates
 * 4. ProductsProvider - Manages product data fetching and processing
 *
 * This hierarchy ensures that:
 * - Network selection is available to all child providers
 * - Currency selection is available for price calculations
 * - WNCG prices are available for product price conversions
 * - Product data depends on network and currency selections
 */
export function Providers(props: ProvidersProps) {
	return (
		<NetworkProvider>
			<CurrencyProvider>
				<WNCGPriceProvider>
					<ProductsProvider>{props.children}</ProductsProvider>
				</WNCGPriceProvider>
			</CurrencyProvider>
		</NetworkProvider>
	);
}

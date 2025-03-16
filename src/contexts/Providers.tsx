import type { JSX } from "solid-js";
import { NetworkProvider } from "./NetworkContext";
import { CurrencyProvider } from "./CurrencyContext";
import { WNCGPriceProvider } from "./WNCGPriceContext";
import { ProductsProvider } from "./ProductsContext";

export function Providers(props: { children: JSX.Element }) {
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

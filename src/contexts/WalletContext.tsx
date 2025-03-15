import { createMemo, createContext, useContext, type JSX } from "solid-js";
import type { getChronoSdk } from "@planetarium/chrono-sdk";

// Create the context
type WalletContextType = {
	wallet: ReturnType<typeof getChronoSdk> | undefined;
};

const WalletContext = createContext<WalletContextType>();

// Provider component
export function WalletProvider(props: { children: JSX.Element }) {
	const wallet = createMemo(
		() =>
			(globalThis as unknown).chronoWallet as ReturnType<typeof getChronoSdk>,
	);

	return (
		<WalletContext.Provider value={{ wallet: wallet() }}>
			{props.children}
		</WalletContext.Provider>
	);
}

// Consumer hook
export function useWallet() {
	const context = useContext(WalletContext);
	if (!context) {
		throw new Error("useWallet must be used within a WalletProvider");
	}
	return context;
}

// For backward compatibility
export const wallet = createMemo(
	() => (globalThis as unknown).chronoWallet as ReturnType<typeof getChronoSdk>,
);

import { cookieStorage, makePersisted } from "@solid-primitives/storage";
import { createSignal, createContext, useContext, type JSX } from "solid-js";
import { config } from "~/config";

/**
 * Available network types for Nine Chronicles
 */
export type NetworkType = "odin" | "heimdall";

/**
 * Props interface for NetworkProvider component
 */
interface NetworkProviderProps {
	children: JSX.Element;
}

/**
 * Context type for network management
 */
interface NetworkContextType {
	network: () => NetworkType;
	setNetwork: (network: NetworkType) => void;
}

const NetworkContext = createContext<NetworkContextType>();

/**
 * Network context provider component
 * Manages network selection with persistent storage
 * Uses cookie storage to maintain network preference across sessions
 */
export function NetworkProvider(props: NetworkProviderProps) {
	const [network, setNetwork] = makePersisted(
		createSignal<NetworkType>(config.networks.defaultNetwork),
		{
			storage: cookieStorage,
		},
	);

	return (
		<NetworkContext.Provider
			value={{
				network,
				setNetwork,
			}}
		>
			{props.children}
		</NetworkContext.Provider>
	);
}

/**
 * Hook for accessing network context
 * @throws {Error} When used outside of NetworkProvider
 * @returns Network context with current network and setter function
 */
export function useNetwork() {
	const context = useContext(NetworkContext);
	if (!context) {
		throw new Error("useNetwork must be used within a NetworkProvider");
	}
	return context;
}

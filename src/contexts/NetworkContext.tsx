import { cookieStorage, makePersisted } from "@solid-primitives/storage";
import { createSignal, createContext, useContext, type JSX } from "solid-js";
import { config } from "~/config";

// Define the available network types
export type NetworkType = "odin" | "heimdall"; // Use literal types instead of circular reference

// Create the context
type NetworkContextType = {
	network: () => NetworkType;
	setNetwork: (network: NetworkType) => void;
};

const NetworkContext = createContext<NetworkContextType>();

// Provider component
export function NetworkProvider(props: { children: JSX.Element }) {
	// const [network, setNetwork] = createSignal<NetworkType>(
	// 	config.networks.defaultNetwork
	// );

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

// Consumer hook
export function useNetwork() {
	const context = useContext(NetworkContext);
	if (!context) {
		throw new Error("useNetwork must be used within a NetworkProvider");
	}
	return context;
}

import { createContext, createSignal, useContext, JSX } from "solid-js";

// Available networks
export const NETWORKS = ["odin", "heimdall"] as const;
type NetworkType = typeof NETWORKS[number];

// Create the context
type NetworkContextType = {
  network: () => NetworkType;
  setNetwork: (network: NetworkType) => void;
};

const NetworkContext = createContext<NetworkContextType>({
  network: () => NETWORKS[0],
  setNetwork: () => {}
});

// Provider component
export function NetworkProvider(props: { children: JSX.Element }) {
  const [network, setNetwork] = createSignal<NetworkType>(NETWORKS[0]);

  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      {props.children}
    </NetworkContext.Provider>
  );
}

// Hook to use the network context
export function useNetwork() {
  return useContext(NetworkContext);
}

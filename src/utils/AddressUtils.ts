import type { NetworkType } from "~/contexts/NetworkContext";

/**
 * Address utilities
 * Follows SRP by handling only address-related operations
 */
const NCSCAN_BY_NETWORK: Readonly<Record<NetworkType, string>> = {
	heimdall: "https://heimdall.9cscan.com",
	odin: "https://9cscan.com",
} as const;

const ADDRESS_SHORT_LENGTH = 6;

export const AddressUtils = {
	/**
	 * Generates the full NCScan URL for an address
	 */
	getNCScanUrl(network: NetworkType, address: string): string {
		return `${NCSCAN_BY_NETWORK[network]}/address/0x${address}`;
	},

	/**
	 * Shortens an address for display
	 */
	shortenAddress(address: string): string {
		return `0x${address.substring(0, ADDRESS_SHORT_LENGTH)}`;
	},
} as const;

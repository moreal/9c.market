import type { NetworkType } from "~/contexts/NetworkContext";

/**
 * Network-specific NCScan URL mappings
 */
const NCSCAN_BY_NETWORK: Readonly<Record<NetworkType, string>> = {
	heimdall: "https://heimdall.9cscan.com",
	odin: "https://9cscan.com",
} as const;

/**
 * Configuration constants for address formatting
 */
const ADDRESS_CONFIG = {
	SHORT_LENGTH: 6,
	PREFIX: "0x",
} as const;

/**
 * Address utilities for Nine Chronicles blockchain addresses
 * Follows SRP by handling only address-related operations
 * Provides consistent address formatting and URL generation
 */
export const AddressUtils = {
	/**
	 * Generates the full NCScan URL for viewing an address
	 * @param network - The Nine Chronicles network type
	 * @param address - The blockchain address (without 0x prefix)
	 * @returns Complete URL to view the address on NCScan
	 * @example
	 * getNCScanUrl("odin", "1234567890abcdef")
	 * // returns "https://9cscan.com/address/0x1234567890abcdef"
	 */
	getNCScanUrl(network: NetworkType, address: string): string {
		if (!address || !network) {
			throw new Error("Network and address are required");
		}

		const baseUrl = NCSCAN_BY_NETWORK[network];
		return `${baseUrl}/address/${ADDRESS_CONFIG.PREFIX}${address}`;
	},

	/**
	 * Shortens an address for display purposes
	 * @param address - The blockchain address to shorten
	 * @returns Shortened address with 0x prefix and first 6 characters
	 * @example
	 * shortenAddress("1234567890abcdef") // returns "0x123456"
	 */
	shortenAddress(address: string): string {
		if (!address) {
			return ADDRESS_CONFIG.PREFIX;
		}

		const cleanAddress = address.replace(ADDRESS_CONFIG.PREFIX, "");
		const shortAddress = cleanAddress.substring(0, ADDRESS_CONFIG.SHORT_LENGTH);
		return `${ADDRESS_CONFIG.PREFIX}${shortAddress}`;
	},

	/**
	 * Validates if an address has the correct format
	 * @param address - The address to validate
	 * @returns True if address is valid (non-empty string)
	 */
	isValidAddress(address: string): boolean {
		return typeof address === "string" && address.length > 0;
	},

	/**
	 * Formats an address with consistent casing (lowercase)
	 * @param address - The address to format
	 * @returns Formatted address in lowercase
	 */
	formatAddress(address: string): string {
		if (!this.isValidAddress(address)) {
			return "";
		}
		return address.toLowerCase();
	},
} as const;

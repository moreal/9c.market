import type { NetworkType } from "~/contexts/NetworkContext";
import { AddressUtils } from "~/utils/AddressUtils";
import HeroiconsOutlineExternalLink from "~icons/heroicons-outline/external-link";

/**
 * Props for AddressLink component
 */
type AddressLinkProps = {
	network: NetworkType;
	address: string;
	label: string;
};

/**
 * Address link component
 * Follows SRP by handling only address link display logic
 */
export function AddressLink(props: AddressLinkProps) {
	return (
		<a
			href={AddressUtils.getNCScanUrl(props.network, props.address)}
			class="text-gray-500 hover:text-gray-700 text-xs hover:underline flex items-center"
			target="_blank"
			rel="noopener noreferrer"
		>
			<HeroiconsOutlineExternalLink class="stroke-2 h-3 w-3 mr-0.5" />
			{props.label} ({AddressUtils.shortenAddress(props.address)})
		</a>
	);
}

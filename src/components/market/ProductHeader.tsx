import type { NetworkType } from "~/contexts/NetworkContext";
import { SHEET_ID_MAP } from "~/constants";
import { AddressLink } from "./AddressLink";

/**
 * Props for ProductHeader component
 */
export interface ProductHeaderProps {
	itemId: number;
	quantity: number;
	network: NetworkType;
	sellerAgentAddress: string;
	sellerAvatarAddress: string;
}

/**
 * Product header component showing item name, quantity and seller addresses
 * Follows SRP by handling only product header display logic
 */
export function ProductHeader(props: ProductHeaderProps) {
	return (
		<div class="flex justify-between items-center mb-2">
			<div class="flex items-center">
				<span class="ml-2 font-semibold text-gray-800">
					{SHEET_ID_MAP[props.itemId] || props.itemId}
				</span>
				<span class="font-light text-indigo-800 pl-1 pr-1 py-0.5 rounded-full text-sm">
					x
				</span>
				<span class="font-bold text-indigo-800 py-0.5 rounded-full text-sm">
					{props.quantity}
				</span>
			</div>
			<div class="flex items-center gap-2">
				<AddressLink
					network={props.network}
					address={props.sellerAgentAddress}
					label="Agent"
				/>
				<AddressLink
					network={props.network}
					address={props.sellerAvatarAddress}
					label="Avatar"
				/>
			</div>
		</div>
	);
}

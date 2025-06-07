import type { Component } from "solid-js";
import type { CurrencyTicker } from "~/types/Currency";

/**
 * Props for PriceDisplay component
 */
type PriceDisplayProps = {
	label: string;
	price: number;
	unitPrice: number;
	currency: CurrencyTicker;
	wncgPrice: number;
	icon: Component<{ class: string }>;
	iconColor: string;
};

/**
 * Price display component
 * Follows SRP by handling only price display logic
 */
export function PriceDisplay(props: PriceDisplayProps) {
	return (
		<div class="flex items-center">
			<props.icon class={`stroke-2 h-4 w-4 ${props.iconColor} mr-1.5`} />
			<div>
				<span class="text-xs text-gray-500">{props.label}</span>
				<div class="font-bold text-gray-900 text-sm">
					{(props.price * props.wncgPrice).toFixed(2)} {props.currency}{" "}
					<span class="font-medium text-xs text-gray-700">
						({props.price} NCG)
					</span>
				</div>
			</div>
		</div>
	);
}

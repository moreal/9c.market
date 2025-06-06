import { Show } from "solid-js";
import HeroiconsOutlineTrendingDown from "~icons/heroicons-outline/trending-down";
import HeroiconsOutlineTrendingUp from "~icons/heroicons-outline/trending-up";

/**
 * Props for IAPComparison component
 */
type IAPComparisonProps = {
	comparison: { percent: number; cheaper: boolean } | null;
};

/**
 * IAP comparison component
 * Follows SRP by handling only IAP comparison display logic
 */
export function IAPComparison(props: IAPComparisonProps) {
	return (
		<Show when={props.comparison}>
			{(comparison) => (
				<div class="flex items-center">
					{comparison().cheaper ? (
						<HeroiconsOutlineTrendingDown class="stroke-2 h-4 w-4 text-green-500 mr-1.5" />
					) : (
						<HeroiconsOutlineTrendingUp class="stroke-2 h-4 w-4 text-orange-500 mr-1.5" />
					)}
					<div>
						<span class="text-xs text-gray-500">Compare with IAP</span>
						<div
							class={`font-semibold ${comparison().cheaper ? "text-green-600" : "text-orange-600"} text-sm transition-all duration-300`}
						>
							{comparison().percent.toFixed(2)}%{" "}
							{comparison().cheaper ? "cheaper" : "expensive"} than IAP
						</div>
					</div>
				</div>
			)}
		</Show>
	);
}

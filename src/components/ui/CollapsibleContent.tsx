import { type JSX, splitProps } from "solid-js";
import { Collapsible } from "@kobalte/core/collapsible";

type CollapsibleContentProps = {
	title: string;
	children: JSX.Element;
	defaultOpen?: boolean;
};

/**
 * CollapsibleContent component using Kobalte
 * Follows SRP by handling only collapsible content display logic
 */
export default function CollapsibleContent(props: CollapsibleContentProps) {
	const [local, kobalteProps] = splitProps(props, ["title", "children"]);

	return (
		<div class="border-t border-gray-200 pt-4 mt-4">
			<Collapsible {...kobalteProps}>
				<Collapsible.Trigger class="flex w-full justify-between items-center focus:outline-none group">
					<span class="font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">
						{local.title}
					</span>
					<span class="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-indigo-100 text-gray-500 group-hover:text-indigo-600 transition-all duration-200 group-data-[expanded]:rotate-180">
						<svg
							role="img"
							aria-label="Toggle Icon"
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</span>
				</Collapsible.Trigger>

				<Collapsible.Content class="overflow-hidden data-[expanded]:animate-expand data-[collapsed]:animate-collapse">
					<div class="pt-3 pb-1">{local.children}</div>
				</Collapsible.Content>
			</Collapsible>
		</div>
	);
}

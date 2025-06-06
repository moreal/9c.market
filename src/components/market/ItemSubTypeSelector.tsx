import { For, type JSX } from "solid-js";
import { Dropdown } from "~/components/ui/Dropdown";
import HeroiconsOutlineChevronDown from "~icons/heroicons-outline/chevron-down";
import { useItemSubType } from "~/contexts/ItemSubTypeContext";
import { type ItemSubType, AVAILABLE_ITEM_SUB_TYPE } from "~/types/item";

/**
 * Mapping of ItemSubType to display names
 */
const NAME_BY_ITEM_SUB_TYPE: Record<ItemSubType, string> = {
	HOURGLASS: "Hourglass",
	AP_STONE: "AP Potion",
	SCROLL: "Scroll",
	CIRCLE: "Circle",
};

/**
 * Props for ItemSubTypeSelector component
 */
interface ItemSubTypeSelectorProps {
	class?: string;
	variant?: "default" | "compact";
}

/**
 * Item sub-type selector component using the generic Dropdown component
 */
function ItemSubTypeSelector(
	props: ItemSubTypeSelectorProps = {},
): JSX.Element {
	const { itemSubType, setItemSubType } = useItemSubType();

	const handleItemSubTypeSelect = (selectedSubType: ItemSubType) => {
		setItemSubType(selectedSubType);
	};

	if (props.variant === "compact") {
		return (
			<Dropdown class={props.class || "ml-auto"}>
				<Dropdown.Trigger class="bg-sky-700 hover:bg-sky-600 text-white px-2 py-1 rounded-lg focus:outline-none transition-colors duration-200">
					<span class="text-sm font-medium">
						{NAME_BY_ITEM_SUB_TYPE[itemSubType()]}
					</span>
				</Dropdown.Trigger>

				<Dropdown.Content class="py-2 w-32" align="right">
					<For each={AVAILABLE_ITEM_SUB_TYPE}>
						{(subType) => (
							<Dropdown.Item
								class="px-4 py-2 text-sm text-center"
								onClick={() => handleItemSubTypeSelect(subType)}
							>
								<span
									class={
										itemSubType() === subType
											? "text-sky-600 font-medium"
											: "text-gray-700"
									}
								>
									{NAME_BY_ITEM_SUB_TYPE[subType]}
								</span>
							</Dropdown.Item>
						)}
					</For>
				</Dropdown.Content>
			</Dropdown>
		);
	}

	return (
		<Dropdown class={props.class || "ml-auto"}>
			<Dropdown.Trigger class="flex items-center bg-sky-700 hover:bg-sky-600 text-white px-3 py-1 rounded-lg focus:outline-none transition-colors duration-200">
				<div class="flex items-center">
					<span class="mr-1">{NAME_BY_ITEM_SUB_TYPE[itemSubType()]}</span>
					<HeroiconsOutlineChevronDown
						stroke="currentColor"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-2 h-4 w-4"
					/>
				</div>
			</Dropdown.Trigger>

			<Dropdown.Content class="py-2 w-32" align="right">
				<For each={AVAILABLE_ITEM_SUB_TYPE}>
					{(subType) => (
						<Dropdown.Item
							class="px-4 py-2 text-sm text-center"
							onClick={() => handleItemSubTypeSelect(subType)}
						>
							<span
								class={
									itemSubType() === subType
										? "text-sky-600 font-medium"
										: "text-gray-700"
								}
							>
								{NAME_BY_ITEM_SUB_TYPE[subType]}
							</span>
						</Dropdown.Item>
					)}
				</For>
			</Dropdown.Content>
		</Dropdown>
	);
}

/**
 * Default export for backward compatibility
 */
export default ItemSubTypeSelector;

/**
 * Named export for explicit usage
 */
export { ItemSubTypeSelector, NAME_BY_ITEM_SUB_TYPE };

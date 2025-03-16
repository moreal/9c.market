import { createSignal, For, onMount } from "solid-js";
import HeroiconsOutlineChevronDown from "~icons/heroicons-outline/chevron-down";
import { useItemSubType } from "~/contexts/ItemSubTypeContext";
import {
	AVAILABLE_ITEM_SUB_TYPE,
	type ItemSubType,
} from "~/utils/market-service-client";

const NAME_BY_ITEM_SUB_TYPE: Record<ItemSubType, string> = {
	HOURGLASS: "Hourglass",
	AP_STONE: "AP Potion",
	SCROLL: "Scroll",
	CIRCLE: "Circle",
};

export default function ItemSubTypeSelector() {
	const { itemSubType, setItemSubType } = useItemSubType();
	const [isOpen, setIsOpen] = createSignal(false);

	const toggleDropdown = () => setIsOpen(!isOpen());

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(".currency-selector")) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});

	const selectItemSubType = (curr: ItemSubType) => {
		setItemSubType(curr);
		setIsOpen(false);
	};

	return (
		<div class="relative ml-auto currency-selector">
			<button
				type="button"
				onClick={toggleDropdown}
				class="flex items-center bg-sky-700 hover:bg-sky-600 text-white px-3 py-1 rounded-lg focus:outline-none transition-colors duration-200"
			>
				<span class="mr-1">{NAME_BY_ITEM_SUB_TYPE[itemSubType()]}</span>
				<HeroiconsOutlineChevronDown
					stroke="currentColor"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-2 h-4 w-4"
				/>
			</button>

			{isOpen() && (
				<ul class="absolute right-0 mt-2 py-2 w-32 bg-white rounded-md shadow-lg z-10">
					<For each={AVAILABLE_ITEM_SUB_TYPE}>
						{(curr) => (
							<li
								class={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
									itemSubType() === curr
										? "text-sky-600 font-medium"
										: "text-gray-700"
								}`}
								onKeyPress={() => selectItemSubType(curr)}
								onClick={() => selectItemSubType(curr)}
							>
								{NAME_BY_ITEM_SUB_TYPE[curr]}
							</li>
						)}
					</For>
				</ul>
			)}
		</div>
	);
}

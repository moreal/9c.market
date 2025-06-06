import { createContext, useContext, createSignal, type JSX } from "solid-js";
import type { ItemSubType } from "~/types/item";

/**
 * Props interface for ItemSubTypeProvider component
 */
interface ItemSubTypeProviderProps {
	children: JSX.Element;
}

/**
 * Context type for item sub-type management
 */
interface ItemSubTypeContextType {
	itemSubType: () => ItemSubType;
	setItemSubType: (itemSubType: ItemSubType) => void;
}

const ItemSubTypeContext = createContext<ItemSubTypeContextType>();

/**
 * Item sub-type context provider component
 * Manages the currently selected item sub-type for market filtering
 * Defaults to "HOURGLASS" as the initial sub-type
 */
export function ItemSubTypeProvider(props: ItemSubTypeProviderProps) {
	const [itemSubType, setItemSubType] = createSignal<ItemSubType>("HOURGLASS");

	return (
		<ItemSubTypeContext.Provider value={{ itemSubType, setItemSubType }}>
			{props.children}
		</ItemSubTypeContext.Provider>
	);
}

/**
 * Hook for accessing item sub-type context
 * @throws {Error} When used outside of ItemSubTypeProvider
 * @returns Item sub-type context with current sub-type and setter function
 */
export const useItemSubType = () => {
	const context = useContext(ItemSubTypeContext);
	if (!context) {
		throw new Error(
			"useItemSubType must be used within an ItemSubTypeProvider",
		);
	}
	return context;
};

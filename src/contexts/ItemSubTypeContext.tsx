import { createContext, useContext, createSignal, type JSX } from "solid-js";
import type { ItemSubType } from "~/utils/market-service-client";

type ItemSubTypeContextType = {
	itemSubType: () => ItemSubType;
	setItemSubType: (itemSubType: ItemSubType) => void;
};

const ItemSubTypeContext = createContext<ItemSubTypeContextType>();

export function ItemSubTypeProvider(props: { children: JSX.Element }) {
	const [itemSubType, setItemSubType] = createSignal<ItemSubType>("HOURGLASS");
	return (
		<ItemSubTypeContext.Provider value={{ itemSubType, setItemSubType }}>
			{props.children}
		</ItemSubTypeContext.Provider>
	);
}

export const useItemSubType = () => {
	const context = useContext(ItemSubTypeContext);
	if (!context) {
		throw new Error(
			"useItemSubType must be used within an ItemSubTypeProvider",
		);
	}
	return context;
};

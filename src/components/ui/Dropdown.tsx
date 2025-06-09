import { type JSX, splitProps } from "solid-js";
import { DropdownMenu } from "@kobalte/core/dropdown-menu";

/**
 * Props for Dropdown root component
 */
interface DropdownProps {
	children: JSX.Element;
	class?: string;
	defaultOpen?: boolean;
	onOpenChange?: (isOpen: boolean) => void;
}

/**
 * Root component that provides context for dropdown functionality using Kobalte
 */
function Dropdown(props: DropdownProps): JSX.Element {
	const [local, kobalteProps] = splitProps(props, ["children", "class"]);

	return (
		<DropdownMenu {...kobalteProps}>
			<div class={`relative ${local.class || ""}`}>{local.children}</div>
		</DropdownMenu>
	);
}

/**
 * Props for Dropdown.Trigger component
 */
interface TriggerProps {
	children: JSX.Element;
	class?: string;
	asChild?: boolean;
}

/**
 * Trigger component for dropdown using Kobalte
 */
function Trigger(props: TriggerProps): JSX.Element {
	const [local, kobalteProps] = splitProps(props, ["children", "class"]);

	return (
		<DropdownMenu.Trigger class={local.class} {...kobalteProps}>
			{local.children}
		</DropdownMenu.Trigger>
	);
}

/**
 * Props for Dropdown.Content component
 */
interface ContentProps {
	children: JSX.Element;
	class?: string;
	align?: "left" | "right" | "center";
	sideOffset?: number;
}

/**
 * Content container component for dropdown using Kobalte
 */
function Content(props: ContentProps): JSX.Element {
	const [local, kobalteProps] = splitProps(props, [
		"children",
		"class",
		"align",
	]);

	return (
		<DropdownMenu.Portal>
			<DropdownMenu.Content
				class={`bg-white rounded-lg shadow-lg z-10 transform origin-top transition-all duration-200 ${local.class || ""}`}
				{...kobalteProps}
			>
				{local.children}
			</DropdownMenu.Content>
		</DropdownMenu.Portal>
	);
}

/**
 * Props for Dropdown.Item component
 */
interface ItemProps {
	children: JSX.Element;
	class?: string;
	onClick?: () => void;
	disabled?: boolean;
}

/**
 * Individual item component within the dropdown using Kobalte
 */
function Item(props: ItemProps): JSX.Element {
	const [local, kobalteProps] = splitProps(props, ["children", "class"]);

	return (
		<DropdownMenu.Item
			class={`block w-full text-left transition-colors duration-150 ${
				kobalteProps.disabled
					? "cursor-not-allowed opacity-50"
					: "hover:bg-gray-50"
			} ${local.class || ""}`}
			{...kobalteProps}
		>
			{local.children}
		</DropdownMenu.Item>
	);
}

/**
 * Props for Dropdown.Separator component
 */
interface SeparatorProps {
	class?: string;
}

/**
 * Separator component for dropdown items using Kobalte
 */
function Separator(props: SeparatorProps): JSX.Element {
	return (
		<DropdownMenu.Separator
			class={`border-t border-gray-200 my-1 ${props.class || ""}`}
		/>
	);
}

/**
 * Compound component with sub-components
 */
const DropdownCompound = Object.assign(Dropdown, {
	Trigger,
	Content,
	Item,
	Separator,
});

export { DropdownCompound as Dropdown };

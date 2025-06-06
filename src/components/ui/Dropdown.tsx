import {
	createSignal,
	createContext,
	useContext,
	type JSX,
	type Accessor,
} from "solid-js";

/**
 * Context for managing dropdown state
 */
interface DropdownContextValue {
	isOpen: Accessor<boolean>;
	toggle: () => void;
	close: () => void;
	open: () => void;
}

const DropdownContext = createContext<DropdownContextValue>();

/**
 * Hook to access dropdown context
 */
function useDropdown(): DropdownContextValue {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error("useDropdown must be used within a Dropdown component");
	}
	return context;
}

/**
 * Props for Dropdown root component
 */
interface DropdownProps {
	children: JSX.Element;
	class?: string;
	defaultOpen?: boolean;
}

/**
 * Root component that provides context for dropdown functionality
 */
function Dropdown(props: DropdownProps): JSX.Element {
	const [isOpen, setIsOpen] = createSignal(props.defaultOpen ?? false);

	const contextValue: DropdownContextValue = {
		isOpen,
		toggle: () => setIsOpen(!isOpen()),
		close: () => setIsOpen(false),
		open: () => setIsOpen(true),
	};

	return (
		<DropdownContext.Provider value={contextValue}>
			<div class={`relative ${props.class || ""}`}>{props.children}</div>
		</DropdownContext.Provider>
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
 * Trigger component for dropdown
 */
function Trigger(props: TriggerProps): JSX.Element {
	const { toggle } = useDropdown();

	if (props.asChild) {
		// If asChild is true, clone the child element and add the onClick handler
		return (
			<div onClick={toggle} class={props.class}>
				{props.children}
			</div>
		);
	}

	return (
		<button type="button" onClick={toggle} class={props.class}>
			{props.children}
		</button>
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
 * Content container component for dropdown
 */
function Content(props: ContentProps): JSX.Element {
	const { isOpen } = useDropdown();

	const alignmentClass = () => {
		switch (props.align) {
			case "left":
				return "left-0";
			case "center":
				return "left-1/2 transform -translate-x-1/2";
			case "right":
			default:
				return "right-0";
		}
	};

	const topOffset = props.sideOffset ? `${props.sideOffset}px` : "0.5rem";

	return (
		<div
			class={`absolute ${alignmentClass()} bg-white rounded-lg shadow-lg z-10 transform origin-top transition-all duration-200 ${props.class || ""}`}
			style={{
				"margin-top": topOffset,
				opacity: isOpen() ? 1 : 0,
				visibility: isOpen() ? "visible" : "hidden",
				transform: isOpen() ? "scale(1)" : "scale(0.95)",
			}}
		>
			{props.children}
		</div>
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
 * Individual item component within the dropdown
 */
function Item(props: ItemProps): JSX.Element {
	const { close } = useDropdown();

	const handleClick = () => {
		if (!props.disabled) {
			props.onClick?.();
			close();
		}
	};

	return (
		<button
			type="button"
			class={`block w-full text-left transition-colors duration-150 ${
				props.disabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"
			} ${props.class || ""}`}
			onClick={handleClick}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
}

/**
 * Props for Dropdown.Separator component
 */
interface SeparatorProps {
	class?: string;
}

/**
 * Separator component for dropdown items
 */
function Separator(props: SeparatorProps): JSX.Element {
	return <div class={`border-t border-gray-200 my-1 ${props.class || ""}`} />;
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

export { DropdownCompound as Dropdown, useDropdown };

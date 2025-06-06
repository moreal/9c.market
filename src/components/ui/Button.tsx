import type { JSX } from "solid-js";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

/**
 * Props interface for Button component
 */
interface ButtonProps {
	children: JSX.Element;
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
	fullWidth?: boolean;
	class?: string;
}

/**
 * Style mappings for button variants
 */
const VARIANT_STYLES: Record<ButtonVariant, string> = {
	primary:
		"bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white focus:ring-sky-500",
	secondary:
		"bg-white text-indigo-700 border border-indigo-700 hover:bg-indigo-50 focus:ring-indigo-500",
	outline:
		"bg-transparent border border-white text-white hover:bg-white/10 focus:ring-white",
	danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
};

/**
 * Style mappings for button sizes
 */
const SIZE_STYLES: Record<ButtonSize, string> = {
	sm: "text-sm py-1.5 px-3",
	md: "py-2 px-5",
	lg: "text-lg py-2.5 px-6",
};

/**
 * Default values for button props
 */
const DEFAULT_VARIANT: ButtonVariant = "primary";
const DEFAULT_SIZE: ButtonSize = "md";
const DEFAULT_TYPE = "button";

/**
 * Reusable Button component with multiple variants and sizes
 * Follows SRP by handling only button rendering and styling
 */
export default function Button(props: ButtonProps) {
	/**
	 * Gets the CSS classes for the button variant
	 */
	const getVariantStyles = (): string => {
		return VARIANT_STYLES[props.variant || DEFAULT_VARIANT];
	};

	/**
	 * Gets the CSS classes for the button size
	 */
	const getSizeStyles = (): string => {
		return SIZE_STYLES[props.size || DEFAULT_SIZE];
	};

	/**
	 * Combines all CSS classes for the button
	 */
	const getButtonClasses = (): string => {
		const baseClasses = [
			"font-medium rounded-lg transition-all duration-200",
			"focus:outline-none focus:ring-2 focus:ring-offset-2",
			"disabled:opacity-60 disabled:cursor-not-allowed",
		];

		const dynamicClasses = [
			getVariantStyles(),
			getSizeStyles(),
			props.fullWidth ? "w-full" : "",
			props.disabled ? "" : "hover:shadow-md",
			props.class || "",
		];

		return [...baseClasses, ...dynamicClasses].join(" ");
	};

	return (
		<button
			type={props.type || DEFAULT_TYPE}
			disabled={props.disabled}
			onClick={props.onClick}
			class={getButtonClasses()}
		>
			{props.children}
		</button>
	);
}

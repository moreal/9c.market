import { JSX } from "solid-js";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: JSX.Element;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  class?: string;
};

export default function Button(props: ButtonProps) {
  const variantStyles = () => {
    switch (props.variant) {
      case "primary":
        return "bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white focus:ring-sky-500";
      case "secondary":
        return "bg-white text-indigo-700 border border-indigo-700 hover:bg-indigo-50 focus:ring-indigo-500";
      case "outline":
        return "bg-transparent border border-white text-white hover:bg-white/10 focus:ring-white";
      case "danger":
        return "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500";
      default:
        return "bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white focus:ring-sky-500";
    }
  };

  const sizeStyles = () => {
    switch (props.size) {
      case "sm": 
        return "text-sm py-1.5 px-3";
      case "md": 
        return "py-2 px-5";
      case "lg": 
        return "text-lg py-2.5 px-6";
      default: 
        return "py-2 px-5";
    }
  };

  return (
    <button
      type={props.type || "button"}
      disabled={props.disabled}
      onClick={props.onClick}
      class={`
        ${variantStyles()}
        ${sizeStyles()}
        ${props.fullWidth ? 'w-full' : ''}
        font-medium rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-60 disabled:cursor-not-allowed
        ${props.disabled ? '' : 'hover:shadow-md'}
        ${props.class || ''}
      `}
    >
      {props.children}
    </button>
  );
}

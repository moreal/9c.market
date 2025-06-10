import { Component, JSX, splitProps } from "solid-js";
import { A } from "@solidjs/router";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  href?: string;
}

export const Button: Component<ButtonProps> = (props) => {
  const [local, rest] = splitProps(props, [
    "variant",
    "size",
    "isLoading",
    "fullWidth",
    "class",
    "children",
    "href",
  ]);

  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[local.variant || "primary"]} ${
    sizeClasses[local.size || "md"]
  } ${local.fullWidth ? "w-full" : ""} ${local.class || ""}`;

  if (local.href) {
    return (
      <A href={local.href} class={classes}>
        {local.isLoading ? (
          <div class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {local.children}
      </A>
    );
  }

  return (
    <button
      {...rest}
      class={classes}
      disabled={local.isLoading || rest.disabled}
    >
      {local.isLoading ? (
        <div class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {local.children}
    </button>
  );
}; 

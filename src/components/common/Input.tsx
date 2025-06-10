import { Component, JSX, splitProps } from "solid-js";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	fullWidth?: boolean;
}

export const Input: Component<InputProps> = (props) => {
	const [local, rest] = splitProps(props, [
		"label",
		"error",
		"fullWidth",
		"class",
		"id",
	]);

	const inputId = local.id || crypto.randomUUID();

	return (
		<div class={`${local.fullWidth ? "w-full" : ""}`}>
			{local.label && (
				<label
					for={inputId}
					class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
				>
					{local.label}
				</label>
			)}
			<input
				{...rest}
				id={inputId}
				class={`block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${
					local.error
						? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
						: ""
				} ${local.fullWidth ? "w-full" : ""} ${local.class || ""}`}
				aria-invalid={local.error ? "true" : "false"}
				aria-describedby={local.error ? `${inputId}-error` : undefined}
			/>
			{local.error && (
				<p
					class="mt-2 text-sm text-red-600"
					id={`${inputId}-error`}
					role="alert"
				>
					{local.error}
				</p>
			)}
		</div>
	);
};

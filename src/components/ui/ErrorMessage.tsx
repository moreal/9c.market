import { Show } from "solid-js";

type ErrorMessageProps = {
	message?: string;
	title?: string;
};

export default function ErrorMessage(props: ErrorMessageProps) {
	return (
		<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
			<Show when={props.title}>
				<p class="font-medium mb-1">{props.title || "Error Occurred"}</p>
			</Show>
			<p class="text-sm">
				{props.message || "Something went wrong. Please try again later."}
			</p>
		</div>
	);
}

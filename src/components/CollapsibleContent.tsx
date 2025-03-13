import { children, createSignal, JSX } from "solid-js";

type CollapsibleContentProps = {
	title: string;
	children: JSX.Element;
	defaultOpen?: boolean;
};

export default function CollapsibleContent(props: CollapsibleContentProps) {
	const [isOpen, setIsOpen] = createSignal(props.defaultOpen || false);
	const c = children(() => props.children);

	return (
		<div class="border-t border-gray-200 pt-4 mt-4">
			<button
				class="flex w-full justify-between items-center focus:outline-none group"
				onClick={() => setIsOpen(!isOpen())}
				aria-expanded={isOpen()}
				aria-controls="content-panel"
			>
				<span class="font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-200">
					{props.title}
				</span>
				<span
					class={`w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 group-hover:bg-indigo-100 text-gray-500 group-hover:text-indigo-600 transition-all duration-200 ${isOpen() ? "transform rotate-180" : ""}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</span>
			</button>

			<div
				id="content-panel"
				class="overflow-hidden transition-all duration-300 ease-in-out"
				style={{
					"max-height": isOpen() ? "500px" : "0px",
					opacity: isOpen() ? "1" : "0",
					visibility: isOpen() ? "visible" : "hidden",
				}}
			>
				<div class="pt-3 pb-1">{c()}</div>
			</div>
		</div>
	);
}

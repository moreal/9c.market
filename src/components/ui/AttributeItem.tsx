type IconType = "lightning" | "clock" | "calendar" | "user" | "tag";

type AttributeItemProps = {
	icon: IconType;
	label: string;
	value: string | number;
};

export default function AttributeItem(props: AttributeItemProps) {
	const { icon, label, value } = props;

	const renderIcon = () => {
		switch (icon) {
			case "lightning":
				return (
					<svg
            role="img"
            aria-label="Lightning"
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 mr-1 text-indigo-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
				);
			case "clock":
				return (
					<svg
            role="img"
            aria-label="Clock"
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 mr-1 text-indigo-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				);
			case "calendar":
				return (
					<svg
            role="img"
            aria-label="Calendar"
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 mr-1 text-indigo-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				);
			case "user":
				return (
					<svg
            role="img"
            aria-label="User"
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 mr-1 text-indigo-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
						/>
					</svg>
				);
			case "tag":
				return (
					<svg
            role="img"
            aria-label="Tag"
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 mr-1 text-indigo-500"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
						/>
					</svg>
				);
			default:
				return null;
		}
	};

	return (
		<div class="flex items-center">
			{renderIcon()}
			{label} <span class="font-medium ml-1">{value}</span>
		</div>
	);
}

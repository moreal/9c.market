import { JSX } from "solid-js";

type FeatureCardProps = {
	title: string;
	description: string;
	icon: JSX.Element;
};

export default function FeatureCard(props: FeatureCardProps) {
	return (
		<div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
			<div class="text-indigo-600 mb-4">{props.icon}</div>
			<h2 class="text-xl font-bold mb-2">{props.title}</h2>
			<p class="text-gray-600">{props.description}</p>
		</div>
	);
}

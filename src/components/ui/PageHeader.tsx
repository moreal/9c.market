import { JSX, children } from "solid-js";

type PageHeaderProps = {
	title: string;
	children?: JSX.Element;
};

export default function PageHeader(props: PageHeaderProps) {
	const c = children(() => props.children);
	return (
		<div class="bg-gradient-to-r from-sky-600 to-indigo-700 rounded-lg shadow-lg p-6 mb-8">
			<h1 class="text-3xl md:text-4xl font-bold text-center text-white my-2">
				{props.title}
			</h1>
			{c() && <div class="text-center">{c()}</div>}
		</div>
	);
}

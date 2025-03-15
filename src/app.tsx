import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/nav/Nav";
import "./app.css";
import { Providers } from "./contexts/Providers";

export default function App() {
	return (
		<Router
			root={(props) => (
				<Providers>
					<Nav />
					<Suspense>{props.children}</Suspense>
				</Providers>
			)}
		>
			<FileRoutes />
		</Router>
	);
}

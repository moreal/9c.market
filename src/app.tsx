import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, ErrorBoundary } from "solid-js";
import Nav from "~/components/nav/Nav";
import "./app.css";
import { Providers } from "./contexts/Providers";
import { ErrorFallback } from "~/components/error/ErrorFallback";
import LoadingSpinner from "~/components/ui/LoadingSpinner";

export default function App() {
	return (
		<Router
			root={(props) => (
				<ErrorBoundary fallback={(err) => <ErrorFallback error={err} />}>
					<Providers>
						<Nav />
						<Suspense fallback={<LoadingSpinner />}>{props.children}</Suspense>
					</Providers>
				</ErrorBoundary>
			)}
		>
			<FileRoutes />
		</Router>
	);
}

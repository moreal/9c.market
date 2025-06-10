import PageLayout from "~/components/layout/PageLayout";
import HomePageContent from "~/components/pages/HomePageContent";
import { ItemSubTypeProvider } from "~/contexts/ItemSubTypeContext";

/**
 * Home page route component
 * Follows SRP by handling only routing concerns and context provision
 * Uses composition to separate layout from content
 */
export default function Home() {
	return (
		<PageLayout padding="lg">
			<ItemSubTypeProvider>
				<HomePageContent />
			</ItemSubTypeProvider>
		</PageLayout>
	);
}

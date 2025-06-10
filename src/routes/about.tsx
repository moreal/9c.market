import PageLayout from "~/components/layout/PageLayout";
import AboutPageContent from "~/components/pages/AboutPageContent";

/**
 * About page route component
 * Follows SRP by handling only routing concerns
 * Uses composition to separate layout from content
 */
export default function About() {
	return (
		<PageLayout padding="lg">
			<AboutPageContent />
		</PageLayout>
	);
}

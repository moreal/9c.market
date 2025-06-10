import PageLayout from "~/components/layout/PageLayout";
import NotFoundPageContent from "~/components/pages/NotFoundPageContent";

/**
 * 404 page route component
 * Follows SRP by handling only routing concerns
 * Uses composition to separate layout from content
 */
export default function NotFound() {
	return (
		<PageLayout>
			<NotFoundPageContent />
		</PageLayout>
	);
}

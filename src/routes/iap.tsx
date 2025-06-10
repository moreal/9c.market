import PageLayout from "~/components/layout/PageLayout";
import IAPPageContent from "~/components/pages/IAPPageContent";

/**
 * IAP products page route component
 * Follows SRP by handling only routing concerns
 * Uses composition to separate layout from content
 */
export default function IAPProducts() {
	return (
		<PageLayout>
			<IAPPageContent />
		</PageLayout>
	);
}

import { Component } from "solid-js";
import { Layout } from "~/components/layout/Layout";
import HomePageContent from "~/components/pages/HomePageContent";
import { ItemSubTypeProvider } from "~/contexts/ItemSubTypeContext";

const Products: Component = () => {
	return (
		<Layout>
			<ItemSubTypeProvider>
				<HomePageContent />
			</ItemSubTypeProvider>
		</Layout>
	);
};

export default Products;

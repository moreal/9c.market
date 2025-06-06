import type {
	IMarketProductService,
	IProductSortService,
	IProductListRenderer,
} from "~/interfaces/IMarketProductService";
import { marketProductService } from "~/services/MarketProductService";
import { ProductSortServiceFactory } from "~/services/ProductSortService";
import { productListRenderer } from "~/services/ProductListRenderer";

/**
 * Dependency injection container
 * Follows DIP by providing abstraction layer for dependencies
 * Follows SRP by handling only dependency management
 * Follows OCP by allowing different configurations without modification
 */
export class DIContainer {
	private static instance: DIContainer;

	private constructor(
		private readonly _marketProductService: IMarketProductService,
		private readonly _productSortService: IProductSortService,
		private readonly _productListRenderer: IProductListRenderer,
	) {}

	static getInstance(): DIContainer {
		if (!DIContainer.instance) {
			DIContainer.instance = DIContainer.createDefault();
		}
		return DIContainer.instance;
	}

	/**
	 * Factory method for creating default configuration
	 * Follows OCP by allowing new configurations without modifying existing code
	 */
	static createDefault(): DIContainer {
		return new DIContainer(
			marketProductService,
			ProductSortServiceFactory.createUnitPriceSorter(),
			productListRenderer,
		);
	}

	/**
	 * Factory method for creating custom configuration
	 * Follows OCP by allowing different sorting strategies
	 */
	static createWithPriceSorting(): DIContainer {
		return new DIContainer(
			marketProductService,
			ProductSortServiceFactory.createPriceSorter(),
			productListRenderer,
		);
	}

	/**
	 * Factory method for creating custom configuration
	 * Follows OCP by allowing different sorting strategies
	 */
	static createWithQuantitySorting(): DIContainer {
		return new DIContainer(
			marketProductService,
			ProductSortServiceFactory.createQuantitySorter(),
			productListRenderer,
		);
	}

	get marketProductService(): IMarketProductService {
		return this._marketProductService;
	}

	get productSortService(): IProductSortService {
		return this._productSortService;
	}

	get productListRenderer(): IProductListRenderer {
		return this._productListRenderer;
	}
}

/**
 * Convenience function to get DI container
 */
export const getDIContainer = () => DIContainer.getInstance();

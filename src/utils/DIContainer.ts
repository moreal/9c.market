import type {
	IMarketProductService,
	IProductSortService,
	IProductListRenderer,
} from "~/interfaces/IMarketProductService";
import { marketProductService } from "~/services/MarketProductService";
import { ProductSortServiceFactory } from "~/services/ProductSortService";
import { productListRenderer } from "~/services/ProductListRenderer";
import { CurrencyConverter } from "~/services/CurrencyConverter";
import { EXCHANGE_RATE_BY_CURRENCY } from "~/constants";

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
		private readonly _currencyConverter: CurrencyConverter,
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
			new CurrencyConverter(EXCHANGE_RATE_BY_CURRENCY),
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
			new CurrencyConverter(EXCHANGE_RATE_BY_CURRENCY),
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
			new CurrencyConverter(EXCHANGE_RATE_BY_CURRENCY),
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

	get currencyConverter(): CurrencyConverter {
		return this._currencyConverter;
	}
}

/**
 * Convenience function to get DI container
 */
export const getDIContainer = () => DIContainer.getInstance();

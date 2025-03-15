/**
 * TypeScript interfaces for the 9C Market API responses
 */

/**
 * Represents a skill model in an item product
 */
// interface SkillModel {
//   // Fields would be added based on actual data structure
// }

/**
 * Represents a stat model in an item product
 */
// interface StatModel {
//   // Fields would be added based on actual data structure
// }

/**
 * Represents an individual product item in the marketplace
 */
export interface ItemProduct {
	productId: string;
	sellerAgentAddress: string;
	sellerAvatarAddress: string;
	price: number;
	quantity: number;
	registeredBlockIndex: number;
	exist: boolean;
	legacy: boolean;
	itemId: number;
	iconId: number;
	grade: number;
	itemType: number;
	itemSubType: number;
	elementalType: number;
	tradableId: string;
	setId: number;
	combatPoint: number;
	level: number;
	// skillModels: SkillModel[];
	// statModels: StatModel[];
	optionCountFromCombination: number;
	unitPrice: number;
	crystal: number;
	crystalPerPrice: number;
	byCustomCraft: boolean;
	hasRandomOnlyIcon: boolean;
}

/**
 * Represents the market API response for item products
 */
export interface MarketItemProductsResponse {
	totalCount: number;
	limit: number;
	offset: number;
	itemProducts: ItemProduct[];
}

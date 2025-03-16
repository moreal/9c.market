import { z } from "zod";

export const ItemProductSchema = z.object({
	productId: z.string().uuid(),
	sellerAgentAddress: z.string(),
	sellerAvatarAddress: z.string(),
	price: z.number().int().nonnegative(),
	quantity: z.number().int().positive(),
	registeredBlockIndex: z.number().int().nonnegative(),
	exist: z.boolean(),
	legacy: z.boolean(),
	itemId: z.number().int().nonnegative(),
	iconId: z.number().int().nonnegative(),
	grade: z.number().int().nonnegative(),
	itemType: z.number().int().nonnegative(),
	itemSubType: z.number().int().nonnegative(),
	elementalType: z.number().int().nonnegative(),
	tradableId: z.string(),
	setId: z.number().int().nonnegative(),
	combatPoint: z.number().int().nonnegative(),
	level: z.number().int().nonnegative(),
	optionCountFromCombination: z.number().int().nonnegative(),
	unitPrice: z.number().nonnegative(),
	crystal: z.number().int().nonnegative(),
	crystalPerPrice: z.number().nonnegative(),
	byCustomCraft: z.boolean(),
	hasRandomOnlyIcon: z.boolean(),
});

/**
 * Zod schema for market API response
 */
export const MarketItemProductsResponseSchema = z.object({
	totalCount: z.number().int().nonnegative(),
	limit: z.number().int().nonnegative(),
	offset: z.number().int().nonnegative(),
	itemProducts: z.array(ItemProductSchema),
	fungibleAssetValueProducts: z.array(z.any()), // This can be more specific when data structure is known
});

// Type inferences from the schemas
export type ItemProduct = z.infer<typeof ItemProductSchema>;
export type MarketItemProductsResponse = z.infer<
	typeof MarketItemProductsResponseSchema
>;

/**
 * Utility function to validate market item products data
 */
export function validateMarketItemProductsResponse(
	data: unknown,
): MarketItemProductsResponse {
	return MarketItemProductsResponseSchema.parse(data);
}

/**
 * Utility function to safely validate market item products data (returns result instead of throwing)
 */
export function safeValidateMarketItemProductsResponse(data: unknown) {
	return MarketItemProductsResponseSchema.safeParse(data);
}

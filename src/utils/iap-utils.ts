import type { Product } from "../types/iap";

// Format price from FavItem or mileage
export function formatPrice(product: Product): string {
	// Check first for network price in KRW if available
	if (product.networkPrice?.KRW) {
		return `${product.networkPrice.KRW.toLocaleString()} KRW`;
	}

	// Use mileage price if product is mileage type
	if (product.product_type === "MILEAGE" && product.mileage_price !== null) {
		return `${product.mileage_price} Mileage`;
	}

	// If mileage is available, use it
	if (product.mileage) {
		return `${product.mileage} Mileage`;
	}

	if (product.product_type === "FREE") {
		return "FREE";
	}

	// Default when no price info is available
	return "Unknown USD";
}

// Get the product rarity color class
export function getRarityColorClass(rarity: string): string {
	switch (rarity.toLowerCase()) {
		case "legendary":
			return "bg-amber-500 text-white";
		case "epic":
			return "bg-purple-600 text-white";
		case "rare":
			return "bg-blue-600 text-white";
		case "unique":
			return "bg-green-600 text-white";
		default:
			return "bg-gray-500 text-white";
	}
}

// Get the product rarity text color class
export function getRarityTextClass(rarity: string): string {
	switch (rarity.toLowerCase()) {
		case "legendary":
			return "text-amber-500";
		case "epic":
			return "text-purple-600";
		case "rare":
			return "text-blue-600";
		case "unique":
			return "text-green-600";
		default:
			return "text-gray-500";
	}
}
